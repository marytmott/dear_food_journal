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
  var journalId = req.baseUrl.split('/')[3];
  // var date = new Date(req.params.date);
  // date.setDate(date.getDate() + 1);
  // var nextDay = new Date(date.setDate(date.getDate() + 1));

  console.log(req.params.date);
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
      db.Meal.find({ $and: [{ journal: journalId, date: { "$gte": new Date(req.params.date), "$lt": new Date(new Date(req.params.date).setDate(new Date(req.params.date).getDate() + 1)) } }] }, function(err, meals) {
        if (err) {
          console.log(err);
        } else {
          // console.log(meals);
          res.send(meals);
        }
      });
  //   }
  // });

});


module.exports = router;