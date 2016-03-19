// Load required packages
var Product = require('../models/product');

// Create endpoint /api/products for POSTS
exports.postProducts = function(req, res) {
	// Create a new instance of the Beer model
	var product = new Product.ProductModel();

	// Set the product properties that came from the POST data
	product.name = req.body.name;
	product.category = req.body.category;
	product.manfId = req.user._id;
	// Save the product and check for errors
	product.save(function(err) {
		if (err)
			res.send(err);

		res.json({
			message : 'Product added Successfully!',
			data : product
		});
	});
};

// Create endpoint /api/products for GET
exports.getProducts = function(req, res) {
	// Use the Product model to find all products
	Product.ProductModel.find({manfId : req.user._id},function(err, products) {
		if (err)
			res.send(err);

		res.json(products);
	});
};

// Create endpoint /api/products/:prod_id for GET
exports.getProduct = function(req, res) {
	// Use the Product model to find a specific Product
	Product.ProductModel.findById({manfId : req.user._id},req.params.prod_id, function(err, product) {
		if (err)
			res.send(err);

		res.json(product);
	});
};

// Create endpoint /api/products/:prod_id for PUT
exports.putProduct = function(req, res) {
	// Use the Product model to find a specific product
	Product.ProductModel.findById(req.params.prod_id, function(err, product) {
		if (err)
			res.send(err);

		// Update the existing product name
		product.name = req.body.name;

		// Save the beer and check for errors
		product.save(function(err) {
			if (err)
				res.send(err);

			res.json(product);
		});
	});
};

// Create endpoint /api/products/:prod_id for DELETE
exports.deleteProduct = function(req, res) {
	// Use the Product model to find a specific product and remove it
	Product.ProductModel.findByIdAndRemove(req.params.prod_id, function(err) {
		if (err)
			res.send(err);

		res.json({
			message : 'Product removed Successfully'
		});
	});
};