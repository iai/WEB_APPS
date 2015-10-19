app.factory('Notificacoes', function($q, $ionicPlatform, $timeout, $rootScope){

	$ionicPlatform.ready(function(){

		window.cordova.plugins.notification.local.on('click', function(notificacao, status){

			$timeout(function(){
				$rootScope.$broadcast('Notificacoes:click', notificacao, status);
			});

		});

	});

	return {
		agendar : function(opcoes) {
			var q = $q.defer();

			window.cordova.plugins.notification.local.schedule(opcoes, function(sucesso) {
				q.resolve(sucesso);
			}, function(erro){
				q.reject(erro);
			})

			return q.promise;
		}
	}

	return {};

});