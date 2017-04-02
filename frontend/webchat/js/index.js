'use scrict';

document.getElementById('logout').onclick = () => {
  require.ensure([], (require) => {
    let logout = require('./logout');
    logout();
  });
};

  const form = $('form[name="webchat"]');
  const input = $('form[name="webchat"] input');
  const ul = $('form[name="webchat"] ul');
  const scrollHeight = 999999;

  const socket = io('', {
    'reconnectionAttempts': 30,
    'reconnectionDelay': 500
  });

let websockets = require('./websockets');
websockets();
