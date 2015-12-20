(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .config(ConfigInspirations);

  ConfigInspirations.$inject = ['$routeProvider'];

  function ConfigInspirations($routeProvider) {
    $routeProvider
      .when('/journals/:journal_id/inspirations', {
        templateUrl: '/partials/inspirations/index.html',
        controller: 'InspirationsController',
        controllerAs: 'vm'
      });
  }

})();