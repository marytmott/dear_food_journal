(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .config(ConfigUsers);

  ConfigUsers.$inject = ['$routeProvider', '$locationProvider'];

  function ConfigUsers($routeProvider, $locationProvider) {
    // restricted - restricted to same user
    // preventIfLoggedIn - do not allow to go here if logged in
    // preventIfLoggedOut - don't go here if they are already logged out
    $routeProvider
      .when('/signup', {
        templateUrl: '/partials/users/signup.html',
        controller: 'UsersController',
        controllerAs: 'vm',
        preventIfLoggedIn: true
      })
      .when('/logout', {
        preventIfLoggedOut: true,
        resolve: {
          logout: ['UserService', '$location', function(UserService, $location) {
            UserService.logout();
            $location.path('/');
          }]
        }
      });
      // TODO - finish building out user CRUD
  }
})();