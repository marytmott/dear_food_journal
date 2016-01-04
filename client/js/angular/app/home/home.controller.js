(function() {
  'use strict';

  angular
    .module('dearFoodJ.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', 'user'];

  function HomeController($location, user) {
    var vm = this;

    vm.user = user;

    vm.directToSignup = directToSignup;
    // vm.showLoginModal = showLoginModal;

    function directToSignup() {
      $location.path('/signup');
    }

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
  }
})();