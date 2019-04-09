var mongoose = require('mongoose');

//const dbURI = 'mongodb://ds115533.mlab.com:15533/films_db';
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Bratok3000:$p0o9i8u7@cluster0-stcrx.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const dbURI = 'mongodb+srv://Andrii:123@cluster0-stcrx.mongodb.net/test?retryWrites=true';
// var dbOptions = {
//     user: 'Andrii',
//     pass: '$p0o9i8u7',
//     useNewUrlParser: true
// };

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.info("Mongoose connected to: " + dbURI);
});

mongoose.connection.on('error', function() {
  console.info("Mongoose connected error: " + dbURI);
});

module.exports = mongoose;