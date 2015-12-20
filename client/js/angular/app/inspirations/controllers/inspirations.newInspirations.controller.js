(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .controller('NewInspirationsController', NewInspirationsController);

  NewInspirationsController.$inject = [];

  function NewInspirationsController() {
    var vm = this;

    vm.inspiration = {};
    vm.addInspiration = addInspiration;

    function addInspiration() {
      console.log(vm.inspiration);
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