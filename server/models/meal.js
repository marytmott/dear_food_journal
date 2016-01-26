var mongoose = require('mongoose');
var db = require('./index');
var Food = require('./food');

// TODO - hooks

var mealSchema = mongoose.Schema({
  journal:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal',
    required: true
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
  foodEntries: [
    {
      food: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
        }],
      servings:  {
        type: Number,
        required: true
      }
    }
  ],
  emotions: String,
  notes: String,
  totalNutrition: Object
});

var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;