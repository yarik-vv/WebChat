'use scrict';

import websockets from './websockets';
import submitOff from '../../shared';

submitOff('form[name="chat"]');
websockets();

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
