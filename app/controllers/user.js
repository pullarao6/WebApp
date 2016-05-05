var authController = require('./auth');
var logger = require('../utils/logger');    
var myapp_common = require('myapp-common');
var config = require('../config/config.js');
var jwt = require('jsonwebtoken');
var Manf = myapp_common.manf;

var getErrorMessage = function(err) {
	if (err.errors) {
		for ( var errName in err.errors) {
			if (err.errors[errName].message)
				return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};
	
// create a new user
exports.saveUser = function(req, res, next) {
	logger.info("Request Received for saving a user::"+req.body.email,{request:req.body});
	authController.saveUser(req, res, next);
};

exports.authenticate = function(req,res,next){
	console.log(req.body);
	Manf.checkManfByEmailAndPassword(req.body,function(err,manf){
	  if(err){
		if(err.message === "invalid username or password")
		{
			logger.log('error',"Invalid Username and password for the request::");
			res.status(401).json({ state: false, reason: 'Authentication failed. Invalid Username or Password.' });
		}
		else
			next(err);
	}
	  else{
		  var temp = {'manfid':manf._id}
		  var token = jwt.sign(temp, config.superSecret,{
			  expiresInMinutes: 1440
		  });

	        // return the information including token as JSON
	        res.json({
	          state: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
		  }
	  });
};

exports.getUserById = function(req,res){
	Manf.findManfById(req.decoded.manfid,function(err,result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
}