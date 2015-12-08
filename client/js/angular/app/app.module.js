(function() {
  'use strict';

  angular
    .module('dearFoodJ', [
      'ngRoute',
      'ngResource',
      'dearFoodJ.users'
    ])
    .config(configRoutes);

  configRoutes.$inject = ['$routeProvider', '$locationProvider'];

  function configRoutes($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }
})();