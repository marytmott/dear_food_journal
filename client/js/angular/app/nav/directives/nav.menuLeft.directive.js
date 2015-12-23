(function() {
  'use strict';

  angular
    .module('dearFoodJ.nav')
    .directive('dfMenuLeft', dfMenuLeft);

  function dfMenuLeft() {
    return {
      templateUrl: '../../partials/nav/nav-menu-left.html',
      controller: 'NavController',
      controllerAs: 'nv',
      bindToController: true,
      restrict: 'E'
    };
  }
})();