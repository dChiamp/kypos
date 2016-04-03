var app = angular.module('kypos', ['uiGmapgoogle-maps', 'ui.router', 'geolocation'])

app.config(config)

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $locationProvider) {
  console.log("hi from config");

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home-template', {
      url: '/',
      templateUrl: 'app/public/templates/home.html',
      // controller: 'GardensController',
      // controllerAs: 'homeCntrl'
    })
    // .state('map', {
    //   url: '/map',
    //   templateUrl: 'app/public/templates/map.html',
    //   controller: 'MapsController',
    //   controllerAs: 'mc'
    // })
    // .state('gardens-index', {
    //   url: '/gardens',
    //   templateUrl: 'app/public/templates/gardens-index.html',
    //   controller: 'HazardsController',
    //   controllerAs: 'hc'
    // })

    // .state('gardens-show', {
    //   url: '/gardens/:gardenId',
    //   templateUrl: '/app/public/templates/gardens-show.html',
    //   controller: 'ShowController',
    //   controllerAs: 'sc'
    // })


}