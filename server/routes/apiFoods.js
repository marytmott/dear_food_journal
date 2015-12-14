var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// search the api
router.post('/search', function(req, res) {
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
total_hits: 21087,
max_score: 2.29557,
hits: [
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "521b95cb4a56d006d578ba25",
_score: 2.29557,
fields: {
item_id: "521b95cb4a56d006d578ba25",
item_name: "Egg Salad Sandwich",
brand_id: "513fbc1283aa2dc80c00001f",
brand_name: "Starbucks",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "537f9baded22ed907af7b505",
_score: 2.176477,
fields: {
item_id: "537f9baded22ed907af7b505",
item_name: "Egg Salad, Deli Sandwich",
brand_id: "513fbc1283aa2dc80c00001f",
brand_name: "Starbucks",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "23cb3134e7e8abfb86ab2226",
_score: 2.118197,
fields: {
item_id: "23cb3134e7e8abfb86ab2226",
item_name: "Egg & Cheddar Breakfast Sandwich",
brand_id: "513fbc1283aa2dc80c00001f",
brand_name: "Starbucks",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "54ef3b5c833038202cc8f95b",
_score: 1.8309906,
fields: {
item_id: "54ef3b5c833038202cc8f95b",
item_name: "Deli Sandwich, Egg Salad",
brand_id: "51db37c0176fe9790a89903b",
brand_name: "Starbucks Coffee",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "555ab4be5ee4998464eacdba",
_score: 1.7856635,
fields: {
item_id: "555ab4be5ee4998464eacdba",
item_name: "Egg Salad Deli Sandwich",
brand_id: "51db37c0176fe9790a899039",
brand_name: "Starbucks Grocery",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "53444cfc7ba4ca15456f561c",
_score: 0.7603966,
fields: {
item_id: "53444cfc7ba4ca15456f561c",
item_name: "Egg",
brand_id: "521b95434a56d006cae297f9",
brand_name: "Bd's Mongolian Grill",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "554f0d1ef2762557602ec862",
_score: 0.75136155,
fields: {
item_id: "554f0d1ef2762557602ec862",
item_name: "Sandwich",
brand_id: "554f0d62b31cb526580c21e8",
brand_name: "Seattle Blues",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "ae497599734c9ec17fce4851",
_score: 0.74758244,
fields: {
item_id: "ae497599734c9ec17fce4851",
item_name: "Egg",
brand_id: "513fbc1283aa2dc80c00081c",
brand_name: "First Watch",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "54f6cfe618344ba86864de39",
_score: 0.7397537,
fields: {
item_id: "54f6cfe618344ba86864de39",
item_name: "Sandwich",
brand_id: "54f6cff72011b8ab51ad7b6a",
brand_name: "Shindig Sammy",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "ae49759903f665984d0bda39",
_score: 0.73303807,
fields: {
item_id: "ae49759903f665984d0bda39",
item_name: "Egg Sandwich",
brand_id: "53022ccebf41bf4b1c000001",
brand_name: "Seasonal Specialties",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "de368420089f365841885f41",
_score: 0.71659017,
fields: {
item_id: "de368420089f365841885f41",
item_name: "Egg Sandwich",
brand_id: "de368349c9e7adbb589183d5",
brand_name: "Well Informed",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "53444b097ba4ca15456f526d",
_score: 0.71659017,
fields: {
item_id: "53444b097ba4ca15456f526d",
item_name: "Egg Sandwich",
brand_id: "51db37cf176fe9790a899d49",
brand_name: "Lyfe Kitchen",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "54f5620ecd6e20e01186feb8",
_score: 0.7046365,
fields: {
item_id: "54f5620ecd6e20e01186feb8",
item_name: "Breakfast Sandwich",
brand_id: "51db37c0176fe9790a89903b",
brand_name: "Starbucks Coffee",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "521b95cb4a56d006d578ba28",
_score: 0.70304257,
fields: {
item_id: "521b95cb4a56d006d578ba28",
item_name: "Turkey & Havarti Sandwich",
brand_id: "513fbc1283aa2dc80c00001f",
brand_name: "Starbucks",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "5501784494129e2360f2ca38",
_score: 0.68288755,
fields: {
item_id: "5501784494129e2360f2ca38",
item_name: "Sandwich, Egg Salad",
brand_id: "51db37b0176fe9790a8983e0",
brand_name: "Meijer",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "552da1e82becf27830c33f3e",
_score: 0.6825663,
fields: {
item_id: "552da1e82becf27830c33f3e",
item_name: "Egg",
brand_id: "51db37be176fe9790a898ec5",
brand_name: "Snickers",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "55c99a4f669f4af826fef087",
_score: 0.6825663,
fields: {
item_id: "55c99a4f669f4af826fef087",
item_name: "Egg",
brand_id: "51db37b1176fe9790a8984ab",
brand_name: "Polar",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "521b95cb4a56d006d578b9ec",
_score: 0.67531824,
fields: {
item_id: "521b95cb4a56d006d578b9ec",
item_name: "Starbucks Caramel Iced Coffee",
brand_id: "513fbc1283aa2dc80c00001f",
brand_name: "Starbucks",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "513fc9cb673c4fbc26005c2b",
_score: 0.67377996,
fields: {
item_id: "513fc9cb673c4fbc26005c2b",
item_name: "Egg Salad Sandwich",
brand_id: "513fbc1283aa2dc80c0012ea",
brand_name: "Izzy's",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
},
{
_index: "f762ef22-e660-434f-9071-a10ea6691c27",
_type: "item",
_id: "55523d0a06740aca4d077ed0",
_score: 0.67377996,
fields: {
item_id: "55523d0a06740aca4d077ed0",
item_name: "Egg Salad Sandwich",
brand_id: "526831133203b9c3390001c8",
brand_name: "Unknown",
nf_serving_size_qty: 1,
nf_serving_size_unit: "serving"
}
}
]
});

});


// find a food
router.post('/:food_id', function(req, res) {

});

module.exports = router;