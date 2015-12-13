var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {

	// log each request to the console
	console.log(req.method, req.url);

	// continue doing what we were doing and go to the route
	next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.end();
});

router.get('/:id', function(req, res) {
	res.send({
		user : req.params.id
	});	
});

router.post('/', function(req, res) {
	console.log(req.body.name);
	console.log(req.body.age);
	res.end();
});

router.put('/:id', function(req, res) {

});
module.exports = router;
