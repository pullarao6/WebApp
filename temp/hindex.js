var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

function isLoggedIn(req, res, next) {

	console.log(req.isAuthenticated);
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/users/signin');
}

router.get('/',isLoggedIn,function(req,res){console.log(req);res.send("Welcome Pop");});

module.exports = router;
