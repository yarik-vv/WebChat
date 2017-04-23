'use scrict';

document.getElementById('logout').onclick = () => {
  require.ensure([], (require) => {
    var AJAXrequest = require('../../request');
    AJAXrequest('logout');
    location.href = "/";
//      .then(
//        result => {
//          window.location.href = '/';
//        },
//        error => {
//          alert('beda');
//        }
//      );
//      return false;
  });
};

  const form = document.querySelector('form[name="webchat"]');
  form.onsubmit = (action) => {
    action.preventDefault();
  };

  const input = document.querySelector('form[name="webchat"] input');
  const sendButton = document.querySelector('button[type="submit"]');

  import status from './status';
  import print from './message';

  const socket = io('', {
    'reconnectionAttempts': 30,
    'reconnectionDelay': 500
  });

  socket
    .on('message', function (username, message) {
      print(message, username);
    })
    .on('leave', function (username) {
      status(username + " покинул чат", "#d6f1e9");
    })
    .on('join', function (username) {
      status(username + " зашел в чат", "#d6f1e9");
    })
    .on('connect', function () {
      status("Соединение установлено", "#26fa88");
      form.addEventListener('submit', send);
      input.disabled = false;
      sendButton.disabled = false;
    })
    .on('disconnect', function () {
      status("Переподключение...", "#f1d6ee");
      form.removeEventListener('submit', send);
      input.disabled = true;
      sendButton.disabled = true;
    })
    .on('logout', function () {
      location.href = "/";
    })
    .on('error', function (reason) {
      if (reason == "handshake unauthorized") {
        status("Вы покинули чат");
      }
    })
    .on('reconnect_failed', function () {
      status("Соединение потеряно", "#f1d6ee");
    });

  const send = function () {
    const text = input.value;
    socket.emit('message', text, function (data) {
      print(data, 'you')
    });
    input.value = '';
    return false;
  }
