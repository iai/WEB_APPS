controllers.controller('FormularioController', function($scope, Banco, $stateParams, $ionicPlatform, Camera){

	var id = $stateParams.id;

	$scope.sucesso = false;
	$scope.Usuario = {};

	if(id) {
		$ionicPlatform.ready(function(){
			Banco.buscar(id).then(function(resultado){
				if(resultado[0])
					$scope.Usuario = resultado[0];
			}, function(erro){
				console.error(erro);
			});
		});
	}

	$scope.salvar = function(valido, Usuario){

		if(valido){
			Banco.salvar(Usuario).then(function(resultado){
				$scope.sucesso = true;
			}, function(erro){
				console.error(erro);
			});
		}

	};

	$scope.limpar = function(formulario){
		$scope.Usuario = {nome : '', email : '', foto : ''};
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