(function() {
  'use strict';

  angular
    .module('dearFoodJ', [
      'ngRoute',
      'ngResource',
      'ngMessages',
      'angularModalService',
      'angular-images-loaded',
      'dearFoodJ.users',
      'dearFoodJ.auth',
      'dearFoodJ.nav',
      'dearFoodJ.home',
      'dearFoodJ.journals',
      'dearFoodJ.meals',
      'dearFoodJ.days',
      'dearFoodJ.inspirations'
    ])
    .config(configRoutes)
    .run(runApp);

  configRoutes.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

  function configRoutes($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

    // you cannot inject services and factories into ng .config function, but you can call like this
    $httpProvider.interceptors.push('AuthInterceptor');
  }

  runApp.$inject = ['$rootScope', '$location', '$window', 'UserService'];

  // ALL THE REDIRECTS!
  function runApp($rootScope, $location, $window, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      var loggedIn = $window.localStorage.getItem('token');
      var user = UserService.getCurrentUser();

      // redirect to home if logged in and try to sign up OR if trying to logout and not logged in
      if ((nextRoute.preventIfLoggedIn && loggedIn) || (nextRoute.preventIfLoggedOut && !user)) {
        // redirect and change history (for back button)
        return $location.path('/').replace();  // re-route to their dashboard or main login page? (journal?)
      }

      // redirect if not user's journal
      if (nextRoute.restricted && nextRoute.params.journal_id !== user.journal) {
        console.log('this isn\'t yours!');
        if (loggedIn) {
          return $location.path('/journals/' + user.journal).replace();
        }
        return $location.path('/').replace();
      }

      // redirect if not same user
      // if (nextRoute.userRestricted && nextRoute.params.user_id !== user.id) {
      //   // redirect back
      //   // $location.path('currentRoute.$$route.originalPath').replace();
      //   //redirect home
      //   console.log('this isn\'t yours!');
      //   return $location.path('/').replace();
      // }

    });
  }
})();