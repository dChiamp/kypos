var User = require('../models/users')

var usersController = {
  showProfile: function (req, res) {
    User.findById(req.user, function (err, user) {
      // res.send(user.populate('posts'));
      console.log(user)
      res.send(user);
    })
  },
  editProfile: function(req, res) {
    User.findById(req.user, function (err, user) {
      if (!user) {
        return res.status(400).send({ message: 'User not found.' });
      }
      user.displayName = req.body.displayName || user.displayName;
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.save(function(err) {
        res.send(user.populate('posts'));
      });
    });
  }
}

module.exports = usersController