var mongodb = require('mongodb');
var config = require('./config');
var MongoClient = mongodb.MongoClient;
var mongoUrl = config.mongo.url + config.mongo.db;
var db;
exports.connect = function(callback) {
	MongoClient.connect(mongoUrl, function(err, database) {
		if (err) {
			throw err;
		}
		db = database;
		callback();
	});
};

exports.getDBConn = function() {
	return db;
};