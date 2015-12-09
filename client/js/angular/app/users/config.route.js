(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .config(ConfigUsers);

  ConfigUsers.$inject = ['$routeProvider'];

  function ConfigUsers($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: '/partials/users/signup.html',
        controller: 'UsersController',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/partials/users/login.html',
        controller: 'UsersController',
        controllerAs: 'vm'
      })
      .when('/logout', {
        // need to add specs
      })
      .when('/:user_id', {
        templateUrl: '/partials/users/show.html',
        controller: 'UsersController',
        controllerAs: 'vm'
      })
      .when('/:user/edit', {
        // need to add specs
      });
  }
})();