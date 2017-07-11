const Auth = require('./controllers/auth.js');
const passportService = require('./services/passport');
const passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app){
	app.get('/', requireAuth, function(req, res){
		res.send('Hello Homepage');
	});
	app.post('/signup', Auth.signup);
}