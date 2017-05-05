const express = require('express');
const router = express.Router();
const User = require('models/user').User;
const log = require('libs/log')(module);

//get to login page
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Sign in to Travelchat'});
});

router.post('/', function(req, res, next){
  log.info('router prinal POST zapros');
  //log.info(req);
  const username = req.body.username;
  const password = req.body.password;

//  log.info(req.body);
//  log.info(req.body.username);
//  log.info(req.body.password);
//  var kek= typeof password;
//  log.info(kek);

  User.authorize(username, password)
    .then( (user) => {
      req.session.user = user._id;
      //res.redirect('/webchat');
      //res.sendStatus(200);
      res.send({});
    })
    .catch( (err) => {
      //res.sendStatus(403);
      //res.send(JSON.stringify(err));
      //res.redirect('/');
      console.log(err);
      next(err);
    });
});

module.exports = router;
