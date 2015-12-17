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
  // var date = new Date(req.params.date);
  // date.setDate(date.getDate() + 1);
  // var nextDay = new Date(date.setDate(date.getDate() + 1));
  var convertDateParams = req.params.date.replace(/\-/g, '/');
  console.log(convertDateParams);
  // console.log(new Date(convertedStringToUTC));
  // console.log('original date:::::', date)
  // console.log('nextday:::::::', new Date(date.setDate(date.getDate() + 1)));
  // res.send('stuff');
  // find all meals
  // req.params.journal_id <-- should this be token when routes are locked down?
  // db.Journal.findById(req.baseUrl.split('/')[3], function(err, journal) {
  //   if (err) {
  //     console.log(err);
  //   } else {
      // console.log(journal);
      // console.log('date in fn', date);
      db.Meal.find({ $and: [{ journal: journalId, date: convertDateParams /*{ "$gte": new Date(Date.now()), "$lt": new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1)) }*/ }] }, function(err, meals) {
        if (err) {
          console.log(err);
        } else {
          // parse total nutrition before sending
          // meals.forEach(function(meal) {
          //   var parsedTotNutr = JSON.parse(meal.totalNutrition)
          //   meal.totalNutrition = parsedTotNutr;
          //   console.log(typeof meal.totalNutrition);
          // });
          console.log(meals);
          res.send(meals);
        }
      });
  //   }
  // });

});


module.exports = router;