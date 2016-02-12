var express 	= require('express');
var router 		= express.Router();
var User 		= require('../app/models/user');

router.post('/', function(req, res){
	//console.log("You've posted email : " + req.body.email + " pwd: " + req.body.password );
	//res.send("ok");
	var email = req.body.email;
	var pwd = req.body.password;
	User.findOne({'local.email' : email}, function(err, user){
		if(err){
			res.json({success : false, message: err.message});
			return;
		}

		if(user){
			res.json({success : false, message: "A user with this email already exists."});
			return;
		}

		var newUser = new User();
		newUser.local.email = email;
		newUser.local.password = newUser.generateHash(pwd);
		newUser.local.admin = false;

		console.log("email   : " + email);
		console.log("email   : " + req.body.email);
		console.log("email   : " + newUser.local.email);
		console.log("password: " + newUser.local.password);

		newUser.save(function(err){
			if(err){
				res.json({success : false, message: err.message});
				return;
			}
			res.json({success: true});
		})
	});

});

module.exports = router;