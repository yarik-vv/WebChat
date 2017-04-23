'use strict';

function submitOff(form){
  form = document.querySelector(form);
  form.onsubmit = (action) => {
    action.preventDefault();
  };
}

module.exports = submitOff;
