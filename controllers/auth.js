var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');
var passport = require('passport');
var config = require('../utils/config');

passport.serializeUser(function(user, done) {
	console.log("In Serialize: " + user);
	done(null, user._id);
});

passport.deserializeUser(function(userid, done) {
	User.UserModel.findById(userid, function(err, user) {
		done(err, user);
	});
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
	User.UserModel.findOne({
		email : username
	}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {
				message : 'Incorrect username.'
			});
		}
		user.verifyPassword(password, function(err, isMatch) {
			if (err) {
				return done(err);
			}

			// Password did not match
			if (!isMatch) {
				return done(null, false, {
					message : 'Incorrect password.'
				});
			}

			// Success
			return done(null, user);
		});
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
exports.isUserAuthenticated = function(req, res, next) {
	passport.authenticate('local-signin', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {			
			return res.render('pages/signin', {
				https_url : 'https://' + config.https.host + ':' + config.https.port
				+ '/',
				http_url : 'http://' + config.http.host + ':' + config.http.port + '/',
				message : "Invalid Username or Password"
			});
		}

		req.logIn(user, function(err) {			
			if (err) {
				return next(err);
			}			
			return res.redirect('/');			
		});
	})(req, res, next);
};