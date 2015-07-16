discoverlands.factory('artistFactory', function($http){
	
	var factory = {};

	factory.retrieveArtist = function(artistToRetrieve, callback){
		$http.get('/artists/'+artistToRetrieve+'/show')
			.success(function(retrievedArtist){
				callback(retrievedArtist);
			})
	}

	factory.createArtist = function(newArtist, callback){
		$http.post('/artists/new', newArtist)
			.success(function(createdArtist){
				callback(createdArtist);
			})
	}

	factory.likeArtist = function(artistToRetrieve, callback){
		$http.post('/artists/'+artistToRetrieve+'/likes/new')
			.success(function(updatedArtist){
				callback(updatedArtist);
			})
	}

	factory.addAttending = function(artistToRetrieve, userAttending, callback){
		$http.post('/artists/'+artistToRetrieve+'/attending/new', userAttending)
			.success(function(updatedArtist){
				callback(updatedArtist);
			})
	}

	factory.addHeard = function(artistToRetrieve, userHeard, callback){
		$http.post('/artists/'+artistToRetrieve+'/heard/new', userHeard)
			.success(function(updatedArtist){
				callback(updatedArtist);
			})
	}

	factory.retrieveTrending = function(callback){
		$http.get('/artists/trending')
			.success(function(trendingList){
				callback(trendingList);
			})
	}

	return factory;

})