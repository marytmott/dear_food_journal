(function() {
  'use strict';

  angular
    .module('dearFoodJ.nav')
    .controller('NavController', NavController);

  NavController.$inject = ['$interval', '$location', '$rootScope', 'UserService'];

  function NavController($interval, $location, $rootScope, UserService) {
    var nv = this;

// console.log(currentUser);
    nv.today = Date.now();
    nv.logout = logout;
    // nv.currentUser = currentUser;
    nv.currentUser = getCurrentUser();
    // console.log('user?', nv.currentUser);
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
      return nv.currentUser = UserService.getCurrentUser();
      // .then(function(data) {
      //   console.log(data);
      //   // nv.currentUser = data;
      // });
    }

    function tick() {
      nv.clock = Date.now();
    }
  }
})();