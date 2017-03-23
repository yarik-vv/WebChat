var express = require('express');
var router = express.Router();

//get to webchat page
router.get('/', (req, res, next) => ({
  res.render('webchat', {title: 'webchat'});
});

module.exports = router;
