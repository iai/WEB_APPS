chat.factory('SocketService',function(socketFactory){
	
    //Conecta
 	var conector = io.connect('http://chat.socket.io');

  	conector = socketFactory({
    	ioSocket: conector
  	});
  	
	return conector;
})