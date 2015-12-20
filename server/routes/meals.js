var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
// var async = require('async');

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
  var reqApiFoods = req.body.apiFoods;
  var reqUserFoods = req.body.userFoods;
  var currentApiFood;
  var currentUserFood;
  // console.log(req.body);
  var foodEntries = [];
  var foodEntry;



  // have to do like this b/c of async mongo issues
  for (var i = 0; i < reqApiFoods.length; i++) {
    currentApiFood = reqApiFoods[i];
    console.log('apifoodId>>>',currentApiFood._id);
    // have to do this b/c of async multiple entry errors? hack fix-around for mongo??
    foodEntry = {
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
      nixId: currentApiFood._id,
    };
    foodEntries.push({ food: foodEntry, servings: currentApiFood.userServings });
  }

  for (var j = 0; j < reqUserFoods.length; j++) {
    currentUserFood = reqUserFoods[j];
    // create new food
    var foodEntry = {
      name: currentUserFood.name.trim(),
      calories: currentUserFood.calories,
      carbohydrates: currentUserFood.carbs,
      fat: currentUserFood.fat,
      fiber: currentUserFood.fiber,
      protein: currentUserFood.protein,
      sugars: currentUserFood.sugars,
      user: req.body.user,
    };
    foodEntries.push({ food: foodEntry, servings: currentUserFood.userServings });
  }

  console.log('FOODS!!', foodEntries);
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
      var total = foodEntries.length;
      var result = [];

      if (err) {
        console.log(err);
      } else {
        console.log('new meal!', meal);
        // CHECK FIRST THEN ADD Api foods to db (REFACTOR THIS w/ BELOW!!!)

        // have to do this b/c of async multiple entry errors? hack fix-around for mongo??
        // promise this?
        // refacrot this like nuts...go back to previous version? (see below route exports)
        function addFoods() {
          var foodEntry = foodEntries.pop();
          total--;
          console.log('TOTAL!!!!!', total);
          console.log('FOODENTRHY NOW: ', foodEntry.food);
          console.log('nixid???', foodEntry.food.nixId);
            if (foodEntry.food.nixId) {
              db.Food.findOneAndUpdate({ nixId: foodEntry.food.nixId }, foodEntry.food, { upsert: true, new: true }, function(err, food) {
                  if (err) {
                    console.log(err);
                  } else {
                    result.push(food);
                    meal.foodEntries.push({ food: food, servings: foodEntry.servings });
                    console.log('nix food saved', food);
                    if (total) {
                      addFoods();
                    } else {
                      // need to save meal last or it saves last food twice bug??
                      console.log(result);
                      meal.save(function(err, meal) {
                        if (err) {
                          console.log(err);
                        } else {
                          res.json({ message: 'meal created', meal: meal});
                        }
                      });
                    }

                  }
              });

            } else {
              db.Food.create(foodEntry.food, function(err, food) {
                if (err) {
                  console.log(err);
                } else {
                  result.push(food);
                    meal.foodEntries.push({ food: food, servings: foodEntry.servings });
                    console.log('user food saved', food);
                    if (total) {
                      addFoods();
                    } else {
                      // need to save meal last or it saves last food twice bug??
                      console.log(result);
                      meal.save(function(err, meal) {
                        if (err) {
                          console.log(err);
                        } else {
                          res.json({ message: 'meal created', meal: meal});
                        }
                      });
                    }
                }
              });
            }

          }

          addFoods();
    }
  });
  res.json({ message: 'got it!' });
});


// update meal
// WOW DRY THIS UP WTIH ABOVE?
router.put('/:meal_id', function(req, res) {
  var reqApiFoods = req.body.apiFoods;
  var reqUserFoods = req.body.userFoods;
  var currentApiFood;
  var currentUserFood;
  // console.log(req.body);
  var foodEntries = [];
  var foodEntry;


  // have to do like this b/c of async mongo issues
  for (var i = 0; i < reqApiFoods.length; i++) {
    currentApiFood = reqApiFoods[i];
    console.log('apifoodId>>>',currentApiFood._id);
    // have to do this b/c of async multiple entry errors? hack fix-around for mongo??
    foodEntry = {
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
      nixId: currentApiFood._id,
    };
    foodEntries.push({ food: foodEntry, servings: currentApiFood.userServings });
  }

  for (var j = 0; j < reqUserFoods.length; j++) {
    currentUserFood = reqUserFoods[j];
    // create new food
    var foodEntry = {
      name: currentUserFood.name.trim(),
      calories: currentUserFood.calories,
      carbohydrates: currentUserFood.carbs,
      fat: currentUserFood.fat,
      fiber: currentUserFood.fiber,
      protein: currentUserFood.protein,
      sugars: currentUserFood.sugars,
      user: req.body.user,
    };
    foodEntries.push({ food: foodEntry, servings: currentUserFood.userServings });
  }

  console.log('FOODS!!', foodEntries);
  db.Meal.findByIdAndUpdate(req.body._id,
    {
      date: req.body.date,
      time: req.body.time,
      name: req.body.name,
      emotions: req.body.emotions,
      notes: req.body.notes,
      totalNutrition: req.body.totalNutrition,
      foodEntries: []
    },
    function(err, meal) {
      var total = foodEntries.length;
      var result = [];

      if (err) {
        console.log(err);
      } else {
        console.log('meal found to update!', meal);
        // CHECK FIRST THEN ADD Api foods to db (REFACTOR THIS w/ BELOW!!!)

        // have to do this b/c of async multiple entry errors? hack fix-around for mongo??
        // promise this?
        // refacrot this like nuts...go back to previous version? (see below route exports)
        function addFoods() {
          var foodEntry = foodEntries.pop();
          total--;
          console.log('TOTAL!!!!!', total);
          console.log('FOODENTRHY NOW: ', foodEntry.food);
          console.log('nixid???', foodEntry.food.nixId);
            if (foodEntry.food.nixId) {
              db.Food.findOneAndUpdate({ nixId: foodEntry.food.nixId }, foodEntry.food, { upsert: true, new: true }, function(err, food) {
                  if (err) {
                    console.log(err);
                  } else {
                    result.push(food);
                    meal.foodEntries.push({ food: food, servings: foodEntry.servings });
                    console.log('nix food saved', food);
                    if (total) {
                      addFoods();
                    } else {
                      // need to save meal last or it saves last food twice bug??
                      console.log(result);
                      meal.save(function(err, meal) {
                        if (err) {
                          console.log(err);
                        } else {
                          res.json({ message: 'meal updated', meal: meal});
                        }
                      });
                    }

                  }
              });

            } else {
              db.Food.create(foodEntry.food, function(err, food) {
                if (err) {
                  console.log(err);
                } else {
                  result.push(food);
                    meal.foodEntries.push({ food: food, servings: foodEntry.servings });
                    console.log('user food saved', food);
                    if (total) {
                      addFoods();
                    } else {
                      // need to save meal last or it saves last food twice bug??
                      console.log(result);
                      meal.save(function(err, meal) {
                        if (err) {
                          console.log(err);
                        } else {
                          res.json({ message: 'meal updated', meal: meal});
                        }
                      });
                    }
                }
              });
            }

          }

      addFoods();
    }
  });
});


// delete meal
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



// from previous version of this controller ---->

// function(err, meal) {
//       var reqApiFoods = req.body.apiFoods;
//       var reqUserFoods = req.body.userFoods;
//       var currentApiFood;
//       var currentUserFood;

//       if (err) {
//         console.log(err);
//       } else {
//         console.log('new meal!', meal);
//         // CHECK FIRST THEN ADD Api foods to db (REFACTOR THIS w/ BELOW!!!)
//         for (var i = 0; i < reqApiFoods.length; i++) {
//           currentApiFood = reqApiFoods[i];
//           console.log('apifoodId>>>',currentApiFood._id);
//           // have to do this b/c of async multiple entry errors? hack fix-around for mongo??
//           db.Food.findOneAndUpdate({ nixId: currentApiFood._id },
//             {
//               name: currentApiFood.fields.item_name,
//               brand: currentApiFood.brand_name,
//               calories: currentApiFood.fields.nf_calories,
//               carbohydrates: currentApiFood.fields.nf_total_carbohydrate,
//               fat: currentApiFood.fields.nf_total_fat,
//               fiber: currentApiFood.fields.nf_dietary_fiber,
//               protein: currentApiFood.fields.nf_protein,
//               sugars: currentApiFood.fields.nf_sugars,
//               servingSizeQty: currentApiFood.fields.nf_serving_size_qty,
//               servingSizeUnit: currentApiFood.fields.nf_serving_size_unit,
//               nixId: currentApiFood._id,
//             }, { upsert: true, new: true }, function(err, food) {
//               if (err) {
//                 console.log(err);
//               } else {
//                 meal.foodEntries.push({ food: food, servings: currentApiFood.userServings });
//                 meal.save();
//                 console.log('api food saved', food);
//               }
//           });
//         }

//         // add user's foods to db if not in there and save on meal (to reduce daily api hits)
//         // OR save already existing foods to db
//         // can refactor as promise?
//         // build out as find and update for user's own food db (future feature?)?
//         for (var j = 0; j < reqUserFoods.length; j++) {
//           currentUserFood = reqUserFoods[j];
//           // create new food
//           db.Food.create(
//             {
//               name: currentUserFood.name.trim(),
//               type: currentUserFood.type,
//               calories: currentUserFood.calories,
//               carbohydrates: currentUserFood.carbs,
//               fat: currentUserFood.fat,
//               fiber: currentUserFood.fiber,
//               protein: currentUserFood.protein,
//               sugars: currentUserFood.sugars,
//               user: req.body.user
//             },
//             function(err, food) {
//               if (err) {
//                 console.log(err);
//               } else {
//                 meal.foodEntries.push({ food: food, servings: currentUserFood.userServings });
//                 meal.save();
//                 console.log('user food saved', food);
//               }
//             });
//           }