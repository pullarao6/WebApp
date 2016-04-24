module.exports = function(io, socket){	
		  var otherSocket;
		  console.log("a user connected with id:::"+socket.id);
		  socket.join("MyGroup");
		  socket.on('chatMessage', function(from, msg){		  
		      var msgArray = msg.split(' ');
		      var toAddr = msgArray[1];
		      console.log("To:::::"+toAddr);	      	    
		    /*
			 * otherSocket = chat.connected[toAddr]; if( otherSocket ){
			 * console.log(otherSocket.id); otherSocket.emit( 'chatMessage',
			 * from, msg); }
			 */  		
		     io.in("MyGroup").emit('chatMessage', from, msg);
		    
		  });
		  
		  socket.on('notifyUser', function(user){
		    io.emit('notifyUser', user);
		  });
		  
		  socket.on('disconnect', function() {
			 
		  });
};