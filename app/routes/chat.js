var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var authController = require('../controllers/auth');
var utility = require('../utils/utility');

router.get('/', function(req,res,next){
	res.render('pages/chat',{title:'Chat Application'});
});

module.exports = router;