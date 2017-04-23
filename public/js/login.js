webpackJsonp([4],{

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _shared = __webpack_require__(1);

var _shared2 = _interopRequireDefault(_shared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _shared2.default)('form[name="login"]');

document.getElementById('login').onclick = function () {
  __webpack_require__.e/* require.ensure */(0).then((function (require) {
    var AJAXrequest = __webpack_require__(0);
    AJAXrequest('login').then(function (result) {
      window.location.href = '/webchat';
    }, function (error) {
      document.getElementById('error').innerHTML = error.message;
    });
    return false;
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

/***/ })

},[5]);
