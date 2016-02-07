var express = require('express');
var hello = require('helloworld');
var router = express.Router();
var config = require('../utils/config');
var authController = require('../controllers/auth');
/* GET home page. */
function isLoggedIn(req, res, next) {

	console.log(req.isAuthenticated);
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/users/signin');
}

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

router.get('/',isLoggedIn,function(req,res){console.log(hello);res.send(hello);});
module.exports = router;
