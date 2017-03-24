//default
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//my
const config = require('./config');

const session = require('express-session');
const sessionStore = require('./libs/sessionStore');

const debug = require('debug')(app);
const http = require('http');
const log = require('./libs/log')(module);

//router
const login = require('./routes/login');
const webchat = require('./routes/webchat');
const users = require('./routes/users');
const logout = require('./routes/logout');

const HttpError = require('./error').HttpError;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//loger
if (app.get('env') == 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger('tiny'));
}

//body razbitaet zaprosu get/post i parsit
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookie parsit zagolovok
app.use(cookieParser());

//sesion
app.use(session({
  secret: config.get('session:secret'), // ABCDE242342342314123421.SHA256
  resave: false,
  saveUninitialized: true,
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: sessionStore
}));

//bublic path
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./middleware/sendHttpError'));

//router
app.use('/', login);
app.use('/webchat', webchat);
app.use('/users', users);
app.use('/logout', logout);

// error handler
//app.use(function(err, req, res, next) {
//  if (typeof err == 'number') { // next(404);
//    err = new HttpError(err);
//  }
//
//  if (err instanceof HttpError) {
//    res.sendHttpError(err);
//  } 
//  else {
//    if (app.get('env') == 'development') {
//      express.errorHandler()(err, req, res, next);
//    } else {
//      log.error(err);
//      err = new HttpError(500);
//      res.sendHttpError(err);
//    }
//  }
//});

var server = http.createServer(app);
server.listen(config.get('port'), function(){
  log.info('Server listening on http://127.0.0.1:' + config.get('port'));
});