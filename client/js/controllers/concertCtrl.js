discoverlands.controller('concertCtrl', function($routeParams, $scope, concertFactory, userFactory){
	
	$scope.artists;

	concertFactory.retrieveArtists(function(returnedArtists){
		$scope.artists = returnedArtists;
		console.log($scope.artists);
	})

	userFactory.setUser($routeParams.uid, function(setUser){
		console.log($routeParams.uid);
		$scope.user = setUser;
		console.log($scope.user);
	});

})