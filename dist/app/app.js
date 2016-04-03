var app = angular.module('kypos', ['ui.router'])

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
      controller: 'GardensController',
      controllerAs: 'gc'
    })

}