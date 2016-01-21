(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .controller('NewInspirationsController', NewInspirationsController);

  NewInspirationsController.$inject = ['$location', 'UserService', 'InspirationService'];

  function NewInspirationsController($location, UserService, InspirationService) {
    var vm = this;

    vm.inspiration = {};
    vm.addInspiration = addInspiration;
    vm.clearFields = clearFields;
    vm.showPreview = false;
    vm.clearInspiration = clearInspiration;
    vm.previewHide = previewHide;

    // if user changes type, need to clear out the other fields
    function clearFields() {

      // can this be DRYed up?
      if (vm.inspiration.type === 'quote') {
        vm.inspiration = {};
        vm.inspiration.type = 'quote';
      } else if (vm.inspiration.type === 'image') {
        vm.inspiration = {};
        vm.inspiration.type = 'image';
      } else {
        vm.inspiration = {};
        vm.inspiration.type = 'tip';
      }
      previewHide();
    }

    function clearInspiration() {
      for (var data in vm.inspiration) {
        if (data !== 'type') {
          vm.inspiration[data] = '';
        }
      }
      previewHide();
    }

    function previewHide() {
      vm.showPreview = false;
    }

    function addInspiration() {
      var user = UserService.getCurrentUser();
      vm.inspiration.createdAt = new Date().toLocaleDateString();
      vm.inspiration.journal = user.journal;

      InspirationService.inspirationResource.save({ journal_id: user.journal }, vm.inspiration).$promise.then(function(data) {
        if (data.success) {
          $location.path('/journals/' + user.journal + '/inspirations');
        }
      });
    }
  }
})();