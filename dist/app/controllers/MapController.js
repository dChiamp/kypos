app.controller('MapController', MapController);

MapController.$inject = ['$http', '$scope', 'geolocation', '$q']

function MapController ($http, $scope, geolocation, $q) {

  var vm = this;
  vm.all = [];
  $scope.gardenMarkersCoords = [];
  $scope.gardenMarkersObj = [];


   var ret = [{
                latitude: 37.801472830809644,
                longitude: -122.40846706390381,
                title: 'test',
                id: 4,
                show: false
            }];
  $scope.test = ret

  vm.getGardens = getGardens;

  getGardens();

// problem is map is rendering before pins can
  // $scope.map = vm.all
  function getGardens() {
    // create promise
    $http
      .get('/api/gardens')
      .then(function(response) {
        // console.log("all gardens: ", response.data);
        for (i=0; i < response.data.length; i++) {
          // vm.all = response.data;
          var markerObj = response.data[i]
          var markerNames = response.data[i].name
          var markerCoords = response.data[i].coords
          // $scope.gardenMarkersCoords.push(response.data[i].coords);
          $scope.gardenMarkersCoords.push(markerCoords);
          $scope.gardenMarkersObj.push(response.data[i]);
          // console.log("gardenMarkerName", markerNames)
          // console.log("gardenMarkerCoords", markerObj.coords)
        }
          console.log("gardenmarkercoords:", $scope.gardenMarkersCoords)
          // console.log("gardenMarkerOBBBBJJJJ: ", $scope.gardenMarkersObj)
          // console.log('gardenMarkerCoordsArrayy:', $scope.gardenMarkersCoords);
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

