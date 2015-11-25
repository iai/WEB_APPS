controllers.controller('ListarController', function($scope, Banco, $ionicPlatform, $ionicPopup){

	$scope.dados  = [];
	$scope.buscar = '';

	$scope.atualizar = function(){
		Banco.buscar().then(function(resultado){
			if(resultado)
				$scope.dados = resultado;
			$scope.$broadcast('scroll.refreshComplete');
		}, function(erro){
			console.error(erro);
		});
	}

	$ionicPlatform.ready(function(){
		$scope.atualizar();
	});

	$scope.limparFiltro = function(){
		$scope.buscar = '';
	}

	$scope.apagar = function(id){

		$ionicPopup.confirm({
			title : 'Tem certeza?',
			template : 'Deseja realmente excluir?'
		}).then(function(confirmou){
			if(confirmou){
				Banco.apagar(id).then(function(){
					$scope.atualizar();
				}, function(erro){
					console.error(erro);
				})
			}
		})

	}

});