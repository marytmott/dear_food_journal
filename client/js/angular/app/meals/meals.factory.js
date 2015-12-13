(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .factory('MealsService', MealsService);

  MealsService.$inject = ['$http', '$resource'];

  function MealsService($http, $resource) {
    return {
      foodApiSearch: function(data) {

        console.log(data);
        return $http.post('/api/api-foods/search', data);
      }
    };
  }
})();