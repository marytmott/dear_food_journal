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
  console.log(convertedDateParams);

  // find all meals
  // req.params.journal_id <-- should this be token when routes are locked down?
  // db.Journal.findById(req.baseUrl.split('/')[3], function(err, journal) {
  //   if (err) {
  //     console.log(err);
  //   } else {
      // console.log(journal);
      // console.log('date in fn', date);
      db.Meal.find({ $and: [{ journal: journalId, date: convertedDateParams }] }).populate('foodEntries.food').exec(function(err, meals) {
        if (err) {
          console.log(err);
        } else {
          // NEED TO POPULATE FOODS
          console.log(meals);
          res.send(meals);
        }
      });
  //   }
  // });

});


module.exports = router;