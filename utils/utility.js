exports.checkHTTPS = function(req, res, next) {
	if (req.socket.encrypted === undefined) {
		next();
	} else{
		next('route');
		}
}