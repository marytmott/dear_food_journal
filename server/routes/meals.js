var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');

// DO THE TOKEN ON ALLLLLL THISSSS!!

// this is where we are going to post new meal entries
// update models!!!
// food
// food entry
// journal
// meal

// 1. journal
// 2. meal

//console.log/ok for each db entry

// new meal
router.post('/', function(req, res) {
  // find journal
  db.Journal.findById(req.body.journal, function(err, journal) {
    if (err) {
      console.log(error);
    } else {
      // save meal to journal
      // create meal
      db.Meal.create(
        {
          journal: journal,
          date: req.body.date,
          time: req.body.time,
          name: req.body.name,
          emotions: req.body.emotions,
          notes: req.body.notes,
        },
        function(err, meal) {
          if (err) {
            console.log(err);
          } else {
            // save meal to journal
            journal.meals.push(meal);
            journal.save();
            console.log('new meal!', meal);
            console.log('added meal');

            // add foods to db if not in there and save on meal (to reduce daily api hits)
            // OR save already existing foods to db
            console.log(req.body.apiFoods.length);
            console.log(req.body.apiFoods.length);
          }
      });
    }
  })
  console.log(req.body);
  // find journal's day and create new one if not found

  // do foods first, then create??

  // dont need day model??!
  // db.Day.findOneAndUpdate({ $and: [{ date: req.body.date },{ journal: req.body.journal }] },
  //   { date: req.body.date, journal: req.body.journal }, { upsert: true, new: true }, function(err, day) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('day', day);

  //     // look for records of all foods...create if not found...add to meal
  //     console.log('user foods', req.body.userFoods.length);
  //     console.log('api foods', req.body.apiFoods.length);
  //   }
  // });
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