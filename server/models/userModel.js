var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	facebook_id: String,
	email: String,
	password: String,
	artists_liked: [{ type: String }],
	created: { type: Date, default: Date.now }
})

var User = mongoose.model('User', UserSchema);