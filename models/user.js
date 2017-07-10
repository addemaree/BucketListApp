const mongoose = require('mongoose');
const Schema = mongoose.Schema;

Let userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},

	password: String
});

Let model = mongoose.model('user', userSchema)

module.exports = model; 