var express = require("express");
var router = express.Router();
var Item = require("../models/item");
var User = require("../models/user");
var middleware = require("../middleware");
var passport = require("passport");

//landing page
router.get("/", function(req, res){
	res.render("landing");
})
//Authentication routes
//SHOW register form
router.get("/register", function(req, res){
	res.render('landing');
})
//CREATE add user
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.render('landing', {anchor: 'register-page'});
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/allItems");
		})

	})
})

//login
router.get("/login", function(req, res){
	res.render("landing", {anchor: 'login-page'});
})
router.post("/login", passport.authenticate("local", {
	successRedirect: "/allItems",
	failureRedirect: "/#login-page"
}), function(req, res){
});

//logout
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
})

module.exports = router;