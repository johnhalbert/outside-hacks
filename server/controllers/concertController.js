	var mongoose = require('mongoose');

var Concert = mongoose.model('Concert');

module.exports = {
	retrieveArtists: function(req, res){
		Concert.findOne({name: req.params.concertname}, function(err, concert){
			if (err) {
				console.log('Error retrieving artists');
			} else {
				console.log(concert);
				res.json(concert);
			}
		})
	},
	retrievePerformances: function(req, res){
		console.log('You just got performances yo');
		Concert.findOne({name: req.params.concertname})
			.populate('artists')
			.execute(function(err, performances){
				if (err) {
					console.log('Error retrieving performance list', err);
				} else {
					res.json(performances);
				}
			})
	},
	likeArtist: function(req, res){
		Concert.findOne({name: req.params.concertname}, function(err, concert){
			if (err) {
				console.log('Error liking artist (1)', err);
			} else {
				for (var i = 0; i < concert.performances.length; i++) {
					if (concert.performances[i].artist === req.params.artistname) {
						concert.performances[i].likes++;
					}
				}
				concert.save(function(err, updatedConcert){
					if (err) {
						console.log('Error liking artist (2)', err);
					} else {
						res.json(updatedConcert);
					}
				})
			}
		})
	}
}