chat.controller('LoginController', function($scope, $state) {
	
    $scope.login = {};
	$scope.entrar = function(){
        $state.go('chat', {'apelido': $scope.login.apelido});
	}
	
});
