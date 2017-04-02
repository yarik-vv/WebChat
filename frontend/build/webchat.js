/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length)
/******/ 			resolves.shift()();

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return Promise.resolve();

/******/ 		// an Promise means "currently loading".
/******/ 		if(installedChunks[chunkId]) {
/******/ 			return installedChunks[chunkId][2];
/******/ 		}
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;

/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};

/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunks[chunkId][2] = promise;

/******/ 		head.appendChild(script);
/******/ 		return promise;
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _message = __webpack_require__(4);

var _message2 = _interopRequireDefault(_message);

var _status = __webpack_require__(5);

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function websockets() {
  var form = $('form[name="webchat"]');
  var input = $('form[name="webchat"] input');
  var ul = $('form[name="webchat"] ul');
  var scrollHeight = 999999;

  var socket = io('', {
    'reconnectionAttempts': 30,
    'reconnectionDelay': 500
  });

  socket.on('message', function (username, message) {
    (0, _message2.default)(message, username);
    $('<span>').text(username + ', ' + new Date()).appendTo(li).addClass('description');
  }).on('leave', function (username) {
    (0, _status2.default)(username + " покинул чат", "yellow");
  }).on('join', function (username) {
    (0, _status2.default)(username + " присоединился к чату", "yellow");
  }).on('connect', function () {
    (0, _status2.default)("Соединение установлено", "#d6f1e9");
    form.on('submit', _message2.default);
    input.prop('disabled', false);
  }).on('disconnect', function () {
    (0, _status2.default)("Соединение потеряно", "#f1d6ee");
    (0, _status2.default)("Пееродключение...", "#f1d6ee");
    form.off('submit', _message2.default);
    input.prop('disabled', true);
  }).on('logout', function () {
    location.href = "/";
  }).on('error', function (reason) {
    if (reason == "handshake unauthorized") {
      (0, _status2.default)("Вы покинули чат");
    }
  }).on('reconnect_failed', function () {
    (0, _status2.default)("Соединение разорвано");
  });
}
module.exports = websockets;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _websockets = __webpack_require__(1);

var _websockets2 = _interopRequireDefault(_websockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = _websockets2.default.socket;
var form = $('form[name="webchat"]');
var input = $('form[name="webchat"] input');
var ul = $('form[name="webchat"] ul');
var scrollHeight = 999999;

var send = function send() {

  var text = input.val();
  socket.emit('message', text, function (data) {
    $('<li>').text(text).appendTo(ul).addClass('my');

    var hours = new Date().getHours();
    if (new Date().getMinutes() < 10) {
      var minutes = '0' + new Date().getMinutes();
    } else {
      var minutes = new Date().getMinutes();
    }

    $('<span>').text('you, ' + hours + ':' + minutes).appendTo(ul).addClass('mdescription');

    ul.scrollTop(scrollHeight);
  });

  input.val('');
  return false;
};

var print = function print(text, username) {
  $('<li>').text(text).appendTo(ul).addClass('nmy');

  var hours = new Date().getHours();
  if (new Date().getMinutes() < 10) {
    var minutes = '0' + new Date().getMinutes();
  } else {
    var minutes = new Date().getMinutes();
  }

  $('<span>').text(username + ', ' + hours + ':' + minutes).appendTo(ul).addClass('nmdescription');

  ul.scrollTop(scrollHeight);
};

module.exports = send;
module.exports = print;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var form = $('form[name="webchat"]');
var input = $('form[name="webchat"] input');
var ul = $('form[name="webchat"] ul');
var scrollHeight = 999999;

function status(status, color) {
  $('<li>').css('background-color', color).addClass('log').text(status).appendTo(ul);
}

module.exports = status;

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use scrict';

document.getElementById('logout').onclick = function () {
  __webpack_require__.e/* require.ensure */(0).then((function (require) {
    var logout = __webpack_require__(3);
    logout();
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var form = $('form[name="webchat"]');
var input = $('form[name="webchat"] input');
var ul = $('form[name="webchat"] ul');
var scrollHeight = 999999;

var socket = io('', {
  'reconnectionAttempts': 30,
  'reconnectionDelay': 500
});

var websockets = __webpack_require__(1);
websockets();

/***/ })
/******/ ]);