app.controller('UserController', UserController)

function UserController ($scope, $http, $stateParams) {
  var vm = this;
  vm.all = [];

  vm.getUser = getUser;
  
  // getUser();

  function getUser() {
    var userId = $stateParams.id;
    $http
      .get('/api/profile/' + userId)
      .then(function(response) {
        console.log("getUser: ", response.data)
        $scope.user = response.data;
      })
  }
}