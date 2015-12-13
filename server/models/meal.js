var mongoose = require('mongoose');
var db = require('./index');
var Journal = require('./journal');
var FoodEntry = require('./foodEntry');

var mealSchema = mongoose.Schema({
  journal:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }],
  date: {
    type: Date,
    required: true,
    default: Date.now  // need this?
  },
  time: {
    type: Date
  },
  foodEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodEntry'
  }],
  name: String,
  emotionsBefore: String,
  commentsAfter: String,
  notes: String,
  // ADD?: star rating how well did you enjoy it?
});

// remove foods

var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;