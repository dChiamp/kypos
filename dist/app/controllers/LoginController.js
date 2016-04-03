app.controller('LoginController', LoginController);

// Auth0
// function LoginController ($scope, auth, $location, store) {
//   $scope.auth = auth;

//   $scope.logout = function() {
//     auth.signout();
//     store.remove('profile');
//     store.remove('token');
//     $location.path('/login');
//   }

// }

LoginController.$inject = ["$location", "Account"]; // minification protection
function LoginController ($location, Account) {
  var vm = this;
  vm.new_user = {}; // form data

  vm.login = function() {
    Account
      .login(vm.new_user)
      .then(function(){
        vm.new_user = {}; // clear sign up form
        $location.path('/profile'); // redirect to '/profile'
      })
  };
}
