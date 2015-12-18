(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['MealService'];

  function MealsController(MealService) {
    var vm = this;

    // vm.meal = mealData;
  }
})();