var database = require("../util/database");
var assert = require('assert');
exports.insertDocument = function(req, callback) {
	var db = database.getDBConn();
	db.collection('manf').insert({
		name : req.body.name,
		branch : true,
		manf_id : req.body.tin,
		email : req.body.email,
		password : req.body.password,
		address : {
			street : req.body.address,
			city : req.body.city,
			state : req.body.state,
			country : req.body.country,
			pincode : req.body.pincode,
			landmark : 'Near Marathahalli Kalamandir'
		},
		phone_numbers : [ req.body.phone ],
		fax_numbers : [ '04021212349' ],
		verified : false
	}, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		console.log(result);
		// console.log("Inserted a document into the Manf collection.");
		callback(1);
	});
};