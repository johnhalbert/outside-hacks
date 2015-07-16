module.exports = function(server) {

	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket){
		
		console.log('New Socket Connection: ', socket.id);

		socket.on('new_artist_message', function(data){
			console.log('sending artist_message', data);
			socket.broadcast.emit('artist_message', data);
		})

	})

}