(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .directive('dfSearchResults', dfSearchResults);

  function dfSearchResults() {
    return {
      templateUrl: '../../partials/meals/search-results.html',
      controller: 'NewMealsController',
      scope: {
        food: '=foodData',
      }
        // restrict?
    }
  }
})();