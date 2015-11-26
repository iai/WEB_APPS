services.factory('Banco', function($q, $ionicPlatform, NomeBanco){

	function Banco(){

		var db;
		var nome = NomeBanco;

		//Instancia o banco
		$ionicPlatform.ready(function(){
			
			if(window.sqlitePlugin){
				db = window.sqlitePlugin.openDatabase({
					name : nome,
					bgType : 0 //criar em background
				});
			}
			else
				db = window.openDatabase(nome, '1', 'descricao', 1024*1024*100);
			
		});

		this.criarBanco = function(){

			var query  = "CREATE TABLE IF NOT EXISTS usuarios (";
				query += "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ";
				query += "nome TEXT NOT NULL, ";
				query += "senha TEXT NULL, ";
				query += "foto BLOB NULL, ";
				query += "imagem TEXT NULL, ";
				query += "sincronizado INTEGER NULL, ";
				query += "idWS INTEGER NULL, ";
				query += "email TEXT NOT NULL)";

			return __executaQuery(query);

		}

		this.ultimoID = function(){
			return __executaQuery("SELECT MAX(idWS) AS id FROM usuarios");
		}

		this.itensNaoSincronizados = function(){
			return __executaQuery("SELECT id, nome, senha, foto, email FROM usuarios WHERE sincronizado IS NULL");
		}

		this.setaSincronizacao = function(idWS, id){
			return __executaQuery("UPDATE usuarios SET sincronizado = 1, idWS = ? WHERE id = ?", [idWS, id]);
		}

		this.inserirVarios = function(dados){

			var q = $q.defer();

			//Monta o sql
			var sql = "INSERT INTO usuarios (nome, imagem, email, sincronizado, idWS) VALUES (?, ?, ?, ?, ?)";

			//Monta as promessas
			var promessas = [];
			for(var temp in dados){

				//Monta os dados
				var item  = dados[temp];
				var binds = [item.Nome, item.Imagem, item.Email, 1, item.id]; 

				//Adiciona a promessa
				promessas.push(__executaQuery(sql, binds));

			}

			//Executa tudo
			$q.all(promessas).then(q.resolve, q.reject);

			return q.promise;

		}

		this.login = function(email, senha){

			var q = $q.defer();

			var sql = 'SELECT id, nome FROM usuarios WHERE email = ? AND senha = ?';

			__executaQuery(sql, [email, senha]).then(function(resultado){

				var total = resultado.rows.length;

				if(total > 0){

					var retorno = [];

					for(var i = 0; i < total; i++)
						retorno.push(resultado.rows.item(i));

					q.resolve(retorno);

				}
				else
					q.resolve(false);

			}, q.reject);

			return q.promise;

		}

		this.buscar = function(id){
			var q = $q.defer();

			var sql = 'SELECT id, nome, senha, foto, imagem, email FROM usuarios';

			if(id){
				sql += ' WHERE id = ?';
				id  = [id];
			}

			__executaQuery(sql, id).then(function(resultado){

				var total = resultado.rows.length;

				if(total > 0){

					var retorno = [];

					for(var i = 0; i < total; i++)
						retorno.push(resultado.rows.item(i));

					q.resolve(retorno);

				}
				else
					q.resolve(false);

			}, q.reject);

			return q.promise;
		}

		this.salvar = function(Usuario){

			var binds = [Usuario.nome, Usuario.senha, Usuario.foto, Usuario.email];

			var sql = "";
			if(Usuario.id){
				sql = "UPDATE usuarios SET nome = ?, senha = ?, foto = ?, email = ? WHERE id = ?";
				binds.push(Usuario.id);
			}
			else
				sql = "INSERT INTO usuarios (nome, senha, foto, email) VALUES (?, ?, ?, ?)";

			return __executaQuery(sql, binds);
		}

		this.apagar = function(id){
			return __executaQuery("DELETE FROM usuarios WHERE id = ?", [id]);
		}

		var __executaQuery = function(query, dados){

			var q = $q.defer();

			db.transaction(function(transacao){
				transacao.executeSql(query, dados, function(transacao, resultado){
					q.resolve(resultado);
				}, function(transacao, erro){
					q.reject(erro);
				});
			});

			return q.promise;

		}

	}

	return new Banco();

});