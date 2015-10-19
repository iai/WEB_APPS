controllers.controller('ListarController', function($scope, Banco, $ionicPlatform, $timeout, $ionicPopup){

	$scope.dados = null;
	$scope.atualizar = function() {
		Banco.buscar().then(function(resultado){
			$scope.dados          = resultado;
			$scope.dadosFiltrados = $scope.dados;
			$scope.$broadcast('scroll.refreshComplete');
		}, function(erro){
			console.error(erro);
		});
	}

	$ionicPlatform.ready(function(){
		$scope.atualizar();
	});

	$scope.filtrar = function(){
		var texto = $scope.buscar;

		if(texto == "")
			$scope.dadosFiltrados = $scope.dados;
		else {

			var matches = $scope.dados.filter(function(usuario){

				//Nome
				if(usuario.nome.toLowerCase().indexOf(texto.toLowerCase()) !== -1)
					return true;

				//E-mail
				if(usuario.email.toLowerCase().indexOf(texto.toLowerCase()) !== -1)
					return true;

			});

			$timeout(function(){
				$scope.dadosFiltrados = matches;
			}, 100);
		}
	}

	$scope.limparFiltro = function(){
		$scope.buscar = '';
		$scope.dadosFiltrados = $scope.dados;
	}

	$scope.apagar = function(id){

		var confirma = $ionicPopup.confirm({
			title : 'Tem certeza?',
			template: 'Deseja realmente excluir?'
		});

		confirma.then(function(confirmou){
			if(confirmou) {
				Banco.apagar(id).then(function(){
					$scope.atualizar();
				}, function(erro){
					console.error(erro);
				});
			}
		})

	}

});