meuAPP.controller('ListarController', function($scope, $ionicLoading, ContatoService){

	$scope.contatos = false;

	$scope.atualizar = function() {

		var opcoes = {
			campos : ['id', 'name', 'emails', 'phoneNumbers'],
			filter : '',
			multiple : true
		};

		ContatoService.buscar(opcoes).then(function(resultado){
			$ionicLoading.hide();
			$scope.contatos = resultado;
			$scope.$broadcast('scroll.refreshComplete');

		}, function(erro){
			console.error(erro);
			alert("Erro: "+erro);
		});

	};

	$scope.apagar = function(id){
		$ionicLoading.show();

		ContatoService.remover({'id' : id}).then(function(resultado){
			$scope.atualizar();
		}, function(erro){
			console.error(erro);
			alert(erro);
		});
	};

});