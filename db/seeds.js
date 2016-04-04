mongoose = require('mongoose'),
  conn = mongoose.connect('mongodb://localhost/kypos')
  Garden = require('../models/gardens.js')

Garden.remove({}, function(err) {
  if (err) console.log('ERROR:', err)
})

var gardens = [
  {
  markedOn: "" ,
  address: " 321 market st",
  name: "mystikos kypos",
  description: "a very special secret place",
  coords: {
      latitude: 37.813869426495536,
      longitude: -122.27572917938232,
      id: 0
    }
  },
  {
  markedOn: "",
  address: "123 main st",
  name: "The Garden of the Hesperides",
  description: "Beware of the golden apples",
  coords: {
      latitude: 37.791472830809646,
      longitude: -122.39846706390381,
      id: 1
    }
  }
]

Garden.create(gardens, function(err, data){
  err ? console.log(err) : console.log("created:", data);
  mongoose.connection.close();
})
