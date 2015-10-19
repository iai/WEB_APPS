controllers.controller('AplicativoController', function($scope, $ionicPlatform, Internet, $ionicLoading, GMaps, MinhaLocalizacao, $ionicModal){

	$ionicPlatform.ready(function(){

		$scope.online = false;
		if(Internet.online()){

			$ionicLoading.show({
				template: 'Carregando o mapa'
			});

			GMaps.incluiMapa().then(function(retorno){
				$scope.online = true;
				$ionicLoading.hide();
			}, function(erro){
				console.error(erro);
			})

		}

	});

	$scope.mapa = false;
	$scope.criouMapa = function(mapa){
		$scope.mapa = mapa;
	}

	var objSeguidor = false;
	$scope.ondeEstou = function(){

		if(!objSeguidor) {
			$ionicLoading.show();

			MinhaLocalizacao.meuLocal().then(function(localizacao){

				GMaps.setaCentro(localizacao.latitude, localizacao.longitude).then(function(){
					$scope.ativaSeguir();
					$ionicLoading.hide();
				}, function(erro){
					console.error(erro);
					alert('Local não encontrado, você deve morar em Carapicuíba!');
				});

			}, function(erro){
				console.error(erro);
				alert('Local não encontrado, você deve morar em Carapicuíba!');
			});
		}

	}

	$scope.buscaEnderecos = function(){

		$scope.enderecos = ['Rua Amauri', 'Av. Faria Lima', 'Estádio Governador Magalhães Pinto', 'Rua Alberto Grosso', 'Av. Elias Maluf', 'Praia da Boa Viagem'];

		$ionicModal.fromTemplateUrl('views/enderecos.html', {
			scope : $scope
		}).then(function(modal){
			$scope.modal = modal;
			$scope.modal.show();
		});
	}

	$scope.seguidor = false;
	$scope.ativaSeguir = function() {
		var opcoes = { timeout: 30000 };

		objSeguidor = MinhaLocalizacao.segueOsPassos(opcoes);

		objSeguidor.then(false, function(erro){
			console.error(erro);
		}, function(passos){
			$scope.seguidor = passos;
		})

		
	}

	$scope.paraSeguir = function(){
		objSeguidor.naoSigaMais();
		objSeguidor = false;
		$scope.seguidor = false;
	}

	$scope.marcaEndereco = function(endereco){

		$ionicLoading.show();

		GMaps.marcaEndereco(endereco).then(function(sucesso){
			$scope.fechaEndereco();
			$ionicLoading.hide();
		}, function(erro){
			console.error(erro);
		})
	}

	$scope.fechaEndereco = function(){
		$scope.modal.hide();
	}

});