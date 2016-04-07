app.controller('HomeController', HomeController);

// HomeController.$inject = ['$http', '$scope', 'toastr']

function HomeController ($scope, toastr) {
  console.log("HomeController loaded")
  console.log("toast:", toastr)
  var vm = this;
}