angular.module('Imagens.services', [])
.factory('Downloader', function($q){

	return {
		download : function(url, destino, opcoes) {

			var q = $q.defer();

			var ponteiro = new FileTransfer();

			ponteiro.onprogress = function(progresso){
				q.notify(progresso);
			};

			var confiarEmTudo = true;
			ponteiro.download(url, destino, q.resolve, q.reject, confiarEmTudo, opcoes);

			return q.promise;

		},

		leiaDiretorio: function(diretorio) {

			var q = $q.defer();

			window.resolveLocalFileSystemURL(diretorio, function(objDiretorio){
				var leitor = objDiretorio.createReader();
				leitor.readEntries(q.resolve, q.reject);
			}, function(erro){
				q.reject(erro);
			})

			return q.promise;

		}
	}

});