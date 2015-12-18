(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['MealService', 'mealData'];

  function MealsController(MealService, mealData) {
    var vm = this;
    // console.log(mealData.date);

    // vm.meal = {};
    // vm.meal.date = new Date(mealData.date);
    vm.meal = mealData;
    // console.log(vm.meal.date);
    // console.log(new Date(vm.meal.date));
    // vm.mealDate = '';
    // vm.mealDate = mealDate;
  }
})();