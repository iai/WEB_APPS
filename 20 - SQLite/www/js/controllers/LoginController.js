controllers.controller('LoginController', function($scope, Banco, $state){

	$scope.Login = {};
	$scope.erro = false;

	$scope.logar = function(){

		if($scope.Login.email && $scope.Login.senha) {
			Banco.login($scope.Login.email, $scope.Login.senha).then(function(sucesso){

				if(sucesso) {
					UsuarioBean.setNome(sucesso[0].nome);
					UsuarioBean.setLogado(true);
					$state.go('aplicativo.inserir');
				}
				else
					$scope.erro = true;
			}, function(erro){
				$scope.erro = true;
			})
		}

	}

});