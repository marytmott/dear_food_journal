(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['$routeParams', '$location', 'MealService', 'mealData'];

  // THIS NEEDS HORRIBLY TO BE REFACTORED W/ NEW MEALS CONTROLLER!! MOVE FUNCTIONS TO SERVICE??

  function MealsController($routeParams, $location, MealService, mealData) {
    var vm = this;
    vm.meal = mealData;
    // console.log(mealData);
    // vm.meal.date = $filter('date')(vm.meal.date, 'yyyy-MM-dd');
    vm.journalPath = '/journals/' + $routeParams.journal_id;
    vm.mealsPath = vm.journalPath + '/meals/' + $routeParams.meal_id;
    // var datePath = vm.meal.date.toLocaleDateString().replace(/\//g, '-');

    console.log(mealData);
    // vm.backLink = vm.journalPath + '/days/' + datePath;

    // taken from new meals controller
    vm.apiSearch = '';
    vm.foodSearch = foodSearch;
    // vm.meal.date = new Date($filter('date')(Date.now(), 'yyyy-MM-dd'));

//    var today = new Date();
// console.log(today.toISOString().substring(0, 10));
// console.log(new Date(today.toISOString().substring(0, 10)));

    vm.addToMeal = addToMeal;
    vm.clearFoodSearch = clearFoodSearch;
    vm.removeFood = removeFood;

    vm.addOwnFood = addOwnFood;
    vm.calcNutritionTotal = calcNutritionTotal;

    vm.currentCalcdApiFoods = 0;
    vm.currentCalcdUserFoods = 0;

    vm.updateMeal = updateMeal;


    // add own food ---> add to last item

    function getDatePath(updatingMeal) {
      var datePath;
      if (updatingMeal){
        datePath = vm.meal.date.replace(/\//g, '-');
      } else {
        datePath = vm.meal.date.toLocaleDateString().replace(/\//g, '-');
        vm.backLink = vm.journalPath + '/days/' + datePath;
      }
    }

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
        vm.meal.totalNutrition.carbs += (currentFood.carbohydrates * servings);
        vm.meal.totalNutrition.fiber += (currentFood.fiber * servings);
        vm.meal.totalNutrition.protein += (currentFood.protein * servings);
        vm.meal.totalNutrition.sugars += (currentFood.sugars * servings);
      }
    }

    function updateMeal() {
      // console.log(vm.meal.apiFoods.length);
      // var user = UserService.getCurrentUser();
      // var dayRoute;
      // console.log();

      vm.meal.date = vm.meal.date.toLocaleDateString();
      console.log(vm.meal.date);
      calcNutritionTotal();
      console.log(vm.meal);

      MealService.mealResource.update({ journal_id: vm.meal.journal[0], meal_id: vm.meal._id }, vm.meal).$promise.then(function(data) {
        // redirect after update --- also do on new meal page?
        console.log(data);
        if (data.meal) {
          getDatePath(true);
          // dayRoute = vm.meal.date.replace(/\//g, '-');
          // redirect to day page for that day
          $location.path(vm.backLink);
        }
      });
    }
// console.log('LOCATION!', $location.$$path.indexOf('edit'));
    // only run function if on edit page
    if ($location.$$path.indexOf('edit') !== -1) {
      calcNutritionTotal();
    }
    getDatePath(false);
  }
})();