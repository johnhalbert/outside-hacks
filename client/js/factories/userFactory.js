discoverlands.factory('userFactory', function($http){
	
	var user;

	var factory = {};

	factory.createUser = function(newUser, callback){
		$http.post('/users/new', newUser)
			.success(function(addedUser){
				callback(addedUser);
			})
	}

	factory.retrieveSingleUser = function(userToRetrieve, callback){
		$http.get('/users/'+userToRetrieve+'/show')
			.success(function(retrievedUser){
				callback(retrievedUser);
			})

	}

	factory.addArtist = function(userToRetrieve, artistToAdd, callback){
		$http.post('/users/'+userToRetrieve+'/artists/new')
			.success(function(updatedUser){
				callback(updatedUser);
			})
	}

	factory.addSong = function(userToRetrieve, songHeard, callback){
		$http.post('/users/'+userToRetrieve+'/songsheard/new', songHeard)
			.success(function(updatedUser){
				callback(updatedUser);
			})
	}

	factory.likeSong = function(userToRetrieve, likedSong, callback){
		$http.post('/users/'+userToRetrieve+'/songsliked/new')
			.success(function(updatedUser){
				callback(updatedUser);
			})
	}

	factory.likeArtist = function(userToRetrieve, artistLiked, callback){
		$http.post('/users/'+userToRetrieve+'/artistliked/new', {artist: artistLiked})
			.success(function(updatedUser){
				callback(updatedUser);
			})
	}

	factory.setUser = function(userToSet){
		var user = userToSet;
		console.log(user);
	}

	factory.getUser = function(userToGet, callback){
		console.log(userToGet);
		$http.get('/users/'+userToGet+'/show')
			.success(function(retrievedUser){
				callback(retrievedUser);
			})
	}

	factory.getWeather = function(callback){
		$http.get('http://api.wunderground.com/api/457d5ff73e181fde/planner_08070809/q/CA/San_Francisco.json')
			.success(function(weatherData){
				callback(weatherData)
			})
	}

	factory.retrieveAllUsers = function(callback){
		$http.get('/users/show')
			.success(function(allUsers){
				callback(allUsers);
			})
	}

	factory.getGracenote = function(artistName, callback){
		$http.post('/gracenote', {artistName: artistName})
			.success(function(graceNoteData){
				callback(graceNoteData);
			})
	}

	factory.logout = function(){
		$http.get('/logout')
	}

	return factory;

})