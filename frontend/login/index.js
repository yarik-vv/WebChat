import submitOff from '../shared';
submitOff('form[name="login"]')

document.getElementById('login').onclick = () => {
  require.ensure([], require => {
    const AJAXrequest = require('../request');
    AJAXrequest('login')
      .then(
        result => {
          window.location.href = '/travelchat';
        },
        error => {
          document.getElementById('error').innerHTML = 'There was a problem with your password';
        }
      );
    return false;
  });
};
