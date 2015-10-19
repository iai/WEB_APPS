meuAPP.service('ContatoService', function($q){

	function ContatoService() {

		this.buscar = function(opcoes) {

			var q = $q.defer();

			var campos = ['id', 'displayName'];
			if(typeof(opcoes.campos) != "undefined") {
				campos = opcoes.campos;
				delete opcoes.campos;
			}

			navigator.contacts.find(campos, function(resultados){
				q.resolve(resultados);
			}, function(erro){
				q.reject(erro);
			}, opcoes);

			return q.promise;

		},
		this.salvar = function(Contato){

			var q = $q.defer();

			var objContato = navigator.contacts.create(Contato);

			objContato.save(function(resultado){
				q.resolve(resultado);
			}, function(erro){
				q.reject(erro);
			});

			return q.promise;

		},
		this.remover = function(Contato) {

			var q = $q.defer();

			var objContato = navigator.contacts.create(Contato);

			objContato.remove(function(resultado){
				q.resolve(resultado);
			}, function(erro){
				q.reject(erro);
			});

			return q.promise;

		}

	}

	return new ContatoService();

});