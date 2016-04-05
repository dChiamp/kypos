app.service('Account', Account)

Account.$inject = ["$http", "$q", "$auth", "jwtHelper"]; // minification protection
function Account($http, $q, $auth, jwtHelper) {
  var self = this;
  self.user = null;

  self.signup = signup;
  self.login = login;
  self.logout = logout;
  self.currentUser = currentUser;
  self.getProfile = getProfile;
  self.updateProfile = updateProfile;
  self.getUserIdFromJwt = getUserIdFromJwt;

  function signup(userData) {
    return (
      $auth
        .signup(userData) // signup (https://github.com/sahat/satellizer#authsignupuser-options)
        .then(
          function onSuccess(response) {
            $auth.setToken(response.data.token); // set token (https://github.com/sahat/satellizer#authsettokentoken)
          },

          function onError(error) {
            console.error(error);
          }
        )
    );
  }

  function login(userData) {
    return (
      $auth
        .login(userData) // login (https://github.com/sahat/satellizer#authloginuser-options)
        .then(
          function onSuccess(response) {
            $auth.setToken(response.data.token); // set token (https://github.com/sahat/satellizer#authsettokentoken)
          },

          function onError(error) {
            console.error(error);
          }
        )
    );
  }

  function logout() {
    return (
      $auth
        .logout() // delete token (https://github.com/sahat/satellizer#authlogout)
        .then(function() {
          self.user = null;
        })
    );
  }

  function currentUser() {
    if ( self.user ) { return self.user; }
    if ( !$auth.isAuthenticated() ) { return null; }

    var deferred = $q.defer();

    getProfile().then(
      function onSuccess(response) {
        self.user = response.data;
        deferred.resolve(self.user);
      },

      function onError() {
        $auth.logout();
        self.user = null;
        deferred.reject();
      }
    )
    self.user = promise = deferred.promise;
    return promise;
  }

  function getProfile() {
    return $http.get('/api/users/profile');
  }

  function updateProfile(profileData) {
    return (
      $http
        .put('/api/users/profile', profileData)
        .then(
          function (response) {
            self.user = response.data;
          }
        )
    );
  }

  // decode jwt
  
  function getUserIdFromJwt() {
    // get profile obj 
    getProfile().then( 
      function onSuccess(response) {
      console.log("userID:", response.data._id)
      return response.data._id;
    })
  }
  

}
