angular.module('Facebook.controllers', [])

.controller('AplicativoController', function($scope, FacebookService, $state){

	$scope.sair = function(){

		FacebookService.logout().then(function(sucesso){
			localStorage.removeItem('facebookToken');
			$state.go('aplicativo.login');
		}, function(erro){
			alert('Usuário já deslogado');
			$state.go('aplicativo.login');
		})

	}

})

.controller('LoginController', function($scope, FacebookService, $state, $ionicLoading){

	$scope.logar = function() {

		$ionicLoading.show();

		FacebookService.login(['public_profile', 'email', 'user_friends']).then(function(sucesso){

			console.log(sucesso);

			if(sucesso.status == "connected") {
				localStorage.setItem('facebookToken', sucesso.authResponse.accessToken);
				$state.go('aplicativo.perfil');
			}
			else
				$scope.erro = true;

			$ionicLoading.hide();

		}, function(erro){
			console.error(erro);
			$scope.erro = true;
			$ionicLoading.hide();
		})

	}

})

.controller('PerfilController', function($scope, $ionicPlatform, FacebookService){

	$ionicPlatform.ready(function(){

		FacebookService.api("me", ["public_profile", "email", "user_friends"]).then(function(euMesmo){
			console.log(angular.toJson(euMesmo));
			$scope.perfil = euMesmo;
		}, function(erro){
			console.error(erro);
		})

	});

})