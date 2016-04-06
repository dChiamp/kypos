app.controller('LogoutController', LogoutController);

// LogoutController.$inject = ["$location", "Account"]; // minification protection
function LogoutController ($location, Account, toastr) {
  Account
    .logout()
    .then(function () {
        $location.path('/login');
        toastr.warning('Logged Out!');
    });
}
