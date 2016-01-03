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

      vm.showPreview = false;
    }

    function clearInspiration() {
      for (var data in vm.inspiration) {
        if (data !== 'type') {
          vm.inspiration[data] = '';
        }
      }
    }

    function addInspiration() {
      console.log(vm.inspiration);
      var user = UserService.getCurrentUser();
      console.log(user);
      var journal = user.journal;
      vm.inspiration.createdAt = new Date().toLocaleDateString();

      vm.inspiration.journal = journal;

      InspirationService.inspirationResource.save({ journal_id: journal }, vm.inspiration);
      $location.path('/journals/' + journal + '/inspirations');
    }

  }
})();

// var inspirationSchema = mongoose.Schema({
//   journal: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Journal'
//   }],
//   type: String,
//   imageLink: String,
//   author: String,
//   comment: String,
//   quote: String,
//   tip: String