(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$location', 'UserService'];

  function UsersController($location, UserService) {
    var vm = this;

    vm.user = {};
    vm.signup = signup;
    vm.login = login;
    vm.logout = logout;
    vm.journal = {};
    vm.journal.weightChangeType = 'lose';
    vm.emailError = '';

    function signup() {
      vm.user.createdAt = Date.now();

      // clean up user input
      if (vm.user.firstName) {
        vm.user.firstName = vm.user.firstName.trim();
      }
      vm.user.email = vm.user.email.trim();

      UserService.signup(vm.user).then(function(data) {
        UserService.setCurrentUser(data);
        $location.path('/journals/' + data.data.user.journal);
      }).catch(function(data) {
        if (data.data.indexOf('E11000') !== -1) {
          vm.emailError = "This email address already has an account."
        }
      });
    }

    function login() {
      UserService.login(vm.user).then(function(data) {
        // TODO - bad requests are coming here too....add handling
        UserService.setCurrentUser(data);
        $location.path('/journals/' + data.data.user.journal);
      }).catch(function(errors) {
        // TODO - need to add error handling
      });
    }

    function logout() {
      UserService.logout();
      $location.path('/');
    }
  }
})();