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
  console.log(req.body);
  // look for + add food
  // look for + add to day
  // add meal
  // update journal?
  // add foods
});

// router.get('/:meal_id');

module.exports = router;