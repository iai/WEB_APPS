angular.module('AudioVideo.controllers', [])

.controller('AudioVideoController', function($scope, GerenciaAudio, $ionicModal, $ionicLoading){

	$scope.musicas = [
		{artista: 'Beatles', musica: 'beatles.mp3'},
		{artista: 'Eric Clapton', musica: 'eric.mp3'},
		{artista: 'Led Zeppelin', musica: 'led.mp3'},
		{artista: 'Engenheiros do Hawaii', musica: 'engenheiros.mp3'}
	];

	$scope.abreVideo = function() {
		$ionicLoading.show();
		$ionicModal.fromTemplateUrl('views/modal.html', {scope : $scope}).then(function(modal){
			$scope.modal = modal;
			$scope.modal.show();
			$ionicLoading.hide();
		});
	}

	$scope.fechaVideo = function(){
		$scope.modal.hide();
	}

	var meuAudio;
	$scope.incluiNoPlayer = function(itemMusica) {

		if(meuAudio)
			$scope.stop();

		var pasta = ionic.Platform.platform();
		    pasta = pasta == "android" ? cordova.file.applicationDirectory+'www/' : '';

		meuAudio = GerenciaAudio.associaMidia(pasta+'musicas/'+itemMusica.musica);

		meuAudio.then(function(sucesso){
			alert('Encontrou: '+sucesso);
			$scope.play();
		}, function(erro){
			for(var temp in erro)
				alert(temp+':'+erro[temp]);
		})

		$scope.tocando = itemMusica;

	}

	$scope.play = function() {
		meuAudio.play();
	}

	$scope.pause = function(){
		meuAudio.pause();
	}

	$scope.stop = function(){
		meuAudio.stop();
	}

	$scope.volume = 100;
	$scope.alteraVolume = function(volume) {
		meuAudio.alteraVolume(volume/100);
	}

})