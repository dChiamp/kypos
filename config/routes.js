var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var auth = require('../resources/auth');

var gardensController = require('../controllers/gardensController');
var usersController = require('../controllers/usersController');
var authController = require('../controllers/authController');

//  garden crud api
router.route('/api/gardens')
  .get(gardensController.gardensIndex)
  .post(gardensController.newGarden)

router.route('/api/gardens/:id')
  .get(gardensController.showGarden)
  .post(gardensController.markGarden) //CREATE
  .put(gardensController.editGarden) //update 
  .delete(gardensController.deleteGarden)

// user jwt auth
router.route('/api/users/profile')
  .get(auth.ensureAuthenticated, usersController.showProfile)
  .put(auth.ensureAuthenticated, usersController.editProfile)

//Auth routes
router.route('/auth/signup')
  .post(authController.signUp)

router.route('/auth/login')
  .post(authController.login)

module.exports = router;