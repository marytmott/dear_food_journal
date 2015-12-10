(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .factory('UserService', UserService);

  UserService.$inject = ['$resource', '$http', '$window'];

  function UserService($resource, $http, $window) {
    return {
      userResource: $resource('/api/users/:user_id', { user_id: '@user_id' },
         { update: { method: 'PUT' } }
      ),
      signup: function(newUser) {
        return $http.post('/api/users/signup', newUser);
      },
      login: function(loginData) {
        return $http.post('/api/users/login', loginData);
      },
      logout: function() {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('user');
      },
      setCurrentUser: function(data) {
        $window.localStorage.setItem('token', data.data.token);
        $window.localStorage.setItem('user', JSON.stringify(data.data.user));
      },
      getCurrentUser: function() {
       return JSON.parse($window.localStorage.getItem('user'));
      }
    }
  }
  //     signup


  //   };

  //   UserService.userResource = $resource('/api/users/:user_id', { user_id: '@user_id' },
  //     { update: { method: 'PUT' } });

  //   UserService.signup = function(userData) {
  //     return $http.post('/api/users/signup', userData)
  //       .success(loginSuccess)
  //       .error(loginError);
  //   }

  //   UserService.login = function(userData) {
  //     return $http.post('/api/users/login', userData)
  //       .success(loginSuccess)
  //       .error(loginError);
  //   }

  //   function loginSuccess(data) {
  //     console.log(data);
  //     return data;
  //   }

  //   function loginError(response) {
  //     console.log(response);
  //     return response;
  //   }

  //   return UserService;
  // }
})();