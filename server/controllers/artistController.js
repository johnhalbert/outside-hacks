var mongoose = require('mongoose');

var Artist = mongoose.model('Artist');
var User = mongoose.model('User');

module.exports = {
	retrieveArtist: function(req, res){
		Artist.findOne({_id: req.params.artistid}, function(err, artist){
			if (err) {
				console.log('Error retrieving artist', err);
			} else {
				res.json(artist);
			}
		})
	},
	createArtist: function(req, res){
		var newArtist = new Artist({name: req.body.name, email: req.body.email, password: req.body.password, genre: req.body.genre});
		newArtist.save(function(err, artist){
			if (err) {
				console.log('Error creating new artist', err);
			} else {
				res.json(artist);
			}
		})
	},
	likeArtist: function(req, res){
		Artist.findOne({_id: req.params.artistid}, function(err, artist){
			if (err) {
				console.log('Error liking artist', err);
			} else {
				artist.likes++;
				artist.save(function(err, savedArtist){
					if (err) {
						console.log('Error liking artist', err);
					} else {
						res.json(savedArtist);
					}
				})
			}
		})
	},
	addAttending: function(req, res){
		Artist.findOne({_id: req.params.artistid}, function(err, artist){
			if (err) {
				console.log('Error adding attending user (1)', err);
			} else {
				User.findOne({_id: req.body.user_id}, function(err, user){
					if (err) {
						console.log('Error adding attending user (2)', err);
					} else {
						artist.users_attending.push(user);
						user.artist_list.push({artist_name: artist.name});
						artist.save(function(err, artist){
							user.save(function(err){
								if (err) {
									console.log('Error adding attending user (3)', err);
								} else {
									res.json(artist);
								}
							})
						})
					}
				})
			}
		})
	},
	addHeard: function(req, res){
		Artist.findOne({_id: req.params.artistid}, function(err, artist){
			if (err) {
				console.log('Error adding to heard list (1)', err);
			} else {
				User.findOne({_id: req.body.user_id}, function(err, user){
					if (err) {
						console.log('Error adding to heard list (2)', err);
					} else {
						var search = { found: false, idx: 0 };
						artist.songs_heard.push({song: req.body.song, _user: user._id});
						for (var i = 0; i < user.artist_list.length; i++) {
							if (user.artist_list[i].artist_name === artist.name) {
								for (var j = 0; i < user.artist_list[i].songs_heard.length; j++) {
									if (user.artist_list[i].songs_heard[j].name === req.body.song) {
										search.found = true;
									}
								}
							}
							if (search.found !== true) {
								user.artist_list[i].songs_heard.push({ name: req.body.song });	
							}
						}
					}
				})
			}
		})
	},
	retrieveTrending: function(req, res) {
		var trending = {};
		User.find({})
			.populate('artists_liked')
			.execute(function(err, users){
				if (err) {
					console.log('Error retrieving trending artists (1)', err);
				} else {
					for (var i = 0; i < users.length; i++) {
						for (var j = 0; j < users[i].artists_liked.length; j++) {
							trending[users[i].artist_liked[j].name]++;
						}
					}
				}
			})

			// Can reuse and manually loop if .populate doesn't work as expected on multiple results
		// , function(err, users){
		// 	if (err) {
		// 		console.log('Error retrieving trending artists', err);
		// 	} else {
		// 		var trending = {};
		// 		for (var i = 0; i < users.length; i++) {
		// 			for (var j = 0; j < users.artists_liked.length; j++) {
		// 				trending[users.artists_liked[j].]
		// 			}
		// 		}
		// 	}
		// })
	}
}