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
var middleware = require("./middleware");

//require Routes
var itemRoutes = require("./routes/items");
var indexRoutes = require("./routes/index");
var ootdRoutes = require("./routes/ootd");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

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

//mongoose configuration
console.log(process.env.DATABASEURL)
mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

//middleware to pass current user to all ejs
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

//
app.use(indexRoutes);
app.use("/allItems", itemRoutes);
app.use("/outfit-of-the-day", ootdRoutes);

//seedDB();

app.listen(3000, function(){
	console.log("server is listening on port 3000 ...");
})

