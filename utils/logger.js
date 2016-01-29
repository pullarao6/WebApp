var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
	transports : [ new winston.transports.File({
		name : 'error-file',
		level : 'error',
		filename : __dirname + '/../logs/filelog-error.log',
		json : true,
		maxsize : 5242880, // 5MB
		maxFiles : 5
	}), new winston.transports.File({
		name : 'info-file',
		level : 'info',
		filename : __dirname + '/../logs/filelog-info.log',
		json : true,
		maxsize : 5242880, // 5MB
		maxFiles : 5,
		colorize : false
	}), new winston.transports.Console({
		level : 'debug',
		handleException : true,
		json : false,
		colorize : false
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