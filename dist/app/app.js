var app = angular
  .module('kypos', ['ui.router', 'auth0', 'angular-storage', 'angular-jwt'])

  // .config( function(authProvider) { 
  //   authProvider.init({
  //   domain: 'dchiamp.auth0.com',
  //   clientID: 'sQ2bkUmtSU3Pydx510qzd3xQuN4wtn5W'
  //   });
  // })
  // .run(function(auth) {
  // // This hooks al auth events to check everything as soon as the app starts
  // auth.hookEvents();
  // });



app.config(configRoutes)


/*
app.config(authProviderConfig)
authProviderConfig.$inject = ['auth0', 'angular-storage', 'angular-jwt'];

function authProviderConfig(auth0, angular-storage, angular-jwt) {
  authProvider.init({
    domain: 'dchiamp.auth0.com',
    clientID: 'sQ2bkUmtSU3Pydx510qzd3xQuN4wtn5W'
  })
}
*/


// configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function configRoutes($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, authProvider, jwtInterceptorProvider) {
  console.log("hi from config");

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/public/templates/home.html',
      controller: 'GardensController',
      controllerAs: 'gc'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/public/templates/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/public/templates/profile.html',
      controller: 'ProfileController',
      controllerAs: 'pc'
    })

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
