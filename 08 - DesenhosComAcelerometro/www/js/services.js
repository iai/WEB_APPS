var servico = angular.module('QuadroBranco.services', []);

servico.factory('Acelerometro', function($q){

	function Acelerometro() {

		this.buscaAceleracao = function(opcoes) {

			var q = $q.defer();

			var aceleracao_id = navigator.accelerometer.watchAcceleration(function(sucesso){
				q.notify(sucesso);
			}, function(erro){
				q.reject(erro);
			}, opcoes);

			q.promise.limpaAceleracao = function() {
				navigator.accelerometer.clearWatch(aceleracao_id);
			};

			return q.promise;

		}
	}

	return new Acelerometro();

})