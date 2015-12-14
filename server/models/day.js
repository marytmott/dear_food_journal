var mongoose = require('mongoose');
var db = require('./index');

var daySchema = mongoose.Schema({
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }],
  // activities:
  // notes:
  // other???
  // calories stuff?
});

// add hooks

var Day = mongoose.model('Day', daySchema);

module.exports = Day;