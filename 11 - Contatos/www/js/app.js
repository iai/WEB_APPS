// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var meuAPP = angular.module('IntegrandoComContatos', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

meuAPP.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('home', {
      url: '/home',
      views: {
        'tab-home' : {
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        }
      }
  });

  $stateProvider.state('inserir', {
      url: '/inserir',
      views: {
        'tab-inserir' : {
          controller: 'InserirController',
          templateUrl: 'views/inserir.html'
        }
      }
  });

  $stateProvider.state('listar', {
      url: '/listar',
      views: {
        'tab-listar' :{
          controller: 'ListarController',
          templateUrl: 'views/listar.html'
        }
      }
  });

  $stateProvider.state('detalhe', {
      url: '/detalhe/:id',
      views : {
        'tab-listar' : {
          controller: 'DetalheController',
          templateUrl: 'views/detalhe.html'
        }
      }
  });

});