var User = require('models/user').User;
const HttpError = require('error').HttpError;

module.exports = function(req, res, next) {
  if (!req.session.user) {
    return next(new HttpError(401, "you are not authorized to view this page!"));
  }
  User.findById(req.session.user, function(err, user) {
    if(user.username=='admin'){
      console.log('Admin v zdanii');
    }
    else{
      return next(new HttpError(401, "you are not authorized to view this page!"));
    };
    if(err) return next(err);
    next();
  });
};
