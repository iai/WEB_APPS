controllers.controller('FormularioController', function($scope, Camera, Banco, $stateParams, $ionicPlatform){

	$scope.Usuario = {};
	$scope.sucesso = false;

	var id = $stateParams.id;

	if(id){
		$ionicPlatform.ready(function(){
			Banco.buscar(id).then(function(resultado){
				console.log(resultado);
				$scope.Usuario = resultado[0];
				$scope.Usuario.confirmaSenha = $scope.Usuario.senha;
			}, function(erro){
				console.error(erro);
			});
		})
	}

	$scope.tirarFoto = function(){
		Camera.buscarFoto().then(function(base64Foto){
			$scope.Usuario.foto = base64Foto;
			console.log(base64Foto);
		}, function(erro){
			console.error(erro);
		})
	}

	$scope.salvar = function(valido){

		if(valido){
			Banco.salvar($scope.Usuario).then(function(resultado){
				$scope.sucesso = true;
			}, function(erro){
				console.error(erro);
			})
		}

	}

	$scope.limpar = function(formulario){
		$scope.Usuario = {};
		formulario.$setPristine();
		$scope.sucesso = false;
	}

});