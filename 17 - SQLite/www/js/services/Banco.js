services.factory('Banco', function($q){

	function Banco() {

		var db;
		var nome = "exercicio.db";

		//Instancia conforme a plataforma
		if(window.sqlitePlugin) {

			db = window.sqlitePlugin.openDatabase({
				name: nome,
				bgType: 0
			});

		}
		else
			db = window.openDatabase(nome, '1', 'descricao', 1024*1024*100);

		this.criaBanco = function() {

			var query  = "CREATE TABLE IF NOT EXISTS usuarios (";
				query += "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "; 
				query += "nome TEXT NOT NULL, ";
				query += "foto BLOB NULL, ";
				query += "email TEXT NOT NULL)";

			return __executaQuery(query);

		}

		this.buscar = function(id) {
			var q = $q.defer();

			var sql = 'SELECT id, nome, foto, email FROM usuarios';

			if(id) {
				sql += ' WHERE id = ?';
				id = [id];
			}

			__executaQuery(sql, id).then(function(resultado){

				var total = resultado.rows.length;
				if(total > 0) {

					var retorno = [];

					for(var i = 0; i < total; i++)
						retorno.push(resultado.rows.item(i));

					q.resolve(retorno);

				}
				else
					q.resolve(false);

			}, q.reject)

			return q.promise;
		}

		this.salvar = function(Usuario) {

			var binds = [Usuario.nome, Usuario.email, Usuario.foto];

			if(Usuario.id) {
				var sql = "UPDATE usuarios SET nome = ?, email = ?, foto = ? WHERE id = ?";
				binds.push(Usuario.id);
			}
			else
				var sql = "INSERT INTO usuarios (nome, email, foto) VALUES (?, ?, ?)";

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