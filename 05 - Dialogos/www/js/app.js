// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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
})

.controller('NotificaController', function($scope){

    $scope.alerta = function(){
      navigator.notification.alert(
        'Que bom, o alerta funcionou',
        function() { alert('deu ok'); },
        'Olá', //título
        'OK' //Texto do botão
      );
    }

    $scope.confirma = function() {
      navigator.notification.confirm(
        'Você está bem?',
        function(indice) {
          if(indice == 1)
            alert('Aeeeee');
          else
            alert('Que pena');
        },
        'Preocupação com a saúde',
        ['Sim', 'Não']
      );
    }

    $scope.prompt = function() {

      navigator.notification.prompt(
          'Diga-nos seu nome',
          function(resultado) {
            $scope.nome = resultado.input1;
            $scope.$apply();
          },
          'Busca por nome',
          ['OK', 'Sair'],
          'Ex.: Henrique'
      );

    }

    $scope.beep = function() {
      navigator.notification.beep(5);
    }

    $scope.vibre = function() {
      navigator.notification.vibrate(5000);
    }

})