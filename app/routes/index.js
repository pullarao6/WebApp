var express = require('express');
var hello = require('helloworld');
var router = express.Router();
var config = require('../config/config.js');
var authController = require('../controllers/auth');
var utility = require('../utils/utility');

/* GET home page. */

router.get('/', function(req,res,next){
	res.render('pages/mindex.ejs');
});

module.exports = router;
