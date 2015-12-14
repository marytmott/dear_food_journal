var mongoose = require('mongoose');
var db = require('./index');
var Meal = require('./meal');
var Food = require('./food');

var foodEntrySchema = mongoose.Schema({
  // ref to apiFood
  meal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }],
  food: String, // for testing only now -- will be mongo schema id
  serving: Number,
});

var FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

module.exports = FoodEntry;