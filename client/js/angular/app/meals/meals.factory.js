(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .factory('MealService', MealService);

  MealService.$inject = ['$http', '$resource'];

  function MealService($http, $resource) {
    return {
      foodApiSearch: function(data) {
        var searchData = encodeURIComponent(data);

        return $http.post('/api/foods/api-search', { search: searchData });
      },
      mealResource: $resource('/api/journals/:journal_id/meals/:meal_id',
        { journal_id: '@journal_id',  meal_id: '@meal_id' },
          { update: { method: 'PUT'}
        }
      )
    };
  }
})();