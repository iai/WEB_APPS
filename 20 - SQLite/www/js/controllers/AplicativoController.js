controllers.controller('AplicativoController', function($scope, $ionicPlatform, Banco, $state, API, $ionicLoading, Sincronizador, $q, $ionicPopup){

	$ionicPlatform.ready(function(){
		Banco.criarBanco().then(function(sucesso){
			console.log('Criou o banco');
			console.log(sucesso);
		}, function(erro){
			console.error(erro);
		});
	})
	
	$scope.nome = UsuarioBean.getNome();

	$scope.sair = function(){
		UsuarioBean.clear();
		$state.go('login');
	}

	$scope.sincronizar = function(){

		$ionicLoading.show();

		var promessas = [Sincronizador.download(), Sincronizador.upload()];

		$q.all(promessas).then(function(sucesso){
			console.log(sucesso);
			$ionicPopup.alert({
				title: 'Sucesso!',
				template : 'Dados sincronizados com sucesso!'
			});

			$ionicLoading.hide();
		}, function(erro){
			console.error(erro);
			$ionicLoading.hide();
		})

	}

});