(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .config(ConfigUsers);

  ConfigUsers.$inject = ['$routeProvider'];

  function ConfigUsers($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: '',
        controller: '',
        controllerAs: 'vm'
      })
      .when('/login', {

      })
      .when('/logout', {

      })
      .when('/:user', {

      })
      .when('/:user/edit', {

      });
  }
})();