'use strict';

import jQuery from 'jquery';

$(document.forms['login']).on('submit', function () {
  require.ensure([], (require) => {
    let login = require('./login');
    login();
    location.href = "/webchat";
  })
});