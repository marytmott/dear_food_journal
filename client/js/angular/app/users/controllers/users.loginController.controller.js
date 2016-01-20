(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$element', 'UserService', 'ModalService', 'close'];

  function LoginController($element, UserService, ModalService, close) {
    var lc = this;

    lc.login = login;
    lc.cancel = cancel;
    lc.user = {};

    function login() {
      UserService.login(lc.user).then(function(data) {
        // TODO - bad requests are coming here too....add handling
        UserService.setCurrentUser(data);
        $element.modal('hide');
        close(data, 200); // close, but give 200ms for bootstrap to animate
      }).catch(function(errors) {
        if (errors) {
          lc.loginError = 'Invalid login.'
          lc.user = {};
          // TODO - refocus email field call
        }
      });
    }

    function cancel() {
      // TODO - refocus email field call
      $element.modal('hide');
      closeModal();
    }

    function closeModal() {
      close(null, 200);
    }

    // TODO - add function to refocus email when user is done w/ modal (logs in or cancels)
    // document.getElementById('email').focus();
  }
})();