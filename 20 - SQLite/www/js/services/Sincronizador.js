services.factory('Sincronizador', function($q, API, Banco){
	return {
		download : function(){

            var q = $q.defer();

            //Busca todos
            API.listar().then(function(usuarios){

                if(usuarios) {
                    var usuarios = usuarios.usuarios;
                    var dados = [];

                    //Verifica nosso último id
                    Banco.ultimoID().then(function(resultado){
                        if(resultado.rows && resultado.rows.length > 0) {
                            var id = resultado.rows.item(0).id;
                            for(var temp in usuarios) {
                                if(usuarios[temp].id == id)
                                    break;
                                else
                                    dados.push(usuarios[temp]);
                            }
                        }
                        else
                            dados = usuarios;

                        //Executa o insert
                        Banco.inserirVarios(dados).then(q.resolve, q.reject);


                    }, q.reject);

                }

            }, q.reject);

            return q.promise;

		},
		upload : function(){

            var q = $q.defer();

            Banco.itensNaoSincronizados().then(function(resultado){
                if(resultado.rows && resultado.rows.length > 0) {

                    //Loop os dados
                    var promessas = [];
                    var ids       = [];
                    for(var i = 0; i < resultado.rows.length; i++) {
                        var item  = resultado.rows.item(i);
                        var dados = {'nome' : item.nome, 'senha' : item.senha, 'email' : item.email, 'foto' : item.foto};

                        //Adiciona o envio
                        promessas.push(API.salvar(dados));

                        //Armazena os ids
                        ids.push(item.id);
                    }
                    
                    $q.all(promessas).then(function(retorno){
                        
                        //Coleta o retorno
                        var erros = [];
                        for(var temp in retorno) {
                            if(retorno[temp].status != "ok")
                                erros.push(retorno[temp].error);
                        }

                        if(erros.length == 0) {

                            //Seta na nossa base tudo o que foi atualizado
                            Banco.setaSincronizacao(ids).then(q.resolve, q.reject);

                        }
                        else
                            q.reject(erros);
                    }, q.reject);

                }
                else
                    q.resolve(true);
            }, q.reject);

            return q.promise;
			
		}
	}
})