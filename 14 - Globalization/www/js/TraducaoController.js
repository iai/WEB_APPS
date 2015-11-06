angular.module('Globalization.controllers', [])
.controller('TraducaoController', function($scope, Traducao, $ionicPlatform){
    
    $scope.preferencias = {};

    //Fazer antes sem o ionicPlatform para mostrar que da erro
    $ionicPlatform.ready(function(){
        Traducao.dateToString(new Date('2015-08-20 10:45:35')).then(function(sucesso){
            $scope.preferencias.data = sucesso.value;
        }, function(erro){
            console.error(angular.toJson(erro));
        });

        Traducao.getFirstDayOfWeek().then(function(sucesso){
            $scope.preferencias.dia_semana = sucesso.value;
        }, function(erro){
            console.error(angular.toJson(erro));
        });

        Traducao.stringToNumber('123,235').then(function(sucesso){
            $scope.preferencias.numero = sucesso.value;
        }, function(erro){
            console.error(angular.toJson(erro));
        });        
    });
  

})