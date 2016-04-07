app.controller('GardensController', GardensController);

// GardensController.$inject = ['$scope', '$http', '$stateParams', 'Account'];

function GardensController ($scope, $http, $stateParams, Account, toastr) {
  var vm = this;
  vm.all = [];
  // console.log("whos on scope: ", vm.all)

  vm.newGarden = {};
  vm.getGardens = getGardens;
  vm.getGarden = getGarden;
  vm.addGarden = addGarden;
  vm.deleteGarden = deleteGarden;
  vm.updateGarden = updateGarden;
  // vm.joinGarden = joinGarden;
  vm.decodeJwtAndJoinGarden = decodeJwtAndJoinGarden;
  vm.seeUserProfile = seeUserProfile;
  vm.postYourGarden = postYourGarden;
  vm.postYourGardenAddIdToProf = postYourGardenAddIdToProf;
  vm.doesGardenBelongToUser = doesGardenBelongToUser;
  vm.unjoinGarden = unjoinGarden;

  vm.userIdFromView = {}
  
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
    // console.log(currentId)
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
        // console.log("new garden:", response.data)
        vm.all.push(response.data)
      })
      vm.newGarden = {}
      toastr.success('Garden Added!')
  }


  function postYourGarden() {
    $http
      .post('/api/garden/create', vm.newGarden)
      .then(function(response) {
        // console.log("new garden:", response.data)
        vm.all.push(response.data)
      })
      vm.newGarden = {}
      toastr.success('Garden Added!')
  }

  function postYourGardenAddIdToProf () {

      // var userId = $stateParams.userId
      // needs to get user id form jwt

      var payload = window.localStorage.satellizer_token;
      payload = payload.split('.')[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      // console.log("useriD:", payload.sub);
      var userId = payload.sub

      $http
        .post('/api/users/' + userId + '/gardens', vm.newGarden)
        .then(function(response) {
          // console.log("new garden:", response.data)
          vm.all.push(response.data)
        })
        vm.newGarden = {}
        toastr.success('Garden Added!')
    }

  function deleteGarden(garden) {
    $http
      .delete('/api/gardens/' + garden._id)
      .then(function(response) {
        // console.log("deleted: ", response.data);
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
            // console.log("update response from server: ", response.data)
        })
  }
  // needs to update garden with user id
  // get gardenId from click
  // or get id from uri 

  /*
  function joinGarden(garden) {
    console.log("gardenId: ", garden._id)
    // get user id. this fnc return user id
    // prob needs a promise
    var userId = Account.getUserIdFromJwt()
    console.log(userId);
    // then send req w/ both userid and garden to server
    // need to pass userObj in here
    $http
    // .put('/api/join/gardens/' + garden._id, garden)
      .put('/api/gardens/' + garden._id, garden)
      .then(function(response) {
        // console.log("join res from server:", response.data)
      })
    // push user id to gardeners array (server side)
  }
  */

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

function unjoinGarden (garden) {
  var payload = window.localStorage.satellizer_token;
  payload = payload.split('.')[1];
  payload = window.atob(payload);
  payload = JSON.parse(payload);
  console.log("useriD:", payload.sub);

  var userId = payload.sub
  var gardenId = $stateParams.id
  $http
    .put('/api/users/' + userId + '/gardens/' + gardenId)
    .then(function(response){
      console.log("Gardens you are PRT OF:", response)
    })
}

 function seeUserProfile (userId) {
  console.log(userId);
  $http
    .get('/api/users/' + userId)
    .then(function(response) {
        console.log("join res from server:", response.data)
    })

 }

  // $scope.isEditable = false;

  function doesGardenBelongToUser() {
    // console.log("does this garden beleong to me?")
    // get garden id
    var gardenId = $stateParams.id
    // get user id from jwt

    // make as a helper function
    var payload = window.localStorage.satellizer_token;
    payload = payload.split('.')[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload);
    var userId = payload.sub
    console.log("useriD:", payload.sub);
    
    $scope.isEditable = false;

    $http
      .get('/api/profile/' + userId)
      .then(function(response) {
        // what if user has no gardens?
        console.log("users gardens: ", response.data.gardens[0]._id)
        // render json from server
        for (var i = 0; i < response.data.gardens.length; i++ ) {
          console.log("searching through your gardens")

          var usersGardens = response.data.gardens[i]._id

          // if garden id is in user's gardens
          if (usersGardens.indexOf(gardenId) !== -1 ) {
            // then do allow user to edit
            console.log("yes, garden belongs to user")
            $scope.isEditable = true;
          }
        }
          
      })
    
  }




  console.log("garden cntrl")
}