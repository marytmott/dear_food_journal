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

    vm.addMeal = addMeal;
    vm.addToMeal = addToMeal;

    function addMeal(){
      console.log(vm.meal);
    }

    function foodSearch() {
      MealsService.foodApiSearch(vm.apiSearch).then(function(data) {
        console.log(data.data.hits);
        vm.searchResults = data.data.hits;
      });
    }

    function addToMeal(food) {
      var id = vm.meal.foods.length;
      console.log('clicked', food);
      food.id = 'food' + id;

      vm.meal.foods.push(food);
        console.log(vm.meal.foods);
    }
  }
})();