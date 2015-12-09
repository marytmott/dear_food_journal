(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$routeParams', '$location', 'UserService'];

  function UsersController($routeParams, $location, UserService) {
    var vm = this;

    vm.user = {};
    vm.signup = signup;


    function signup() {
      return UserService.signup().get(vm.user).then(function(data) {
        console.log(data);
      });

    }
  }
})();