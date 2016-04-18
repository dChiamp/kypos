app.controller('GardensController', GardensController);

// GardensController.$inject = ['$scope', '$http', '$stateParams', 'Account'];

function GardensController ($scope, $http, $stateParams, Account, toastr, $location) {
  var vm = this;
  vm.all = [];
  // console.log("whos on scope: ", vm.all)
  $scope.test = "BEFORE";
  vm.newGarden = {};
  vm.getGardens = getGardens;
  vm.getGarden = getGarden;
  vm.addGarden = addGarden;
  vm.deleteGarden = deleteGarden;
  vm.updateGarden = updateGarden;
  // vm.decodeJwtAndJoinGarden = decodeJwtAndJoinGarden;
  vm.seeUserProfile = seeUserProfile;
  vm.postYourGarden = postYourGarden;
  vm.postYourGardenAddIdToProf = postYourGardenAddIdToProf;
  vm.doesGardenBelongToUser = doesGardenBelongToUser;
  vm.isUserMemberOfGarden = isUserMemberOfGarden;
  vm.testUserId = testUserId;
  vm.joinGarden = joinGarden;
  vm.unjoinGarden = unjoinGarden;

  vm.userIdFromView = {}
  
  getGardens();

  function testUserId () {
    var userId = Account.getUserIdFromJwt();
    console.log(userId);
  }

  function getGardens() {
    $http
      .get('/api/gardens')
      .then(function(response) {
        vm.all = response.data;
      })
  }

  function getGarden (garden) {
    var currentId = $stateParams.id;
    // console.log(currentId)
    $http
      .get('/api/gardens/' + currentId)
      .then(function(response) {
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
      var userId = Account.getUserIdFromJwt();

      $http
        .post('/api/users/' + userId + '/gardens', vm.newGarden)
        .then(function(response) {
          // console.log("new garden:", response.data)
          vm.all.push(response.data)
        })
        vm.newGarden = {}
        // $location
        $location.path('/map');
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

  function updateGarden(garden) {
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

  function joinGarden (garden) {
    var userId = Account.getUserIdFromJwt();

    // need to pass userObj in here
    $http
      .put('/api/gardens/' + garden._id + '/users/' + userId)
        // .put('/api/gardens/' + garden._id, garden)
      .then(function(response) {
          console.log("join res from server:", response.data)
          $scope.test = "AFTER";
          if(!$scope.$$phase) {
            $scope.$apply();
          }
      })
    // push user id to gardeners array (server side)
 };

  

  function unjoinGarden (garden) {
    var userId = Account.getUserIdFromJwt();
    var gardenId = $stateParams.id
      $scope.test = "BEFORE";
      $http
        .put('/api/users/' + userId + '/gardens/' + gardenId)
        .then(function(response){
          console.log("Gardens you are PRT OF:", response)
            
            
          // $scope.apply(function() {
          //   $scope.garden = response.data;
          //   vm.all = response.data;
          // })
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
    var userId = Account.getUserIdFromJwt();
    
    $scope.isEditable = false;

    $http
      .get('/api/profile/' + userId)
      .then(function(response) {
        // what if user has no gardens?
        // console.log("users gardens: ", response.data.gardens[0]._id)
        // render json from server
        for (var i = 0; i < response.data.gardens.length; i++ ) {
          console.log("searching through your gardens")

          var usersGardens = response.data.gardens[i]._id

          // if garden id is in user's gardens
          if (usersGardens.indexOf(gardenId) !== -1 ) {
            // then do allow user to edit
            console.log("yes, garden belongs to user")

            $scope.isEditable = true;
            // $scope.canJoinGarden = false;
            // $scope.canUnjoinGarden = true;
          }
        }
          
      })
    
  }

  function isUserMemberOfGarden () {
    var gardenId = $stateParams.id
    // get user id from jwt

    // make as a helper function
    var userId = Account.getUserIdFromJwt();
    
    $scope.canJoinGarden = true;
    $scope.canUnjoinGarden = false;

    $http
      .get('/api/gardens/' + gardenId)
      .then(function(response) {
        for (var i=0; i < response.data.gardeners.length; i++) {

          var gardenMembers = response.data.gardeners[i]._id

          if (gardenMembers.indexOf(userId) !== -1 ) {
            console.log("USER IS MEMBER OF GARDEN!")
            $scope.canJoinGarden = false;
            $scope.canUnjoinGarden = true;
          }
        }
      })

  }

  console.log("garden cntrl")
}