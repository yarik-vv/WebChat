const express = require('express');
const router = express.Router();
const User = require('models/user').User;
const log = require('libs/log')(module);

//get to login page
router.get('/', (req, res, next) => {
  res.render('login', {title: 'Sign in to Travelchat'});
});

//post request to login page
router.post('/', (req, res, next) => {
  log.debug('prinato post zapros s LOGIN page');

  const username = req.body.username;
  const password = req.body.password;

  User.authorize(username, password)
    .then( (user) => {
      req.session.user = user._id;
      res.send({});
    })
    .catch( (err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;