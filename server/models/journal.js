var mongoose = require('mongoose');
var db = require('./index');
var User = require('./user');
var Meal = require('./meal');

// TODO: pre/post hooks

var journalSchema = mongoose.Schema({
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }],
  weightLossGoal: Number,
  origWeight: Number,
  toDateWeightLoss: Number
});

// add delete hook to delete entries

var Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;

