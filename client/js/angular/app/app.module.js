(function() {
  'use strict';

  angular
    .module('dearFoodJ', [
      'ngRoute',
      'ngResource',
      'ngMessages',
      // 'ngAnimate',
      'wu.masonry',
      'angularModalService',
      'dearFoodJ.users',
      'dearFoodJ.auth',
      'dearFoodJ.nav',
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

    // you cannot inject services and factories into ng .config function, but you can call like this?
    $httpProvider.interceptors.push('AuthInterceptor');

    // return originalWhen.call($routeProvider, path, route);
  }

  runApp.$inject = ['$rootScope', '$location', '$window', 'UserService'];

  // ALL THE REDIRECTS!
  function runApp($rootScope, $location, $window, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      var loggedIn = $window.localStorage.getItem('token');
      var user = UserService.getCurrentUser();

      // console.log('=====event', event);

      // console.log('====next', nextRoute);
      // console.log('=====current', currentRoute);
      // // console.log('original path', currentRoute.$$route.originalPath);
      // console.log('2', nextRoute.params.user_id);
      // console.log('prevent', nextRoute.preventIfLoggedIn);
      // console.log(loggedIn);
      // console.log('restrict', nextRoute.restricted);
      // console.log(nextRoute.params.user_id);
      // console.log('user: ', user);


      // REDIRECT TO LOGIN??

      // console.log(user);
      // // if logged in, redirect
      if (nextRoute.preventIfLoggedIn && loggedIn) {
        console.log('you\'re logged in');
        // redirect and change history (for back button)
        return $location.path('/').replace();  // re-route to their dashboard or main login page? (journal?)
      }

      // redirect if not same user
      // NEED T FIX THIS
      if (nextRoute.restricted && nextRoute.params.user_id !== user.id) {
        // redirect back
        // $location.path('currentRoute.$$route.originalPath').replace();
        //redirect home
        console.log('this isn\'t yours!');
        return $location.path('/').replace();
      }

      // redirect if trying to logout and not logged in
      if (nextRoute.preventIfLoggedOut && !user) {
        $location.path('/').replace();
      }
    });
  }
})();