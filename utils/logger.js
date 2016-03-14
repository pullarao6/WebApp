var winston = require('winston');
var winston_mongodb = require('winston-mongodb').MongoDB;
var config = require('../utils/config');
winston.emitErrs = true;
var database = require('./database');
var mongoUrl = config.mongo.url + config.mongo.db_name;

var logger = new winston.Logger({
	transports : [ 
		new winston.transports.MongoDB({
			name:'info-logs',
			level: 'info',
			handleException : true,
			json : true,
			db : mongoUrl,
			collection : "log",
			storeHost : true
		  })
	   , new winston.transports.Console({
		level : 'debug',
		handleException : true,
		json : false,
		colorize : true,
		humanReadableUnhandledException: true
	}) ]/*
		 * , exceptionHandlers : [ new winston.transports.File({ filename :
		 * '../logs/filelog-exceptions.log' }) ]
		 */,
	exitOnError : false
});

module.exports = logger;
module.exports.stream = {
	write : function(message, encoding) {
		logger.info(message);
	}
};