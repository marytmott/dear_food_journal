(function() {
  'use strict';

  angular
    .module('dearFoodJ.journals')
    .config(ConfigJournals);

  ConfigJournals.$inject = ['$routeProvider'];

  function ConfigJournals($routeProvider) {
    $routeProvider
      .when('/journals/:journal_id', {
        restricted: true,
        preventIfLoggedOut: true,
        templateUrl: '/partials/journals/index.html',
        controller: 'JournalsController',
        controllerAs: 'vm',
        resolve: {
          // dry this up!
          journal: ['UserService', 'JournalService', function(UserService, JournalService) {  // need to add [] around injection?
            var user = UserService.getCurrentUser();

            return JournalService.journalResource.get({ journal_id: user.journal });
          }],
          user: ['UserService', function(UserService) {
            return UserService.getCurrentUser();
          }]
        }
    });
  }
})();