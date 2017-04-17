webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//var AJAXrequest = new Promise(function(resolve, reject) {

function AJAXrequest() {
  var form = document.forms['login'];
  var data = serialize(form);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      console.log(request.readyState, request.status, request.responseText);
      console.log(request.responseText);
      if (request.status === 200) {
        //resolve();
        window.location.href = '/webchat';
      } else {
        var error = JSON.parse(request.responseText);
        //reject(error);
        document.getElementById('error').innerHTML = error.message;
      }
    }
  };
  request.open('POST', '/');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded', "text/html");
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  request.send(data);
  //console.log('send request');
  //});
};
function serialize(selectForm) {
  var string = [];
  for (var i = 0; i < 2; i++) {
    string.push(selectForm.elements[i].name + "=" + encodeURIComponent(selectForm.elements[i].value));
  }
  return string.join("&");
};

module.exports = AJAXrequest;

/***/ })
]);
