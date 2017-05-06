const list = document.querySelector('nav.menu');
list.addEventListener('click', remove);

function remove(event) {
  const id = event.target.name;

  if(event.target.className==='remove') {
    require.ensure([], require => {
      var AJAXrequest = require('../request');
      AJAXrequest(id)
        .then(
          result => {
            window.location.href = '/users';
          },
          error => {
            console.log('Error, No have delete this user');
          }
        );
      return false;
    });
  }
};