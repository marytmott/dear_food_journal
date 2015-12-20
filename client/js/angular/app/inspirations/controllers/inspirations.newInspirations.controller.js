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

    function addInspiration() {
      console.log(vm.inspiration);
      var user = UserService.getCurrentUser();
      console.log(user);
      var journal = user.journal;

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