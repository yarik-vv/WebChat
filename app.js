//default
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

//custom
const config = require('config');
const HttpError = require('error').HttpError;
const session = require('express-session');
const sessionStore = require('libs/sessionStore');
const http = require('http');
const log = require('libs/log')(module);

//router
const login = require('routes/login');
const chat = require('routes/chat');
const logout = require('routes/logout');
const users = require('routes/users');
const error = require('routes/error');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//load favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// standart loger
if(app.get('env')=='development') {
  app.use(logger('dev'));
} 
else{
  app.use(logger('tiny'));
}

//body razbitaet zaprosu get/post i parsit
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookie parsit zagolovok
app.use(cookieParser());

//sesion
app.use(session({
  secret: config.get('session:secret'),
  resave: false,
  saveUninitialized: true,
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: sessionStore
}));

//bublic path
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));

//router
app.use('/', login);
app.use('/travelchat', chat);
app.use('/logout', logout);
app.use('/users', users);
//if invalid url
app.use('/*', error);


// error handler
app.use(function(err, req, res, next) {
  if (typeof err=='number'){
    err=new HttpError(err);
  }
  if(err instanceof HttpError){
    res.sendHttpError(err);
  } 
  else {
    if(app.get('env')=='development'){
      app.use(errorHandler(err, req, res, next));
    }
    else{
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

//created http server
var server = http.createServer(app);
server.listen((process.env.PORT || 5000), function(){
  log.info('Server listening on http://127.0.0.1:'+(process.env.PORT || 5000));
});

//websockets
const io = require('socket')(server);
app.set('io', io);

//exports module for tests
if(process.env.NODE_ENV == 'test'){
  module.exports = app;
}