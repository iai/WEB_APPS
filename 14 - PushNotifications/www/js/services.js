meuAPP.service('PushService', function($q, $rootScope, GCM, $timeout, $ionicPlatform){

    function PushService() {

        var push;

        $ionicPlatform.ready(function(){

            //Verifica se já está registrado
            var registrado = localStorage.getItem('registrado');
            if(registrado) {

                iniciaPush({android : true});

                push.on('notification', function(notificacao){
                  console.log(angular.toJson(notificacao));
                    $timeout(function(){
                        $rootScope.$broadcast('PushRecebido', notificacao);
                    });

                });
            }

        });

        var iniciaPush = function(params) {

          var config = {};

          if(typeof(params) == "undefined")
                params = {};

            //Android?
            if(typeof(params.android) != "undefined" && params.android)
                config = {"android": {"senderID": GCM.senderID}};

            //iOS?
            if(typeof(params.ios) != "undefined" && params.ios)
                config.ios = {"alert": "true", "badge": "true", "sound": "true"};

            push = PushNotification.init(config);

        }

        
        this.registra = function(params) {
            
            var q = $q.defer();

            iniciaPush(params);

            push.on('registration', function(sucesso){
                localStorage.setItem('registrado', true);
                q.resolve(sucesso);
            });
            push.on('error', q.reject);

            return q.promise;
        }

    }

    return new PushService();

})