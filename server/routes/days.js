var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');

// router.get('/')

// for date we want to get:
// meals (sorted by time)
// inspirations (to come)
// weight change? (to come)

// get date
router.get('/:date', function(req, res) {
  // console.log('qhat');
  console.log(req.baseUrl.split('/'));
  res.send('stuff');
  // res.send('what');
  // find all meals
  // req.params.journal_id <-- should this be token when routes are locked down?
  // db.Journal.findById(req.baseUrl.split('/')[3], function(err, journal) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     // console.log(journal);
  //     db.Meal.find({ journal: journal._id }, function(err, meals) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         // console.log(meals);
  //         res.send(meals);
  //       }
  //     });
  //   }
  // });

});


module.exports = router;