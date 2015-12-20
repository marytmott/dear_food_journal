(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .config(ConfigMeals);

  ConfigMeals.$inject = ['$routeProvider'];

  // can just use directives?
  // just use one Controller?
  // CANNOT INJECT FACTORIES AND SERVICES INTO CONFIG!!!

  // DO THESE NEED TO bE NESTED UNDER JOURNAL?


  function ConfigMeals($routeProvider) {
    // clean up w/ var for routes?
    $routeProvider
      .when('/journals/:journal_id/meals/new', {
        templateUrl: '/partials/meals/new.html',
        controller: 'NewMealsController',
        controllerAs: 'vm'
        // restricted
      })
      .when('/journals/:journal_id/meals/:meal_id', {
        templateUrl: '/partials/meals/meal.html',
        controller: 'MealsController',
        controllerAs: 'vm',
        resolve: {
            // dry this up w/ other controllers!!!
          mealData: ['$route', 'MealService', function($route, MealService) {
            var journal = $route.current.params.journal_id;
            var meal = $route.current.params.meal_id;
            // console.log(journal,meal);

            return MealService.mealResource.get({ journal_id: journal, meal_id: meal }).$promise.then(function(data) {
              // need to set this to new Date() format for proper page rendering!
              data.date = new Date(data.date);
              return data;
            });
          }]
          // need restriction
        }
      })
      .when('/journals/:journal_id/meals/:meal_id/edit', {
        templateUrl: '/partials/meals/edit.html',
        controller: 'MealsController',
        controllerAs: 'vm',
        resolve: {
            // dry this up w/ other controllers!!!
          mealData: ['$route', 'MealService', function($route, MealService) {
            var journal = $route.current.params.journal_id;
            var meal = $route.current.params.meal_id;
            // console.log(journal,meal);

            return MealService.mealResource.get({ journal_id: journal, meal_id: meal }).$promise.then(function(data) {
              var currentFoodEntry;
              var currentFood;
              var apiFoods = [];
              var userFoods = [];

              // need to set this to new Date() format for proper page rendering!
              data.date = new Date(data.date);
              data.time = new Date(data.time);
              console.log(data);
              // have to make foodApi array and userFoods arrays
              for (var i = 0; i < data.foodEntries.length; i++) {
                currentFoodEntry = data.foodEntries[i];
                // console.log(currentFood.servings);
                currentFood = currentFoodEntry.food[0];
                currentFood.userServings = currentFoodEntry.servings;
                console.log('why not showing??', currentFood);
                // console.log('servings', currentFoodEntry.servings);

                // make 2 diff models on backend (will need to rewrite lots of code...TODO for later so less code on front end?)
                // if apiFood push to array
                if (currentFood.nixId) {

                  // reconstruct as api food
                  currentFood._id = currentFood.nixId;
                  currentFood.fields = {
                    item_name: currentFood.name,
                    brand_name: currentFood.brand,
                    nf_calories: currentFood.calories,
                    nf_total_fat: currentFood.fat,
                    nf_total_carbohydrate: currentFood.carbohydrates,
                    nf_dietary_fiber: currentFood.fiber,
                    nf_sugars: currentFood.sugars,
                    nf_protein: currentFood.protein,
                    nf_serving_size_qty: currentFood.servingSizeQty,
                    nf_serving_size_unit: currentFood.servingSizeUnit
                  };

                  currentFood.userServings = currentFoodEntry.servings;
                  apiFoods.push(currentFood);
                } else {  // if user food
                  currentFood.userServings = currentFoodEntry.servings;
                  userFoods.push(currentFood);
                }
              }
              data.apiFoods = apiFoods;
              data.userFoods = userFoods;
              data.foodEntrues = null;


//               _index: "f762ef22-e660-434f-9071-a10ea6691c27",
// _type: "item",
// _id: "51c35e1f97c3e69de4b013f4",
// _score: 1.7678111,
// fields: {
// item_id: "51c35e1f97c3e69de4b013f4",
// item_name: "Frappuccino",
// brand_name: "Starbucks Coffee",
// nf_calories: 200,
// nf_total_fat: 3,
// nf_total_carbohydrate: 37,
// nf_dietary_fiber: 0,
// nf_sugars: 31,
// nf_protein: 6,
// nf_serving_size_qty: 1,
// nf_serving_size_unit: "bottle"

              // console.log(data.foodEntries);
              return data;
            });
          }]
          // need restriction
        }
      })
      .when('/journals/:journal_id/meals/:meal_id/delete', {
        resolve: {
          deleteMeal: ['$route', '$location', 'MealService', function($route, $location, MealService) {
            var journal = $route.current.params.journal_id;
            var meal = $route.current.params.meal_id;

            console.log('***ROUTE:', $route);
            MealService.mealResource.delete({ journal_id: journal, meal_id: meal });
            $location.path('/journals/' + journal);
          }]
        }
      });
  }
})();