'use strict';

const list = document.getElementById('list');
list.addEventListener('click', remove);

function remove(event) {
  let id = event.target.name;
  console.log('[users.js] id: '+id);
  console.log(event.target.className);
  if(event.target.className==='remove') {
    require.ensure([], (require) => {
      var AJAXrequest = require('../request');
      AJAXrequest(id)
        .then(
          result => {
            document.getElementById(id).remove();
          },
          error => {
            alert('beda');
          }
        );
      return false;
    });
  }
};
