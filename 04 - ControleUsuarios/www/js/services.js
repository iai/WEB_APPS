var meuServico = angular.module('ControleUsuarios.services', []);

meuServico.factory('Usuarios', function(){

	var dadosUsuarios = localStorage.getItem('dados');
	if(!dadosUsuarios)
		dadosUsuarios = [];
	else
		dadosUsuarios = JSON.parse(dadosUsuarios);

	return {
		todos : function() {
			return dadosUsuarios;
		},
		salvar : function(Usuario) {

			var indice = dadosUsuarios.length;
			dadosUsuarios[indice] = Usuario;
			localStorage.setItem('dados', JSON.stringify(dadosUsuarios));

		},
		apagar : function(index) {
			dadosUsuarios.splice(index, 1);
			localStorage.setItem('dados', JSON.stringify(dadosUsuarios));
		},
		buscaPorIndice : function(index){
			return dadosUsuarios[index];
		}

	};
	
});