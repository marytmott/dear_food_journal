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
  // days: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Day'
  // }],
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }],
  dailyCalorieGoal: Number,
  //other daily goals?
  weightGoal: Number,
  // add date for when weight is entered to track how much lost in how much time?
  origWeight: Number,
  toDateWeightChange: Number
// general notes or put in inspirations?
});

// add delete hook to delete entries

var Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;

// HOOKS TO ADD:
// 1. remove journal when user is deleted