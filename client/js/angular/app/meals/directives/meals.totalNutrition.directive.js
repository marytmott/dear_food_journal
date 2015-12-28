(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .directive('dfTotalNutrition', dfTotalNutrition);

  function dfSearchResults() {
    return {
      templateUrl: '../../partials/meals/total-nutrition.html',
      scope: {
        food: '=foodData',
      }
        // restirct?
    }
  }
})();