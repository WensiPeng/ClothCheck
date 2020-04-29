var express = require("express");
var router = express.Router();
var Item = require("../models/item");
var User = require("../models/user");
var Outfit = require("../models/outfit");
var middleware = require("../middleware");
var passport = require("passport");

//ootd index page
router.get("/", middleware.isLoggedIn, function(req, res){
	Outfit.find({"author.id": req.user._id}, function(err, allOutfits){
		if(err){
			console.log(err);
		}else{
			res.render("./ootd/index", {outfits: allOutfits});
		}
	})
})

//NEW: show new outfit form
router.get("/new", middleware.isLoggedIn, function(req, res){
	Item.find({"author.id": req.user._id}, function(err, allItems){
		if(err){
			console.log(err);
		}else{
			res.render("./ootd/new", {items: allItems});
		}
	})
})

//CREATE: create a new outfit
router.post("/", middleware.isLoggedIn, function(req, res){
	var author = {
		id: req.user._id,
		username: req.user.username,
	}
	var newOutfit = {};
	newOutfit.date = req.body.outfit.date;
	newOutfit.image = req.body.outfit.image;
	newOutfit.author = author;
	newOutfit.item = req.body.outfit.selectedItems.split(",");
	Outfit.create(newOutfit, function(err, newOutfit){
		if(err){
			console.log(err);
		}else{
			res.redirect("/outfit-of-the-day");
		}
	})
	//increment worn times of each item
	incrementWornTimesDates(newOutfit.item, newOutfit.date);
})
//SHOW
router.get("/:id", middleware.isLoggedIn, function(req, res){
	Outfit.findById(req.params.id).populate("item").exec(function(err, foundOutfit){
		if(err){
			console.log(err);
		}else{
			res.render("./ootd/show", {outfit:foundOutfit});
		}
	})
})
//EDIT
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
	Item.find({"author.id": req.user._id}, function(err, allItems){
		if(err){
			console.log(err);
		}else{
			Outfit.findById(req.params.id).populate("item").exec( function(err, foundOutfit){
				if(err){
					console.log(err);
				}else{
					res.render("./ootd/edit", {outfit: foundOutfit, items: allItems});
				}
			})		
		}
	})


})

//UPDATE
router.put("/:id", middleware.isLoggedIn, function(req, res){
	var newOutfit = {};
	newOutfit.date = req.body.outfit.date;
	newOutfit.image = req.body.outfit.image;
	newOutfit.item = req.body.outfit.selectedItems.split(",");

	Outfit.findByIdAndUpdate(req.params.id, newOutfit, function(err, updatedOutfit){
		if(err){
			console.log(err);
			res.redirect("/outfit-of-the-day");
		}else{
			res.redirect("/outfit-of-the-day/" + req.params.id);
		}
	});
	incrementWornTimesDates(newOutfit.item, newOutfit.date);
})

//DESTROY
router.delete("/:id", middleware.isLoggedIn, function(req, res){
	Outfit.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/outfit-of-the-day")
		}else{
			res.redirect("/outfit-of-the-day");
		}
	})
})


function incrementWornTimesDates(itemsInOutfit, date){
	itemsInOutfit.forEach(function(ele){
		Item.findById(ele, function(err, foundItem){
			if(err){
				console.log(err);
			}else{
				//increment worn times of each item in the outfit
				foundItem.wornTimes ++;
				//add worn date to each item in the outfit
				if(!foundItem.wornDates.includes(date)){
					foundItem.wornDates.push(date);
				}
			}
		})
	})
}


	
module.exports = router;