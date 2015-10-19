app.controller('LembreteController', function($scope, Notificacoes){


	$scope.lembrar = function(mensagem){

		var agora = new Date().getTime();
		var tempo = new Date(agora + 20 * 1000); //20 segundos

		var parametros = {
			id: 1,
			text : mensagem,
			title: 'Lembrete legal',
			at: tempo,
			data : {
				meuParametroBonito: 'valor qualquer que preciso passar'
			},
			badge: 1
			//firstAt: tempo,
			//every : 'week',
			//icon : 'icone.png',
			//smallIcon: 'icone-pequeno.png',
			//sound: null
		};

		$scope.sucesso = false;
		$scope.erro    = false;
		Notificacoes.agendar(parametros).then(function(sucesso){
			$scope.sucesso = true;
		}, function(erro){
			$scope.erro = true;
		});

	}

});