var meusControllers = angular.module('ControleUsuarios.controllers', []);

meusControllers.controller('InserirController', function($scope, Usuarios){

	$scope.minlength = 7;
	$scope.Usuario   = {};

	$scope.salvar = function(valido, Usuario) {

		if(valido) {

			Usuarios.salvar(Usuario);

			$scope.sucesso = true;

		}

	}

	$scope.reset = function(frmUsuario) {
		$scope.sucesso = false;
		$scope.Usuario = {};
		frmUsuario.$setPristine();
	}

});

meusControllers.controller('ListarController', function($scope, Usuarios){

	$scope.apagar = function(indice) {
		Usuarios.apagar(indice);
	}

	$scope.atualizar = function() {
		
		$scope.registros = Usuarios.todos();

		$scope.$broadcast('scroll.refreshComplete');

	}

	$scope.atualizar();

	$scope.abreSite = function(site){
		//cordova.InAppBrowser.open(site, '_blank', 'location=yes');
		window.open('http://'+site);
	}

});

meusControllers.controller('DetalheController', function($scope, $stateParams, Usuarios){

	$scope.Usuario = Usuarios.buscaPorIndice($stateParams.indice);

})