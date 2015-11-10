angular.module('Globalization.controllers', [])

.controller('TraducaoController', function($scope, TraducaoService, $ionicPlatform){
	
	$scope.preferencias = {};

	$ionicPlatform.ready(function() {
		TraducaoService.dataParaTexto(new Date('2015-08-20 10:45:23')).then(function(sucesso){
			$scope.preferencias.data = sucesso.value;
		}, function(erro){
			console.error(erro);
		});

		TraducaoService.primeiroDiaDaSemana().then(function(sucesso){
			$scope.preferencias.dia_semana = sucesso.value;
		}, function(erro){
			console.error(erro);
		});

		TraducaoService.textoParaNumero('12,345').then(function(sucesso){
			$scope.preferencias.numero = sucesso.value;
		}, function(erro){
			console.error(erro);
		});
	});
})