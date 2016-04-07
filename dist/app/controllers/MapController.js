app.controller('MapController', MapController);

MapController.$inject = ['$http', '$scope', 'geolocation', '$q']

function MapController ($http, $scope, geolocation, $q) {

  var vm = this;
  vm.all = [];
  $scope.gardenMarkersObj = [];

  vm.getGardens = getGardens;

  getGardens();

// problem is map is rendering before pins can
  function getGardens() {
    // create promise
    $http
      .get('/api/gardens')
      .then(function(response) {
        for (i=0; i < response.data.length; i++) {
          var markerObj = response.data[i]
          var markerNames = response.data[i].name
          $scope.gardenMarkersObj.push(response.data[i]);
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
      angular.extend($scope, {
        map: {
          center: $scope.coords, 
          zoom: 15,
          markers: []
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

