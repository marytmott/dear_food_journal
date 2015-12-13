(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['MealsService'];

  function MealsController(MealsService) {
    var vm = this;

    vm.apiSearch = '';
    vm.foodSearch = foodSearch;

    function foodSearch() {
      MealsService.foodApiSearch(vm.apiSearch);
    }
  }
})();