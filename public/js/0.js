webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function AJAXrequest(id) {
  return new Promise(function (resolve, reject) {
    if (id === 'login') {
      var form = document.forms['login'];
      var data = serialize(form);
      var path = '/';
    } else if (id === 'logout') {
      var data = '';
      var path = '/logout';
    } else {
      var data = "id=" + encodeURIComponent(id);
      var path = '/users';
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
        console.log(request.readyState, request.status, request.responseText);
        console.log(request.responseText);
        if (request.status === 200) {
          resolve();
        } else {
          //let message = request.responseText.message;
          reject();
        }
      }
    };
    request.open('POST', path);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded', "text/html");
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    console.log('[request.js] start request with data: ' + data);
    request.send(data);
  });
}

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