var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// search the api
router.post('/search', function(req, res) {
  var appId = process.env.NIX_API_ID;
  var apiKey = process.env.NIX_API_KEY;
  var userSearch = req.body.search;
  var apiSearchLink = 'https://api.nutritionix.com/v1_1/search/' + userSearch + '?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=' + appId + '&appKey=' + apiKey;

console.log(apiSearchLink);
  // console.log(req.body.search);

});


// find a food
router.post('/:food_id', function(req, res) {

});

module.exports = router;