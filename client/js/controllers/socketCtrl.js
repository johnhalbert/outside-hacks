discoverlands.controller('socketCtrl', function(socket, $scope){
	
	$scope.sendArtistMessage = function(){
		console.log($scope.newArtistMessage);
		socket.emit('new_artist_message', {artist: $scope.artist.name, message: $scope.newArtistMessage});
		$scope.newArtistMessage = '';
	}

})