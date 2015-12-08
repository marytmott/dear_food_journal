(function() {
  'use strict';

  angular
    .module('dearFoodJournal', [
      'ngRoute',
      'ngResource',
      'dearFoodJournal.users'
    ])
    .config(configRoutes);

  configRoutes.$inject = ['$routeProvider', '$locationProvider'];

  function configRoutes($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({redirectTo: '/'});
      // $location
  }
})();