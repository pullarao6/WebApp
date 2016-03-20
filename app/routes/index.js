var express = require('express');
var hello = require('helloworld');
var router = express.Router();
var config = require('../config/config.js');
var authController = require('../controllers/auth');
var utility = require('../utils/utility');

/* GET home page. */


router.get('/', function(req, res, next) {
	if (req.socket.encrypted === undefined) {
		next();		
	} else{
		next('route');}
},function(req, res,next) {
	res.render('pages/index', {
		title : 'Express',
		https_url : 'https://' + config.https.host + ':' + config.https.port
				+ '/',
		http_url : 'http://' + config.http.host + ':' + config.http.port + '/'
	});
});

router.get('/', utility.isLoggedIn, function(req,res){console.log(hello);res.send(hello);});
module.exports = router;
