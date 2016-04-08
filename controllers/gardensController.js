var Garden = require('../models/gardens')
var User = require('../models/users')
var geocoder = require('geocoder');

var gardensController = {
  gardensIndex: function (req, res) {
    Garden.find({}, function (err, allGardens){
      err ? console.log(err) : res.json(allGardens);
    })
  },
  showGarden: function(req,res) {
    var id = req.params.id;
    Garden.findById({_id: id})
      .populate("gardeners")
      .exec(function(err, data) {
        err ? console.log(err) : res.json(data);
        // populate
    })
  },
  markGarden: function (req, res) {
    var address = req.body.address;
    var description = req.body.description;
    // need lat and long from map
    // can i do this? 
    var coords = {latitude: req.body.latitude, 
                  longitude: req.body.longitude };

    Garden.create({ description: description, description: address, coords: coords}, 
    function(err, newGarden) { 
      err ? console.log(err) : res.json(newGarden);
    })
  },
  newGarden: function (req, res) {
    console.log("marker req.body:", req.body)
    var name = req.body.name
    var address = req.body.address;
    var description = req.body.description;

    var coords = req.body.coords;

    Garden.create({name: name, address: address, description: description, coords: coords}, 
    function(err, newGarden) { 
      console.log(newGarden)
      err ? console.log(err) : res.json(newGarden);
    })
  },
  editGarden: function (req, res) {
    console.log("server garden req.body: ", req.body)
    var id = req.params.id;
    var address = req.body.address;
    var description = req.body.description;
    var name = req.body.name;

    // also get user if there
    // var userId = "5701a8096b81ee265ef564c9"
    // var userId = req.body._id
    var userId = req.body

    // user should NOT be able to edit hazard location
    Garden.findById({_id: id}, function(err, garden) {
      // err ? console.log(err) : res.json(garden)
      console.log(err)
      if (address) garden.address = address;
      if (description) garden.description = description;
      if (name) garden.name = name;
      // push userId to gardeners array?
      if (userId) { garden.gardeners.push(userId) } ;

      //  if (userId) {
      //   if (garden.gardeners.indexOf(userId) === -1 ) {
      //   // push user id to user.fav
      //   garden.gardeners.push(userId);
      //   }
      // }

      garden.save(function(err, data){
        err ? console.log(err) : res.json(data)
        console.log("server side garden update info: ", data);
      });
    });
  },
  deleteGarden: function (req, res) {
    var id  = req.params.id;
    Garden.remove({_id: id}, function(err, data){
      err ? console.log(err) : res.json(data);
    })
  },
  joinGarden: function (req, res) {
    var gardenId = req.params.gardenId;
    var userId = req.params.userId
    // console.log("user id at server from view:", req.body)

    // var userId = req.body
    Garden.findById({_id: gardenId}, function(err, garden) {

      if (userId) {
        if (garden.gardeners.indexOf(userId) === -1 ) {
        // push user id to user.fav
          garden.gardeners.push(userId);
     
          garden.save(function(err, data){
            err ? console.log(err) : res.send(data)
            console.log("server side garden update info: ", data);
          });
        }
      }
    });

  },
  unjoinGarden: function(req,res) {
    var gardenId = req.params.gardenId;
    var userId = req.params.userId

    Garden.findById({_id: gardenId}, function(req, garden){
      console.log("Gardens: ", garden.gardeners)
      // find user id in gardeners array, and splice it
      var index = garden.gardeners.splice(index, 1);
      console.log(garden.gardeners)
      // update
      garden.save(function(err,data){
        console.log("user removed")
      })
    })
  },
  geocodeAndPost: function (req, res) {
    console.log("geocodeAndPost HITT")
    
    var userId = req.params.userId
    var name = req.body.name
    var description = req.body.description;
    var addy = req.body.address

    // geocode address
    if(addy !== null) {
      geocoder.geocode(addy, function ( err, data ) {
        console.log("results ARRAYYYYYYY:", data.results[0].geometry.location.lng)
        var lat = data.results[0].geometry.location.lat
        var long = data.results[0].geometry.location.lng

        var coords = {latitude: lat,
                      longitude: long,
                      id: Date.now() }

        // create garden with geocoded addy
        Garden.create({name: name, address: addy, description: description, coords: coords}, 
          function(err, newGarden) { 
            // err ? console.log(err) : res.json(newGarden);
            console.log("new garden: ", newGarden)
            console.log(err)

            // get new garden id
            var newGardenId = newGarden._id
            console.log("newGardenId:", newGarden._id)

            // find User and update 
            User.findById({_id: userId}, function(err, user){
              console.log("user:", user)
              console.log("user gardens:", user.gardens)
              // push new garden id to user's garden array
              user.gardens.push(newGardenId)

              user.save(function(err) {
                res.send(user.populate('gardens'));
              });
            })
        })
      })
    }
  }
  
}

module.exports = gardensController