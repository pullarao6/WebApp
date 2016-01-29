var express = require('express');
var router = express.Router();
var config = require('../utils/config');
/* GET home page. */
router.get('/', function(req, res) {
	res.render('pages/index', {
		title : 'Express',
		https_url : 'https://' + config.https.host + ':' + config.https.port
				+ '/',
		http_url : 'http://' + config.http.host + ':' + config.http.port + '/'
	});
});
module.exports = router;
