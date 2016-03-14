var express = require('express');
var router = express.Router();
var assert = require('assert');
var config = require('../utils/config');
var userController = require('../controllers/user');
var authController = require('../controllers/auth');

router.use(function(req, res, next) {
	console.log('Time:', Date.now());
	next();
});

function isLoggedIn(req, res, next) {
	
	// if user is authenticated in the session, carry on
	if (!req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

router.get('/users/:id', authController.isAuthenticated, function(req, res,
		next) {
	console.log("hello");
	userController.getUser(req, res);
});

router.get('/signin', function(req, res, next) {
	if (req.socket.encrypted === undefined) {
		res.redirect('https://' + config.https.host + ":" + config.https.port+"/users/signin");
	} else{
		next();}
}, isLoggedIn, function(req, res, next) {
	res.render('pages/signin', {
		https_url : 'https://' + config.https.host + ':' + config.https.port
				+ '/',
		http_url : 'http://' + config.http.host + ':' + config.http.port + '/',
		message : ""
	});
});

router.get('/signup', function(req, res, next) {
	res.render('pages/signup', {
		https_url : 'https://' + config.https.host + ':' + config.https.port
				+ '/',
		http_url : 'http://' + config.http.host + ':' + config.http.port + '/',
		message : ""
	});
})

router.post('/signin', userController.checkUser);

router.post('/signup', userController.saveUser);

//router.post('/users/signup', authController.signup);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.put('/:id', function(req, res) {

});
module.exports = router;
