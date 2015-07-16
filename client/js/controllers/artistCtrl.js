discoverlands.controller('artistCtrl', function($scope, $routeParams, artistFactory, userFactory){
	
	$scope.artist;
	$scope.trending;
	$scope.user;

	$scope.retrieveArtist = function(){
		artistFactory.retrieveArtist($routeParams.artistid, function(retrievedArtist){
			$scope.artist = retrievedArtist;
		})
	}

	$scope.createArtist = function(){
		artistFactory.createArtist($scope.newArtist, function(createdArtist){
			$scope.artist = createdArtist;
		})
	}

	$scope.likeArtist = function(){
		artistFactory.likeArtist($routeParams.artistid, function(updatedArtist){
			$scope.artist = updatedArtist;
		})
	}

	$scope.addAttending = function(){
		artistFactory.addAttending($routeParams.artistid, $scope.user, function(updatedArtist){
			$scope.artist = updatedArtist;
		})
	}

	$scope.addHeard = function(){
		artistFactory.addHeard($routeParams.artistid, $scope.user, function(updatedArtist){
			$scope.artist = updatedArtist;
		})
	}

	$scope.retrieveTrending = function(){
		artistFactory.retrieveTrending(function(trendingList){
			$scope.trending = trendingList;
		})
	}

	artistFactory.retrieveArtist($routeParams.artistid, function(retrievedArtist){
		$scope.artist = retrievedArtist;
	})

	artistFactory.retrieveTrending(function(trendingList){
		$scope.trending = trendingList;
	})

	userFactory.getUser(function(retrievedUser){
		$scope.user = retrievedUser;
	})

})