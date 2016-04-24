var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var Client = require('../models/client');
var Token = require('../models/token');
var config = require('../config/config.js');
var logger = require('../utils/logger');
var myapp_common = require('myapp-common');
var Manf = myapp_common.manf;

passport.serializeUser(function(user, done) {	
	done(null, user.manf_id);
});

passport.deserializeUser(function(userid, done) {
	Manf.findManfByTinId(userid, function(err,res) {
		if(err)
			done(err);
		else
			done(null,res);
	})
});

passport.use(new BasicStrategy(function(username, password, callback) {
	User.UserModel.findOne({
		email : username
	}, function(err, user) {
		if (err) {			
			return callback(err);
		}

		// No user found with that username
		if (!user) {
			return callback(null, false);
		}

		// Make sure the password is correct
		user.verifyPassword(password, function(err, isMatch) {
			if (err) {
				return callback(err);
			}

			// Password did not match
			if (!isMatch) {
				return callback(null, false);
			}

			// Success
			return callback(null, user);
		});
	});
}));

passport.use('client-basic', new BasicStrategy(function(username, password,
		callback) {
	Client.findOne({
		id : username
	}, function(err, client) {
		if (err) {
			return callback(err);
		}

		// No client found with that id or bad password
		if (!client || client.secret !== password) {
			return callback(null, false);
		}

		// Success
		return callback(null, client);
	});
}));

passport.use(new BearerStrategy(function(accessToken, callback) {
	Token.findOne({
		value : accessToken
	}, function(err, token) {
		if (err) {
			return callback(err);
		}

		// No token found
		if (!token) {
			return callback(null, false);
		}

		User.UserModel.findOne({
			_id : token.userId
		}, function(err, user) {
			if (err) {
				return callback(err);
			}

			// No user found
			if (!user) {
				return callback(null, false);
			}

			// Simple example with no scope
			callback(null, user, {
				scope : '*'
			});
		});
	});
}));

passport.use('local-signin', new LocalStrategy({passReqToCallback : true},function(req,username, password,
		done) {
	Manf.checkManfByEmailAndPassword(req.body, function(err, manf) {
		if(err)
			done(err);
		else
		{
		 if(manf){			 
			 done(null,manf);}
		}
	});
}));	
	
passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'tin',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, tin, password, done) {	
		logger.log('debug','saving the user in db');
    	Manf.saveManf(req.body,function(err, res){    		
    		if(err)
    			return done(err);
    		if(res === "already exists"){    			
    			return done(null, false, "user already exists");}
    		else if(res){    			
    			return done(null, res);}
    			    	
    	});        

}));


exports.isBearerAuthenticated = passport.authenticate('bearer', {
	session : false
});
exports.isClientAuthenticated = passport.authenticate('client-basic', {
	session : false
});
exports.isAuthenticated = passport.authenticate([ 'basic', 'bearer' ], {
	session : false
});

exports.saveUser = function(req, res, next){	
	passport.authenticate('local-signup', function(err, manf, info) {
		if(err){			
			return next(err);
		}
		if(!manf)
			{
			logger.log('error',"Signup Error as user already exists with::"+req.body.email);
			return res.status(400).json({state: false,'reason':'user already exists'});
			}
		logger.log('info',"Successful Sign up for the user");		
		logger.debug('signup session success for the user::'+req.body.email);			
		return res.json({state: true});
	})(req, res, next);
};

exports.isUserAuthenticated = function(req, res, next) {
	passport.authenticate('local-signin', function(err, manf, info) {
		if (err) {
			if(err.message === "invalid username or password")
			{
				logger.log('error',"Invalid Username and password for the request::");
				return res.render('pages/signin', {
					https_url : 'https://' + config.https.host + ':' + config.https.port
					+ '/',
					http_url : 'http://' + config.http.host + ':' + config.http.port + '/',
					message : "Invalid Username or Password"					
				});
			}
			else
				next(err);
		}		
		req.login(manf, function(err) {
			logger.debug("Successful Signin And Saving the user in the session::"+manf.email);
			if (err) {
				return next(err);
			}
			logger.debug("Successfully saved the session for::"+manf.email);
			return res.redirect('/');			
		});
	})(req, res, next);
};