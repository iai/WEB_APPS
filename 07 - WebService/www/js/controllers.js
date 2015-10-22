var meusControllers = angular.module('WebService.controllers', []);

meusControllers.controller('AplicativoController', function($scope, $ionicModal){

	$scope.modal = false;

	$ionicModal.fromTemplateUrl('views/sobre.html', {
		scope : $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	}, function(erro){
		console.log(erro);
	});

	$scope.sobre = function() {
		$scope.modal.show();
	}

	$scope.fechar = function() {
		$scope.modal.hide();	
	}

});

meusControllers.controller('ListarController', function($scope, Usuarios){

	$scope.atualizar = function() {

		$scope.registros = null;

		Usuarios.todos().then(function(resultado){
			$scope.registros = resultado.usuarios;
			$scope.$broadcast('scroll.refreshComplete');
		}, function(erro){

		});

	}

	$scope.atualizar();
	$scope.pagina = 1;

	$scope.carregaMais = function(){

		$scope.pagina++;

		Usuarios.todos().then(function(resultado){
			console.log(resultado);
			$scope.registros = resultado.usuarios.concat($scope.registros);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}, function(erro){
			console.log(erro);
		});

	}

	$scope.nome = function(nome){
		window.meu.toast.exibe(nome, function(sucesso) {console.log('sucesso')}, function(erro) { alert(erro); });
	}

});

meusControllers.controller('InserirController', function($scope, Usuarios, $ionicLoading){


	$scope.minlength = 5;
	$scope.Usuario = {};

	$scope.salvar = function(valido, Usuario){

		if(valido) {

			$ionicLoading.show({
				template: '<ion-spinner icon="dots"></ion-spinner>'
			});

			Usuarios.salvar(Usuario).then(function(resultado){
				$scope.sucesso = true;
				$scope.erroWS  = false;
				$ionicLoading.hide();
			}, function(razaoDoErro) {
				$scope.erroWS = razaoDoErro;
				$ionicLoading.hide();
			});

		}

	}

	$scope.reset = function(formulario){
		formulario.$setPristine();
		$scope.sucesso = false;
		$scope.Usuario = {email : '', nome : ''};
		$scope.erroWS  = false;
	}


});

meusControllers.controller('DetalheController', function($scope, Usuarios, $stateParams) {

	Usuarios.buscar($stateParams.usuario_id).then(function(resultado){
		$scope.Usuario = resultado.usuarios;
	})

})