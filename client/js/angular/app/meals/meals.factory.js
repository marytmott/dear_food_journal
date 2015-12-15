(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .factory('MealsService', MealsService);

  MealsService.$inject = ['$http', '$resource'];

  function MealsService($http, $resource) {
    return {
      foodApiSearch: function(data) {
        var searchData = encodeURIComponent(data);
        console.log(searchData);

        return $http.post('/api/foods/api-search', { search: searchData });
      },
      addNewMeal: function(data) {
        // check + add food
        // add meal
        // update daily total? (skip for now maybe can run script)
        // add user foods
        // food serving
      }
    };
  }
})();