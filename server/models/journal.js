var mongoose = require('mongoose');
var db = require('./index');
var User = require('./user');

// TODO: pre/post hooks

var journalSchema = mongoose.Schema({
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  //other daily goals?
  weightChangeType: {  // this will indicate whether they want to gain or lose weight
    type: String,
    default: 'lose' //set this on user creation?
  },
  weightChangeReason: String,
  dailyCalorieGoal: Number,
  weightGoal: Number,
  // add date for when weight is entered to track how much lost in how much time?
  originalWeight: Number,
  toDateWeightChange: Number,
// general notes or put in inspirations?
});

// add delete hook to delete entries

var Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;

// HOOKS TO ADD:
// 1. remove journal when user is deleted