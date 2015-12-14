var mongoose = require('mongoose');
var db = require('./index');
var Journal = require('./journal');
var Meal = require('./meal');

var daySchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  journal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }],
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }],
  // activities:
  // daily notes?
  // other???
  // calories stuff?
});

// add hooks

var Day = mongoose.model('Day', daySchema);

module.exports = Day;