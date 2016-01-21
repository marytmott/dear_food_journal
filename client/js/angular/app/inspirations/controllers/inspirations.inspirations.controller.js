(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .controller('InspirationsController', InspirationsController);

  InspirationsController.$inject = ['$rootScope', '$location', '$timeout', 'UserService', 'InspirationService', 'inspirationData'];

  function InspirationsController($rootScope, $location, $timeout, UserService, InspirationService, inspirationData) {
    var vm = this;
    var path;

    vm.inspirations = inspirationData;
    vm.reloadMasonry = reloadMasonry;

    vm.show = {
      quotes: true,
      images: true,
      tips: true
    };
    vm.goToNewInsp = goToNewInsp;

    // for edit view
    vm.inspiration = inspirationData;
    vm.updateInspiration = updateInspiration;
    vm.deleteInspiration = deleteInspiration;
    vm.showPreview = true;
    vm.previewHide = previewHide;
    vm.journal = UserService.getCurrentUser().journal;
    path = '/journals/' + vm.journal + '/inspirations';

    function reloadMasonry() {
      $rootScope.$broadcast('masonry.reload');
    }

    function goToNewInsp() {
      $location.path(path + '/new');
    }

    function updateInspiration() {
      InspirationService.inspirationResource.update({ journal_id: vm.journal, inspiration_id: vm.inspiration._id }, vm.inspiration).$promise.then(function(data) {
        if (data.message) {
          $location.path(path);
        }
      });
    }

    function deleteInspiration() {
      $location.path(path + '/' + vm.inspiration._id + '/delete');
    }

    function previewHide() {
      vm.showPreview = false;
    }

    // images loaded not properly working, need to fix better
    $timeout(reloadMasonry, 300);
  }
})();