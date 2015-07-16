var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArtistSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	genre: String,
	likes: { type: Number, default: 0 },
});

var Artist = mongoose.model('Artist', ArtistSchema);