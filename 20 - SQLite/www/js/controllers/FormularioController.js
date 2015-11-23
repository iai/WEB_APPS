controllers.controller('FormularioController', function($scope, Camera, Banco, $stateParams, $ionicPlatform){

	$scope.Usuario = {};

	var id = $stateParams.id;

	$scope.sucesso = false;
	
	if(id) {
		$ionicPlatform.ready(function(){
			Banco.buscar(id).then(function(resultado){
				if(resultado[0]){
					$scope.Usuario = resultado[0];
					$scope.Usuario.confirmaSenha = $scope.Usuario.senha;
				}
			}, function(erro){
				console.error(erro);
			});
		});
	}

	$scope.salvar = function(valido){

		if(valido){
			Banco.salvar($scope.Usuario).then(function(resultado){
				$scope.sucesso = true;
			}, function(erro){
				console.error(erro);
			});
		}

	};

	$scope.limpar = function(formulario){
		$scope.Usuario = {};
		formulario.$setPristine();
		$scope.sucesso = false;
	}

	$scope.tirarFoto = function(){
		Camera.buscarFoto().then(function(baseFoto){
			$scope.Usuario.foto = baseFoto;
		}, function(erro){
			console.error(erro);
		})
	}
});