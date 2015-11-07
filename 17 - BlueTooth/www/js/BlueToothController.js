angular.module('BlueTooth.controllers', [])
.controller('BlueToothController', function($scope, BlueToothService){

    $scope.inicia = function(){

        var parametros = {serviceUuids:[], allowDuplicates: true};
        $scope.dispositivos = [];
        BlueToothService.iniciaBusca(parametros).then(null, function(erro){
            console.error(angular.toJson(erro));
        }, function(notificou){
            if(notificou.status == "scanStarted")
                $scope.status = "Iniciou a busca!";
            
            if(notificou.status == "scanResult") {
                $scope.status = "Achou!";
                $scope.dispositivos.push(notificou);
            }
        });
    }

    $scope.para = function(){

        BlueToothService.paraBusca().then(function(){
            $scope.status = "Parou!";
            $scope.dispositivos = [];
        }, function(erro){
            console.error(angular.toJson(erro));
        });

    }
    
})