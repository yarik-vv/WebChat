var express = require('express');
var router = express.Router();
const User = require('models/user').User;
const ObjectID = require('mongodb').ObjectID;
const HttpError = require('error').HttpError;
const checkAdmin = require('middleware/checkAdmin');
const log = require('libs/log')(module);


//check admin authorization
//router.use('/', checkAdmin);

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if(err){ 
      return next(err);
    }
    res.render('users', {users: users});
  });
});

router.get('/:id', function(req, res, next) {
  if(!req.params.id) return next();
  try {
    let id = new ObjectID(req.params.id);
    User.findById(id, (err, user) => {
      if(err || !user){ 
        return next(err);
      }
      res.render('user', {user: user});
    });
  }catch(e) {
    next(new HttpError(404, 'Netu takogo usera'));
  }
});

router.post('/', function(req, res, next){
  log.info('router users prinal POST zapros');
  log.info(req.body.id);

  const id = req.body.id;
  log.info('id tuta nax'+id);

  User.removeUser(id)
    .then(
      result => {
        log.info('resolve');
        res.send({});
      },
      error => {
        log.info('reject');
        next(new HttpError(500, 'ne vishlo udalit etogo uzera'));
      }
    );
});

module.exports = router;
