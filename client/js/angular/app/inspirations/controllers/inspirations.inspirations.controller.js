(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .controller('InspirationsController', InspirationsController);

  InspirationsController.$inject = ['$routeParams', '$location', 'inspirationData'];

  function InspirationsController($routeParams, $location, inspirationData) {
    var vm = this;

    console.log(inspirationData);
    vm.quotes = inspirationData.quotes;
    vm.images = inspirationData.images;
    vm.tips = inspirationData.tips;

    console.log($location);
    console.log($routeParams);
    vm.journal = $routeParams.journal_id;
  }

})();