app.controller('GardensController', GardensController);

// GardensController.$inject = ['$scope', '$http', '$stateParams'];

function GardensController ($scope, $http) {
  var vm = this;
  vm.all = [];
  console.log("whos on scope: ", vm.all)

  vm.newGarden = {};
  vm.getGardens = getGardens;
  // vm.getGarden = getGarden;
  // vm.addGarden = addGarden;
  // vm.deleteGarden = deleteGarden;

  getGardens();

  function getGardens() {
    $http
      .get('/api/gardens')
      .then(function(response) {
        console.log("getGardens: ", response.data)
        vm.all = response.data;
      })
  }


  console.log("garden cntrl")

}