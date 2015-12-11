(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .config(ConfigUsers);

  ConfigUsers.$inject = ['$routeProvider', '$httpProvider', '$locationProvider'];

  function ConfigUsers($routeProvider, $httpProvider, $locationProvider) {
    // restricted - restricted to same user
    // preventIfLoggedIn - do not allow to go here if logged in
    $routeProvider
      .when('/signup', {
        templateUrl: '/partials/users/signup.html',
        controller: 'UsersController',
        controllerAs: 'vm',
        preventIfLoggedIn: true
      })
      .when('/login', {
        templateUrl: '/partials/users/login.html',
        controller: 'UsersController',
        controllerAs: 'vm',
        preventIfLoggedIn: true
      })
      .when('/logout', {
        // need to add specs
        preventIfLoggedOut: true,
        resolve: {
          logout: function(UserService, $location) {
            UserService.logout();
            $location.path('/login');
          }
        }
      })
      .when('/:user_id', {
        templateUrl: '/partials/users/login.html',
        controller: 'UsersController',
        controllerAs: 'vm',
        restricted: true,
        resolve: {
          user: function(UserService, $route) {
            return UserService.userResource.get({ user_id: $route.current.params.user_id });
          }
        }
      })
      .when('/:user_id/edit', {
        // need to add specs
        restricted: true
      });
  }
})();