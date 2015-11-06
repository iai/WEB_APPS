angular.module('Globalization.services', [])
.factory('Traducao', function($q, $http) {
    function Traducao() {
        this.getIdioma = function (){

            var q = $q.defer();

            //Busca a linguagem preferencial
            navigator.globalization.getPreferredLanguage(function(lingua){

                //Define português como padrão
                var arquivo = lingua.value || 'pt-br';

                $http({
                    url: 'languages/'+ arquivo.toLowerCase() + '.json'
                }).then(function(retorno){
                    q.resolve(retorno.data);
                }, q.reject);

            }, q.reject);

            return q.promise;
        }

        this.dateToString = function(date){
            var q = $q.defer();
            navigator.globalization.dateToString(date, q.resolve, q.reject);
            return q.promise;
        }

        this.getFirstDayOfWeek = function(){
            var q = $q.defer();
            navigator.globalization.getFirstDayOfWeek(q.resolve, q.reject);
            return q.promise;
        }

        this.stringToNumber = function(string){
            var q = $q.defer();
            navigator.globalization.stringToNumber(string, q.resolve, q.reject, { type: 'decimal' });
            return q.promise;
        }

        /*
         * Demais métodos possíveis
         *
         * navigator.globalization.getLocaleName
         * navigator.globalization.stringToDate
         * navigator.globalization.getDatePattern
         * navigator.globalization.getDateNames
         * navigator.globalization.isDayLightSavingsTime
         * navigator.globalization.numberToString
         * navigator.globalization.getNumberPattern
         * navigator.globalization.getCurrencyPattern
        */

    }

    return new Traducao();
});