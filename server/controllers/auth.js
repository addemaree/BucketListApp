const User = require('../models/user');

exports.signup = function(req, res){
	//res.send("User Auth!");

	console.log(req.body)
	var email = req.body.email
	var password = req.body.password

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
			res.json({success:true})
		})
	})
}