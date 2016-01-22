var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// search the api
router.post('/api-search', function(req, res) {
  var appId = process.env.NIX_API_ID;
  var apiKey = process.env.NIX_API_KEY;
  var userSearch = req.body.search;
  var apiSearchLink = 'https://api.nutritionix.com/v1_1/search/'
    + userSearch + '?results=0:20&fields=brand_name,item_id,item_name,nf_calories,nf_dietary_fiber,nf_protein,nf_serving_size_qty,nf_serving_size_unit,nf_sugars,nf_total_carbohydrate,nf_total_fat&appId='
    + appId + '&appKey=' + apiKey;

  request(apiSearchLink, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

module.exports = router;