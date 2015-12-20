(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .factory('InspirationService', InspirationService);

  InspirationService.$inject = ['$resource'];

  function InspirationService($resource) {
    return {
      inspirationResource: $resource('/api/journals/:journal_id/inspirations/:inspiration_id',
        { journal_id: '@journal_id', inspiration_id: '@inspiration_id' },
          { update: { method: 'PUT'}
        }
      )
    };
  }
})();