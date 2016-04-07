var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var auth = require('../resources/auth');

var gardensController = require('../controllers/gardensController');
var usersController = require('../controllers/usersController');
var authController = require('../controllers/authController');
var geocoderController = require('../controllers/geocoderController');
var postsController = require('../controllers/postsController');

//  garden crud api
router.route('/api/gardens')
  .get(gardensController.gardensIndex)
  .post(gardensController.newGarden)

router.route('/api/gardens/:id')
  .get(gardensController.showGarden)
  // .post(gardensController.markGarden) //CREATE
  .post(geocoderController.geocodeAddress)
  .put(gardensController.editGarden) //update 
  .delete(gardensController.deleteGarden)

// JOIN garden route:
router.route('/api/gardens/:gardenId/users/:userId')
  .put(gardensController.joinGarden);

// user's garden
router.route('/api/users/:userId/gardens') 
  // .post(gardensController.postGarden)
    .post(gardensController.geocodeAndPost)

// user profile show page
router.route('/api/profile/:id')
  // .get(auth.ensureAuthenticated, usersController.getUserInfo);
  .get(usersController.getUserInfo);

// geocoder
// router.route('/api/garden/create')
//   .post(geocoderController.geocodeAddress)

// user jwt auth
router.route('/api/users/profile')
  .get(auth.ensureAuthenticated, usersController.showProfile)
  .put(auth.ensureAuthenticated, usersController.editProfile)

//Auth routes
router.route('/auth/signup')
  .post(authController.signUp)

router.route('/auth/login')
  .post(authController.login)

//  post crud api
router.route('/api/posts')
  .get(postsController.postIndex)

router.route('/api/posts/:gardenId')
  .post(postsController.newPost)
  // .get(postsController.showPost)
  // .put(postsController.editPost) //update 
router.route('/api/posts/:id')
  .delete(postsController.deletePost)

module.exports = router;