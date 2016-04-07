app.controller('HomeController', HomeController);

// HomeController.$inject = ['$http', '$scope', 'toastr']

function HomeController ($scope, toastr, Account) {
  console.log("HomeController loaded")
  console.log("toast:", toastr)
  var vm = this;


  vm.getCurrentUserId = function() {
    console.log(Account.getUserIdFromJwt());
    return Account.getUserIdFromJwt();
  }


}