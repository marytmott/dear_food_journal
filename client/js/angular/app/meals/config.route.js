(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .config(ConfigMeals);

  ConfigMeals.$inject = ['$routeProvider'];

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
          mealData: ['$route', 'UserService', 'MealService', function($route, UserService, MealService) {
            var user = UserService.getCurrentUser();
            var meal = $route.current.params.meal_id;

            return MealService.mealResource.get({ journal_id: user.journal, meal_id: meal }).$promise.then(function(data) {
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
          mealData: ['$route', 'UserService', 'MealService', function($route, UserService, MealService) {
            var user = UserService.getCurrentUser();
            var meal = $route.current.params.meal_id;

            return MealService.mealResource.get({ journal_id: user.journal, meal_id: meal }).$promise.then(function(data) {
              var currentFoodEntry;
              var currentFood;
              var apiFoods = [];
              var userFoods = [];

              // need to set this to new Date() format for proper page rendering!
              data.date = new Date(data.date);
              data.time = new Date(data.time);
              // have to make foodApi array and userFoods arrays
              for (var i = 0; i < data.foodEntries.length; i++) {
                currentFoodEntry = data.foodEntries[i];
                currentFood = currentFoodEntry.food[0];
                currentFood.userServings = currentFoodEntry.servings;

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
              return data;
            });
          }]
          // need restriction
        }
      })
      .when('/journals/:journal_id/meals/:meal_id/delete', {
        resolve: {
          deleteMeal: ['$route', '$location', 'UserService', 'MealService', function($route, $location, UserService, MealService) {
            var user = UserService.getCurrentUser();
            var meal = $route.current.params.meal_id;

            MealService.mealResource.delete({ journal_id: user.journal, meal_id: meal }).$promise.then(function(data) {
              var date = data.date.replace(/\//g, '-');
              $location.path('/journals/' + user.journal + '/days/' + date);
            });
          }]
          // need restriction
        }
      });
  }
})();