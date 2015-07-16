var UserController = require('../server/controllers/userController');
var ArtistController = require('../server/controllers/artistController');
var ConcertController = require('../server/controllers/concertController');

var passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new FacebookStrategy({
	clientID: '1673236122905259',
	clientSecret: '0540bcd3ad076073b99f9fee1c679703',
	callbackURL: 'http://localhost:8000/auth/facebook/callback'
	},
	function(accessToken, refreshToken, profile, done){

		UserController.createOrLoginFacebookUser(profile.displayName, profile.id);

		process.nextTick(function() {
			return done(null, profile);
		});
	}

))

// 1336320-8E364BB99A28D4DF85903C40676BC1F7

var Gracenote = require("node-gracenote");
var gracenoteClientId = "1336320";
var gracenoteClientTag = "8E364BB99A28D4DF85903C40676BC1F7";
var userId = null;
var api = new Gracenote(gracenoteClientId,gracenoteClientTag,userId);
api.register(function (err, uid) {
    userId = uid;
});


// 1336320-8E364BB99A28D4DF85903C40676BC1F7



console.log(passport.session);

module.exports = function(app) {
	
	app.post('/gracenote', function (req, res){
		// console.log(gracenoteClientId, ' ', gracenoteClientTag, ' ', userId);

		var api = new Gracenote(gracenoteClientId, gracenoteClientTag, userId);

		// api.register(function (err, uid) {
		//     userId = uid;
		// });

    	var artistName = "";
    	console.log('req.body.artistName: ', req.body);
		var result = api.searchAlbum(req.body.artistName, "*", function (err, results) {
			if (err) {
				console.log(err)
			} else {
		    console.log('results:', results);
		    // console.log(results[0].album_artist_name);

		    // var albumTitles = [];

		    // for ( var i = 0 ; i < results.length; i++){
		    // 	albumTitles.push(results[i].album_title);
		    // }

		    // console.log(albumTitles);

		    // artistResponse = {};

		    // artistResponse.artist = results[0].album_artist_name;
		    // artistResponse.albums = albumTitles;
		    // artistResponse.albums = results[0].artist_image_url;
		    // artistResponse.albums = results[0].artist_bio_url;
		    // artistResponse.albums = results[0].review_url;
		    res.json(results);
		}
		});
	});

	app.get('/logout', function(req, res){
		res.session.destroy();
	})

	// Login

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/success', failureRedirect: '/#/failure'}))

	app.get('/success', function(req,res){
		res.redirect('/#/user/'+req.session.passport.user.id);
	})

	// Concert-specfic routes
	app.get('/concerts/:concertname/artists/show', function(req, res){
		ConcertController.retrieveArtists(req, res);
	});

	app.get('/concerts/:concertname/performances/show', function(req, res){
		ConcertController.retrievePerformances(req, res);
	});

	app.post('/concerts/:concertname/:artistname/like', function(req, res){
		ConcertController.likeArtist(req, res);
	})

	// User-specific routes
	app.get('/users/:userid/show', function(req, res){
		UserController.retrieveSingleUser(req, res);
	});

	app.post('/users/new', function(req, res){
		UserController.createUser(req, res);
	});

	app.post('/users/:userid/artists/new', function(req, res){
		UserController.addArtist(req, res);
	});

	app.post('/users/:userid/songsheard/new', function(req, res){
		UserController.addSong(req, res);
	});

	app.post('/users/:userid/songsliked/new', function(req, res){
		UserController.likeSong(req, res);		
	});

	app.post('/users/:userid/artistliked/new', function(req, res){
		UserController.likeArtist(req, res);
	});

	app.get('/users/show', function(req, res){
		UserController.retrieveUsers(req, res);
	})

	// Artist-specific routes
	app.get('/artists/:artistid/show', function(req, res){
		ArtistController.retrieveArtist(req, res);
	});

	app.post('/artsts/new', function(req, res){
		ArtistController.createArtist(req, res);
	});

	app.post('/artists/:artistid/likes/new', function(req, res){
		ArtistController.likeArtist(req, res);
	});

	app.post('/artists/:artistid/attending/new', function(req, res){
		ArtistController.addAttending(req, res);
	});

	app.post('/artists/:artistid/heard/new', function(req, res){
		ArtistController.addHeard(req, res);
	});

	app.get('/artists/trending', function(req, res){
		ArtistController.retrieveTrending(req, res);
	})


}