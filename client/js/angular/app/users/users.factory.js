(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .factory('UserService', UserService);

  UserService.$inject = ['$resource', '$http'];

  function UserService($resource, $http) {
    var UserService = {};

    UserService.userResource = $resource('/api/users/:user_id', { user_id: '@user_id' },
      { update: { method: 'PUT' } });

    UserService.signup = function(userData) {
      return $http.post('/api/users/signup', userData)
        .success(loginSuccess)
        .error(loginError);
    }

    UserService.login = function(userData) {
      return $http.post('/api/users/login', userData)
        .success(loginSuccess)
        .error(loginError);
    }

    function loginSuccess(data) {
      console.log(data);
      return data;
    }

    function loginError(response) {
      console.log(response);
      return response;
    }

    return UserService;
  }
})();