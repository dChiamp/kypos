app.controller('MapController', MapController);

MapController.$inject = ['$http', '$scope', 'geolocation', '$q']

function MapController ($http, $scope, geolocation, $q) {

  var vm = this;
  vm.all = [];

  vm.getGardens = getGardens;

  getGardens();

// problem is map is rendering before pins can
  // $scope.map = vm.all
  function getGardens() {
    // create promise
    $http
      .get('/api/gardens')
      .then(function(response) {
        console.log("all gardens: ", response.data);
        // vm.all = response.data;
        // vm.all.push(response.data);
        $scope.marker = response.data;
        // resolve promise
      })
  }
  // $scope.map = { center: { latitude: 37.7904602, longitude: -122.4006261 }, zoom: 15 };

  // need to bind the marker data from db to $scope
  // map is rendering before this is executed 
  $scope.markers = vm.all;
  console.log($scope.markers)

  function addGardenFromMap (marker) {
    $http
      .post('/api/gardens', marker)
      .then(function(response) {
        console.log("new marker:", marker)
        $scope.map.markers.push(marker)
      })
  };



  geolocation.getLocation().then(function(data){
    $scope.coords = {latitude:data.coords.latitude, longitude:data.coords.longitude};
    // var mapCenter = $scope.coords
    console.log($scope.coords)
    // return mapCenter;
  // })


    angular.extend($scope, {
        map: {
            // center: {
            //     latitude: 37.787248,
            //     longitude: -122.401
            // },
            center: $scope.coords, 
            zoom: 16,
            markers: [],
            events: {
            click: function (map, eventName, originalEventArgs) {
              var e = originalEventArgs[0];
              var lat = e.latLng.lat(), 
                  lon = e.latLng.lng();
              var marker = {
                  id: Date.now(),
                  hazard: "pothole",
                  address: "",
                  notes: "",
                  coords: {
                      latitude: lat,
                      longitude: lon
                    }
                  };
              // dont need to push to array anymore bc its saving in db
              // $scope.map.markers.push(marker);
              console.log("marker:", map.markers)
              console.log("markers: ", $scope.map.markers);
              // what is this apply doing?
              $scope.$apply();
              // add marker to db
              // addHazardFromMap(marker);
            }

          }
          
        }
    });

  })

    
  $scope.windowOptions = {visible: false};

  $scope.onClick = function() {
    $scope.windowOptions.visible = !$scope.windowOptions.visible;
  }

  $scope.title = "window title!"

  console.log("maps controller loaded");

};

