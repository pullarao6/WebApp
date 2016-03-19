var express = require('express');
var router = express.Router();
var prodController = require('../controllers/product');
var authController = require('../controllers/auth');

/* GET users listing. */
router.get('/products', authController.isAuthenticated, prodController.getProducts);

router.get('/product/:prod_id', authController.isAuthenticated,prodController.getProduct);

router.post('/products', authController.isAuthenticated,prodController.postProducts);

router.put('/product/:prod_id', prodController.putProduct);

router.delete('/product/:prod_id', prodController.deleteProduct);

module.exports = router;
