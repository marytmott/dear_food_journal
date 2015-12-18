(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .controller('DaysController', DaysController);

  DaysController.$inject = ['$routeParams', '$location', 'entries'];

  function DaysController($routeParams, $location, entries) {
    var vm = this;
    // only returning meals for now
    vm.date = new Date($routeParams.date);
    // console.log($routeParams);
    vm.meals = entries;
    vm.sort = '+time';
    vm.showNewDate = showNewDate;
    vm.pickNewDate = null;

    function showNewDate() {
      // NEED TO MAKE SURE NEW DATE IS PICKED!
      var newDate = vm.pickNewDate.toLocaleDateString();
      newDate = newDate.replace(/\//g, '-');
      $location.path('/journals/' + $routeParams.journal_id + '/days/' + newDate);
      // $location.path('/journals')
    }
  }
})();