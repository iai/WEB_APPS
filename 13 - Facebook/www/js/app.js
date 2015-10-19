// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Facebook', ['ionic', 'Facebook.controllers', 'Facebook.services'])

.run(function($ionicPlatform, $rootScope, $state) {
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

        if(estadoDestino.name != "aplicativo.login" && !localStorage.getItem('facebookToken')) {
            evento.preventDefault();
            $state.go('aplicativo.login');
        }

    })


  });
})


.config(function($stateProvider, $urlRouterProvider){

    $stateProvider

    .state('aplicativo', {
      url: '/aplicativo',
      abstract: true,
      templateUrl: 'views/menu.html',
      controller: 'AplicativoController'
    })

    .state('aplicativo.login', {
      url: '/login',
      views: {
        'conteudoMenu' : {
          templateUrl: 'views/login.html',
          controller: 'LoginController'
        }
      }
    })

    .state('aplicativo.perfil', {
      url: '/perfil',
      views: {
        'conteudoMenu' : {
          templateUrl: 'views/perfil.html',
          controller: 'PerfilController'
        }
      }
    });

    $urlRouterProvider.otherwise('/aplicativo/login');

})