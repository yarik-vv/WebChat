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
  const chat = document.getElementById('room');

  import status from './printStatus';

  const scrollHeight = 999999;

  const socket = io('', {
    'reconnectionAttempts': 30,
    'reconnectionDelay': 500
  });

  socket
    .on('message', function (username, message) {
      printMessage(message, username);
    })
    .on('leave', function (username) {
      status(username + " покинул чат", "#d6f1e9");
    })
    .on('join', function (username) {
      status(username + " зашел в чат", "#d6f1e9");
    })
    .on('connect', function () {
      status("Соединение установлено", "#26fa88");
      form.addEventListener('submit', sendMessage);
      input.disabled = false;
      sendButton.disabled = false;
    })
    .on('disconnect', function () {
      status("Переподключение...", "#f1d6ee");
      form.removeEventListener('submit', sendMessage);
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

  const sendMessage = function () {
    const text = input.value;
    socket.emit('message', text, function (data) {
      printMessage(data, 'you')
    });
    input.value = '';
    return false;
  }

  const currentTime = function(){
    let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if(minutes<10){
        minutes = '0' + date.getMinutes();
      }
    return hours + ':' + minutes;
  }

  const printMessage = function (text, username) {
    let message = document.createElement('li');
      message.className = 'message';
      if(username=='you'){
        message.style.alignSelf = 'flex-end';
        message.style.backgroundColor = '#5dd0e1';
        message.style.borderBottomRightRadius = '0';
      }
      else{
        message.style.alignSelf = 'flex-start';
        message.style.backgroundColor = '#fcfd45';
        message.style.borderBottomLeftRadius = '0px';
      }
      message.innerHTML = text;
    chat.appendChild(message);

    let description = document.createElement('span');
      description.className = 'description';
      if(username=='you'){
        description.style.alignSelf = 'flex-end';
      }
      else{
        description.style.alignSelf = 'flex-start';
      }
      description.innerHTML = username + ', ' + currentTime();
    chat.appendChild(description);

    chat.scrollTop = scrollHeight;
  }
