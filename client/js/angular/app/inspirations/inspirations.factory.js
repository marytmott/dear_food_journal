(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .factory('InspirationService', InspirationService);

  InspirationService.$inject = ['$resource'];

  function InspirationService($resource) {

  }
})();