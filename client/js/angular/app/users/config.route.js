(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .config(ConfigUsers);

  ConfigUsers.$inject = ['$routeProvider', '$httpProvider'];

  function ConfigUsers($routeProvider, $httpProvider) {
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

    // you cannot inject services and factories into ng .config function, but you can call like this?
    $httpProvider.interceptors.push('AuthInterceptor');
  }
})();