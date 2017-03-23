var User = require('./models/user').User;

var user = new User({
  username: "admin1",
  password: "admin"
});

user.save(function(err, user, affected) {
  if (err) throw err;

  User.findOne({username: "admin"}, function(err, tester) {
    console.log(tester);
  });
});