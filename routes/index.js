var express = require('express');
var router = express.Router();
var config = require('../utils/config');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index', { title: 'Express',https_url:'https://'+config.https.host + ':9090/' });
});

module.exports = router;
