var jwt = require('jsonwebtoken');
var config = require('../config/config.js');

module.exports = function(req, res, next){	
	var token = (req.body && req.body.access_token) || req.query.access_token || req.headers["Authorization"];

	if (token) {		   			     
			// verifies secret and checks exp
		    jwt.verify(token, config.superSecret, function(err, decoded) {      
		      if (err) {		    	
		        res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes		    	  
		        req.decoded = decoded;
		        console.log(decoded);
		        next();
		      }		    		    		
		    });
		}
	else {
	    // if there is no token
	    // return an error
	    res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
}
}