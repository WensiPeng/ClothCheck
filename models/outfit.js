var mongoose = require("mongoose");
var User = require("./user");

var outfitSchema = new mongoose.Schema({
	date: String,
	item: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Item"
		}
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
})

module.exports = mongoose.model("Outfit", outfitSchema);