(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['$routeParams', '$location', 'UserService', 'MealService', 'mealData'];

  // THIS NEEDS HORRIBLY TO BE REFACTORED W/ NEW MEALS CONTROLLER!! MOVE FUNCTIONS TO SERVICE??

  function MealsController($routeParams, $location, UserService, MealService, mealData) {
    var vm = this;
    vm.meal = mealData;

    vm.journalPath = '/journals/' + $routeParams.journal_id;
    vm.mealsPath = vm.journalPath + '/meals/' + $routeParams.meal_id;
    vm.apiSearch = '';
    vm.foodSearch = foodSearch;
    vm.addToMeal = addToMeal;
    vm.clearFoodSearch = clearFoodSearch;
    vm.removeFood = removeFood;
    vm.addOwnFood = addOwnFood;
    vm.calcNutritionTotal = calcNutritionTotal;
    vm.currentCalcdApiFoods = 0;
    vm.currentCalcdUserFoods = 0;
    vm.updateMeal = updateMeal;

    function getDatePath(updatingMeal) {
      var datePath = vm.meal.date.toLocaleDateString().replace(/\//g, '-');
      vm.backLink = vm.journalPath + '/days/' + datePath;
    }

    function foodSearch() {
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
        name: '',
        userServings: 1,
        calories: null,
        carbohydrates: null,
        fat: null,
        fiber: null,
        protein: null,
        sugars: null,
      });
      calcNutritionTotal();
    }

    // dry this up!! put in factory?
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

        vm.meal.totalNutrition.calories += (currentFood.fields.nf_calories * servings) || 0;
        vm.meal.totalNutrition.fat += (currentFood.fields.nf_total_fat * servings) || 0;
        vm.meal.totalNutrition.carbs += (currentFood.fields.nf_total_carbohydrate * servings) || 0;
        vm.meal.totalNutrition.fiber += (currentFood.fields.nf_dietary_fiber * servings) || 0;
        vm.meal.totalNutrition.protein += (currentFood.fields.nf_protein * servings) || 0;
        vm.meal.totalNutrition.sugars += (currentFood.fields.nf_sugars * servings) || 0;
      }

      // calculate userFoods nutrition
      for (var j = 0; j < vm.currentCalcdUserFoods; j++) {
        currentFood = vm.meal.userFoods[j];
        servings = currentFood.userServings;

        vm.meal.totalNutrition.calories += (currentFood.calories * servings) || 0;
        vm.meal.totalNutrition.fat += (currentFood.fat * servings) || 0;
        vm.meal.totalNutrition.carbs += (currentFood.carbohydrates * servings) || 0;
        vm.meal.totalNutrition.fiber += (currentFood.fiber * servings) || 0;
        vm.meal.totalNutrition.protein += (currentFood.protein * servings) || 0;
        vm.meal.totalNutrition.sugars += (currentFood.sugars * servings) || 0;
      }

      // check if all foods have been removed
      for (var nutrient in vm.meal.totalNutrition) {
        mealNutrients += vm.meal.totalNutrition[nutrient];
      }

      if (!mealNutrients) {
        vm.meal.totalNutrition = null;
      }
    }

    function updateMeal() {
      var user = UserService.getCurrentUser();

      vm.meal.date = vm.meal.date.toLocaleDateString();
      calcNutritionTotal();

      MealService.mealResource.update({ journal_id: user.journal, meal_id: vm.meal._id }, vm.meal).$promise.then(function(data) {
        var dayRoute;
        if (data.meal) {
          dayRoute = data.meal.date.replace(/\//g, '-');
          // redirect to day page for that day
          $location.path('/journals/' + user.journal + '/days/' + dayRoute);
        }
      });
    }
    // only run function if on edit page
    if ($location.$$path.indexOf('edit') !== -1) {
      calcNutritionTotal();
    }
    getDatePath();
  }
})();