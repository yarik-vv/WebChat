const config = require('config');
const HttpError = require('error').HttpError;
const sessionStore  = require('libs/sessionStore');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const User = require('models/user').User;
const log = require('libs/log')(module);

const loadUser = (session) => {
  return new Promise((resolve, reject) => {
    if (!session.user) {
      log.debug("Session %s is anonymous", session.id);
      reject();
    }
    log.debug("Retrieving user: " + session.user);

    User.findById(session.user).exec((err, user) => {
      if (err) return reject(err);
      if (!user) reject();
      resolve(user);
    });
  });
};

const checkAuth = (handshake, callback) => {
  handshake.cookies = cookie.parse(handshake.headers.cookie || '');
  const sidCookie = handshake.cookies[config.get('session:key')];
  const sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));
  log.debug('Sid: ' + sid);

  sessionStore.get(sid, (err, session) => {
    log.debug('Session: ', session);

    if(!session) {
      callback(new HttpError(401, "No session"));
    }

    handshake.session = session;
    handshake.session.sid = sid;

    loadUser(session)
    .then((user) => {
      handshake.user = user;
      callback(null, true);
    })
    .catch((err) => {
      if(err) {
        callback(err);
        return;
      }
      callback(new HttpError(403, "Anonymous session may not connect"));
    });
  });
};

const socket = (server) => {
  const io = require('socket.io')(server, {
    'origins': ['yarik-vv.herokuapp.com:*', '127.0.0.1:*', 'localhost:*']
  });
  
  io.use((socket, next) => {
    checkAuth(socket.handshake, (err, success) => {
      if (success) return next();
      next(new HttpError(403, "Anonymous session may not connect"));
    });
  });

  io.on('sessreload', (sid) => {
    log.debug('Session reload: ' + sid);

    io.sockets.clients((err, clients) => {
      if (err) throw err;

      clients.forEach(function(clientId) {
        const client = io.sockets.sockets[clientId];

        if (client.handshake.session.sid != sid) return;

        sessionStore.get(sid, (err, session) => {
          if (err) {
            client.emit("error", "server error");
            client.disconnect();
            return;
          }

          if (!session) {
            client.emit("logout");
            client.disconnect();
            return;
          }

          client.handshake.session = session;
        });
      });
    });
  });

  io.on('connection', (socket) => {
    const username = socket.handshake.user.get('username');
    log.debug(username + ' - connected to websocket');
    
    socket.broadcast.emit('join', username);
    log.debug(username + ' - joined the chat');

    socket.on('message', (text, callback) => {
      log.debug(username + ' - send message');
      socket.broadcast.emit('message', username, text);
      callback && callback(text);
    });

    socket.on('disconnect', () => {
      log.debug(username + ' - leave the chat');
      socket.broadcast.emit('leave', username);
    });
  });

  return io;
};

module.exports = socket;