var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var moment = require('moment');

var app = express();
var logger = require("./utils/logger");
var authController = require('./controllers/auth');
var index = require('./routes/hindex');
var users = require('./routes/users');
var clients = require('./routes/clients');
var oauth2 = require('./routes/oauth2');
var products = require('./routes/products');

var d = new Date();
d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
console.log(d);
var session_options = {
	cookie : {
		expires : d,
		httpOnly : true,
		secure : false,
	},
	name : 'ESID',
	secret : 'pop and lol are friends',
	resave : false,
	saveUnintialized : false,
	store : new MongoStore({
		mongooseConnection : mongoose.connection,
		touchAfter : 24 * 3600, // time period in seconds
		autoRemove : 'disabled'
	})
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
logger.debug("Overriding 'Express' logger");
app.use(morgan("default", {
	"stream" : logger.stream
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(session(session_options));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/api/oauth2', oauth2);
app.use('/api', users);
app.use('/users', users);
app.use('/api/clients', clients);
app.use('/api', products);
// catch 404 and forward to error handler
app.use(function(req, res) {
	var err = new Error('Page Not Found');
	//err.status = 404;
	//next(err);
	//throw err;
	res.send('hello');
	res.send('world');
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		console.log(err);
		console.log("In Dev Error Handler");		
		if (err.status === 404) {
			console.log("Page Not Found");
			res.status(404).sendFile(__dirname + '/public/images/404.jpg');
		} else {
			//res.status(err.status || 500).send(err);
			next(err);
		}
	});
}

/*
 * // production error handler // no stacktraces leaked to user var
 * prodErrorHandler = function(err, req, res, next) { res.status(err.status ||
 * 500); res.render('error', { message : err.message, error : {} }); };
 * 
 * app.use(prodErrorHandler);
 */

module.exports = app;
