var express = require("express");
var router = express.Router();
var Item = require("../models/item");
var User = require("../models/user");
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
module.exports = router;