directives.directive('compareCom', function(){

	return {
		restrict : 'A',
		require  : 'ngModel',
		scope : {
			outroModel : '=compareCom'
		},
		link : function(scope, elemento, atributos, ngModel){

			//Aplica o validator
			ngModel.$validators.compareCom = function(valorCampo){
				return valorCampo === scope.outroModel;
			}

			//Ativa a validação o tempo todo
			scope.$watch('outroModel', function(){
				ngModel.$validate();
			})

		}
	}

});