// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('WebService', ['ionic', 'WebService.controllers', 'WebService.services'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {


    if(navigator.connection) {

      if(navigator.connection.type == Connection.NONE) {

        $ionicPopup.confirm({
            title: 'Sem internet',
            content: 'Seu dispositivo precisa estar conectado a internet.',
            cancelText: 'Fechar o APP',
            okText: 'Tentar novamente'
        }).then(function(result){
            if(result)
              window.location.reload();
            else
              ionic.Platform.exitApp();
        });

      }

    }


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

/*
// Demonstração do carregando global
.config(function($httpProvider){

  $httpProvider.interceptors.push(function($rootScope) {

    return {
      request : function(config) {
          $rootScope.$broadcast('GiraGira:exibe');
          return config;
      },
      response : function(response){
          $rootScope.$broadcast('GiraGira:esconde');
          return response;
      }
    }

  });

})

.run(function($rootScope, $ionicLoading){

    $rootScope.$on('GiraGira:exibe', function(){
      $ionicLoading.show({
        template: '<ion-spinner icon="lines"></ion-spinner>'
      });
    });

    $rootScope.$on('GiraGira:esconde', function(){
      $ionicLoading.hide();
    })

})
*/
.constant('EnderecoAPI', {url : 'http://sistema-stage.medicon.com.br/api_curso/'})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  $stateProvider

  .state('aplicativo', {
    url: '/aplicativo',
    abstract: true,
    templateUrl: 'views/menu.html',
    controller: 'AplicativoController'
  })

  .state('aplicativo.inserir', {
    url: '/inserir',
    views: {
      'conteudoMenu' : {
        templateUrl: 'views/inserir.html',
        controller: 'InserirController'
      }
    }
  })

  .state('aplicativo.listar', {
    url: '/listar',
    views: {
      'conteudoMenu' : {
        templateUrl: 'views/listar.html',
        controller: 'ListarController'
      }
    }
  })

  .state('aplicativo.detalhe', {
    url: '/detalhe/:usuario_id',
    views: {
      'conteudoMenu' : {
        templateUrl: 'views/detalhe.html',
        controller: 'DetalheController'
      }
    }
  });

  $urlRouterProvider.otherwise('/aplicativo/listar');

})