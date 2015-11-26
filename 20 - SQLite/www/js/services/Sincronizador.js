services.factory('Sincronizador', function($q, API, Banco){
	return {
		download : function(){

			var q = $q.defer();

			API.listar().then(function(resultado){

				if(resultado.status == "ok"){
					var usuarios = resultado.usuarios;
					var dados    = [];

					//Verifica o nosso último id
					Banco.ultimoID().then(function(ultimo_id){

						if(ultimo_id.rows && ultimo_id.rows.length > 0){
							var id = ultimo_id.rows.item(0).id;
							for(var temp in usuarios){
								if(usuarios[temp].id == id)
									break;
								else
									dados.push(usuarios[temp]);
							}
						}
						else
							dados = usuarios;

						//Executa a inserção
						Banco.inserirVarios(dados).then(q.resolve, q.reject);

					}, q.reject);

				}
				else
					q.reject(resultado.error);

			}, q.reject);

			return q.promise;

		},
		upload : function(){
			
			var q = $q.defer();

			Banco.itensNaoSincronizados().then(function(resultado){

				if(resultado.rows && resultado.rows.length > 0){

					var promessas = {};
					for(var i = 0; i < resultado.rows.length; i++){
						var item = resultado.rows.item(i);

						//Monta os dados para a API
						var dados = {'nome' : item.nome, 'senha' : item.senha, 'email' : item.email, 'foto' : item.foto};

						//Adiciona o envio
						promessas[item.id] = API.salvar(dados);
					}

					//Executa todos
					$q.all(promessas).then(function(retorno){

						//Coleta erros
						var erros = [];
						for(var id in retorno){
							if(retorno[id].status != "ok")
								erros.push(retorno[id].error);
						}

						//Não encontrou erros?
						if(erros.length == 0){

							for(var id in retorno){
								Banco.setaSincronizacao(retorno[id].id, id).then(q.resolve, q.reject);
							}

						}
						else
							q.reject(erros);

					})

				}
				else
					q.resolve(true);

			}, q.reject)

			return q.promise;
		}
	}
})