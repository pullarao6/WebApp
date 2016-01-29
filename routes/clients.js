var express = require('express');
var router = express.Router();
var assert = require('assert');
var config = require('../utils/config');
var clientController = require('../controllers/client');
var authController = require('../controllers/auth');
router.use(function(req, res, next) {
	console.log('Time:', Date.now());
	next();
});

router.get('/', authController.isClientAuthenticated, function(req, res, next) {
	clientController.getClients(req, res);
});

router.post('/',function(req, res, next) {
	clientController.postClients(req, res);
});

module.exports = router;
