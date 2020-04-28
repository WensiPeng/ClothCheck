var express = require("express");
var router = express.Router();
var Item = require("../models/item");
var User = require("../models/user");
var Outfit = require("../models/outfit");
var middleware = require("../middleware");
var passport = require("passport");

//ootd index page
router.get("/", function(req, res){
	res.render("ootd");
})

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
		username: req.user.username
	}
	var newOutfit = req.body.outfit;
	newOutfit.author = author;

	Outfit.create(newOutfit, function(err, newCamp){
		if(err){
			console.log(err);
		}else{
			res.redirect("/outfit-of-the-day");
		}
	})

})
module.exports = router;