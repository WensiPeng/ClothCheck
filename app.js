var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var seedDB = require("./seedDB");
var Item = require("./models/item");
var User = require("./models/user");
var passport = require("passport");
var localStrategy = require("passport-local");

//passport configuration
app.use(require("express-session")({
	secret: "what should I wear",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
console.log(process.env.DATABASEURL)
mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

//seedDB();

//landing page
app.get("/", function(req, res){
	res.render("landing");
})

//INDEX page: view all clothing
app.get("/allItems", function(req, res){
	//find all items from db
	Item.find({}, function(err, allItems){
		if(err){
			console.log(err);
		}else{
			res.render("index", {items: allItems});
		}
	})
})

//NEW page: show new item form
app.get("/allItems/new", function(req, res){
	res.render("new");
})

//CREATE: create a new item
app.post("/allItems", function(req, res){
	var author = {
		id: req.user.id,
		username: req.user.username
	}
	var newItem = req.body.item;
	Item.create(newItem, function(err, newItem){
		if(err){
			console.log(err);
		}else{
			res.redirect("/allItems");
		}
	})
})

//SHOW page: view one item with id
app.get("/allItems/:id", function(req, res){
	Item.findById(req.params.id, function(err, foundItem){
		res.render("show", {item: foundItem});
	})
})

//EDIT item
app.get("/allItems/:id/edit", function(req, res){
	Item.findById(req.params.id, function(err, foundItem){
		res.render("edit", {item: foundItem});
	})
})

//UPDATE item
app.put("/allItems/:id", function(req, res){
	Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, updatedItem){
		if(err){
			res.redirect("/allItems");
		}else{
			res.redirect("/allItems/" + req.params.id);
		}
	});
})

//DESTROY item
app.delete("/allItems/:id", function(req, res){
	Item.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/allItems")
		}else{
			res.redirect("/allItems");
		}
	})
})

//Authentication routes
//SHOW register form
app.get("/register", function(req, res){
	res.render('register');
})
//CREATE add user
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/allItems");
		})

	})
})

//login
app.get("/login", function(req, res){
	res.render("login");
})
app.post("/login", passport.authenticate("local", {
	successRedirect: "/allItems",
	failureRedirect: "/login"
}), function(req, res){
});

//logout
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/allItems");
})

app.listen(3000, function(){
	console.log("server is listening on port 3000 ...");
})

