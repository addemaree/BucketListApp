const Auth = require('./controllers/auth.js');
const User = require('./models/user');

module.exports = function(app){
	app.post('/signup', Auth.signup)
}