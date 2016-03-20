var config = require('./config'),
cookieParser = require('cookie-parser'),
passport = require('passport');
module.exports = function(server, mongoStore) {		
		var io = require('socket.io')(server);
		var chat = io.of('/chat');
		io.use(function(socket, next) {			
			cookieParser(config.sessionSecret)(socket.request, {},function(err) {
			console.log(socket.request);
		var sessionId = socket.request.signedCookies['ESID'];						
		mongoStore.get(sessionId, function(err, session) {
		socket.request.session = session;
		passport.initialize()(socket.request, {}, function() {
		passport.session()(socket.request, {}, function() {
		if (socket.request.user) {		
			next(null, true);
		} else {
			next(new Error('User is not authenticated'), false);
		}
	});
	});
	});
	});
	});
	 chat.on('connection', function(socket){
		require('../controllers/chat')(chat, socket); 
	 });	
};	