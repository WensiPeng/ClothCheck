var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	category: String,
	brand: String,
	wornTimes: String,
	author: String,
	rating: String,
	purchasedTime: Date,
	season: String,
	color: String
});

module.exports = mongoose.model("Item", itemSchema);
