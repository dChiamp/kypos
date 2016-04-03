var User = require('../models/users')
var auth = require('../resources/auth');

var authController = {
  signUp: function (req, res) {
    User.findOne({ email: req.body.email }, function (err, existingUser) {
      if (existingUser) {
        return res.status(409).send({ message: 'Email is already taken.' });
      }
      var user = new User({
        displayName: req.body.displayName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      user.save(function (err, result) {
        if (err) {
          res.status(500).send({ message: err.message });
        }
        res.send({ token: auth.createJWT(result) });
      });
    });
  },
  login: function (req, res ) {
    User.findOne({ email: req.body.email }, '+password', function (err, user) {
      if (!user) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ message: 'Invalid email or password.' });
        }
        res.send({ token: auth.createJWT(user) });
      });
    });
  }
}

module.exports = authController