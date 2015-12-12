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
        preventIfLoggedIn: true,
        // resolve: {
        //   currentUser: function(UserService) {
        //    return UserService.getCurrentUser();
        //   }
        // }
      })
      .when('/login', {
        templateUrl: '/partials/users/login.html',
        controller: 'UsersController',
        controllerAs: 'vm',
        preventIfLoggedIn: true,
        // resolve: {
        //   currentUser: function(UserService) {
        //    return UserService.getCurrentUser();
        //   }
        // }
      })
      .when('/logout', {
        // need to add specs?
        preventIfLoggedOut: true,
        resolve: {
          logout: function(UserService, $location) {
            UserService.logout();
            $location.path('/login');
          },
        //   currentUser: function(UserService) {
        //    return UserService.getCurrentUser;
        //   }
        }
      })
      .when('/:user_id', {
        templateUrl: '/partials/users/show.html',
        controller: 'UsersController',
        controllerAs: 'vm',
        restricted: true,
        resolve: {
          user: ['UserService', '$route', function(UserService, $route) {
            return UserService.userResource.get({ user_id: $route.current.params.user_id });
          }],
          // currentUser: function(UserService) {
          //  return UserService.getCurrentUser;
          // }
        }
      })
      // .when('/:user_id/edit', {
      //   // need to add specs
          // will need new token in this route
      //   restricted: true
      // });
  }
})();