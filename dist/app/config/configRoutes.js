app.config(configRoutes)

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
      controller: 'HomeController',
      controllerAs: 'hc'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/public/templates/signup.html',
      controller: 'SignupController',
      controllerAs: 'sc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/public/templates/login.html',
      controller: 'LoginController',
      controllerAs: 'lc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .state('logout', {
      url: '/logout',
      template: null,
      controller: 'LogoutController',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/public/templates/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profile',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .state('gardens-index', {
      url: '/gardens',
      templateUrl: 'app/public/templates/gardens-index.html',
      controller: 'GardensController',
      controllerAs: 'gc'
    })
    .state('garden-show', {
      url: '/gardens/:id',
      templateUrl: '/app/public/templates/gardens-show.html',
      controller: 'GardensController',
      controllerAs: 'gc'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'app/public/templates/map.html',
      controller: 'MapController',
      controllerAs: 'mc',
      resolve: {
        loginRequired: loginRequired
      }
    })


    // satellizer helper functions

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }

}