var authController = require('../controllers/auth');
var logger = require('../utils/logger');    
// create a new user
exports.saveUser = function(req, res, next) {
	logger.info("Request Received for saving a user::"+req.body.email,{request:req.body});
	authController.saveUser(req, res, next);
};

//signin
exports.checkUser = function(req, res, next) {
	authController.isUserAuthenticated(req, res, next);
};

exports.getUser = function(req, res) {
	user.getUser(req, res, function(err, user_details, status) {
		if (status)
			res.send(status);
		else {
			if (err)
				res.send("Error in db query");
			else{
				if(req.session)
					{
				req.session.name=user_details.name;
				console.log(req.session.name);
					}
				else
					console.log("error in connecting mongo store");
				res.send(user_details);
				}
		}
	});
};