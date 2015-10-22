angular.module('Imagens.controllers', [])
.controller('ImagensController', function($scope, Downloader, $ionicSlideBoxDelegate){


	$scope.baixarImagens = function() {
		executaDownload(1, $scope.quantidade);
	}

	var executaDownload = function(atual, total) {

		var url     = 'http://lorempixel.com/500/360/';
		var destino = cordova.file.externalDataDirectory + atual + ".png";
		var opcoes  = {};

		Downloader.download(url, destino, opcoes).then(function(sucesso){

			if(atual == total)
				$scope.baixou = true;
			else
				executaDownload(++atual, total);

		}, function(erro){
			console.error(erro);
		}, function(notificacao){
			$scope.progresso = (notificacao.loaded / notificacao.total)*100;
			$scope.textoProgresso = "Baixando a imagem "+atual;
		});

	}

	$scope.exibirImagens = function() {
		
		$scope.imagens = [];

		Downloader.leiaDiretorio(cordova.file.externalDataDirectory).then(function(arquivos){

			for(var i = 0; i < arquivos.length; i++)
				$scope.imagens.push(arquivos[i].toURL());

			$ionicSlideBoxDelegate.update();

		}, function(erro){
			console.error(erro);
		})

	}

	$scope.imagemAtual = 0;
	$scope.trocouImagem = function() {
		$scope.imagemAtual = $ionicSlideBoxDelegate.currentIndex();
	}

	$scope.proxima = function() {
		$ionicSlideBoxDelegate.next();
	}

})