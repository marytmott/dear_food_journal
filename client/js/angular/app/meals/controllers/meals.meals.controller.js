(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['mealData'];

  function MealsController(mealData) {
    var m = this;

    m.meal = mealData;

  }
})();