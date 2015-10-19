// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var meuApp = angular.module('ControleUsuarios', ['ionic', 'ControleUsuarios.controllers', 'ControleUsuarios.services', 'ControleUsuarios.filters'])

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

meuApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider

    .state('home', {
      url: '/home',
      views: {
        'tab-home' : {
          templateUrl: 'views/tab-home.html'
        }
      }
    })

    .state('inserir', {
      url: '/inserir',
      views: {
        'tab-inserir' : {
          controller: 'InserirController',
          templateUrl: 'views/tab-inserir.html'
        }
      }
    })

    .state('listar', {
      url: '/listar',
      views: {
        'tab-listar' : {
          controller: 'ListarController',
          templateUrl: 'views/tab-listar.html'
        }
      }
    })

    .state('detalhe', {
      url: '/detalhe/:indice',
      views: {
        'tab-listar': {
          templateUrl: 'views/tab-detalhe.html',
          controller: 'DetalheController'
        }
      }
    })

    .state('sobre', {
      url: '/sobre',
      views: {
        'tab-sobre' : {
          templateUrl: 'views/tab-sobre.html'
        }
      }
    });

    $urlRouterProvider.otherwise('/home');

});