(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .controller('InspirationsController', InspirationsController);

  InspirationsController.$inject = ['$rootScope', '$routeParams', '$location', '$timeout', 'InspirationService', 'inspirationData'];

  function InspirationsController($rootScope, $routeParams, $location, $timeout, InspirationService, inspirationData) {
    var vm = this;

    var path;
    // setTimeout(function(){ $rootScope.$broadcast('masonry.reload'); }, 500);

    // console.log($routeParams);
    // vm.quotes = inspirationData.quotes;
    // vm.images = inspirationData.images;
    // vm.tips = inspirationData.tips;
    vm.inspirations = inspirationData;
    vm.reloadMasonry = reloadMasonry;
    // vm.journal = $routeParams.journal_id;

    vm.show = {
      quotes: true,
      images: true,
      tips: true
    };

    // for edit view
    vm.inspiration = inspirationData;
    // console.log(vm.inspiration);
    vm.updateInspiration = updateInspiration;
    vm.deleteInspiration = deleteInspiration;
    vm.goToNewInsp = goToNewInsp;
    vm.showPreview = true;
    vm.previewHide = previewHide;


    // console.log(vm.inspiration._id)
    // console.log($location);
    // console.log($routeParams);
    vm.journal = $routeParams.journal_id;
    path = '/journals/' + vm.journal + '/inspirations';

    function reloadMasonry() {
      console.log('reloading masonry');
      $rootScope.$broadcast('masonry.reload');
    }

    function goToNewInsp() {
      $location.path(path + '/new');
    }

    function updateInspiration() {
      // console.log('id', vm.inspiration._id);
      InspirationService.inspirationResource.update({ journal_id: vm.journal, inspiration_id: vm.inspiration._id }, vm.inspiration);
      $location.path(path);
    }

    function deleteInspiration() {
      console.log(path);
      $location.path(path + '/' + vm.inspiration._id + '/delete');
    }

    function previewHide() {
      vm.showPreview = false;
    }

    // images loaded not properly working, need to fix better
    $timeout(reloadMasonry, 300);
    // reloadMasonry();

  }

})();