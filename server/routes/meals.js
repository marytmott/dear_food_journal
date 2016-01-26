var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');

// TODO - JSON WT checks on routes

// get 1 meal
router.get('/:meal_id', function(req, res) {
  db.Meal.findById(req.params.meal_id).populate('foodEntries.food').exec(function(err, meal) {
    if (err) {
      // TODO - error handling
      console.log(err);
    } else {
      res.send(meal);
    }
  });
});

// new meal
router.post('/', function(req, res) {
  var reqApiFoods = req.body.apiFoods;
  var reqUserFoods = req.body.userFoods;
  var currentApiFood;
  var currentUserFood;
  var foodEntries = [];
  var foodEntry;

  // have to do like this b/c of async mongo double-record creation issues
  for (var i = 0; i < reqApiFoods.length; i++) {
    currentApiFood = reqApiFoods[i];
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
      nixId: currentApiFood._id
    };
    foodEntries.push({ food: foodEntry, servings: currentApiFood.userServings });
  }

  for (var j = 0; j < reqUserFoods.length; j++) {
    currentUserFood = reqUserFoods[j];
    // create new food
    foodEntry = {
      name: currentUserFood.name.trim(),  // do this on client side?
      calories: currentUserFood.calories,
      carbohydrates: currentUserFood.carbohydrates,
      fat: currentUserFood.fat,
      fiber: currentUserFood.fiber,
      protein: currentUserFood.protein,
      sugars: currentUserFood.sugars,
      user: req.body.user
    };
    foodEntries.push({ food: foodEntry, servings: currentUserFood.userServings });
  }

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
        // TODO - error handling
        console.log(err);
      } else {
        // have to do like this b/c of async mongo double-record creation issues
        // refactor this w/ put route and/or refactor w/ promises?
        function addFoods() {
          var foodEntry = foodEntries.pop();
          total--;

          if (foodEntry.food.nixId) {
            db.Food.findOneAndUpdate({ nixId: foodEntry.food.nixId }, foodEntry.food, { upsert: true, new: true }, function(err, food) {
              if (err) {
                // TODO - error handling
                console.log(err);
              } else {
                result.push(food);
                meal.foodEntries.push({ food: food, servings: foodEntry.servings });

                if (total) {
                  addFoods();
                } else {
                  meal.save(function(err, meal) {
                    if (err) {
                      // TODO - error handling
                      console.log(err);
                    } else {
                      // refactor to just send back meal
                      res.send({ message: 'meal created', meal: meal});
                    }
                  });
                }
              }
            });
          } else {
            db.Food.create(foodEntry.food, function(err, food) {
              if (err) {
                // TODO - error handling
                console.log(err);
              } else {
                result.push(food);
                meal.foodEntries.push({ food: food, servings: foodEntry.servings });
                if (total) {
                  addFoods();
                } else {
                  meal.save(function(err, meal) {
                    if (err) {
                      // TODO - error handling
                      console.log(err);
                    } else {
                      // refactor to just send back meal
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
});

// update meal
// DRY this up w/ create meal route
router.put('/:meal_id', function(req, res) {
  var reqApiFoods = req.body.apiFoods;
  var reqUserFoods = req.body.userFoods;
  var currentApiFood;
  var currentUserFood;
  var foodEntries = [];
  var foodEntry;

  // have to do like this b/c of async mongo double-record creation issues
  for (var i = 0; i < reqApiFoods.length; i++) {
    currentApiFood = reqApiFoods[i];
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
      nixId: currentApiFood._id
    };
    foodEntries.push({ food: foodEntry, servings: currentApiFood.userServings });
  }

  for (var j = 0; j < reqUserFoods.length; j++) {
    currentUserFood = reqUserFoods[j];
    // create new food
    foodEntry = {
      name: currentUserFood.name.trim(),  // do this on client side?
      calories: currentUserFood.calories,
      carbohydrates: currentUserFood.carbohydrates,
      fat: currentUserFood.fat,
      fiber: currentUserFood.fiber,
      protein: currentUserFood.protein,
      sugars: currentUserFood.sugars,
      user: req.body.user
    };
    foodEntries.push({ food: foodEntry, servings: currentUserFood.userServings });
  }

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
    { new: true },
    function(err, meal) {
      var total = foodEntries.length;
      var result = [];

      if (err) {
        // TODO - error handling
        console.log(err);
      } else {
        // have to do like this b/c of async mongo double-record creation issues
        // refactor this w/ put route and/or refactor w/ promises?
        function addFoods() {
          var foodEntry = foodEntries.pop();
          total--;

          if (foodEntry.food.nixId) {
            db.Food.findOneAndUpdate({ nixId: foodEntry.food.nixId }, foodEntry.food, { upsert: true, new: true }, function(err, food) {
              if (err) {
                // TODO - error handling
                console.log(err);
              } else {
                result.push(food);
                meal.foodEntries.push({ food: food, servings: foodEntry.servings });

                if (total) {
                  addFoods();
                } else {
                  // need to save meal last or it saves last food twice bug??
                  meal.save(function(err, meal) {
                    if (err) {
                      // TODO - error handling
                      console.log(err);
                    } else {
                      // refactor to just send back meal
                      res.json({ message: 'meal updated', meal: meal});
                    }
                  });
                }
              }
            });
          } else {
            db.Food.create(foodEntry.food, function(err, food) {
              if (err) {
                // TODO - error handling
                console.log(err);
              } else {
                result.push(food);
                meal.foodEntries.push({ food: food, servings: foodEntry.servings });

                if (total) {
                  addFoods();
                } else {
                  // need to save meal last or it saves last food twice bug??
                  meal.save(function(err, meal) {
                    if (err) {
                      // TODO - error handling
                      console.log(err);
                    } else {
                      // refactor to just send back meal
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
      // TODO - error handling
      console.log(err);
    } else {
      res.send(meal);
    }
  });
});

module.exports = router;