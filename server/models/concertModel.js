var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConcertSchema = new mongoose.Schema({
	name: String,
	date: String,
	performances: [{
		time: String,
		artist: String,
		stage: String,
		likes: { type: Number, default: 0 }
	}],
	stages: [{ name: String, location: String}]
});

var Concert = mongoose.model('Concert', ConcertSchema);