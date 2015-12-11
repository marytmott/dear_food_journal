(function() {
  'use strict';

  angular
    .module('dearFoodJ', [
      'ngRoute',
      'ngResource',
      'dearFoodJ.users',
      'dearFoodJ.auth'
    ])
    .config(configRoutes)
    .run(runApp);

  configRoutes.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

  function configRoutes($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

    // you cannot inject services and factories into ng .config function, but you can call like this?
    $httpProvider.interceptors.push('AuthInterceptor');
  }

  runApp.$inject = ['$rootScope', '$location', '$window'];

  function runApp($rootScope, $location, $window) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      var loggedIn = $window.localStorage.getItem('token');
      var user = $window.localStorage.getItem('user');

      console.log('=====event', event);

      console.log('====next', nextRoute);
      console.log('=====current', currentRoute);
      // console.log('original path', currentRoute.$$route.originalPath);
      console.log('2', nextRoute.params.user_id);
      console.log('prevent', nextRoute.preventIfLoggedIn);
      console.log(loggedIn);
      console.log('restrict', nextRoute.restricted);
      console.log(nextRoute.params.user_id);
      console.log(user.id);


      // REDIRECT TO LOGIN??

      // console.log(user);
      // // if logged in, redirect
      if (nextRoute.preventIfLoggedIn && loggedIn) {
        console.log('you\'re logged in');
        // redirect and change history (for back button)
        return $location.path('/').replace();  // re-route to their dashboard or main login page? (journal?)
      }

      // redirect if not same user
      if (nextRoute.restricted && nextRoute.params.user_id !== user.id) {
        // redirect back
        // $location.path('currentRoute.$$route.originalPath').replace();
        //redirect home
        console.log('this isn\'t yours!');
        $location.path('/').replace();
      }
    });
  }
})();