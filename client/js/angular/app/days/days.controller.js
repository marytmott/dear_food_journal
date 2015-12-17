(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .controller('DaysController', DaysController);

  DaysController.$inject = ['entries'];

  function DaysController(entries) {
    var vm = this;
    // only returning meals for now
    vm.meals = entries;
  }
})();