var meusFiltros = angular.module('ControleUsuarios.filters', []);

meusFiltros.filter('linkBlank', function(){

	return function(str){
		return '<a href="'+str+'" target="_blank">'+str+'</a>';
	}

})