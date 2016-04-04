var app = angular
  .module('kypos', ['ui.router', 'auth0', 'satellizer','angular-storage', 'angular-jwt', 'uiGmapgoogle-maps', 'geolocation'])

    
    // AUTH0
    /* for production
  authProvider.init({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      callbackURL: process.env.location.href,
      // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
      loginUrl: '/login'
    });
    

  authProvider.init({
      domain: 'dchiamp.auth0.com',
      clientID: 'sQ2bkUmtSU3Pydx510qzd3xQuN4wtn5W',
      callbackURL: location.href,
      // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
      loginUrl: '/login'
    });
  
  authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
    console.log("Login Success");
    profilePromise.then(function(profile) {
      store.set('profile', profile);
      store.set('token', idToken);
    });
    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
    }
    $location.path('/');
  });

  authProvider.on('loginFailure', function() {
    alert("Error");
  });

  authProvider.on('authenticated', function($location) {
    console.log("Authenticated");

  });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  }

  // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
  // want to check the delegation-token example
  $httpProvider.interceptors.push('jwtInterceptor');
}

app.run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {
  
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }

  });
})

app.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$routeChangeSuccess', function(e, nextRoute){
    if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample' ;
    }
  });
});

*/ 
//////////////
// Services //
//////////////

