var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var seedDB = require("./seedDB");
var Item = require("./models/item");


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

app.listen(3000, function(){
	console.log("server is listening on port 3000 ...");
})

