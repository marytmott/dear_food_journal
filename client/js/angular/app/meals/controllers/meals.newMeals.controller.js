(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('NewMealsController', NewMealsController);

  NewMealsController.$inject = ['$location', 'UserService', 'MealService'];

  function NewMealsController($location, UserService, MealService) {
    var vm = this;
    // var now = new Date();

    vm.apiSearch = '';
    vm.foodSearch = foodSearch;
    vm.meal = {};
    // vm.meal.date = new Date($filter('date')(Date.now(), 'yyyy-MM-dd'));
    vm.meal.date = new Date();

//    var today = new Date();
// console.log(today.toISOString().substring(0, 10));
// console.log(new Date(today.toISOString().substring(0, 10)));

    // console.log(vm.meal.date);
    // console.log(vm.meal.time);
    vm.meal.apiFoods = [];

    // will nede to do backend/front end checking to single these out as non-api foods and food entries
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


    // add own food ---> add to last item

    function foodSearch() {
      MealService.foodApiSearch(vm.apiSearch).then(function(data) {
        console.log(data.data.hits);
        vm.searchResults = data.data.hits;
      });
    }

    function clearFoodSearch() {
      vm.searchResults = null;
      vm.apiSearch = '';
    }

    function addToMeal(food) {
      var id = vm.meal.apiFoods.length;
      console.log('clicked', food);
      food.id = 'food-' + id;
      food.servingSzId = 'serv-sz-id' + id;
      food.userServings = 1;
      // food.type = 'apiFood';

      vm.meal.apiFoods.push(food);
    }

    function removeFood(food, type) {
      var foodIdx = vm.meal[type].indexOf(food);
      vm.meal[type].splice(foodIdx, 1);
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

    function addMeal() {
      // console.log(vm.meal.apiFoods.length);
      var user = UserService.getCurrentUser();
      var dayRoute;

      vm.meal.journal = user.journal;
      // vm.meal.date = vm.meal.date.toISOString().substring(0, 10);
      vm.meal.user = user.id;
      vm.meal.date = vm.meal.date.toLocaleDateString();
      console.log(vm.meal.date);
      console.log(user);
      calcNutritionTotal();
      console.log(vm.meal);

      MealService.mealResource.save({ journal_id: user.journal }, vm.meal);

      dayRoute = vm.meal.date.replace(/\//g, '-');
      // redirect to day page for that day
      $location.path('/journals/' + user.journal + '/days/' + dayRoute);
    }
  }
})();