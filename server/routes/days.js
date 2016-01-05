var express = require('express');
var router = express.Router();
var db = require('../models');
// var mongoose = require('mongoose');
// var DateOnly = require('mongoose-dateonly')(mongoose);
var jwt = require('jsonwebtoken');

// router.get('/')

// for date we want to get:
// meals (sorted by time)
// inspirations (to come)
// weight change? (to come)

// get date
router.get('/:date', function(req, res) {
  var journalId = req.baseUrl.split('/')[3];
  var convertedDateParams = req.params.date.replace(/\-/g, '/');

  db.Meal.find({ $and: [{ journal: journalId, date: convertedDateParams }] }).populate('foodEntries').exec(function(err, meals) {
    var options = {
      path: 'foodEntries.food',
      model: 'Food'
    };

    if (err) {
      console.log(err);
    } else {
      db.Meal.populate(meals, options, function (err, meals) {
        res.send(meals);
      });
    }
  });
});


module.exports = router;