var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');

// DO THE TOKEN ON ALLLLLL THISSSS!!

// get 1 meal
router.get('/:meal_id', function(req, res) {
  db.Meal.findById(req.params.meal_id).populate('foodEntries.food').exec(function(err, meal) {
    if (err) {
      console.log(err);
    } else {
      // console.log(meals);
      res.json(meal);
    }
  });
});

// new meal
router.post('/', function(req, res) {
  console.log(req.body);

  db.Meal.create(
    {
      journal: req.body.journal,
      date: req.body.date,
      time: req.body.time,
      name: req.body.name,
      emotions: req.body.emotions,
      notes: req.body.notes,
      totalNutrition: req.body.totalNutrition
    },
    function(err, meal) {
      var reqApiFoods = req.body.apiFoods;
      var reqUserFoods = req.body.userFoods;
      var currentApiFood;
      var currentUserFood;

      if (err) {
        console.log(err);
      } else {
        console.log('new meal!', meal);
        // CHECK FIRST THEN ADD Api foods to db (REFACTOR THIS w/ BELOW!!!)
        for (var i = 0; i < reqApiFoods.length; i++) {
          currentApiFood = reqApiFoods[i];
          console.log('apifoodId>>>',currentApiFood._id);
          // have to do this b/c of async multiple entry errors? hack fix-around for mongo??
          db.Food.findOneAndUpdate({ nix_id: currentApiFood._id },
            {
              name: currentApiFood.fields.item_name,
              brand: currentApiFood.brand_name,
              calories: currentApiFood.fields.nf_calories,
              carbohydrates: currentApiFood.fields.nf_total_carbohydrate,
              fat: currentApiFood.fields.nf_total_fat,
              fiber: currentApiFood.fields.nf_dietary_fiber,
              protein: currentApiFood.fields.nf_protein,
              sugars: currentApiFood.fields.nf_sugars,
              servingSizeQty: currentApiFood.fields.nf_serving_size_qty,
              servingSizeUnit: currentApiFood.fields.nf_serving_size_unit,
              nix_id: currentApiFood._id,
            }, { upsert: true, new: true }, function(err, food) {
              if (err) {
                console.log(err);
              } else {
                meal.foodEntries.push({ food: food, servings: currentApiFood.userServings });
                meal.save();
                console.log('api food saved', food);
              }
          });
        }

        // add user's foods to db if not in there and save on meal (to reduce daily api hits)
        // OR save already existing foods to db
        // can refactor as promise?
        // build out as find and update for user's own food db (future feature?)?
        for (var j = 0; j < reqUserFoods.length; j++) {
          currentUserFood = reqUserFoods[j];
          // create new food
          db.Food.create(
            {
              name: currentUserFood.name.trim(),
              type: currentUserFood.type,
              calories: currentUserFood.calories,
              carbohydrates: currentUserFood.carbs,
              fat: currentUserFood.fat,
              fiber: currentUserFood.fiber,
              protein: currentUserFood.protein,
              sugars: currentUserFood.sugars,
              user: req.body.user
            },
            function(err, food) {
              if (err) {
                console.log(err);
              } else {
                meal.foodEntries.push({ food: food, servings: currentUserFood.userServings });
                meal.save();
                console.log('user food saved', food);
              }
            });
          }
    }
  });
  res.json({ message: 'got it!' });
});

router.delete('/:meal_id', function(req, res) {
  db.Meal.findByIdAndRemove(req.params.meal_id, function(err, meal) {
    if (err) {
      console.log(err);
    } else {
      console.log('MEAL DELETED: ', meal);
      res.json({ success: true });
    }
  });
});

module.exports = router;