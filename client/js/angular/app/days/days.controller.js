(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .controller('DaysController', DaysController);

  DaysController.$inject = ['$routeParams', 'entries'];

  function DaysController($routeParams, entries) {
    var vm = this;
    // only returning meals for now
    vm.date = new Date($routeParams.date);
    // console.log($routeParams);
    vm.meals = entries;
    vm.sort = '+time'
  }
})();