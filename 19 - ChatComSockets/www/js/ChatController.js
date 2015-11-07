chat.controller('ChatController',function($scope, $stateParams, SocketService, $ionicScrollDelegate) {
  	
    $scope.mensagens = [];
    
    //Faz a conexão
    SocketService.on('connect',function(){
        
        //Envia o aviso de novo usuário
        SocketService.emit('add user', $stateParams.apelido);

        //Caso o login seja um sucesso avise
        SocketService.on('login', function () {
            
            atualizaChat({'usuario' : $stateParams.apelido, 'mensagem' : 'entrou'});
            
        });

        //Em caso de nova mensagem
        SocketService.on('new message', function (dados) {
            
            if(dados.message && dados.username)
                atualizaChat({'usuario' : dados.username, 'mensagem' : dados.message});

        });

        //Usuário entrou
        SocketService.on('user joined', function (dados) {
            atualizaChat({'usuario' : dados.username, 'mensagem' : 'entrou'})
        });

        //Usuário saiu
        SocketService.on('user left', function (dados) {
            atualizaChat({'usuario' : dados.username, 'mensagem' : 'saiu'});
        });

    });

    var atualizaChat = function(mensagem){
        $scope.mensagens.push(mensagem);
        $ionicScrollDelegate.scrollBottom();
    }

    $scope.chat = {};
    $scope.envia = function() {
        SocketService.emit('new message', $scope.chat.mensagem);
        atualizaChat({'usuario' : $stateParams.apelido, 'mensagem' : $scope.chat.mensagem});
        $scope.chat.mensagem = '';
    }

});