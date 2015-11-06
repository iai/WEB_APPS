angular.module('Twitter.services', ['ngCordovaOauth'])

.factory('Conector', function($q, $cordovaOauth, $cordovaOauthUtility, $http){

	var apiID        = "18DlhKTfFg9qyqIlnZtgMJgGs";
	var apiSecretKey = "byeHuoIs7DKSLlkHvvuiVG0NftS25tqrWOdiXx2H6FLz3fEIZu";

	function criaAssinatura(url){

		var token = angular.fromJson(localStorage.getItem('meuToken'));

		var oAuth = {
			oauth_consumer_key: apiID,
			oauth_nonce: $cordovaOauthUtility.createNonce(10),
			oauth_signature_method: 'HMAC-SHA1',
			oauth_token: token.oauth_token,
			oauth_timestamp: Math.round((new Date().getTime() / 1000)),
			oauth_version: '1.0'
		}

		var assinatura = $cordovaOauthUtility.createSignature('GET', url, oAuth, {}, apiSecretKey, token.oauth_token_secret);

		$http.defaults.headers.common.Authorization = assinatura.authorization_header;
	}

	return {
		iniciar : function(){

			var q = $q.defer();

			var token = localStorage.getItem('meuToken');
			if(token)
				q.resolve(true);
			else {

				$cordovaOauth.twitter(apiID, apiSecretKey).then(function(token){
					localStorage.setItem('meuToken', angular.toJson(token));
					q.resolve(true);
				}, function(erro){
					console.error(erro);
					q.reject(false);
				})

			}

			return q.promise;

		},
		autenticado : function(){
			return (localStorage.getItem('meuToken') !== null);
		},
		minhaTimeline : function() {

			var q = $q.defer();

			var url = "https://api.twitter.com/1.1/statuses/home_timeline.json";
			criaAssinatura(url);

			var tweets = $http.get(url);

			tweets.then(function(resultado){
				if(resultado.data)
					q.resolve(resultado.data);
				else
					q.reject('Dados não encontrados');
			}, function(erro){
				q.reject(erro);
			})

			return q.promise;
			
		}
	};

})