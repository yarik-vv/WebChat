webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _status = __webpack_require__(4);

var _status2 = _interopRequireDefault(_status);

var _message = __webpack_require__(3);

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var form = document.querySelector('form[name="webchat"]');
var input = document.querySelector('form[name="webchat"] input');
var sendButton = document.querySelector('button[type="submit"]');

var socket = io('', {
  'reconnectionAttempts': 30,
  'reconnectionDelay': 500
});

function websockets() {
  socket.on('message', function (username, message) {
    (0, _message2.default)(message, username);
  }).on('leave', function (username) {
    (0, _status2.default)(username + " покинул чат", "#d6f1e9");
  }).on('join', function (username) {
    (0, _status2.default)(username + " зашел в чат", "#d6f1e9");
  }).on('connect', function () {
    (0, _status2.default)("Соединение установлено", "#26fa88");
    form.addEventListener('submit', send);
    input.disabled = false;
    sendButton.disabled = false;
  }).on('disconnect', function () {
    (0, _status2.default)("Переподключение...", "#f1d6ee");
    form.removeEventListener('submit', send);
    input.disabled = true;
    sendButton.disabled = true;
  }).on('logout', function () {
    location.href = "/";
  }).on('error', function (reason) {
    if (reason == "handshake unauthorized") {
      (0, _status2.default)("Вы покинули чат");
    }
  }).on('reconnect_failed', function () {
    (0, _status2.default)("Соединение потеряно", "#f1d6ee");
  });

  function send() {
    var text = input.value;
    socket.emit('message', text, function (data) {
      (0, _message2.default)(data, 'you');
    });
    input.value = '';
    return false;
  }
}

module.exports = websockets;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use scrict';

var chat = document.getElementById('room');
var scrollHeight = 999999;

function currentTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + date.getMinutes();
  }
  return hours + ':' + minutes;
}

function printMessage(text, username) {
  var message = document.createElement('li');
  message.className = 'message';
  if (username == 'you') {
    message.style.alignSelf = 'flex-end';
    message.style.backgroundColor = '#5dd0e1';
    message.style.borderBottomRightRadius = '0';
  } else {
    message.style.alignSelf = 'flex-start';
    message.style.backgroundColor = '#fcfd45';
    message.style.borderBottomLeftRadius = '0px';
  }
  message.innerHTML = text;
  chat.appendChild(message);

  var description = document.createElement('span');
  description.className = 'description';
  if (username == 'you') {
    description.style.alignSelf = 'flex-end';
  } else {
    description.style.alignSelf = 'flex-start';
  }
  description.innerHTML = username + ', ' + currentTime();
  chat.appendChild(description);
  chat.scrollTop = scrollHeight;
}

module.exports = printMessage;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use scrict';

var chat = document.getElementById('room');
var scrollHeight = 999999;

function printStatus(status, color) {
  var statusMessage = document.createElement('li');
  statusMessage.className = 'log';
  statusMessage.style.backgroundColor = color;
  statusMessage.innerHTML = status;
  chat.appendChild(statusMessage);
  chat.scrollTop = scrollHeight;
}

module.exports = printStatus;

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use scrict';

var _websockets = __webpack_require__(2);

var _websockets2 = _interopRequireDefault(_websockets);

var _shared = __webpack_require__(1);

var _shared2 = _interopRequireDefault(_shared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _shared2.default)('form[name="webchat"]');
(0, _websockets2.default)();

document.getElementById('logout').onclick = function () {
  __webpack_require__.e/* require.ensure */(0/* duplicate */).then((function (require) {
    var AJAXrequest = __webpack_require__(0);
    AJAXrequest('logout');
    location.href = "/";
    //      .then(
    //        result => {
    //          window.location.href = '/';
    //        },
    //        error => {
    //          alert('beda');
    //        }
    //      );
    //      return false;
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

/***/ })
],[8]);
