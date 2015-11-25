services.factory('API', function($q, $http, EnderecoAPI){

	function API(){

		var hash_listar = "34a4d9f3b9658c7c0237aa031ab77046";
		var hash_salvar = "ea604dc1e9d0d36bb4e076450d135fa6";

		this.listar = function(){
			return __chamaAPI('listar_usuarios', hash_listar);
		}

		this.buscar = function(id){
			return __chamaAPI('listar_usuarios/'+id, hash_listar);
		}

		this.salvar = function(Usuario){

			var dados = "Nome="+Usuario.nome+'&Email='+Usuario.email+'&Senha='+Usuario.senha+'&Foto='+Usuario.foto;

			return __chamaAPI('salva_usuario', hash_salvar, dados);

		}

		var __chamaAPI = function(metodo, hash, dados){

			var q = $q.defer();

			if(dados)
				dados += "&Hash="+hash;
			else
				dados = "Hash="+hash;

			var headers = {};
			headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=utf-8';
			headers["Hash"] = hash;

			$http({
				url : EnderecoAPI.url + '/' + metodo,
				headers : headers,
				method : "POST",
				data : dados
			}).then(function(retorno){

				if(retorno.data)
					q.resolve(retorno.data);
				else
					q.reject('Erro na requisição');

			}, q.reject);

			return q.promise;

		}

	}

	return new API();

})