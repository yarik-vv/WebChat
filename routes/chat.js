const express = require('express');
const router = express.Router();
const checkAuth = require('middleware/checkAuth');

//check user authorization
router.use('/', checkAuth);

//get to chat page
router.get('/', (req, res, next) => {
  res.render('chat', {title: 'Travelchat'});
});

module.exports = router;