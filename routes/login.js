var express = require('express');
var router = express.Router();

// get login page
router.get('/', (req, res, next) => ({
  res.render('login', { title: 'Sign in webchat'});
});

module.exports = router;
