var oauth2Controller = require('../controllers/oauth2');
var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

router.get('/authorize',authController.isAuthenticated, oauth2Controller.authorization);

router.post('/authorize',authController.isAuthenticated, oauth2Controller.decision);

router.post('/token',authController.isClientAuthenticated, oauth2Controller.token);

module.exports = router;