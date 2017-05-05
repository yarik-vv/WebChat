const HttpError = require('error').HttpError;
const log = require('libs/log')(module);

module.exports = (req, res, next) => {
  if (!req.session.user) {
    log.warn('Neavtorizovaniy user pitalsa zayti v chat!');
    return next(new HttpError(401, "you are not authorized to view this page!"));
  }
  next();
};
