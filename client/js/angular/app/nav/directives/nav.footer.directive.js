(function() {
  'use strict';

  angular
    .module('dearFoodJ.nav')
    .directive('dfFooter', dfFooter);

  function dfFooter() {
    return {
      templateUrl: '../../partials/nav/nav-footer.html',
      restrict: 'E'
    };
  }
})();