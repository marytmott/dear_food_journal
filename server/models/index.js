var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/dearfj');
mongoose.set('debug', true);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('connected to dearfj db');
});

module.exports.User = require('./user');