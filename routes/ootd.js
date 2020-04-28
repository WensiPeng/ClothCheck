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
	console.log(newOutfit);
	Outfit.create(newOutfit, function(err, newCamp){
		if(err){
			console.log(err);
		}else{
			res.redirect("/outfit-of-the-day");
		}
	})
})

//EDIT

//UPDATE

//DELETE
module.exports = router;