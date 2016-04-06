app.controller('ProfileController', ProfileController);

// Auth0
// function ProfileController ($scope, auth) {
//   $scope.auth = auth
//   console.log('load profCntrl');
// }


// ProfileController.$inject = ["$location", "Account"]; // minification protection
function ProfileController ($location, Account, toastr) {
  var vm = this;
  vm.new_profile = {}; // form data

  vm.updateProfile = function() {
    Account
      .updateProfile(vm.new_profile)
      .then(function () {
        vm.showEditForm = false;
        toastr.success("Profile Updated!")
      });
  };

  vm.getUserInfo = function() {
    Account
      .getUserIdFromJwt()
      // why cant i use then here?
      // .then(
      //   console.log("from profctrl:")
      // )
  }

}
