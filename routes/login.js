'use strict';
var express = require('express');
var router = express.Router();
const User = require('../models/user').User;

const log = require('../libs/log')(module);
// get login page
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Sign in webchat'});
});

router.post('/', function(req, res, next){
   log.info('prinato');
   const username = req.body.username;
   const password = req.body.password;

   User.authorize(username, password)
     .then((user) => {
       req.session.user = user._id;
       res.send({});
     })
     .catch((err) => {
       console.log(err);
       next(err);
     });
 });

module.exports = router;
