// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Fotos', ['ionic'])

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

.config(function($compileProvider){
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|content|file):/);
})

.controller('CameraController', function($scope, $ionicActionSheet, Camera){

    $scope.buscarFoto = function() {

        $ionicActionSheet.show({
            buttons : [
                {text: 'Tirar <strong>foto</strong>'},
                {text: 'Tirar foto com tamanho específico'},
                {text: 'Tirar uma foto e editá-la'},
                {text: 'Buscar da biblioteca'},
                {text: 'Buscar de um album'}
            ],
            cancelText: 'Cancelar',
            //destructiveText: 'Apagar'
            cancel: function() {
                alert('Cancelou');
            },
            buttonClicked: function(index) {

                switch(index) {
                      case 0:
                        tiraFoto();
                      break;

                      case 1:
                        tiraFotoTamanho();
                      break;

                      case 2:
                        tiraEditarFoto();
                      break;

                      case 3:
                        buscarFotoBiblioteca();
                      break;

                      case 4: 
                        buscarFotoAlbum();
                      break;

                      default:
                        alert('Leve a um exorcista!');
                }

                return true;

            }
        });

    }

    var tiraFoto = function() {

        var opcoes = {
            quality: 70,
            saveToPhotoAlbum: false
        };

        chamaCamera(opcoes);

    }

    var tiraFotoTamanho = function() {

        var opcoes = {
            quality: 70,
            targetWidth: 100,
            targetHeight: 100,
            saveToPhotoAlbum: false
        };

        chamaCamera(opcoes);

    }

    var tiraEditarFoto = function() {

        var opcoes = {
            quality: 70,
            allowEdit: true,
            saveToPhotoAlbum: false
        };

        chamaCamera(opcoes);

    }

    var buscarFotoBiblioteca = function() {

        var opcoes = {
            quality: 70,
            sourceType: Camera.tipoOrigem().PHOTOLIBRARY,
            mediaType: Camera.tipoMidia().PICTURE
        };

        chamaCamera(opcoes);

    }

    var buscarFotoAlbum = function() {

        var opcoes = {
            quality: 70,
            sourceType: Camera.tipoOrigem().SAVEDPHOTOALBUM,
            mediaType: Camera.tipoMidia().PICTURE
        };

        chamaCamera(opcoes);

    }

    var chamaCamera = function(opcoes){
        Camera.buscarFoto(opcoes).then(function(imagem) {
            $scope.foto = imagem;
        }, function(erro){
            console.log(erro);
        })
    }

})

.factory('Camera', function($q) {

    return {
        buscarFoto: function(opcoes){

            var q = $q.defer();

            navigator.camera.getPicture(function(sucesso){
                q.resolve(sucesso);
            }, function(erro){
                q.reject(erro);
            }, opcoes);

            return q.promise;

        },
        tipoOrigem: function(){ return navigator.camera.PictureSourceType; },
        tipoMidia: function(){ return navigator.camera.MediaType; }
    };

})