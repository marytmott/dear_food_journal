(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .controller('DaysController', DaysController);

  DaysController.$inject = ['entries'];

  function DaysController(entries) {
    var vm = this;

    vm.entries = entries;
  }
})();