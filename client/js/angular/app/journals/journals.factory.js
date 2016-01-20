(function() {
  'use strict';

  angular
    .module('dearFoodJ.journals')
    .factory('JournalService', JournalService);

  JournalService.$inject = ['$resource'];

  function JournalService($resource) {
    return {
      journalResource: $resource('/api/journals/:journal_id', { journal_id: '@journal_id' },
        { update: { method: 'PUT'} }
      )
    };
  }
})();