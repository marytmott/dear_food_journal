var mongoose = require('mongoose');
var db = require('./index');
var Meal = require('./meal');
var Food = require('./food');

var foodEntrySchema = mongoose.Schema({
  // ref to meal, do we need this?
  meal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }],
  food: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }],
  servings: Number,
});

var FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

module.exports = FoodEntry;