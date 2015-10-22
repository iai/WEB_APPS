meuAPP.controller('HomeController', function($scope, $ionicLoading, ContatoService){

	$scope.buscarTotal = function() {
		$ionicLoading.show();

		ContatoService.buscar({campos: ['id'], filter: '', multiple:true}).then(function(sucesso){
			$scope.total = sucesso.length;
			$ionicLoading.hide();
		}, function(error){
			console.error(error);
		});
	}

});