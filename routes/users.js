const express = require('express');
const router = express.Router();
const User = require('models/user').User;
const ObjectID = require('mongodb').ObjectID;
const HttpError = require('error').HttpError;
const checkAdmin = require('middleware/checkAdmin');
const log = require('libs/log')(module);


// check permission
router.use('/', checkAdmin);

// get to users list
router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if(err){ 
      return next(err);
    }
    res.render('users', {users: users});
  });
});

// get to selected user
router.get('/:id', (req, res, next) => {
  if(!req.params.id) return next();
  try {
    let id = new ObjectID(req.params.id);
    User.findById(id, (err, user) => {
      if(err || !user){ 
        return next(err);
      }
      res.render('user', {user: user});
    });
  }
  catch(e) {
    log.error('Popitka uvedet danie neizvestnogo usera');
    next(new HttpError(404, 'Netu takogo usera'));
  }
});

// post request to delete selected user
router.post('/', (req, res, next) => {
  log.debug('prinato post zapros s USERS page');
  const id = req.body.id;

  User.removeUser(id)
    .then(
      result => {
        res.send({});
      },
      error => {
        next(new HttpError(500, 'ne vishlo udalit etogo uzera'));
      }
    );
});

module.exports = router;