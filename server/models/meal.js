var mongoose = require('mongoose');
var db = require('./index');
// var DateOnly = require('mongoose-dateonly')(mongoose);
var Journal = require('./journal');
var Food = require('./food');
var db = require('./index');

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
  foodEntries: [
    {
      food: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
        }],
      servings: Number
    }
  ],
  emotions: String,
  notes: String,
  totalNutrition: Object // JSON object w/ details
  // ADD?: star rating how well did you enjoy it?
});

// remove meal from journal reference

mealSchema.pre('remove', function(next) {
  var meal = this;
  console.log('THIS IS THE PREREMOVE HOOK FOR MEAL!!');

  // delete this meal's reference from journal
  Journal.findOne({ _id: meal.journal }, { $pull: { meals: meal._id } }).exec(function(err, journal) {
    if (err) {
      console.log('ERROR', err);
    } else {
      console.log('DELETED MEAL REFERENCE FROM ' + journal._id);
    };

  });
  // remove users foods?
  next();
});

var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;

// HOOKS TO ADD:
// 1. remove journal entry when meal is deleted