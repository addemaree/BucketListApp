const Auth = require('./controllers/auth.js');
const passportService = require('./services/passport');
const passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});



module.exports = function(app){
	app.get('/', requireAuth, function(req, res){
		res.send({message: 'hey'});
	});
	app.post('/signup', Auth.signup);
	app.post('/signin', requireSignin, Auth.signin);
}