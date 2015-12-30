var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://127.0.0.1:27017/sample';
var db;
exports.connect = function(callback) {
	MongoClient.connect(mongoUrl, function(err, database) {
		if (err)
			throw err;
		db = database;		
		callback();
	});
}

exports.getDBConn=function(){	
	return db;
};