// grab the things we need
var mongoose = require('mongoose');
var config = require('../utils/config');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
	name : {
		type : String,
		required : true
	},
	branch : {
		type : String,
		required : true
	},
	manf_id : {
		type : String,
		required : true,
		unique : true
	},
	email : {
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true
	},
	address : {
		street : String,
		city : String,
		state : String,
		country : String,
		pincode : Number,
		landmark : String
	},
	phone_numbers : Array,
	fax_numbers : Array,
	verified : Boolean
});

userSchema.pre('save', function(callback) {
	var user = this;

	// Break out if the password hasn't changed
	if (!user.isModified('password'))
		return callback();

	// Password changed so we need to hash it
	bcrypt.genSalt(5, function(err, salt) {
		if (err)
			return callback(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err)
				return callback(err);
			user.password = hash;
			callback();
		});
	});
});

userSchema.methods.verifyPassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err)
			return cb(err);
		cb(null, isMatch);
	});
};
// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('USER', userSchema);

exports.postUsers = function(req, res) {
	var UserModel = new User({
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
	});

	User.count({
		$or : [ {
			manf_id : req.body.tin
		}, {
			email : req.body.email
		} ]
	}, function(err, count) {
		if (count == 0) {
			UserModel.save(function(err) {
				if (err)
					res.send(err);
				else {
					if (req.body.reqType === 'mobile')
						res.json({
							message : 'Account created!'
						});
					else
						res.render('pages/signin', {
							https_url : 'https://' + config.https.host + ':'
									+ config.https.port + '/',
							http_url : 'http://' + config.http.host + ':'
									+ config.http.port + '/'
						});
				}
			});
		} else
			res.send("user already exists");
	});
};
exports.checkUser = function(req, res, callback) {
	User.count({
		email : req.body.username,
		password : req.body.password
	}, function(err, count) {
		if (count === 1)
			callback(1);
		else
			callback(0);
	});
};
exports.getUser = function(req, res, callback) {
	if (req.user._id != req.params.id) {
		var user_status = "UnAuthorized";
		callback(null, null, user_status);
	} else {
		User.findById(req.params.id, function(err, result) {
			var user_status = null;
			callback(err, result, user_status);
		});
	}
};

exports.putUser = function(req, res) {
	User.findOne({
		email : req.body.email
	}, function(err, user) {
		if(err)
			res.send(err);
		else
			{
			user.password = req.body.password;
			user.save(function(err){
			if (err)
				res.send(err);

			res.json(product);
		});}
	});
};
// make this available to our users in our Node applications
exports.UserModel = User;