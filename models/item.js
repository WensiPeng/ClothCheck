var mongoose = require("mongoose");
var User = require("./user");

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
	color: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Item", itemSchema);
