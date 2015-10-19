meuAPP.controller('DetalheController', function($scope, $ionicLoading, $stateParams, ContatoService){

	$ionicLoading.show();

	var opcoes = {
		campos : ['id', 'name', 'emails', 'photos', 'phoneNumbers'],
		filter : '',
		multiple : true
	};

	ContatoService.buscar(opcoes).then(function(resultados){

		$scope.Contato = false;
		for(var item in resultados) {
			if(resultados[item].id == $stateParams.id) {
				$scope.Contato = resultados[item];
				break;
			}
		}

		$ionicLoading.hide();

	}, function(erro){
		console.error(erro);
		$ionicLoading.hide();
	})

});