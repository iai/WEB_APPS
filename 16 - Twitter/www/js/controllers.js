angular.module('Twitter.controllers', [])

.controller('TwitterController', function($scope, $ionicPlatform, Conector, $ionicLoading){

	$scope.tweets = null;

	$scope.atualizar = function(){
		$scope.mostraMeuFeed();
		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.mostraMeuFeed = function() {

		Conector.minhaTimeline().then(function(dados){
			$scope.tweets = dados;
			$ionicLoading.hide();

		}, function(erro){
			console.error(erro);
			$ionicLoading.hide();
		})

	}

	$scope.ajustaData = function(data){
		return new Date(Date.parse(data));
	}

	$ionicLoading.show();

	$ionicPlatform.ready(function(){
		
		if(Conector.autenticado())
			$scope.mostraMeuFeed();
		else {
			Conector.iniciar().then(function(iniciou){
				if(iniciou){
					$scope.mostraMeuFeed();
				}
			})
		}

	});
	

})