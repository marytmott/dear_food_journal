(function() {
  'use strict';

  angular
    .module('dearFoodj.users')
    .factory('UserService', UserService);

  UserService.$inject = ['$resource', '$http'];

  function UserService($resource, $http) {
    var UserService = {};

    UserService.userResource = function() {
      return $resource('/api/users/:user_id', { user_id: '@user_id' },
        { update: { method: 'PUT' } });
    }

    UserService.login = function(userData) {
      return $http.post('/api/login', userData)
        .success(loginSuccess)
        .error(loginError);
    }

    function loginSuccess(data) {
      return data;
    }

    function loginError(response) {
      return response;
    }

    return UserService;
  }
})();