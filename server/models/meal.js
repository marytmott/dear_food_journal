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
  foodEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodEntry'
  }],
  commentsGen: String,
  commentsAfter: String
  // ADD?: star rating how well did you enjoy it?
});

// remove foods

var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;