(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .directive('dfPwVerify', dfPwVerify);

  function dfPwVerify() {
    return {
      require: 'ngModel',
      templateUrl: '../../partials/users/df-pw-verify.html',

    }
  }
});