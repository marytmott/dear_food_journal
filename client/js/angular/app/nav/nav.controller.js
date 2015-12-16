(function() {
  'use strict';

  angular
    .module('dearFoodJ.nav')
    .controller('NavController', NavController);

  NavController.$inject = ['$interval', '$location', '$rootScope', 'UserService'];

  function NavController($interval, $location, $rootScope, UserService) {
    var vm = this;

// console.log(currentUser);
    vm.today = Date.now();
    vm.logout = logout;
    // vm.currentUser = currentUser;
    vm.currentUser = getCurrentUser();
    // console.log('user?', vm.currentUser);
    $rootScope.$on('logout', getCurrentUser);
    $rootScope.$on('login', getCurrentUser);

    tick();
    $interval(tick, 1000);

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

    function tick() {
      vm.clock = Date.now();
    }
  }
})();