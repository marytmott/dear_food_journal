(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('NewMealsController', NewMealsController);

  NewMealsController.$inject = ['$location', 'UserService', 'MealService'];

  function NewMealsController($location, UserService, MealService) {
    var vm = this;

    vm.apiSearch = '';
    vm.foodSearch = foodSearch;
    vm.meal = {};
    vm.meal.date = new Date();
    vm.meal.apiFoods = [];

    // will need to do backend/front end checking to single these out as non-api foods and food entries
    vm.meal.userFoods = [];
    vm.meal.name = '';
    vm.meal.emotions = '';
    vm.meal.notes = '';
    vm.addToMeal = addToMeal;
    vm.clearFoodSearch = clearFoodSearch;
    vm.removeFood = removeFood;
    vm.addOwnFood = addOwnFood;
    vm.calcNutritionTotal = calcNutritionTotal;
    vm.currentCalcdApiFoods = 0;
    vm.currentCalcdUserFoods = 0;
    vm.addMeal = addMeal;

    function foodSearch() {
      // clear out search for more results
      vm.searchResults = null;

      // get results
      MealService.foodApiSearch(vm.apiSearch).then(function(data) {
        vm.searchResults = data.data.hits;
      });
    }

    function clearFoodSearch() {
      vm.searchResults = null;
      vm.apiSearch = '';
    }

    function addToMeal(food) {
      var id = vm.meal.apiFoods.length;
      food.id = 'food-' + id;
      food.servingSzId = 'serv-sz-id' + id;
      food.userServings = 1;

      vm.meal.apiFoods.push(food);
      calcNutritionTotal();
    }

    function removeFood(food, type) {
      var foodIdx = vm.meal[type].indexOf(food);
      vm.meal[type].splice(foodIdx, 1);
      calcNutritionTotal();
    }

    function addOwnFood() {
      var newId = 'user-food-' + vm.meal.userFoods.length;

      vm.meal.userFoods.push({
        id: newId,
        name: null,
        userServings: 1,
        calories: null,
        carbohydrates: null,
        fat: null,
        fiber: null,
        protein: null,
        sugars: null,
        // type: 'userFood'
      });
      calcNutritionTotal();
    }

    // dry this up!!
    function calcNutritionTotal() {
      var currentFood;
      var servings;
      vm.currentCalcdApiFoods = vm.meal.apiFoods.length;
      vm.currentCalcdUserFoods = vm.meal.userFoods.length;
      vm.meal.totalNutrition = {
        calories: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        protein: 0,
        sugars: 0
      };
      var mealNutrients = 0;

      // calculate apiFoods nutrition
      for (var i = 0; i < vm.currentCalcdApiFoods; i++) {
        currentFood = vm.meal.apiFoods[i];
        servings = currentFood.userServings;

        vm.meal.totalNutrition.calories += (currentFood.fields.nf_calories * servings);
        vm.meal.totalNutrition.fat += (currentFood.fields.nf_total_fat * servings);
        vm.meal.totalNutrition.carbs += (currentFood.fields.nf_total_carbohydrate * servings);
        vm.meal.totalNutrition.fiber += (currentFood.fields.nf_dietary_fiber * servings);
        vm.meal.totalNutrition.protein += (currentFood.fields.nf_protein * servings);
        vm.meal.totalNutrition.sugars += (currentFood.fields.nf_sugars * servings);
      }

      // calculate userFoods nutrition
      for (var j = 0; j < vm.currentCalcdUserFoods; j++) {
        currentFood = vm.meal.userFoods[j];
        servings = currentFood.userServings;

        vm.meal.totalNutrition.calories += (currentFood.calories * servings);
        vm.meal.totalNutrition.fat += (currentFood.fat * servings);
        vm.meal.totalNutrition.carbs += (currentFood.carbohydrates * servings);
        vm.meal.totalNutrition.fiber += (currentFood.fiber * servings);
        vm.meal.totalNutrition.protein += (currentFood.protein * servings);
        vm.meal.totalNutrition.sugars += (currentFood.sugars * servings);
      }

      // check if all foods have been removed
      for (var nutrient in vm.meal.totalNutrition) {
        mealNutrients += vm.meal.totalNutrition[nutrient];
      }

      if (!mealNutrients) {
        vm.meal.totalNutrition = null;
      }
    }

    function addMeal() {
      var user = UserService.getCurrentUser();

      vm.meal.journal = user.journal;
      vm.meal.user = user.id;
      vm.meal.date = vm.meal.date.toLocaleDateString();
      calcNutritionTotal();

      MealService.mealResource.save({ journal_id: user.journal }, vm.meal).$promise.then(function(data) {
        var dayRoute;
        if (data.meal) {
          dayRoute = data.meal.date.replace(/\//g, '-');
          // redirect to day page for that day
          $location.path('/journals/' + user.journal + '/days/' + dayRoute);
        }
      });
    }
  }
})();