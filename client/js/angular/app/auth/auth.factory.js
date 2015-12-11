(function() {
  'use strict';

  angular
    .module('dearFoodJ.auth')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['$window', '$location', '$q'];

  function AuthInterceptor($window, $location, $q) {
    return {
      request: function(config) {
        // add
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        // for error handling, need to return $q.resolve
        return $q.resolve(config);
      }
    };
  }
})();


// (function() {
//   'use strict';

//   angular
//     .module('dearFoodJ.auth')
//     .factory('AuthInterceptor', AuthInterceptor);

//   AuthInterceptor.$inject = [];

//   function AuthInterceptor() {
//   //   // return {
//   //   //   request: function(config) {
//   //   //     config.headers['X-Requested-With'] = 'XMLHttpRequest';
//   //   //   },
//   //   //   responseError: function(err) {
//   //   //     console.log(err);
//   //   //   }
//   //   // };
//   }
// })();