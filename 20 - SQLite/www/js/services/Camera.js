services.factory('Camera', function($q){

	return {
		buscarFoto : function(){
			var q = $q.defer();

			var opcoes  = {
				quality : 80, targetWidth: 300, targetHeigth: 300, saveToPhotoAlbum : true,
				destinationType: Camera.DestinationType.DATA_URL
			};

			navigator.camera.getPicture(q.resolve, q.reject, opcoes);

			return q.promise;
		}
	}

});