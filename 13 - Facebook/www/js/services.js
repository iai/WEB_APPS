angular.module('Facebook.services', [])

.factory('FacebookService', function($q){

	return {
		login : function(permissoes) {

			var q = $q.defer();

			facebookConnectPlugin.login(permissoes, function(sucesso){
				q.resolve(sucesso);
			}, function(erro){
				q.reject(erro);
			});

			return q.promise;

		},

		logout: function(){

			var q = $q.defer();

			facebookConnectPlugin.logout(function(sucesso){
				q.resolve(sucesso);
			}, function(erro){
				q.reject(erro);
			});

			return q.promise;

		},

		api: function(metodo, permissoes) {

			var q = $q.defer();


			facebookConnectPlugin.api(metodo, permissoes, function(resultado){
				q.resolve(resultado);
			}, function(erro){
				q.reject(erro);
			});

			return q.promise;

		}
	}

});