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
  console.log(req.body);
  console.log('fields>>>', req.body.apiFoods[0].fields);
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
          var currentFood;

          if (err) {
            console.log(err);
          } else {
            // save meal to journal
            journal.meals.push(meal);
            journal.save();
            console.log('new meal!', meal);
            console.log('added meal');

            // CHECK FIRST THEN ADD Api foods to db (REFACTOR THIS w/ BELOW!!!)
//             for (var i = 0; i < reqApiFoods.length; j++) {
//               currentFood = reqApiFoods[i];
//               // create new food
//               db.Food.create(
//                 {
//                   name: currentFood.name,
//                   type: currentFood.type,
//                   calories: currentFood.calories,
//                   carbs: currentFood.carbs,
//                   fat: currentFood.fat,
//                   fiber: currentFood.fiber,
//                   protein: currentFood.protein,
//                   sugars: currentFood.sugars,
//                   user: req.body.user
//                 },
//                 function(err, food) {
//                   if (err) {
//                     console.log(err);
//                   } else {
//                     // make food entry and push to meal
//                     db.FoodEntry.create(
//                     {
//                       food: food,
//                       meal: meal,
//                       servings: currentFood.userServings
//                     },
//                     function(err, foodEntry) {
//                       // save food entry to meal
//                       meal.foodEntries.push(foodEntry);
//                       meal.save();
//                       console.log('api food saved', food);
//                     // food entries w/ serving sizes
//                     });
//                   }
//               });
//             }


// fields>>> { item_id: '529e801fea63d4933500cdce',
//   item_name: 'Starbucks Vanilla Frappucino',
//   brand_name: 'Gandolfo\'s New York Delicatessen',
//   nf_calories: 200,
//   nf_total_fat: 3,
//   nf_total_carbohydrate: 37,
//   nf_dietary_fiber: 0,
//   nf_sugars: 31,
//   nf_protein: 6,
//   nf_serving_size_qty: 1,
//   nf_serving_size_unit: 'bottle' }


            // add user's foods to db if not in there and save on meal (to reduce daily api hits)
            // OR save already existing foods to db
            // can refactor as promise?
            // build out as find and update for user's own food db (future feature?)?
            for (var j = 0; j < reqUserFoods.length; j++) {
              currentFood = reqUserFoods[j];
              // create new food
              db.Food.create(
                {
                  name: currentFood.name,
                  type: currentFood.type,
                  calories: currentFood.calories,
                  carbs: currentFood.carbs,
                  fat: currentFood.fat,
                  fiber: currentFood.fiber,
                  protein: currentFood.protein,
                  sugars: currentFood.sugars,
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
                      servings: currentFood.userServings
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