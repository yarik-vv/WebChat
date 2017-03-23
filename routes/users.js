var express = require('express');
var router = express.Router();
const User = require('../models/user').User;
const ObjectID = require('mongodb').ObjectID;
const HttpError = require('../error').HttpError;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) 
      return next(err);
    res.json(users);
  });
});

router.get('/:id', function(req, res, next) {
  if(!req.params.id) return next();
  try {
    let id = new ObjectID(req.params.id);
    User.findById(id, (err, user) => {
      if(err || !user) 
        return next(err);
      res.json(user);
    });
  } catch(e) {
    next(new HttpError(404, 'Netu takogo usera'));
  }
})

module.exports = router;