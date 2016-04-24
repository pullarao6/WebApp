var config = require('../config'),
cookieParser = require('cookie-parser'),
passport = require('passport');

module.exports = function(server)
{
var io = require('socket.io')(server);
var chat = io.of('/chat');

io.use(function(socket, next) {
	console.log(socket.request.user);
	next(null, true);
});

chat.on('connection', function(socket){
	  var otherSocket;
	  console.log("a user connected with id:::"+socket.id);
	  socket.join("MyGroup");
	  socket.on('chatMessage', function(from, msg){		  
	      var msgArray = msg.split(' ');
	      var toAddr = msgArray[1];
	      console.log("To:::::"+toAddr);	      	    
	    /*
		 * otherSocket = chat.connected[toAddr]; if( otherSocket ){
		 * console.log(otherSocket.id); otherSocket.emit( 'chatMessage', from,
		 * msg); }
		 */  		
	     chat.in("MyGroup").emit('chatMessage', from, msg);
	    
	  });
	  socket.on('notifyUser', function(user){
	    chat.emit('notifyUser', user);
	  });
	});
}