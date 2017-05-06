import status from './status';
import print from './message';

const form = document.querySelector('form[name="chat"]');
const input = document.querySelector('form[name="chat"] input');
const sendButton = document.querySelector('button[type="submit"]');

const socket = io('', {
  'reconnectionAttempts': 30,
  'reconnectionDelay': 500
});

function websockets () {
  socket
    .on('message', (username, message) => {
      print(message, username);
    })
    .on('leave', username => {
      status(username + " leave the chat", "#d6f1e9");
    })
    .on('join', username => {
      status(username + " joined the chat", "#d6f1e9");
    })
    .on('connect', () => {
      status("Connected to the chat", "#26fa88");
      form.addEventListener('submit', send);
      input.disabled = false;
      sendButton.disabled = false;
    })
    .on('disconnect', () => {
      status("Waiting for network...", "#f1d6ee");
      form.removeEventListener('submit', send);
      input.disabled = true;
      sendButton.disabled = true;
    })
    .on('logout', () => {
      location.href = "/";
    })
    .on('error', reason => {
      if (reason == 'handshake unauthorized') {
        status("You leave the chat.");
      }
    })
    .on('reconnect_failed', function () {
      status("Connection lost.", "#f1d6ee");
    });

  function send(){
    const text = input.value;
    socket.emit('message', text, data => {
      print(data, 'you')
    });
    input.value = '';
    return false;
  }
}

module.exports = websockets;