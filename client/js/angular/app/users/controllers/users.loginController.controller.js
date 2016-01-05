(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$element', 'UserService', 'ModalService', 'close'];

  function LoginController($element, UserService, ModalService, close) {
    var lc = this;

    console.log('login controller');
    lc.login = login;
    lc.cancel = cancel;
    lc.user = {};

    function login() {
      UserService.login(lc.user).then(function(data) {
        console.log('DATA from LOGIN', data);
        // bad requests are coming here too....add handling
        UserService.setCurrentUser(data);
        // getCurrentUser();
        // console.log('/' + data.data.user.id + '/' + data.data.user.journal);
        // $scope.close = function() {
          $element.modal('hide'); // DRY THIS UP w/ BELOW??
          close(data, 200); // close, but give 500ms for bootstrap to animate
        // };

        // close();
        // $location.path('/journals/' + data.data.user.journal);
      }).catch(function(errors) {
        console.log('errors: ', errors);
        if (errors) {
          lc.loginError = 'Invalid login.'
          lc.user = {};
          // refocus email field
          document.getElementById('email').focus();
        }
      });
    }

    function cancel() {
      $element.modal('hide');
      closeModal();
    }

    function closeModal() {
      close(null, 200);
    }

  }


})();