(function() {
  'use strict';

  angular
    .module('dearFoodJ.nav')
    .directive('dfNavMain', dfNavMain);

  function dfNavMain() {
    return {
      templateUrl: '../../partials/nav/nav-main.html',
      controller: 'NavController',
      controllerAs: 'nv',
      restrict: 'E'
    };
  }
})();