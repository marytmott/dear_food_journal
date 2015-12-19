var mongoose = require('mongoose');
var db = require('./index');

var apiFoodSchema = mongoose.Schema({
  fields: {
    item_name: String,
    nf_calories: Number,
    nf_total_carbohydrate: Number,
    nf_dietary_fiber: Number,
    nf_protein: Number,
    nf_sugars: Number,
    nf_serving_size_qty: Number,
    nf_serving_size_unit: String,
  },
  brand_name: String,
  nix_id: {
    type: String,
    unique: true
  }
});

var ApiFood = mongoose.model('ApiFood', apiFoodSchema);

module.exports = ApiFood;