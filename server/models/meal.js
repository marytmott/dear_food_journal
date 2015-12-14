var mongoose = require('mongoose');
var db = require('./index');
var Journal = require('./journal');
var Day = require('./day');
var FoodEntry = require('./foodEntry');

var mealSchema = mongoose.Schema({
  journal:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }],
  day: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day'
  }],
  time: {
    type: Date
  },
  foodEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodEntry'
  }],
  type: String,
  emotionsBefore: String,
  notes: String,
  // ADD?: star rating how well did you enjoy it?
});

// remove foods

var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;