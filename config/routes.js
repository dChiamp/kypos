var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var gardensController = require('../controllers/gardensController');

//  garden crud api
router.route('/api/gardens')
  .get(gardensController.gardensIndex)
  .post(gardensController.newGarden)

router.route('/api/gardens/:id')
  .get(gardensController.showGarden)
  .post(gardensController.markGarden) //CREATE
  .put(gardensController.editGarden)
  .delete(gardensController.deleteGarden)

module.exports = router;