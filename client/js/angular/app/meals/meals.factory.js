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

        return $http.post('/api/api-foods/search', { search: searchData });
      }
    };
  }
})();