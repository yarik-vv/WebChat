'use strict';

document.getElementById('login').onclick = () => {
  AJAXrequest();
  return false;
};

function AJAXrequest() {
  let form = document.forms['login'];
  let data = serialize(form);
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if(request.readyState === XMLHttpRequest.DONE) {
      //console.log(request.readyState, request.status, request.responseText);
      //console.log(request.responseText);
      if(request.status===200){
        window.location.href = '/webchat';
      }
      else{
        let error = JSON.parse(request.responseText);
        document.getElementById('error').innerHTML = error.message;
      }
    }
  };
  request.open('POST', '/');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  request.send(data);
  //console.log('send request');
};

function serialize(selectForm) {
  let string = [];
  for(let i=0; i<2; i++) {
    string.push(selectForm.elements[i].name + "=" + encodeURIComponent(selectForm.elements[i].value));
  }
  return string.join("&");
};
