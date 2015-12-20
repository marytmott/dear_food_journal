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
      })
      .when('/journals/:journal_id/inspirations/new', {
        templateUrl: '/partials/inspirations/new.html',
        controller: 'NewInspirationsController',
        controllerAs: 'vm'
      });
  }

})();