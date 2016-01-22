var mongoose = require('mongoose');
var db = require('./index');
var User = require('./user');

// TODO: pre/post hooks

var journalSchema = mongoose.Schema({
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  weightChangeType: {  // this will indicate whether they want to gain or lose weight
    type: String,
    default: 'lose'
  },
  weightChangeReason: String,
  dailyCalorieGoal: Number,
  weightGoal: Number,
  startWeight: Number,
  currentWeight: Number
});

var Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;