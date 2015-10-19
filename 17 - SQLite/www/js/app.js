// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app         = angular.module('SQLite', ['ionic', 'SQLite.controllers', 'SQLite.services']);
var controllers = angular.module('SQLite.controllers', []);
var services    = angular.module('SQLite.services', []);

app.run(function($ionicPlatform) {
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

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('aplicativo', {
    url: '/aplicativo',
    abstract: true,
    templateUrl: 'views/menu.html',
    controller: 'AplicativoController'
  });

  $stateProvider.state('aplicativo.inserir', {
    url: '/inserir',
    views : {
      'conteudoMenu' : {
        templateUrl: 'views/formulario.html',
        controller: 'FormularioController'
      }
    }
  });

  $stateProvider.state('aplicativo.editar', {
    url: '/editar/:id',
    views : {
      'conteudoMenu' : {
        templateUrl: 'views/formulario.html',
        controller: 'FormularioController'
      }
    }
  });

  $stateProvider.state('aplicativo.listar', {
    url: '/listar',
    views : {
      'conteudoMenu' : {
        templateUrl: 'views/listar.html',
        controller: 'ListarController'
      }
    }
  });

  $urlRouterProvider.otherwise('/aplicativo/inserir');

})