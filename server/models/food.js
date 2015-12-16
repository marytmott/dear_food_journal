var mongoose = require('mongoose');
var db = require('./index');
var User = require('./user');

var foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: String,
  type: String, //will be as apiFood or userFood type
  calories: Number,
  carbs: Number,
  fat: Number,
  fiber: Number,
  protein: Number,
  sugars: Number,
  user: [{  // to add to user's own personal food db future feature?
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Food = mongoose.model('Food', foodSchema);

module.exports = Food;