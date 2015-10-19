directives.directive('mapa', function(GMaps){

	return {
		restrict: 'E',
		scope: {
			online: '=',
			onCreate: '&'
		},
		link: function(scope, elemento, atributos){

			function inicia() {
				
				GMaps.carregaMapa(elemento[0], {latitude : '51.483552', longitude: '-0.007702'});

				scope.onCreate({mapa : GMaps.mapa});
			}

			scope.$watch('online', function(online){
				if(online && typeof(google) != "undefined" && typeof(google.maps) != "undefined")
					inicia();
			});

		}
	}

})