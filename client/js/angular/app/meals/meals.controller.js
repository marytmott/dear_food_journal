(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['$filter', 'MealsService'];

  function MealsController($filter, MealsService) {
    var vm = this;
    // var now = new Date();

    vm.apiSearch = '';
    vm.foodSearch = foodSearch;
    vm.meal = {};
    // vm.meal.date = new Date($filter('date')(Date.now(), 'yyyy-MM-dd'));
    vm.meal.date = new Date();
    // vm.meal.time = new Date();
      // $filter('date')(Date.now(), 'HH:mm:ss'));
    console.log(vm.meal.date);
    vm.meal.foods = [];

    // will nede to do backend/front end checking to single these out as non-api foods and food entries
    vm.meal.userFoods = [];

    // compare to mongoose model to change/develop?
    // vm.meal.totalNutrition = {};

    // vm.meal.totalNutrition = {};

    vm.addToMeal = addToMeal;
    vm.clearFoodSearch = clearFoodSearch;
    vm.removeFood = removeFood;

    vm.addOwnFood = addOwnFood;
    vm.calcNutritionTotal = calcNutritionTotal;

    vm.addMeal = addMeal;

    vm.currentCalcdApiFoods = 0;
    vm.currentCalcdUserFoods = 0;

    // add own food ---> add to last item

    function foodSearch() {
      MealsService.foodApiSearch(vm.apiSearch).then(function(data) {
        console.log(data.data.hits);
        vm.searchResults = data.data.hits;
      });
    }

    function clearFoodSearch() {
      vm.searchResults = null;
      vm.apiSearch = '';
    }

    function addToMeal(food) {
      var id = vm.meal.foods.length;
      console.log('clicked', food);
      food.id = 'food-' + id;
      food.servingSzId = 'serv-sz-id' + id;
      food.userServings = 1;

      vm.meal.foods.push(food);

      // update meal nutrition total

      // PARSE INT ON THESE
      // NEED TO USE ngblur orSOMETHING

      // vm.meal.totalNutrition.calories += food.fields.nf_calories;
      // vm.meal.totalNutrition.fat += food.fields.nf_total_fat;
      // vm.meal.totalNutrition.carbs += food.fields.nf_total_carbohydrate;
      // vm.meal.totalNutrition.fiber += food.fields.nf_dietary_fiber;
      // vm.meal.totalNutrition.protein += food.fields.nf_protein;
      // vm.meal.totalNutrition.sugars += food.fields.nf_sugars;

        // console.log(vm.meal.totalNutrition);

    }

    function removeFood(food, type) {
      var foodIdx = vm.meal[type].indexOf(food);
      vm.meal[type].splice(foodIdx, 1);

      // update total nutrition
      // vm.meal.totalNutrition.calories -= food.fields.nf_calories;
      // vm.meal.totalNutrition.fat -= food.fields.nf_total_fat;
      // vm.meal.totalNutrition.carbs -= food.fields.nf_total_carbohydrate;
      // vm.meal.totalNutrition.fiber -= food.fields.nf_dietary_fiber;
      // vm.meal.totalNutrition.protein -= food.fields.nf_protein;
      // vm.meal.totalNutrition.sugars -= food.fields.nf_sugars;
    }

    function addOwnFood() {
      var newId = 'user-food-' + vm.meal.userFoods.length;

      vm.meal.userFoods.push({
        id: newId,
        userServings: 1,
        calories: null,
        carbs: null,
        fat: null,
        fiber: null,
        protein: null,
        sugars: null
      });
    }

    // dry this up!!
    function calcNutritionTotal() {
      var currentFood;
      var servings;
      vm.currentCalcdApiFoods = vm.meal.foods.length;
      vm.currentCalcdUserFoods = vm.meal.userFoods.length;
      vm.meal.totalNutrition = {
        calories: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        protein: 0,
        sugars: 0
      };

      // calculate apiFoods nutrition if entered
      // if (vm.currentCalcdApiFoods) {
      //   for (var i = 0; i < vm.currentCalcdApiFoods; i++) {
      //     currentFood = vm.meal.foods[i];
      //     servings = currentFood.userServings;

      //     // console.log(currentFood.userServings);
      //     vm.meal.totalNutrition.calories += (currentFood.fields.nf_calories * servings);
      //     vm.meal.totalNutrition.fat += (currentFood.fields.nf_total_fat * servings);
      //     vm.meal.totalNutrition.carbs += (currentFood.fields.nf_total_carbohydrate * servings);
      //     vm.meal.totalNutrition.fiber += (currentFood.fields.nf_dietary_fiber * servings);
      //     vm.meal.totalNutrition.protein += (currentFood.fields.nf_protein * servings);
      //     vm.meal.totalNutrition.sugars += (currentFood.fields.nf_sugars * servings);
      //   }
      // }

      // calculate userFoods nutrition if entered
      if (vm.currentCalcdUserFoods) {
        for (var i = 0; i < vm.currentCalcdUserFoods; i++) {
          currentFood = vm.meal.userFoods[i];
          servings = currentFood.userServings;

          // make 0 if anything is blank --- doesn't seem to need this
          // for (var nutrient in vm.meal.userFoods) {
          //   console.log(vm.meal.userFoods[nutrient]);
          //   if (!vm.meal.userFoods[nutrient]) {
          //     vm.meal.userFoods[nutrient] = 0;
          //   }
          // }
          // console.log(vm.meal.userFoods);
          vm.meal.totalNutrition.calories += (currentFood.calories * servings);
          vm.meal.totalNutrition.fat += (currentFood.fat * servings);
          vm.meal.totalNutrition.carbs += (currentFood.carbs * servings);
          vm.meal.totalNutrition.fiber += (currentFood.fiber * servings);
          vm.meal.totalNutrition.protein += (currentFood.protein * servings);
          vm.meal.totalNutrition.sugars += (currentFood.sugars * servings);
        }
      }
      // console.log(vm.meal.totalNutrition);
    }

      //     calories: 0,
      // fat: 0,
      // carbs: 0,
      // fiber: 0,
      // protein: 0,
      // sugars: 0

    // function calulate

    function addMeal() {
      // console.log(vm.meal.foods.length);
      calcNutritionTotal();
      console.log(vm.meal);
    }
  }
})();