var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var logger = require("./utils/logger");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var app = express();
var options = {
	setHeaders : function(res, path) {
		if (path.indexOf("download") !== -1) {
			res.attachment(path);
		}
	},
	redirect : true,
	index : false
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
logger.debug("Overriding 'Express' logger");
app.use(morgan("default",{ "stream": logger.stream }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'), options));
//app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended : true
})); // support encoded bodies
app.use('/', routes);
app.use('/api/users', users);
app.use('/signin',users);
app.use('/api/products', products);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Page Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		console.log("In Dev Error Handler");
		if (err.status === 404) {
			console.log("Page Not Found");
			res.status(404).sendFile(__dirname + '/public/images/404.jpg');
		} else {
			return next(err);
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
