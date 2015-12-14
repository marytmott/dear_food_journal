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

    vm.addToMeal = addToMeal;
    vm.clearFoodSearch = clearFoodSearch;
    vm.removeFood = removeFood;

    vm.addMeal = addMeal;


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
      food.id = 'food' + id;

      vm.meal.foods.push(food);
        console.log(vm.meal.foods);
    }

    function removeFood(food) {
      var foodIdx = vm.meal.foods.indexOf(food);
      console.log(foodIdx);

      vm.meal.foods.splice(foodIdx, 1);
    }

    function addMeal() {
      console.log(vm.meal);
    }
  }
})();