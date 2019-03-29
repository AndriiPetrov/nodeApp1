var mongoose = require('mongoose');

const dbURI = 'mongodb://ds115533.mlab.com:15533/films_db';
var dbOptions = {
    user: 'filmapp',
    pass: 'NtqfEw2r',
    useNewUrlParser: true
};

mongoose.connect(dbURI, dbOptions);

mongoose.connection.on('connected', function() {
    console.info("Mongoose connected to: " + dbURI); 
});

mongoose.connection.on('error', function() {
    console.info("Mongoose connected error: " + dbURI); 
});

module.exports = mongoose;