(function() {
  'use strict';

  // service to intercept routes w/ headers and/or tokens
  angular
    .module('dearFoodJ.users')
    .service('UserInterceptor', UserInterceptor);

  UserInterceptor.$inject = ['$http', '$location', '$q'];

  function UserInterceptor($http, $location, $q) {
    return {
      request: function(config) {
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
      },
      responseError: function(err) {
        console.log(err);
      }
    };
  }
})();