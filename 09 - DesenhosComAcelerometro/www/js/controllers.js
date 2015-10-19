var controlador = angular.module('QuadroBranco.controllers', []);

controlador.controller('QuadroBrancoController', function($scope, Acelerometro){

	$scope.cores = {
		'black' : '#000', 'red' : '#c22',
		'green' : '#2c2', 'blue' : '#22c',
		'white' : '#fff'
	}

	$scope.cor_selecionada = 'black';
	$scope.escolheCor = function(cor){
		$scope.cor_selecionada = cor;
	}

	$scope.limpar = false;

	$scope.iniciaAcelerometro = function() {
		var opcoes = {frequency: 1000};
		$scope.acelerometro = Acelerometro.buscaAceleracao(opcoes);

		$scope.acelerometro.then(null, function(erro){
			console.log(erro);
			$scope.acelerometro.limpaAceleracao();
		}, function(aceleracao) {
			$scope.aceleracao = aceleracao;
		});

	}

	$scope.terminaAcelerometro = function(){
		$scope.acelerometro.limpaAceleracao();
		$scope.aceleracao = false;
	}

	$scope.salvarImagem = function(canvas) {

		$scope.arquivo = canvas.toDataURL('image/png');

		window.plugins.socialsharing.share(
			'Mensagem',
			'Titulo',
			$scope.arquivo,
			'Link'
		);

/*
		window.plugins.socialsharing.shareViaFacebook(
			'Mensagem',
			$scope.arquivo,
			'Link',
			function(sucesso) {},
			function(erro) {}
		);

/*
		window.plugins.socialsharing.shareViaEmail(
			'Conteúdo do e-mail',
			'Assunto',
			['para@email.com', 'outro@email.com'],
			['copia@email.com'],
			['copia-oculta@email.com'],
			[$scope.arquivo],
			function(sucesso) {},
			function(erro) {}
		);
*/
	}

});