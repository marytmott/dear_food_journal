(function() {
  'use strict';

  angular
    .module('dearFoodJ.nav')
    .controller('NavController', NavController);

  NavController.$inject = ['$location', '$rootScope', 'UserService'];

  function NavController($location, $rootScope, UserService) {
    var vm = this;

// console.log(currentUser);
    vm.date = Date.now();
    vm.logout = logout;
    // vm.currentUser = currentUser;
    vm.currentUser = getCurrentUser();
    // console.log('user?', vm.currentUser);
    $rootScope.$on('logout', getCurrentUser);
    $rootScope.$on('login', getCurrentUser);

    function logout() {
      UserService.logout();
      // getCurrentUser();
      $location.path('/login');
    }

    function getCurrentUser() {
      return vm.currentUser = UserService.getCurrentUser();
      // .then(function(data) {
      //   console.log(data);
      //   // vm.currentUser = data;
      // });
    }
  }
})();