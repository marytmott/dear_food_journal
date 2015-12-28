(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .directive('dfTotalNutrition', dfTotalNutrition);

  function dfTotalNutrition() {
    return {
      templateUrl: '../../partials/meals/total-nutrition.html',
      scope: {
        nutrition: '=nutritionData',
      }
        // restirct?
    }
  }
})();