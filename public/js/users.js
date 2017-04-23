webpackJsonp([2],{

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var list = document.getElementById('list');
list.addEventListener('click', remove);

function remove(event) {
  var id = event.target.name;
  console.log('[users.js] id: ' + id);
  console.log(event.target.className);
  if (event.target.className === 'remove') {
    __webpack_require__.e/* require.ensure */(0/* duplicate */).then((function (require) {
      var AJAXrequest = __webpack_require__(0);
      AJAXrequest(id).then(function (result) {
        document.getElementById(id).remove();
      }, function (error) {
        alert('beda');
      });
      return false;
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
};

/***/ })

},[7]);
