(function() {
  'use strict';

  angular
    .module('dearFoodJ', [
      'ngRoute',
      'ngResource',
      'dearFoodJ.users'
    ])
    .config(configRoutes)
    .run(runApp);

  configRoutes.$inject = ['$routeProvider', '$locationProvider'];

  function configRoutes($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }

  runApp.$inject = ['$rootScope', '$location', '$window'];

  function runApp($rootScope, $location, $window) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      // console.log('=====event', event);

      // console.log('====next', nextRoute);
      // console.log('=====current', currentRoute);
      // console.log('original path', nextRoute.$$route.originalPath);
      console.log('2', nextRoute.params.user_id);

      // var loggedIn = $window.localStorage.getItem('token'); // boolean
      var user = $window.localStorage.getItem('user');
      console.log(user);
      // if logged in, redirect
      // if (next.preventIfLoggedIn && loggedIn) {
      //   // redirect and change history (for back button)
      //   $location.path('/').replace();  // re-route to their dashboard or main login page? (journal?)
      // }

      // redirect if not same user

    });
  }
})();