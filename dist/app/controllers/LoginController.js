app.controller('LoginController', LoginController);


// LoginController.$inject = ["$location", "Account"]; // minification protection
function LoginController ($scope, $location, Account, toastr) {
  var vm = this;
  vm.new_user = {}; // form data

  vm.login = function() {
    Account
      .login(vm.new_user)
      .then(function(){
        vm.new_user = {}; // clear sign up form
        $location.path('/map'); // redirect to '/profile'
        toastr.success('Logged In!');
      })
  };
}
