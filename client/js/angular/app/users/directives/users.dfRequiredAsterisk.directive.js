(function() {
  'use strict';

  angular
    .module('dearFoodJ.users')
    .directive('dfRequiredAsterisk', dfRequiredAsterisk);

  function dfRequiredAsterisk() {
    return {
      templateUrl: '../../partials/users/df-required-asterisk.html',
      restrict: 'E'
    }
  }
})();