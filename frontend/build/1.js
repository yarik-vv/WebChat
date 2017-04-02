webpackJsonp([1],{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function login() {
  var form = $(document.forms['login']);
  $.ajax({
    url: "/",
    data: form.serialize(),
    method: "POST",
    complete: function complete() {},
    statusCode: {
      200: function _() {
        alert('suka');
        location.href = "/webchat";
      },
      403: function _(jqXHR) {
        var error = JSON.parse(jqXHR.responseText);
        $('.error', form).html(error.message);
      }
    }
  });
  return false;
}

module.exports = login;

/***/ })

});