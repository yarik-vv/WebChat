'use strict';

const form = document.querySelector('form[name="login"]');
form.onsubmit = (action) => {
  action.preventDefault();
};

document.getElementById('login').onclick = () => {
  require.ensure([], (require) => {
    var AJAXrequest = require('../request');
    AJAXrequest
      .then(
        result => {
          window.location.href = '/webchat';
        },
        error => {
          document.getElementById('error').innerHTML = error.message;
        }
      );
    return false;
  });
};
