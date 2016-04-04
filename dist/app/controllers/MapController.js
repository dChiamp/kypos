app.controller('MapController', MapController);

MapController.$inject = ['$http', '$scope', 'geolocation', '$q']

function MapController ($http, $scope, geolocation, $q) {

  var vm = this;
  vm.all = [];
  $scope.gardenMarkersCoords = [];

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
        for (i=0; i < response.data.length; i++) {
          $scope.gardenMarkersCoords.push(response.data[i].coords);
          console.log('gardenMarkerCoordsArrayy:', $scope.gardenMarkersCoords);
        }
      })
  }


  function addGardenFromMap (marker) {
    $http
      .post('/api/gardens', marker)
      .then(function(response) {
        console.log("new marker:", marker)
      })
  };

  geolocation.getLocation().then(function(data){
    $scope.coords = {latitude:data.coords.latitude, longitude:data.coords.longitude};
    // var mapCenter = $scope.coords
    // console.log($scope.coords)
    // return mapCenter;
    // $scope.map = { center: $scope.coords,
    //                zoom: 16 };
    // return $scope.coords;
  // })


            angular.extend($scope, {
              map: {
                  // center: {
                  //     latitude: 37.787248,
                  //     longitude: -122.401
                  // },
                  center: $scope.coords, 
                  zoom: 15,
                  markers: [],
                  events: {
                  click: function (map, eventName, originalEventArgs) {
                    var e = originalEventArgs[0];
                    var lat = e.latLng.lat(), 
                        lon = e.latLng.lng();
                    var marker = {
                        id: Date.now(),
                        address: "",
                        name: "",
                        description: "",
                        coords: {
                            latitude: lat,
                            longitude: lon,
                            id: Date.now()
                          }
                        };
                    // dont need to push to array anymore bc its saving in db
                    $scope.map.markers.push(marker);
                    console.log("markers: ", $scope.map.markers);
                    // what is this apply doing?
                    $scope.$apply();
                    // add marker to db
                    addGardenFromMap(marker);
                  }

                }
                
              }
          });
  }); //end getLocation
    
  $scope.windowOptions = {visible: false};

  $scope.onClick = function() {
    $scope.windowOptions.visible = !$scope.windowOptions.visible;
  }

  // $scope.title = "window title!"

  console.log("maps controller loaded");

};

