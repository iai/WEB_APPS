var meuServico = angular.module('WebService.services', []);

meuServico.factory('Usuarios', function($http, $q, EnderecoAPI){

	function Usuarios() {

		var hash_listar = "Hash=ec28a389ac568b42541edc862e7175a8";
		var hash_salvar = "Hash=c18cb0b3ba476e5bc451c54ea2a9c251";

		this.todos = function() {
			return __callAPI('listar_usuarios', hash_listar);
		};

		this.buscar = function(id) {
			return __callAPI('listar_usuarios/'+id, hash_listar);
		};

		this.salvar = function(Usuario) {

			var dados = "Nome="+Usuario.nome+"&Email="+Usuario.email;

			return __callAPI('salva_usuario', hash_salvar, dados);

		};

		var __callAPI = function(metodo, hash, dados) {

			if(dados)
				dados += "&"+hash;
			else
				dados = hash;

			var q = $q.defer();

			$http.post(EnderecoAPI.url+metodo, dados).success(function(retorno){
				
				if(retorno.status == "ok")
					q.resolve(retorno);
				else
					q.reject(retorno.error);

			}).error(function(erro){
				q.reject(erro);
			});

			return q.promise;

		};

	}

	return new Usuarios();

});