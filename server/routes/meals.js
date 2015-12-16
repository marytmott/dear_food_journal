var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');

// DO THE TOKEN ON ALLLLLL THISSSS!!

// 1. journal
// 2. meal
// 3. food
// 4. food entries (w/ servings)

// new meal
router.post('/', function(req, res) {
  console.log(req.body);
  // console.log('fields>>>', req.body.apiFoods[0].fields);
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
          totalNutrition: JSON.stringify(req.body.totalNutrition)
        },
        function(err, meal) {
          var reqApiFoods = req.body.apiFoods;
          var reqUserFoods = req.body.userFoods;
          console.log(reqApiFoods);
          console.log(reqUserFoods);
          var currentApiFood;
          var currentUserFood;

          if (err) {
            console.log(err);
          } else {
            // save meal to journal
            journal.meals.push(meal);
            journal.save();
            console.log('new meal!', meal);
            console.log('added meal');

            // CHECK FIRST THEN ADD Api foods to db (REFACTOR THIS w/ BELOW!!!)
            for (var i = 0; i < reqApiFoods.length; i++) {
              currentApiFood = reqApiFoods[i];
              // see if api food is already in db
              console.log('apifoodId>>>',currentApiFood._id);
              db.Food.findOne({ nix_id: currentApiFood._id }, function(err, food) {
                if (err) {
                  console.log(err);
                } else if (!food) {
                  console.log('food record from mongo>>>>>', food);
                    // console.log('current api food>>>>', currentApiFood);
                  db.Food.create(
                    {
                      name: currentApiFood.fields.item_name,
                      brand: currentApiFood.brand_name,
                      calories: currentApiFood.fields.nf_calories,
                      carbs: currentApiFood.fields.nf_total_carbohydrate,
                      fat: currentApiFood.fields.nf_total_fat,
                      fiber: currentApiFood.fields.nf_dietary_fiber,
                      protein: currentApiFood.fields.nf_protein,
                      sugars: currentApiFood.fields.nf_sugars,
                      servingSizeQty: currentApiFood.fields.nf_serving_size_qty,
                      servingSizeUnit: currentApiFood.fields.nf_serving_size_unit,
                      nix_id: currentApiFood._id,
                    },
                    function(err, food) {
                      if (err) {
                        console.log(err);
                      } else {
                        // make food entry and push to meal
                        db.FoodEntry.create(
                        {
                          food: food,
                          meal: meal,
                          servings: currentApiFood.userServings
                        },
                        function(err, foodEntry) {
                          // save food entry to meal
                          meal.foodEntries.push(foodEntry);
                          meal.save();
                          console.log('api food saved', food);
                        // food entries w/ serving sizes
                        });
                      }
                  });
                } else {
                  // DRY THIS UP -- 3rd use in this controller!!
                  db.FoodEntry.create(
                    {
                      food: food,
                      meal: meal,
                      servings: currentApiFood.userServings
                    },
                    function(err, foodEntry) {
                      // save food entry to meal
                      meal.foodEntries.push(foodEntry);
                      meal.save();
                      console.log('api food saved', food);
                    // food entries w/ serving sizes
                  });
                }
              });
            }

            // add user's foods to db if not in there and save on meal (to reduce daily api hits)
            // OR save already existing foods to db
            // can refactor as promise?
            // build out as find and update for user's own food db (future feature?)?
            for (var j = 0; j < reqUserFoods.length; j++) {
              currentUserFood = reqUserFoods[j];
              // console.log(currentUserFood);
              // create new food
              db.Food.create(
                {
                  name: currentUserFood.name,
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
                    // make food entry and push to meal
                    db.FoodEntry.create(
                    {
                      food: food,
                      meal: meal,
                      servings: currentUserFood.userServings
                    },
                    function(err, foodEntry) {
                      // save food entry to meal
                      meal.foodEntries.push(foodEntry);
                      meal.save();
                      console.log('user food saved', food);
                    // food entries w/ serving sizes
                    });
                  }
              });
            }
          }
      });
    }
  })
  res.send('got it!');
  // need to save meal to day

});

module.exports = router;