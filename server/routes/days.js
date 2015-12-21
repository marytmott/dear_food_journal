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
  // console.log(convertedDateParams);

  // find all meals
  // req.params.journal_id <-- should this be token when routes are locked down?
  // db.Journal.findById(req.baseUrl.split('/')[3], function(err, journal) {
  //   if (err) {
  //     console.log(err);
  //   } else {
      // console.log(journal);
      // console.log('date in fn', date);
      db.Meal.find({ $and: [{ journal: journalId, date: convertedDateParams }] }).populate('foodEntries').exec(function(err, meals) {
        if (err) {
          console.log(err);
        } else {

        var options = {
              path: 'foodEntries.food',
              model: 'Food'
            };

    // if (err) return res.json(500);
    db.Meal.populate(meals, options, function (err, meals) {
              // console.log(meals);
      res.send(meals);
    });
  // });
          // for (var i = 0; i < meals.length; i++)
          //   var currentMeal = meals[0];
          // have to go throug returned meals to populate foods
      //     db.FoodEntry.find({ meal: meals[0]._id }).populate('food').exec(function(err, foodEntries) {
      //       if (err) {
      //         console.log(err);
      //       } else {
      //         console.log(foodEntries);
      //         // populate foods in the meals
      //     //   }
      //     // });
      //     // NEED TO POPULATE FOODS
      //   }
      // });
              // res.send(meals);
    }
  });

});


module.exports = router;