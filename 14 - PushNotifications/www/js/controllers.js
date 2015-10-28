meuAPP.controller('PushController', function($scope, PushService, $ionicLoading){

    $scope.sucesso = false;

    $scope.registrar = function() {
        $ionicLoading.show();
        PushService.registra({android : true}).then(function(sucesso){
            console.log(sucesso.registrationId);
            $scope.sucesso = true;
            $ionicLoading.hide();
        }, function(erro){
            console.error(erro);
        })
    }

});