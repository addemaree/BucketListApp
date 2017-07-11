const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

exports.signup = function(req, res){
	//res.send("User Auth!")
	console.log(req.body)
	var email = req.body.email
	var password = req.body.password

	function createUserToken(user){
		let timestamp = new Date().getTime()
		return jwt.encode({sub: user.id, iat: timestamp }, config.secret)
	}


	if(!email || !password){
		return res.status(418).send({error: 'You must provide an email and password'});
	}

	User.findOne({email: email}, function(err, existingUser){
		if(err){
			return next(err);
		}
		if(existingUser){
			return res.status(418).send('Emails already in use');
		}

		let user = new User({
			email: email,
			password: password
		});

		user.save(function(err){
			if(err){
				return next(err)
			}
			res.json({token: createUserToken(user)})
		})
	})
}