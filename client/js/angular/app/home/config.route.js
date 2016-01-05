(function() {
  'use strict';

  angular
    .module('dearFoodJ.home')
    .config(ConfigHome);

  ConfigHome.$inject = ['$routeProvider'];

  function ConfigHome($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/home/index.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        resolve: {
          user: ['UserService', function(UserService) {
            return UserService.getCurrentUser();
          }]
        }
      })
  }
})();