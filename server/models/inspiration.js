var mongoose = require('mongoose');
var db = require('./index');
var Journal = require('./journal');

// this should probably be a few diff models?
var inspirationSchema = mongoose.Schema({
  journal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }],
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  tags: String,
  imageLink: String,
  author: String,
  comment: String,
  quote: String,
  tip: String
});

// hooks?

var Inspiration = mongoose.model('Inspiration', inspirationSchema);

module.exports = Inspiration;