const config = require('../config');
const HttpError = require('../error').HttpError;
const sessionStore  = require('../libs/sessionStore');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const User = require('../models/user').User;
const log = require('../libs/log')(module);

const socket = (server) => {
  const io = require('socket.io')(server, {
    'origins': ['127.0.0.1:*', 'localhost:*']
  });
  
  io.on('connection', (socket) => {
    log.debug('connected websocket');
    
    socket.on('message', (text, callback) => {
      socket.broadcast.emit('message', text);
      callback && callback(text);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('leave');
      log.debug('disconnect websocket');
    });
  });

  return io;
};

module.exports = socket;