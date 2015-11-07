angular.module('BlueTooth.services', [])
.factory('BlueToothService', function($q){

    function BlueToothService(){

        var inicia = function(params) {
            var q = $q.defer();
            window.bluetoothle.initialize(
                function(obj) {
                    q.resolve(obj);
                },
                function(obj) {
                    q.reject(obj);
                },
                params
            );
            return q.promise;
        };

        this.iniciaBusca = function(params) {
            var q = $q.defer();

            inicia({request : true}).then(function(iniciou){
                console.log(angular.toJson(iniciou));
                window.bluetoothle.startScan(
                    function(obj) {
                        q.notify(obj);
                    },
                    function(obj) {
                        q.reject(obj);
                    },
                    params
                );
            }, q.reject);
            
            return q.promise;
        };

        this.paraBusca = function() {
            var q = $q.defer();
            window.bluetoothle.stopScan(
                function(obj) {
                    q.resolve(obj);
                },
                function(obj) {
                    q.reject(obj);
                }
            );
            return q.promise;
        };

    }

    return new BlueToothService();

});