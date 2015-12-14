var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// search the api
router.post('/search', function(req, res) {
  var appId = process.env.NIX_API_ID;
  var apiKey = process.env.NIX_API_KEY;
  var userSearch = req.body.search;
  var apiSearchLink = 'https://api.nutritionix.com/v1_1/search/'
    + userSearch + '?results=0:20&fields=item_id,item_name,brand_name,nf_serving_size_qty,nf_serving_size_unit,nf_serving_weight_grams,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein&appId='
    + appId + '&appKey=' + apiKey;

console.log(apiSearchLink);
  // console.log(req.body.search);
  request(apiSearchLink, function(error, response, body) {
    // console.log("error!!!!", error);
    console.log("response!!!", response.statusCode);
    if (!error && response.statusCode == 200) {
      res.send(body);
      // console.log("body!!!", body);
    }
  });


});


// find a food
router.post('/:food_id', function(req, res) {

});

module.exports = router;