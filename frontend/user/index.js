'use strict';

const list = document.querySelector('nav.menu');
list.addEventListener('click', remove);

function remove(event) {
  let id = event.target.name;
  console.log('[user.js] id: '+id);
  console.log(event.target.className);
  if(event.target.className==='remove') {
    require.ensure([], (require) => {
      var AJAXrequest = require('../request');
      AJAXrequest(id)
        .then(
          result => {
            window.location.href = '/users';
          },
          error => {
            alert('beda');
          }
        );
      return false;
    });
  }
};
