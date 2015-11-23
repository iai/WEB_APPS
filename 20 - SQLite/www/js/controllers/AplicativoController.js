controllers.controller('AplicativoController', function($scope, $ionicPlatform, Banco){

    $ionicPlatform.ready(function(){
        Banco.criaBanco().then(function(sucesso){
            console.log('Criou o banco');
        }, function(erro){
            console.error(erro);
        });
    });

});