angular.module('AudioVideo.services', [])

.factory('GerenciaAudio', function($q){

	function GerenciaAudio() {

		this.associaMidia = function(src){

			var q = $q.defer();

			var midia;
			var statusMidia;

			midia = new Media(src, function(sucesso){
				q.resolve(sucesso);
			}, function(erro){
				q.reject(erro);
			}, function(status){

				var statusPossiveis = {};
					statusPossiveis[Media.MEDIA_NONE]     = 'Arquivo não encontrado';
					statusPossiveis[Media.MEDIA_STARTING] = 'Áudio iniciado';
					statusPossiveis[Media.MEDIA_RUNNING]  = 'Áudio tocando';
					statusPossiveis[Media.MEDIA_PAUSED]   = 'Audio pausado';
					statusPossiveis[Media.MEDIA_STOPPED]  = 'Áudio parado';

				statusMidia = {codigo : status, texto : statusPossiveis[status] || 'Status desconhecido'};

			});

			q.promise.play = function(opcoes) {
				if(typeof(opcoes) == 'undefined')
					opcoes = {};

				midia.play(opcoes);
			}

			q.promise.pause = function(){
				midia.pause();
			}

			q.promise.stop = function() {
				midia.stop();
			}

			q.promise.alteraVolume = function(volume){
				midia.setVolume(volume);
			}

			q.promise.midia = midia;

			return q.promise;

		}

	}

	return new GerenciaAudio();
	
})