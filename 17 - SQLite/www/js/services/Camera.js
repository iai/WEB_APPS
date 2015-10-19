services.factory('Camera', function($q){

	return {
		buscarFoto: function(){

			var opcoes = {quality : 70, targetWidth: 200, targetHeigth: 200, saveToPhotoAlbum: true, destinationType: Camera.DestinationType.DATA_URL};

			var q = $q.defer();

			navigator.camera.getPicture(function(result){
				q.resolve(result);
			}, function(erro){
				q.reject(erro);
			}, opcoes);

			return q.promise;
		}
	}

});