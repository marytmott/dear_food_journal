(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$routeParams', '$location', 'UserService'];

  function UsersController($routeParams, $location, UserService) {
    var vm = this;

// console.log(currentUser);
    vm.user = {};
    vm.signup = signup;
    vm.login = login;
    vm.logout = logout;
    // vm.currentUser = currentUser;
    // vm.currentUser = UserService.getCurrentUser();
    // console.log('user?', vm.currentUser);
    vm.journal = {};
    vm.journal.weightChangeType = 'lose';
    vm.emailError = '';

    function signup() {
      vm.user.createdAt = Date.now();
      // clean up use input
      if (vm.user.firstName) {
        vm.user.firstName = vm.user.firstName.trim();
      }

      vm.user.email = vm.user.email.trim();

      UserService.signup(vm.user).then(function(data) {
        UserService.setCurrentUser(data);
        $location.path('/journals/' + data.data.user.journal);
        // token data?
      }).catch(function(data) {
        console.log(data.data);
        if (data.data.indexOf('E11000') !== -1) {
          vm.emailError = "That email address already has an account."
        }
      });
        // console.log();
      // $scope.errors = data.data;
    // });;
    }

    function login() {
      UserService.login(vm.user).then(function(data) {
        console.log('DATA from LOGIN', data);
        // bad requests are coming here too....add handling
        UserService.setCurrentUser(data);
        // getCurrentUser();
        // console.log('/' + data.data.user.id + '/' + data.data.user.journal);
        $location.path('/journals/' + data.data.user.journal);
      }).catch(function(errors) {
        console.log('errors: ', errors);
      });
    }

    function logout() {
      UserService.logout();
      // getCurrentUser();
      $location.path('/login');
    }

    // THIS NEEDS TO BE A RESOLVE ON ALL ROUTES!?!?
    // function getCurrentUser() {
    //   vm.currentUser = UserService.getCurrentUser();
    //   // .then(function(data) {
    //   //   console.log(data);
    //   //   // vm.currentUser = data;
    //   // });
    // }
    // getCurrentUser();
  }
})();