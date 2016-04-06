var geocoder = require('geocoder');
var Garden = require('../models/gardens')

var geocoderController = {
  geocodeAddress: function (req, res) {
    var addy = req.body.address
    var name = req.body.name
    // var address = req.body.address;
    // var description = req.body.description;

    geocoder.geocode(addy, function ( err, data ) {
      console.log("results ARRAYYYYYYY:", data.results[0].geometry.location.lng)
      var lat = data.results[0].geometry.location.lat
      var long = data.results[0].geometry.location.lng

      var coords = {
                  latitude: lat,
                  longitude: long,
                  id: Date.now()
      }

      Garden.create({name: name, /*address: address, description: description, */ coords: coords}, 

      function(err, newGarden) { 
        console.log(newGarden)
        err ? console.log(err) : res.json(newGarden);
      })
    }); 
  }
}

module.exports = geocoderController

