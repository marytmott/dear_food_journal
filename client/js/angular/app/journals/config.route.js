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

    // do we need route for journals? -- journa; crud
    $routeProvider
      .when('/journals/:journal_id', { // or put as journals/journal_id
        templateUrl: '/partials/journals/index.html',
        controller: 'JournalsController',
        controllerAs: 'vm',
        resolve: {
          // resolve b/c of redirect from login
          currentUser: function(UserService, $location) {  // need to add [] around injection?
            return UserService.getCurrentUser();
          }
        }
        // add restricted
      })
      .when('/journals/:journal_id/edit', {
        templateUrl: '/partials/journals/edit.html',
        controller: 'JournalsController',
        controllerAs: 'vm'
      });
      // delete journal if they delete account and that is it
      // ;
      // new?
      // edit
  }
})();