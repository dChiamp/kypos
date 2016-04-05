app.controller('UserController', UserController)

function UserController ($scope, $http) {
  var vm = this;
  vm.all = [];

  vm.getUser = getGardens;
  
  getUser();

  function getUser() {
    var userId = $stateParams.id;
    $http
      .get('/api/users/' + userId)
      .then(function(response) {
        console.log("getUser: ", response.data)
        vm.all = response.data;
      })
  }
}