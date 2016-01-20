(function() {
  'use strict';

  angular
    .module('dearFoodJ.nav')
    .controller('NavController', NavController);

  NavController.$inject = ['$interval', '$location', '$rootScope', 'UserService', 'ModalService'];

  function NavController($interval, $location, $rootScope, UserService, ModalService) {
    var nv = this;

    nv.today = Date.now();
    nv.logout = logout;
    nv.currentUser = getCurrentUser();
    nv.showLoginModal = showLoginModal;
    $rootScope.$on('logout', getCurrentUser);
    $rootScope.$on('login', getCurrentUser);
    tick();
    $interval(tick, 1000);

    function logout() {
      UserService.logout();
      $location.path('/login');
    }

    function getCurrentUser() {
      return nv.currentUser = UserService.getCurrentUser();
    }

    function showLoginModal() {
      ModalService.showModal({
        templateUrl: '/partials/users/login.html',
        controller: 'LoginController',
        controllerAs: 'lc'
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if (result) {
            UserService.setCurrentUser(result);
            $location.path('/journals/' + result.data.user.journal);
          }
        });
      });
    }

    function tick() {
      nv.clock = Date.now();
    }
  }
})();