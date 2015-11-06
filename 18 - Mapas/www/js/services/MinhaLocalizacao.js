services.factory('MinhaLocalizacao', function($q){

	return {
		meuLocal : function() {

			var q = $q.defer();

			if(navigator.geolocation) {

				navigator.geolocation.getCurrentPosition(function(position){

					q.resolve({'latitude' : position.coords.latitude, 'longitude' : position.coords.longitude});

				}, function(erro){
					q.reject(erro);
				}, {enableHighAccuracy : true});

			}
			else
				q.reject(false);


			return q.promise;

		},

		segueOsPassos : function(opcoes){

			var q = $q.defer();

			var seguidor_id = navigator.geolocation.watchPosition(function(position){
				q.notify(position);
			}, function(erro){
				q.reject(erro);
			}, opcoes);

			q.promise.naoSigaMais = function(){
				navigator.geolocation.clearWatch(seguidor_id);
			}

			return q.promise;

		}
	}

});