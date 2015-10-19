controllers.controller('AplicativoController', function($scope, Banco){

	Banco.criaBanco().then(function(sucesso){
		console.log('Criou o banco');
	}, function(erro){
		console.error(erro);
	});

});