var mongoose = require("mongoose");
var Item = require("./models/item");

var data = [{
	name: "Aritzia oversize crew neck",
	image: "https://aritzia.scene7.com/is/image/Aritzia/large/f19_03_a03_66428_14248_on_a.jpg",
	description: "This is an oversized crewneck sweatshirt in Tna's Classic Fleece — an ultra-plush, brushed fabric that keeps its shape and only gets better with wear. ",
	price: "80",
	brand: "TNA",
	category: "tops",
	season: "winter",
	color: "yellow",
	wornTimes: 0
}, {
	name: "Aritzia white cardigan",
	image: "https://aritzia.scene7.com/is/image/Aritzia/hi-res/s20_04_a03_76032_6824_on_b.jpg",
	description: "Café au lait and croissant not included. This is a cropped cardigan with a deep V-neckline and volume in the sleeves. The New Plunge Front (formerly the Thais Cardigan) has been redesigned for an even more flattering fit. It's made from a lightweight blend of extra-fine merino wool and cotton.",
	price: "138",
	brand: "Wilfred",
	category: "tops",
	season: "winter",
	color: "white",
	wornTimes: 0
}, {
	name: "Aritzia super puff jacket",
	image: "https://aritzia.scene7.com/is/image/Aritzia/large/f19_03_a05_74360_14140_on_a.jpg",
	description: "This puffer contains 100% responsibly sourced goose down. Engineered to deliver warmth to -30°C / -22°F, the Super Puff™ is designed with maximalist proportions and will keep you super warm where it counts. This version is made from an innovative water-repellent and wind-resistant Japanese ripstop fabric that gives when you move.",
	price: "199",
	brand: "TNA",
	category: "jacket",
	season: "winter",
	color: "blue",
	wornTimes: 0
}]

function seedDB() {
	Item.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}else{
			//create some items
			data.forEach(createItems);
		}
	})
}

function createItems(seed){
	Item.create(seed, function(err, item){
		if(err){
			console.log(err);
		}else{
			console.log("added an item");
		}
	})
}

module.exports = seedDB;