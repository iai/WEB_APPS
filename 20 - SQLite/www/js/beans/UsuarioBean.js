var UsuarioBean = {
	setNome : function(nome){
		localStorage.setItem('NomeUsuario', nome);
	},
	getNome : function(){
		return localStorage.getItem('NomeUsuario');
	},
	setLogado : function(logado){
		localStorage.setItem('LogadoUsuario', logado);
	},
	getLogado : function(){
		return localStorage.getItem('LogadoUsuario');
	},
	clear : function(){
		localStorage.clear();
	}
}