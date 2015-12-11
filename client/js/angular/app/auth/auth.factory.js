(function() {
  'use strict';

  angular
    .module('dearFoodJ.auth')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['$window', '$location', '$q'];

  function AuthInterceptor($window, $location, $q) {
    return {
      request: function(config) {
        var token = $window.localStorage.getItem('token');
        // config headers to be AJAX request
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        // add token if exists
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        // for error handling, need to return $q.resolve
        return $q.resolve(config);
      },
      responseError: function(rejection) {
        // will need to test this sla
        // SEE NOTES FOR THIS INTERCEPTOR
        console.log(rejection);
        // error --> logout
        // unauthorized -- redirect + $q.reject(rejection);
      }
    };
  }
})();