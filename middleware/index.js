var Item = require("../models/item");
var User = require("../models/user");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}

module.exports = middlewareObj;