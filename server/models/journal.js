var mongoose = require('mongoose');
var db = require('./index');
var User = require('./user');
var Day = require('./day');

// TODO: pre/post hooks

var journalSchema = mongoose.Schema({
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  days: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day'
  }],
  weightGoal: Number,
  // add date for when weight is entered to track how much lost in how much time?
  origWeight: Number,
  toDateWeightChange: Number
// general notes or put in inspirations?
});

// add delete hook to delete entries

var Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;