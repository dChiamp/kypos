mongoose = require('mongoose'),
  conn = mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/kypos'),
  Garden = require('../models/gardens.js'),
  Post = require('../models/posts.js');

Post.remove({}, function(err) {
  if (err) console.log('ERROR:', err)
})

Garden.remove({}, function(err) {
  if (err) console.log('ERROR:', err)
})

var gardens = [
  {
  joinDate: "" ,
  address: " 321 market st",
  name: "mystikos kypos",
  description: "a very special secret place",
  picture: "http://greengopost.com/wp-content/uploads/2012/08/cadillac-urban-gardens-3-512x320.png",
  schedule: "Saturday: 12pm - 4pm",
  gardeners: ["5701a8096b81ee265ef564c9"],
  coords: {
      latitude: 37.801472830809646,
      longitude: -122.40846706390381,
      id: 1
    }
  },
  {
  joinDate: "",
  address: "123 main st",
  name: "The Garden of the Hesperides",
  description: "Beware of the golden apples",
  picture: "https://upload.wikimedia.org/wikipedia/commons/b/b3/North_view_of_a_Chicago_urban_garden.jpg",
  schedule: "Sunday: 10am - 2pm",
  coords: {
      latitude: 37.791472830809646,
      longitude: -122.39846706390381,
      id: 2
    }
  }
]

Garden.create(gardens, function(err, data){
  err ? console.log(err) : console.log("created:", data);
  mongoose.connection.close();
})
