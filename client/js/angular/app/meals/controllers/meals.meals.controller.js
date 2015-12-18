(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['mealData'];

  function MealsController(mealData) {
    var vm = this;
    console.log(mealData);

    vm.meal = mealData;

  }
})();