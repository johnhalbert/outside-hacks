discoverlands.factory('concertFactory', function($http){
	
	var factory = {};

	factory.retrieveArtists = function(callback){
		$http.get('/concerts/outsidelands/artists/show')
			.success(function(returnedArtists){
				callback(returnedArtists);
			})
	}

	factory.likeArtist = function(concertName, artist, callback){
		$http.post('/concerts/'+concertName+'/'+artist+'/like')
			.success(function(updatedConcert){
				callback(updatedConcert);
			})
	}

	return factory;

})