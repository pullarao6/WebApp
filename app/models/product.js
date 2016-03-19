var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
	name : {
		type : String,
		require : true,
		unique : true
	},
	category : {
		type : String,
		require : true
	},
	manfId : {
		type: String,
		require : true
	}
});
exports.ProductModel = mongoose.model('Product', productSchema);
