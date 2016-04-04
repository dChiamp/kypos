app.controller('ShowController', ShowController);

ShowController.$inject = ['$scope', '$http', '$stateParams'];

function ShowController($scope, $http, $stateParams) {
  $scope.getGarden = function(garden) {

    var currentId = $stateParams.id;
    console.log(currentId)
    $http
      .get('/api/gardens/' + currentId)
      .then(function(response) {
        console.log("garden: ", response.data);
        // inject vm 
        // vm.all = response.data;
        $scope.garden = response.data
    })
  }

}