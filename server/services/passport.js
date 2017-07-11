const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy
//usernameField: 'email'
let localOptions = { usernameField: 'email'};
let localLogin = new LocalStrategy(localOptions, function(email, password, done){
	User.findOne({email: email}, function(err, user){
		//if there's an error in the search, return early with error object
		if (err){
			return done(err);
		}
		//not an error, just user not found
		if(!user){
			return done(null, false);
		}

		//compare passwords - is 'password' equal to user.password?
		//compare pw from req with users saved pw
		user.comparePassword(password, function(err, isMatch){
			//if there was an error, return early.
			if(err) {
				return done(err);
			}
			//if its's not the same, it will return false and say they didn't match up
			if(!isMatch){
				return done(null, false);
			}
			//if same, it will call passport callback with user model
			return done(null, user);
		});
		//tricky part --> we salted the password, and we need to somehow decode encrypted pw to normal pw.
	});
	//otherwise, call done with false
});

let jwtOptions = {
	//this line tells where to get the token from in a request.
	//here it is extracted from a header called authorization
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	//this linke says that we need to get a secret key from a config file.
	secretOrKey: config.secret
};

//create jwt strategy
let jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	//on payload we have sub property. Use the "User" model, look through all users and find user with given
	User.findById(payload.sub, function(err, user){
		//In the "findById" callback, we will get two arguments ("err" and "user"). 
		//"err" is going to populate only if search fails
		if(err){
			return done(err, false);
		}
		//if we can find the user, pass it to done callback. They are authenticated.
		if (user){
			done(null, user);
		} else{
		//if we can not find user with id, we are going to call done function without user object
			done(null, false);
		}
	});
});
passport.use(jwtLogin)
passport.use(localLogin)