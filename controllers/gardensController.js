var Garden = require('../models/gardens')

var gardensController = {
  gardensIndex: function (req, res) {
    Garden.find({}, function (err, allGardens){
      err ? console.log(err) : res.json(allGardens);
    })
  },
  showGarden: function(req,res) {
    var id = req.params.id;
    Garden.findById({_id: id}, function(err, data) {
      err ? console.log(err) : res.json(data);
    })
  },
  markGarden: function (req, res) {
    var address = req.body.address;
    var description = req.body.description;
    // need lat and long from map
    // can i do this? 
    var coords = {latitidude: req.body.latitidude, 
                  longitude: req.body.longitude };

    Garden.create({ description: description, description: address, coords: coords}, 
    function(err, newGarden) { 
      err ? console.log(err) : res.json(newGarden);
    })
  },
  newGarden: function (req, res) {
    var address = req.body.address;
    var description = req.body.description;
    // need lat and long from map
    // can i do this? 
    // var coords = {latitidude: req.body.latitidude, 
    //               longitude: req.body.longitude };

    Garden.create({ description: description, address: address}, 
    function(err, newGarden) { 
      err ? console.log(err) : res.json(newGarden);
    })
  },
  editGarden: function (req, res) {
    console.log("server garden id: ", id)
    var id = req.params.id;
    var address = req.body.address;
    var description = req.body.description;
    var name = req.body.name;
    // user should NOT be able to edit hazard location
    Garden.findById({_id: id}, function(err, garden) {
      // err ? cosnole.log(err) : res.json(garden)
      console.log(err)
      if (address) garden.address = address;
      if (description) garden.description = description;
      if (name) garden.name = name;
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
  }
}

module.exports = gardensController