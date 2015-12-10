(function() {
  'use strict';

  angular
    .module('dearFoodJ.auth')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['$http'];

  function AuthInterceptor($http) {
    return {$http};
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