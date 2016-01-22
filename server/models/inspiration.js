var mongoose = require('mongoose');
var db = require('./index');
var Journal = require('./journal');

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

var Inspiration = mongoose.model('Inspiration', inspirationSchema);

module.exports = Inspiration;