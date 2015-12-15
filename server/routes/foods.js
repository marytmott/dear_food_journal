var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// food type = api or user


// search the api
router.post('/api-search', function(req, res) {
//   var appId = process.env.NIX_API_ID;
//   var apiKey = process.env.NIX_API_KEY;
//   var userSearch = req.body.search;
//   var apiSearchLink = 'https://api.nutritionix.com/v1_1/search/'
//     + userSearch + '?results=0:20&fields=brand_name,item_id,item_name,nf_calories,nf_dietary_fiber,nf_protein,nf_serving_size_qty,nf_serving_size_unit,nf_sugars,nf_total_carbohydrate,nf_total_fat&appId='
//     + appId + '&appKey=' + apiKey;

// console.log(apiSearchLink);
//   // console.log(req.body.search);
//   request(apiSearchLink, function(error, response, body) {
//     // console.log("error!!!!", error);
//     console.log("response!!!", response.statusCode);
//     if (!error && response.statusCode == 200) {
//       res.send(body);
//       // console.log("body!!!", body);
//     }
//   });

res.send({
total_hits: 411,
max_score: 3.168178,
hits: [
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "529e801fea63d4933500cdce",
_score: 3.168178,
fields: {
item_id: "529e801fea63d4933500cdce",
item_name: "Starbucks Vanilla Frappucino",
brand_name: "Gandolfo's New York Delicatessen",
nf_calories: 200,
nf_total_fat: 3,
nf_total_carbohydrate: 37,
nf_dietary_fiber: 0,
nf_sugars: 31,
nf_protein: 6,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "5574f9f2b6b80339177c3c1a",
_score: 1.955959,
fields: {
item_id: "5574f9f2b6b80339177c3c1a",
item_name: "Frappuccino",
brand_name: "Starbucks Coffee",
nf_calories: 300,
nf_total_fat: 4.5,
nf_total_carbohydrate: 54,
nf_dietary_fiber: 1,
nf_sugars: 47,
nf_protein: 10,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "5564d0566996de8b6d3d052f",
_score: 1.7678111,
fields: {
item_id: "5564d0566996de8b6d3d052f",
item_name: "Frappuccino",
brand_name: "Starbucks Coffee",
nf_calories: 300,
nf_total_fat: 4.5,
nf_total_carbohydrate: 54,
nf_dietary_fiber: 1,
nf_sugars: 47,
nf_protein: 10,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "5537a73935bafb0e7d7bc04b",
_score: 1.7678111,
fields: {
item_id: "5537a73935bafb0e7d7bc04b",
item_name: "Frappuccino",
brand_name: "Starbucks Grocery",
nf_calories: 290,
nf_total_fat: 4.5,
nf_total_carbohydrate: 53,
nf_dietary_fiber: 0,
nf_sugars: 46,
nf_protein: 9,
nf_serving_size_qty: 13.7,
nf_serving_size_unit: "fl oz"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "51c35e1f97c3e69de4b013f4",
_score: 1.7678111,
fields: {
item_id: "51c35e1f97c3e69de4b013f4",
item_name: "Frappuccino",
brand_name: "Starbucks Coffee",
nf_calories: 200,
nf_total_fat: 3,
nf_total_carbohydrate: 37,
nf_dietary_fiber: 0,
nf_sugars: 31,
nf_protein: 6,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "5540c5b02afd54fa069811ab",
_score: 1.6280974,
fields: {
item_id: "5540c5b02afd54fa069811ab",
item_name: "Frappuccino",
brand_name: "Starbucks Coffee",
nf_calories: 290,
nf_total_fat: 4.5,
nf_total_carbohydrate: 53,
nf_dietary_fiber: 0,
nf_sugars: 46,
nf_protein: 9,
nf_serving_size_qty: 405,
nf_serving_size_unit: "ml"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "55943004ef3b6e0b131d5613",
_score: 1.6280974,
fields: {
item_id: "55943004ef3b6e0b131d5613",
item_name: "Frappuccino",
brand_name: "Starbucks Coffee",
nf_calories: 200,
nf_total_fat: 3,
nf_total_carbohydrate: 37,
nf_dietary_fiber: 0,
nf_sugars: 31,
nf_protein: 6,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "548f0995ee651e3915a655aa",
_score: 1.6280974,
fields: {
item_id: "548f0995ee651e3915a655aa",
item_name: "Frappuccino",
brand_name: "Starbucks Grocery",
nf_calories: 210,
nf_total_fat: 3.5,
nf_total_carbohydrate: 38,
nf_dietary_fiber: 0,
nf_sugars: 33,
nf_protein: 7,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "54f6ebb14e9eb9c0518e94d4",
_score: 1.6280974,
fields: {
item_id: "54f6ebb14e9eb9c0518e94d4",
item_name: "Frappuccino",
brand_name: "Starbucks Grocery",
nf_calories: 300,
nf_total_fat: 4.5,
nf_total_carbohydrate: 54,
nf_dietary_fiber: 1,
nf_sugars: 47,
nf_protein: 10,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "55918c9bdb5a8b48603dbc4e",
_score: 1.6280974,
fields: {
item_id: "55918c9bdb5a8b48603dbc4e",
item_name: "Frappuccino",
brand_name: "Starbucks Grocery",
nf_calories: 260,
nf_total_fat: 4.5,
nf_total_carbohydrate: 47,
nf_dietary_fiber: 1,
nf_sugars: 45,
nf_protein: 9,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "5464c6c49519b24248ec6f98",
_score: 1.5923419,
fields: {
item_id: "5464c6c49519b24248ec6f98",
item_name: "Frappuccino",
brand_name: "Starbucks Grocery",
nf_calories: 200,
nf_total_fat: 3.5,
nf_total_carbohydrate: 37,
nf_dietary_fiber: 0,
nf_sugars: 32,
nf_protein: 6,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "54f6ebedca74508612a62d35",
_score: 1.5923419,
fields: {
item_id: "54f6ebedca74508612a62d35",
item_name: "Frappuccino",
brand_name: "Starbucks Grocery",
nf_calories: 290,
nf_total_fat: 4.5,
nf_total_carbohydrate: 53,
nf_dietary_fiber: 1,
nf_sugars: 46,
nf_protein: 9,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "55a044ce6b5a279936e8a544",
_score: 1.5923419,
fields: {
item_id: "55a044ce6b5a279936e8a544",
item_name: "Frappuccino",
brand_name: "Starbucks Grocery",
nf_calories: 100,
nf_total_fat: 3,
nf_total_carbohydrate: 12,
nf_dietary_fiber: 0,
nf_sugars: 11,
nf_protein: 6,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "55ff6f69c7829ffb34cb32b7",
_score: 1.5923419,
fields: {
item_id: "55ff6f69c7829ffb34cb32b7",
item_name: "Frappuccino",
brand_name: "Starbucks Grocery",
nf_calories: 210,
nf_total_fat: 3,
nf_total_carbohydrate: 37,
nf_dietary_fiber: 0,
nf_sugars: 32,
nf_protein: 7,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "55c8d30e5678243326846b2c",
_score: 1.5923419,
fields: {
item_id: "55c8d30e5678243326846b2c",
item_name: "Frappuccino",
brand_name: "Starbucks Coffee",
nf_calories: 290,
nf_total_fat: 4.5,
nf_total_carbohydrate: 53,
nf_dietary_fiber: 1,
nf_sugars: 46,
nf_protein: 9,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "560a33a132ead2742f265094",
_score: 1.5923419,
fields: {
item_id: "560a33a132ead2742f265094",
item_name: "Frappuccino",
brand_name: "Starbucks Coffee",
nf_calories: 210,
nf_total_fat: 3.5,
nf_total_carbohydrate: 38,
nf_dietary_fiber: 0,
nf_sugars: 33,
nf_protein: 7,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "5518fa93952b050265229cee",
_score: 0.45888764,
fields: {
item_id: "5518fa93952b050265229cee",
item_name: "Frappuccino, Chilled Coffee Drink",
brand_name: "Starbucks Coffee",
nf_calories: 180,
nf_total_fat: 3,
nf_total_carbohydrate: 33,
nf_dietary_fiber: 0,
nf_sugars: 31,
nf_protein: 6,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "55599c743f52904c2a37b383",
_score: 0.45888764,
fields: {
item_id: "55599c743f52904c2a37b383",
item_name: "Chilled Coffee Drink, Frappuccino",
brand_name: "Starbucks Coffee",
nf_calories: 290,
nf_total_fat: 4.5,
nf_total_carbohydrate: 53,
nf_dietary_fiber: 0,
nf_sugars: 46,
nf_protein: 9,
nf_serving_size_qty: 1,
nf_serving_size_unit: "bottle"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "555c92b8cd6394b37a472808",
_score: 0.45888764,
fields: {
item_id: "555c92b8cd6394b37a472808",
item_name: "Frappuccino, Mocha Light",
brand_name: "Starbucks Coffee",
nf_calories: 66,
nf_total_fat: 2,
nf_total_carbohydrate: 8,
nf_dietary_fiber: 0,
nf_sugars: 8,
nf_protein: 4,
nf_serving_size_qty: 200,
nf_serving_size_unit: "ml"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "545b8d748432234444624e3e",
_score: 0.45888764,
fields: {
item_id: "545b8d748432234444624e3e",
item_name: "Frappuccino Coffee Drink",
brand_name: "Starbucks Grocery",
nf_calories: 180,
nf_total_fat: 3,
nf_total_carbohydrate: 33,
nf_dietary_fiber: 0,
nf_sugars: 31,
nf_protein: 7,
nf_serving_size_qty: 281,
nf_serving_size_unit: "ml"
}
}
]
});
});

module.exports = router;