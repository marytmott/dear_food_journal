(function() {
  'use strict';

  angular
    .module('dearFoodJ.nav')
    .controller('NavController', NavController);

  NavController.$inject = ['$interval', '$location', '$rootScope', 'UserService', 'ModalService'];

  function NavController($interval, $location, $rootScope, UserService, ModalService) {
    var nv = this;

// console.log(currentUser);
    nv.today = Date.now();
    nv.logout = logout;
    // nv.currentUser = currentUser;
    nv.currentUser = getCurrentUser();
    // console.log('user?', nv.currentUser);
    $rootScope.$on('logout', getCurrentUser);
    $rootScope.$on('login', getCurrentUser);

    nv.showLoginModal = showLoginModal;

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

    // nv.showLoginModal = function() {
    //   // Just provide a template url, a controller and call 'showModal'.


    // };

    function showLoginModal() {
      console.log('what');
      ModalService.showModal({
        templateUrl: '/partials/users/login.html',
        controller: 'LoginController',
        controllerAs: 'lc'
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        modal.close.then(function(result) {
          if (result) {
            UserService.setCurrentUser(result);
            $location.path('/journals/' + result.data.user.journal);

          }

          // vm.message = result ? "You said Yes" : "You said No";
        });
      });
    }

    function tick() {
      nv.clock = Date.now();
    }
  }
})();