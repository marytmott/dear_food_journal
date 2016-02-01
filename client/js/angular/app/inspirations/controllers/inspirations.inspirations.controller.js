(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .controller('InspirationsController', InspirationsController);

  InspirationsController.$inject = ['$location','$timeout', 'UserService', 'InspirationService', 'inspirationData'];

  function InspirationsController($location, $timeout, UserService, InspirationService, inspirationData) {
    var vm = this;
    var masonry;
    var path;

    vm.loaded = false;

    vm.imgLoadedEvents = {
      // other event options available besides always
      always: function(instance) {
        var masonryGrid = document.querySelector('.masonry-grid');
        vm.loaded = true;
        masonry = new Masonry(masonryGrid, {
          itemSelector: '.insp-mdiv',
          columnWidth: '.insp-mdiv'
        });
      }
    };

    vm.inspirations = inspirationData;
    vm.reloadMasonry = reloadMasonry;
    vm.timeoutReloadM = timeoutReloadM;

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
      masonry.layout();
    }

    function timeoutReloadM() {
      $timeout(reloadMasonry, 0);
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
  }
})();