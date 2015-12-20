(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .controller('InspirationsController', InspirationsController);

  InspirationsController.$inject = ['$routeParams', '$location'];

  function InspirationsController($routeParams, $location) {
    var vm = this;

    console.log($location);
    console.log($routeParams);
    vm.journal = $routeParams.journal_id;
  }

})();