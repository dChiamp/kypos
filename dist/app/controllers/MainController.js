app.controller('MainController', MainController);

MainController.$inject = ["Account"]; // minification protection
function MainController (Account) {
  var vm = this;

  vm.currentUser = function() {
   return Account.currentUser();
  }

  vm.getCurrentUserId = function() {
    console.log(Account.getUserIdFromJwt());
    return Account.getUserIdFromJwt();
  }



}