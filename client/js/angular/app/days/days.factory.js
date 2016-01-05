(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .factory('DayService', DayService);

  DayService.$inject = ['$http'];

  function DayService($http) {
    return {
      getDay: function(journalId, date) {
        // errors handling?
        return $http.get('/api/journals/' + journalId + '/days/' + date).then(function(data) {
          return data.data;
        });
      }
    };
  }
})();