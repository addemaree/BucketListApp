const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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