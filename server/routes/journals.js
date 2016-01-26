var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../models');

// TODO - JSON WT checks on routes

// get 1 journal
router.get('/:journal_id', function(req, res) {
  db.Journal.findById(req.params.journal_id, function(err, journal) {
    if (err) {
      // TODO - error handling
      console.log(err);
    } else {
      res.send(journal);
    }
  })
});

router.put('/:journal_id', function(req, res) {
  db.Journal.findByIdAndUpdate(req.body._id, req.body, { new: true }, function(err, journal) {
    if (err) {
      // TODO - error handling
      console.log(err);
    } else {
      res.json({ success: true, journal: journal });
    }
  });
});

module.exports = router;