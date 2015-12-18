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
        // restirct?
    }
  }
})();


// ction dfMenuLeft() {
//     return {
//       templateUrl: '../../partials/nav/nav-menu-left.html',
//       controller: 'NavController',
//       controllerAs: 'vm',
//       restrict: 'E'
//     };
//   }

// app.directive('pmPokemonDetails', function() {
//   return {
//     templateUrl: '/partials/pokemon-details.html',
//     scope: {
//       pokemon: '=pokemonData',
//       limit: '@limit'
//     }
//   };
// });