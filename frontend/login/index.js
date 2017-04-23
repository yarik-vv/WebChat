'use strict';

import submitOff from '../shared';
submitOff('form[name="login"]')

document.getElementById('login').onclick = () => {
  require.ensure([], (require) => {
    var AJAXrequest = require('../request');
    AJAXrequest('login')
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
