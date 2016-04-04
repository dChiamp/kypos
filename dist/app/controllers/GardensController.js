app.controller('GardensController', GardensController)

GardensController.$inject = ['$scope', '$http', '$stateParams'];

function GardensController ($scope, $http, $stateParams) {
  var vm = this;
  vm.all = [];
  console.log("whos on scope: ", vm.all)

  vm.newGarden = {};
  vm.getGardens = getGardens;
  vm.getGarden = getGarden;
  vm.addGarden = addGarden;
  vm.deleteGarden = deleteGarden;
  vm.updateGarden = updateGarden;

  getGardens();

  function getGardens() {
    $http
      .get('/api/gardens')
      .then(function(response) {
        console.log("getGardens: ", response.data)
        vm.all = response.data;
      })
  }

  function getGarden (garden) {
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

  function addGarden() {
    $http
      .post('/api/gardens', vm.newGarden)
      .then(function(response) {
        console.log("new garden:", response.data)
        vm.all.push(response.data)
      })
      vm.newGarden = {}
  }

  function deleteGarden(garden) {
    $http
      .delete('/api/gardens/' + garden._id)
      .then(function(response) {
        console.log("deleted: ", response.data);
        var index = vm.all.indexOf(garden);
        vm.all.splice(index, 1);
      })
  }

    function updateGarden(garden) {
    console.log("after click on update: ", garden)
      $http
        .put('/api/gardens/' + garden._id)
        .then(function (response) {
            // vm.garden = response.data;
            console.log(response.data)
        })
  }

  console.log("garden cntrl")

}