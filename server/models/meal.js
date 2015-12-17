var mongoose = require('mongoose');
var db = require('./index');
// var DateOnly = require('mongoose-dateonly')(mongoose);
var Journal = require('./journal');
var FoodEntry = require('./foodEntry');

var mealSchema = mongoose.Schema({
  journal:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }],
  date: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  foodEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodEntry'
  }],
  emotions: String,
  notes: String,
  totalNutrition: Object // JSON object w/ details
  // ADD?: star rating how well did you enjoy it?
});

// remove foods

var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;

// HOOKS TO ADD:
// 1. remove journal entry when meal is deleted