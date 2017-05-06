import websockets from './websockets';
import submitOff from '../../shared';

submitOff('form[name="chat"]');
websockets();

document.getElementById('logout').onclick = () => {
  require.ensure([], require => {
    const AJAXrequest = require('../../request');
    AJAXrequest('logout');
    location.href = "/";
  });
};
