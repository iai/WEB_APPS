// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app         = angular.module('SQLite', ['ionic', 'SQLite.controllers', 'SQLite.services', 'SQLite.directives', 'SQLite.providers']);
var controllers = angular.module('SQLite.controllers', []);
var services    = angular.module('SQLite.services', []);
var directives  = angular.module('SQLite.directives', []);
var providers   = angular.module('SQLite.providers', []);

app.run(function($ionicPlatform, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $rootScope.$on('$stateChangeStart', function(evento, estadoDestino){

        var estadosPermitidos = ['login'];
        if(estadosPermitidos.indexOf(estadoDestino.name) === -1 && 
          !UsuarioBean.getNome() && !UsuarioBean.getLogado()){
            evento.preventDefault();
            $state.go('login');
        }
    });

  });
});

app.constant('EnderecoAPI', {url : 'http://eu.querorock.com/api/'});

app.config(function($stateProvider, $urlRouterProvider, NomeBancoProvider){

  NomeBancoProvider.setBanco('aulawebapps.db');

  $stateProvider.state('aplicativo', {
    url: '/aplicativo',
    abstract: true,
    templateUrl: 'views/menu.html',
    controller: 'AplicativoController'
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  });

  $stateProvider.state('aplicativo.inserir', {
    url: '/inserir',
    views: {
      'conteudoMenu' : {
        templateUrl: 'views/formulario.html',
        controller: 'FormularioController'
      }
    }
  });

  $stateProvider.state('aplicativo.editar', {
    url: '/editar/:id',
    views: {
      'conteudoMenu' : {
        templateUrl: 'views/formulario.html',
        controller: 'FormularioController'
      }
    }
  });

  $stateProvider.state('aplicativo.listar', {
    url: '/listar',
    views: {
      'conteudoMenu' : {
        templateUrl: 'views/listar.html',
        controller: 'ListarController'
      }
    }
  });

  if(UsuarioBean.getNome() && UsuarioBean.getLogado())
    $urlRouterProvider.otherwise('/aplicativo/inserir');
  else
    $urlRouterProvider.otherwise('/login');
})