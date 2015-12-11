(function() {
  'use strict';

  angular
    .module('dearFoodJ.journals')
    .config(ConfigJournals);

  ConfigJournals.$inject = ['$routeProvider'];

  // directives instead?
  // just use one controller?

  function ConfigJournals($routeProvider) {
    // clean up w/ var for routes?
    $routeProvider
      .when('/:user_id/:journal_id', { // or put as journals/journal_id
        templateUrl: '/partials/journals/index.html',
        controller: 'JournalsController',
        controllerAs: 'vm'
        // add restricted
      })
      // .when(users + '/journals/:journal_id/')
      // ;
      // new?
      // edit
  }
})();