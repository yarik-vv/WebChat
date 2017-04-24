webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function logout() {
  var request = new XMLHttpRequest();
  request.open('POST', '/logout');
  request.send();
  location.href = "/";
}

module.exports = logout;

/***/ })
]);