var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../models');

// JSON WT on all!!!

// get all inspirations
router.get('/', function(req, res) {
  var journalId = req.baseUrl.split('/')[3];

  db.Inspiration.find({ journal: journalId }, function(err, inspirations) {
    if (err) {
      console.log(err);
    } else {
      res.send(inspirations);
    }
  })
});


// new inspiration
router.post('/', function(req, res) {
  console.log(req.body);
  db.Inspiration.create(req.body, function(err, inspiration) {
    if (err) {
      console.log(err);
    } else {
      console.log(inspiration);
      res.json({ success: true });
    }
  });

  // res.json({ message: 'received' });
});

module.exports = router;
