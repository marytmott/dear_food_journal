(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['MealService', 'mealData'];

  function MealsController(MealService, mealData) {
    var vm = this;

    vm.meal = mealData;
  }
})();