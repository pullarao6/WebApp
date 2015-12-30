var express = require('express');
var router = express.Router();
var assert = require('assert');
var Users = require('../models/users');

router.use(function(req, res, next) {
	console.log('Time:', Date.now());
	next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('pages/login');
});

router.get('/:id', function(req, res, next) {
	/*
	 * res.send({ user : req.params.id });
	 */
	var err = new Error('Password Not matched');
	err.status = 302;
	next(err);
});

router.post('/signin', function(req, res, next) {
	console.log("Request Received for SignnApi");

});

router.post('/signup', function(req, res, next) {	
	Users.insertDocument(req,function(status){
		if(status==1)
			{
				res.status(201).send("Account created successfully");
			}		
	});
});

router.put('/:id', function(req, res) {

});
module.exports = router;
