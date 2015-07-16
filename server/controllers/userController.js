var mongoose = require('mongoose');

var User = mongoose.model('User');
var Artist = mongoose.model('Artist');
var Concert = mongoose.model('Concert');

module.exports = {
	retrieveSingleUser: function(req, res){
		User.findOne({facebook_id: req.params.userid}, function(err, user){
			if (err) {
				console.log('Error retrieving user information', err);
			} else {
				console.log(user);
				res.json(user);
			}
		})
	},
	createUser: function(req, res){
		var newUser = new User({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password, outside_land_username: req.body.outside_land_username});
		newUser.save(function(err, user){
			if (err) {
				console.log('Error creating new user', err);
			} else {
				res.json(user);
			}
		})
	},
	addArtist: function(req, res){
		User.findOne({_id: req.params.userid}, function(err, user){
			if (err) {
				console.log('Error adding artist to user list (1)', err);
			} else {
				user.artist_list.push({artist_name: req.body.artist_name});
				Artist.findOne({name: req.body.artist_name}, function(err, artist){
					if (err) {
						console.log('Error adding artist to user list (2)', err);
					} else {
						artist.users_attending.push(user._id);
						user.save(function(err){
							artist.save(function(err){
								if (err) {
									console.log('Error adding artist to user list (3)', err);
								} else {
									res.json(user);
								}
							})
						})
					}
				})
			}
		})
	},
	addSong: function(req, res){
		User.findOne({_id: req.params.userid}, function(err, user){
			if (err) {
				console.log('Error adding song to list (1)', err);
			} else {
				user.artist_list.songs_heard.push({ song: req.body.song })
				Artist.findOne({_id: req.body.artist_id}, function(err, artist){
					if (err) {
						console.log('Error adding song to list (2)', err);
					} else {
						artist.songs_heard.push({song: req.body.song, _user: req.params.userid});
						user.save(function(err){
							artist.save(function(err){
								if (err) {
									console.log('Error adding song to list (3)', err);
								} else {
									res.json(user);
								}
							})
						})
					}
				})
			}
		})
	},
	likeSong: function(req, res){
		User.findOne({_id: req.params.userid}, function(err, user){
			if (err) {
				console.log('Error adding like (1)', err);
			} else {
				for (var i = 0; i < user.artist_list.length; i++) {
					for (var j = 0; j < user.artist_list[i].songs_heard.length; j++) {
						if (user.artist_list[i].songs_heard[j].name === req.body.song) {
							user.artist_list[i].songs_heard[j].likes = true;
						}
					}
				}
				Artist.findOne({_id: req.body.artist_id}, function(err, artist){
					if (err) {
						console.log('Error adding like (2)', err);
					} else {
						for (var k = 0; k < artist.songs_heard.length; k++) {
							if (artist.songs_heard[k]._user = req.params.userid && artist.songs_heard[k].song === req.body.song) {
								artist.songs_heard[k].likes++;
							}
						}
						user.save(function(err){
							artist.save(function(err){
								if (err) {
									console.log('Error adding like (3)', err);
								} else {
									res.json(user);
								}
							})
						})
					}
				})
			}
		})
	},
	likeArtist: function(req, res){
		console.log('4');
		User.findOne({facebook_id: req.params.userid}, function(err, user){
			if (err) {
				console.log('Error liking artist (1)', err);
			} else {
				console.log('3');
				console.log(user);
				console.log(req.body.artist);
				var search = { found: false };
				for (var i = 0; i < user.artists_liked.length; i++) {
					if (user.artists_liked[i] === req.body.artist) {
						search.found = true;
					}
				}
				if (!search.found){
					console.log(req.body.artist);
					user.artists_liked.push(req.body.artist);
					user.save(function(err, user){
						if (err) {
							console.log('Error liking artist (2)', err);
						} else {
							console.log('1');
							Concert.findOne({name: 'outsidelands'}, function(err, concert){
								if (err) {
									console.log('Error liking artist (3)', err);
								} else {
									console.log('2');
									for (var j = 0; j < concert.performances.length; j++){
										if (concert.performances[j].artist === req.body.artist) {
											concert.performances[j].likes++;
										}
									}
									concert.save(function(err, concert){
										if (err) {
											console.log('Error liking artist (4)', err);
										} else {
											console.log('you made it here');	
											console.log(concert);
											res.json(concert);
										}
									})
								}
							})
						}
					})
				} else {
					Concert.findOne({name: 'outsidelands'}, function(err, concert){
						if (err) {
							console.log('Error liking artist (5)', err);
						} else {
							res.json(concert);
						}
					})
				}
			}
		})
	},
	createOrLoginFacebookUser: function(displayName, id) {
		User.findOne({facebook_id: id}, function(err, user){
			if (err) {
				console.log('Error logging in user', err);
				return false
			} else {
				if (user === null) {
					if (displayName.indexOf(' ') > 0) {
						var first_name = displayName.slice(0, displayName.indexOf(' '));
						var last_name = displayName.slice(displayName.indexOf(' '), displayName.length);
						var newUser = new User({first_name: first_name, last_name: last_name, facebook_id: id});
					} else {
						var newUser = new User({first_name: user.displayName, facebook_id: id});
					}
					newUser.save(function(err, user){
						if (err) {
							console.log('Error creating new user', err);
						} else {
							return user;
						}
					})
				} else {
					return user;
				}
			}
		})
		
	},
	retrieveUsers: function(req, res){
		User.find({}, function(err, users){
			if (err) {
				console.log('Error retrieving user list', err);
			} else {
				res.json(users);
			}
		})
	}
}