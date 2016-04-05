app.controller('GardensController', GardensController);

GardensController.$inject = ['$scope', '$http', '$stateParams', 'Account'];

function GardensController ($scope, $http, $stateParams, Account) {
  var vm = this;
  vm.all = [];
  console.log("whos on scope: ", vm.all)

  vm.newGarden = {};
  vm.getGardens = getGardens;
  vm.getGarden = getGarden;
  vm.addGarden = addGarden;
  vm.deleteGarden = deleteGarden;
  vm.updateGarden = updateGarden;
  vm.joinGarden = joinGarden;
  vm.decodeJwtAndJoinGarden = decodeJwtAndJoinGarden;

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
        console.log("show garden: ", response.data);
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
// something is up with this shit
  function updateGarden(garden) {
    console.log("after click on update: ", garden)
      $http
        .put('/api/gardens/' + garden._id, garden)
        .then(function (response) {
            // vm.garden = response.data;
            console.log("update response from server: ", response.data)
        })
  }
  // needs to update garden with user id
  // get gardenId from click
  // or get id from uri 
  function joinGarden(garden) {
    console.log("gardenId: ", garden._id)
    // get user id. this fnc return user id
    // prob needs a promise
    var userId = Account.getUserIdFromJwt()
    //   .then( 
    //     function onSuccess(response) {
    //     console.log("userID:", response)
    //     return response.data._id;
    // })
    console.log(userId);
    // then send req w/ both userid and garden to server
    // need to pass userObj in here
    $http
    // .put('/api/join/gardens/' + garden._id, garden)
      .put('/api/gardens/' + garden._id, garden)
      .then(function(response) {
        console.log("join res from server:", response.data)
      })
    // push user id to gardeners array (server side)
  }

  function decodeJwtAndJoinGarden (garden) {
    var payload = window.localStorage.satellizer_token;
    payload = payload.split('.')[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload);
    console.log("useriD:", payload.sub);
    var userId = payload.sub
    // need to pass userObj in here
    $http
    .put('/api/gardens/' + garden._id + '/users/' + userId)
      // .put('/api/gardens/' + garden._id, garden)
      .then(function(response) {
        console.log("join res from server:", response.data)
      })
    // push user id to gardeners array (server side)
    // return payload;
 };
  console.log("garden cntrl")
}