var express = require('express');
var router = express.Router();
var assert = require('assert');
var config = require('../config/config.js');
var userController = require('../controllers/user');
var authController = require('../controllers/auth');
var jwtauth = require('../lib/jwtauth');


router.use(function(req, res, next) {
	console.log('Time:', Date.now());
	next();
});

router.get('/:id', jwtauth, function(req, res,next) {	
	userController.getUserById(req, res);
});

//route for authentication and for issuing json web token 
router.post('/authenticate',userController.authenticate);

//route for signing up new users
router.post('/signup', userController.saveUser);

router.put('/:id', function(req, res) {

	router.get('/secret', jwtauth, function(req, res,next) {	
		userController.getUserById(req, res);
	});
});
module.exports = router;
