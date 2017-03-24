var express = require('express');
var router = express.Router();

//logout
router.post('/', (req, res, next) => {
  const sid = req.session.id;
  const io = req.app.get('io');

  req.session.destroy( (err) => {
    if(io){
      io.sockets._events.sessreload(sid);
    }
    if(err){ 
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;