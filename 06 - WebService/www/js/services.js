var meuServico = angular.module('WebService.services', []);

meuServico.factory('Usuarios', function($http, $q, EnderecoAPI){

	function Usuarios() {

		var hash_listar = "Hash=34a4d9f3b9658c7c0237aa031ab77046";
		var hash_salvar = "Hash=ea604dc1e9d0d36bb4e076450d135fa6";

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