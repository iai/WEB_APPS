// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var meuAPP = angular.module('PushNotifications', ['ionic'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $rootScope.$on('PushRecebido', function(evento, notificacao){
      console.log(angular.toJson(notificacao));
      $rootScope.notificacao = notificacao;
    });


  });
})

.constant('GCM', {senderID : '4591093036'});