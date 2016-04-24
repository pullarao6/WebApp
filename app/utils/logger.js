var winston = require('winston');
var winston_mongodb = require('winston-mongodb').MongoDB;
var config = require('../config/config.js');
winston.emitErrs = true;

var logger = new winston.Logger({
	transports : [ 
		new winston.transports.File({
		name : 'info-file',
		level : 'info',	
		filename : __dirname + '/../../logs/filelog-info.log',
		json : true,
		maxsize : 1242880, // 5MB
		maxFiles : 5,
		colorize : false,
		timestamp : true
	}),
		new winston.transports.Console({
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