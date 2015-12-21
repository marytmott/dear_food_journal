(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .controller('InspirationsController', InspirationsController);

  InspirationsController.$inject = ['$rootScope', '$routeParams', '$location', 'inspirationData'];

  function InspirationsController($rootScope, $routeParams, $location, inspirationData) {
    var vm = this;

    setTimeout(function(){ $rootScope.$broadcast('masonry.reload'); }, 500);

    console.log($routeParams);
    // vm.quotes = inspirationData.quotes;
    // vm.images = inspirationData.images;
    // vm.tips = inspirationData.tips;
    vm.inspirations = inspirationData;
    vm.reloadMasonry = reloadMasonry;
    vm.journal = $routeParams.journal_id;


    vm.show = {
      quotes: true,
      images: true,
      tips: true
    };

    console.log($location);
    console.log($routeParams);
    vm.journal = $routeParams.journal_id;

    function reloadMasonry() {
      $rootScope.$broadcast('masonry.reload');
    }
  }

})();