(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .config(ConfigUsers);

    // need to add userintercep
    // console.log(UserInterceptor);

  ConfigUsers.$inject = ['$routeProvider', '$httpProvider', 'AuthInterceptor'];

  function ConfigUsers($routeProvider, $httpProvider, AuthInterceptor) {
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
        // remove token, do not need to reach server?
        // need to add specs
        restricted: true
      })
      .when('/:user_id', {
        templateUrl: '/partials/users/login.html',
        controller: 'UsersController',
        controllerAs: 'vm',
        preventIfLoggedIn: true
      })
      .when('/:user_id/edit', {
        // need to add specs
      });

    // $httpProvider.interceptors.push('AuthInterceptor');
  }
})();