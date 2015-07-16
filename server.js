var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

// DB require

require('./config/mongoose');

// Set up express

var app = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());
app.use(session({secret: 'codingiscool'}));
app.use(passport.initialize());
app.use(passport.session());

var server = app.listen(8000, function(){
	console.log('NodeJS/Express/Socket.IO :8000');
})

// Routes require

require('./config/routes')(app);

// Socket.IO require

require('./config/socketio')(server);