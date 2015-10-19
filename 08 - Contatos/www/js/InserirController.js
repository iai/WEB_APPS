meuAPP.controller('InserirController', function($scope, ContatoService){

	$scope.itensSelect = [
		{ 'valor' : 'work', 'texto' : 'Trabalho' },
		{ 'valor' : 'home', 'texto' : 'Casa' },
	];


	$scope.salvar = function(valido, Contato) {

		if(valido) {

			//Objeto no formado requerido pelo plugin de contatos
			var dados = {
				'name': {
					'givenName' : Contato.PrimeiroNome,
					'familyName' : Contato.Sobrenome
				},
				'emails': [
					{'value' : Contato.Email, 'type' : 'home'},
					{'value' : Contato.Email, 'type' : 'work'}
				],
				'phoneNumbers' : [
					{'value': Contato.Telefone, 'type' : Contato.TelefoneTipo || 'work'}
				]
			};

			ContatoService.salvar(dados).then(function(resultado){
				$scope.sucesso = true;
			}, function(erro){
				console.error(erro);
			});

		}

	}

	$scope.limpar = function(formulario) {
		formulario.$setPristine();
		$scope.sucesso = false;
		$scope.Contato = false;
	}

});