var User = require('models/user').User;
const HttpError = require('error').HttpError;

module.exports = function(req, res, next) {
  if (!req.session.user) return next();

  User.findById(req.session.user, function(err, user) {
    if(user.username=='admin'){
      console.log('admin v zdanii');
    }
    else{
      //res.redirect('/');
      console.log('admin ne v zdanii');
      return next(new HttpError(401, "Вы не авторизованы"));
    };
    if (err) return next(err);

    req.user = res.locals.user = user;
    next();
  });
};
