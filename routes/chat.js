var express = require('express');
var router = express.Router();
const checkAuth = require('middleware/checkAuth');

//check authorization
router.use('/', checkAuth);

//get to chat page
router.get('/', function(req, res, next) {
  res.render('chat', {title: 'Travelchat'});
});

module.exports = router;
