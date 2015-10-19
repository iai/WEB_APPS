services.factory('GMaps', function($q, $window){

	function GMaps(){

		var chave = "AIzaSyB2XxRdIksv4sFYNwJNejp7pM0J4kAt-eQ";

		this.mapa = false;

		this.incluiMapa = function() {

			var q = $q.defer();

			$window.iniciouMapa = function() {
				q.resolve(google.maps);
			}

			var script  = document.createElement('script');
			script.type = "text/javascript";
			script.id   = "googleMaps";
			script.src  = "http://maps.google.com/maps/api/js?key="+chave+"&callback=iniciouMapa";
			document.body.appendChild(script);

			return q.promise;

		}

		var retornaLatLng = function(latitude, longitude){
			return new google.maps.LatLng(latitude, longitude);
		}

		this.carregaMapa = function(elemento, opcoes){

			var opcoesMapa = {
				center: retornaLatLng(opcoes.latitude, opcoes.longitude),
				zoom : 12,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			this.mapa = new google.maps.Map(elemento, opcoesMapa);

		}

		this.setaCentro = function(latitude, longitude) {

			var q = $q.defer();

			var meuLatLng = retornaLatLng(latitude, longitude);

			this.mapa.setCenter(meuLatLng);

			var marcador = new google.maps.Marker({
				map: this.mapa,
				position: meuLatLng
			});

			google.maps.event.addListener(this.mapa, 'idle', function(){
				q.resolve(true);
			});

			return q.promise;

		}

		this.marcaEndereco = function(endereco){

			var q = $q.defer();

			var geocoder = new google.maps.Geocoder();

			var self = this;

			geocoder.geocode({'address' : endereco}, function(resultado, status){

				if(status == google.maps.GeocoderStatus.OK){
					console.log(resultado);
					self.setaCentro(resultado[0].geometry.location.lat(), resultado[0].geometry.location.lng()).then(q.resolve, q.reject);

				}
				else
					q.reject(status);

			});


			return q.promise;

		}

	}

	return new GMaps();
});