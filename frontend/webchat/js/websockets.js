import jQuery from 'jquery';
import print from './message';
import send from './message';
import status from './status';

function websockets(){
  const form = $('form[name="webchat"]');
  const input = $('form[name="webchat"] input');
  const ul = $('form[name="webchat"] ul');
  const scrollHeight = 999999;

  const socket = io('', {
    'reconnectionAttempts': 30,
    'reconnectionDelay': 500
  });

  socket
    .on('message', function(username, message) {
      print(message, username);
      $('<span>')
        .text(username+', '+ new Date())
        .appendTo(li)
        .addClass('description');
    })
    .on('leave', function(username) {
      status(username + " покинул чат", "yellow");
    })
    .on('join', function(username) {
      status(username + " присоединился к чату", "yellow");
    })
    .on('connect', function() {
      status("Соединение установлено", "#d6f1e9");
      form.on('submit', send);
      input.prop('disabled', false);
    })
    .on('disconnect', function() {
      status("Соединение потеряно", "#f1d6ee");
      status("Пееродключение...", "#f1d6ee");
      form.off('submit', send);
      input.prop('disabled', true);
    })
    .on('logout', function() {
      location.href = "/";
    })
    .on('error', function(reason) {
      if(reason == "handshake unauthorized") {
        status("Вы покинули чат");
      } 
    })
    .on('reconnect_failed', function() {
      status("Соединение разорвано");
    });
}
module.exports = websockets;