var express = require("express");
var router = express.Router();
var Item = require("../models/item");
var User = require("../models/user");
var middleware = require("../middleware");

//INDEX page: view all clothing
router.get("/", middleware.isLoggedIn, function(req, res){
	//find items that belong to the user from db

	Item.find({"author.id": req.user._id}, function(err, allItems){
		if(err){
			console.log(err);
		}else{
			res.render("./myCloset/index", {items: allItems});
		}
	})
})

//NEW page: show new item form
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("./myCloset/new");
})

//CREATE: create a new item
router.post("/", middleware.isLoggedIn, function(req, res){
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newItem = req.body.item;
	newItem.author = author;
	Item.create(newItem, function(err, newItem){
		if(err){
			console.log(err);
		}else{
			res.redirect("/allItems");
		}
	})
})

//SHOW page: view one item with id
router.get("/:id", middleware.isLoggedIn, function(req, res){
	Item.findById(req.params.id, function(err, foundItem){
		res.render("show", {item: foundItem});
	})
})

//EDIT item
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
	Item.findById(req.params.id, function(err, foundItem){
		res.render("./myCloset/edit", {item: foundItem});
	})
})

//UPDATE item
router.put("/:id", middleware.isLoggedIn, function(req, res){
	Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, updatedItem){
		if(err){
			console.log(err);
			res.redirect("/allItems");
		}else{
			res.redirect("/allItems/" + req.params.id);
		}
	});
})

//DESTROY item
router.delete("/:id", middleware.isLoggedIn, function(req, res){
	Item.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/allItems")
		}else{
			res.redirect("/allItems");
		}
	})
})

//Filter all items
//filter by category
//filter by season

//Pagination

//Sorting

module.exports = router;
