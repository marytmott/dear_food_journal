var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../models');

// need jwt!!

// get 1 journal
router.get('/:journal_id', function(req, res) {
  db.Journal.findById(req.params.journal_id, function(err, journal) {
    if (err) {
      console.log(err);
    } else {
      res.send(journal);
    }
  })
});

router.put('/:journal_id', function(req, res) {
  // console.log(req.body);
  // res.send('ok');
  db.Journal.findByIdAndUpdate(req.body._id, req.body, { new: true }, function(err, journal) {
    if (err) {
      console.log(err);
    } else {
      console.log(journal);
      res.json({ success: true, journal: journal });
    }
  });
});


module.exports = router;