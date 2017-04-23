'use scrict';

const chat = document.getElementById('room');
const scrollHeight = 999999;

const currentTime = function () {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + date.getMinutes();
  }
  return hours + ':' + minutes;
}

const printMessage = function (text, username) {
  let message = document.createElement('li');
  message.className = 'message';
  if (username == 'you') {
    message.style.alignSelf = 'flex-end';
    message.style.backgroundColor = '#5dd0e1';
    message.style.borderBottomRightRadius = '0';
  } else {
    message.style.alignSelf = 'flex-start';
    message.style.backgroundColor = '#fcfd45';
    message.style.borderBottomLeftRadius = '0px';
  }
  message.innerHTML = text;
  chat.appendChild(message);

  let description = document.createElement('span');
  description.className = 'description';
  if (username == 'you') {
    description.style.alignSelf = 'flex-end';
  } else {
    description.style.alignSelf = 'flex-start';
  }
  description.innerHTML = username + ', ' + currentTime();
  chat.appendChild(description);
  chat.scrollTop = scrollHeight;
}

module.exports = printMessage;
