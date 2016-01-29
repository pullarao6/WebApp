// grab the user model
var user = require('../models/user');
// create a new user
exports.postUsers = function(req, res) {
	user.postUsers(req, res);
};
exports.checkUser = function(req, res) {
	user.checkUser(req, res, function(status) {
		if (status === 1) {
			res.send("Login Success");
		} else
			res.send("Login Failed");
	});
};
exports.getUser = function(req, res) {
	user.getUser(req, res, function(err, user_details, status) {
		if (status)
			res.send(status);
		else {
			if (err)
				res.send("Error in db query");
			else
				res.send(user_details);
		}
	});
};