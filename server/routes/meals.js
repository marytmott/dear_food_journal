var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');

// DO THE TOKEN ON ALLLLLL THISSSS!!

// this is where we are going to post new meal entries
// update models!!!
// food
// day?
// food entry
// journal
// meal

//console.log/ok for each db entry

router.post('/', function(req, res) {
  // find journal's day and create new one if not found
  db.Day.findOneAndUpdate({ $and: [{ date: req.body.date },{ journal: req.body.journal_id }] },
    { date: req.body.date, journal: req.body.journal_id }, { upsert: true, new: true }, function(err, day) {
    if (err) {
      console.log(err);
    } else {
      console.log('day', day);

      // look for records of all foods...create if not found...add to meal
      console.log('user foods', req.body.userFoods.length);
      console.log('api foods', req.body.apiFoods.length);
    }
  });
  console.log(req.body);
  // // look for + add food
  // // look for + add to day
  // // add meal
  // update journal?
  // add foods
  res.send('got it!');
  // need to save meal to day

});

// router.get('/:meal_id');

module.exports = router;