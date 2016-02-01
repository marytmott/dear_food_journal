(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .controller('InspirationsController', InspirationsController);

  InspirationsController.$inject = ['$location', 'UserService', 'InspirationService', 'inspirationData'];

  function InspirationsController($location, UserService, InspirationService, inspirationData) {
    var vm = this;
    var user = UserService.getCurrentUser();
    var masonry;
    var path;

    vm.inspirations = inspirationData;
    vm.loaded = false;
    vm.show = {
      quotes: true,
      images: true,
      tips: true
    };
    vm.reloadMasonry = reloadMasonry;
    vm.timeoutReloadM = timeoutReloadM;

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

    vm.goToNewInsp = goToNewInsp;

    // for edit view
    vm.inspiration = inspirationData;
    vm.updateInspiration = updateInspiration;
    vm.deleteInspiration = deleteInspiration;
    vm.showPreview = true;
    vm.previewHide = previewHide;
    vm.journal = user.journal;
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

    // b/c view not properly updating with resolve data or $timeout, have to check data
    InspirationService.inspirationResource.query({ journal_id: user.journal }).$promise.then(function(data) {
      vm.hasInspiration = data.length ? true : false;
    });
  }
})();