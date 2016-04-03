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
    var descritption = req.body.descritption;
    // need lat and long from map
    // can i do this? 
    var coords = {latitidude: req.body.latitidude, 
                  longitude: req.body.longitude };

    Garden.create({ descritption: descritption, descritption: address, coords: coords}, 
    function(err, newGarden) { 
      err ? console.log(err) : res.json(newGarden);
    })
  },
  newGarden: function (req, res) {
    var address = req.body.address;
    var descritption = req.body.descritption;
    // need lat and long from map
    // can i do this? 
    // var coords = {latitidude: req.body.latitidude, 
    //               longitude: req.body.longitude };

    Garden.create({ descritption: descritption, address: address}, 
    function(err, newGarden) { 
      err ? console.log(err) : res.json(newGarden);
    })
  },
  editGarden: function (req, res) {
    var id = req.params.id;
    var address = req.body.address;
    var descritption = req.body.descritption;
    // user should NOT be able to edit hazard location
    Garden.findById({_id: id}, function(err, garden) {
      err ? cosnole.log(err) : res.json(garden)
      if (address) garden.address = address;
      if (descritption) garden.descritption = descritption;
      garden.save(function(err, data){
        err ? console.log(err) : res.json(data)
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