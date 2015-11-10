angular.module('Globalization.services', [])

/**
 * Métodos possíveis do plugin https://github.com/apache/cordova-plugin-globalization
 *
 * navigator.globalization.getPreferredLanguage
 * navigator.globalization.getLocaleName
 * navigator.globalization.dateToString
 * navigator.globalization.stringToDate
 * navigator.globalization.getDatePattern
 * navigator.globalization.getDateNames
 * navigator.globalization.isDayLightSavingsTime
 * navigator.globalization.getFirstDayOfWeek
 * navigator.globalization.numberToString
 * navigator.globalization.stringToNumber
 * navigator.globalization.getNumberPattern
 * navigator.globalization.getCurrencyPattern
 */
.factory('TraducaoService', function($q, $http, Idiomas){
	
	function TraducaoService(){

		this.buscaIdioma = function(){

			var q = $q.defer();

			navigator.globalization.getPreferredLanguage(function(dados){

				var arquivo = 'pt';
				if(dados.value) {
					for(var temp in Idiomas) {
						if(dados.value.indexOf(Idiomas[temp]) > -1){
							arquivo = Idiomas[temp];
							break;
						}
					}
				}

				$http({
					url: 'languages/'+arquivo.toLowerCase()+'.json'
				}).then(function(retorno){
					q.resolve(retorno.data);
				}, q.reject)

			}, q.reject);

			return q.promise;

		}

		this.dataParaTexto = function(data){
			var q = $q.defer();
			navigator.globalization.dateToString(data, q.resolve, q.reject);
			return q.promise;
		}

		this.primeiroDiaDaSemana = function(){
			var q = $q.defer();
			navigator.globalization.getFirstDayOfWeek(q.resolve, q.reject);
			return q.promise;
		}

		this.textoParaNumero = function(texto){
			var q = $q.defer();
			navigator.globalization.stringToNumber(texto, q.resolve, q.reject, {type: 'decimal'});
			return q.promise;
		}

	}

	return new TraducaoService();

})