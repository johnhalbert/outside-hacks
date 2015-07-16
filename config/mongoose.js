var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/outside_hacks');

require('../server/models/userModel');
require('../server/models/artistModel');
require('../server/models/concertModel');