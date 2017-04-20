'use strict';

var AJAXrequest = new Promise(function(resolve, reject) {
  let form = document.forms['login'];
  let data = serialize(form);
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE) {
      console.log(request.readyState, request.status, request.responseText);
      console.log(request.responseText);
      if(request.status===200){
        resolve();
      }
      else{
        let error = JSON.parse(request.responseText);
        reject(error);
      }
    }
  };
  request.open('POST', '/');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded', "text/html");
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  request.send(data);
  //console.log('send request');
});

function serialize(selectForm) {
  let string = [];
  for(let i=0; i<2; i++) {
    string.push(selectForm.elements[i].name + "=" + encodeURIComponent(selectForm.elements[i].value));
  }
  return string.join("&");
};

module.exports = AJAXrequest;
