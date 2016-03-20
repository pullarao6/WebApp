exports.checkHTTPS = function(req, res, next) {
	if (req.socket.encrypted === undefined) {
		next();
	} else{
		next('route');
		}
}

exports.isLoggedIn = function (req, res, next) {

	console.log(req.isAuthenticated);
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/users/signin');
}