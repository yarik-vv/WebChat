'use scrict';

import websockets from './websockets';
websockets();

const form = document.querySelector('form[name="webchat"]');
form.onsubmit = (action) => {
  action.preventDefault();
};

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
