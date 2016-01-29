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

router.get('/users/:id', authController.isAuthenticated,function(req, res, next) {
	userController.getUser(req,res);
});

router.get('/signin', function(req, res, next) {
	res.render('pages/signin', {
		https_url : 'https://' + config.https.host + ':' + config.https.port
				+ '/',
		http_url : 'http://' + config.http.host + ':' + config.http.port + '/'
	});
});

router.get('/signup', function(req, res, next) {
	res.render('pages/signup', {
		https_url : 'https://' + config.https.host + ':' + config.https.port
				+ '/',
		http_url : 'http://' + config.http.host + ':' + config.http.port + '/'
	});
})

router.post('/users/signin', authController.isUserAuthenticated);

router.post('/users/signup',userController.postUsers);

router.put('/:id', function(req, res) {

});
module.exports = router;
