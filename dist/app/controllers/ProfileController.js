app.controller('ProfileController', ProfileController);

function ProfileController ($scope, auth) {
  $scope.auth = auth
  console.log('load profCntrl');
}