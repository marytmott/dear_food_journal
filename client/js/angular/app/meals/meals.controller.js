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
      console.log('what');
      MealsService.foodApiSearch(vm.apiSearch).then(function(data) {
        console.log(data.data.hits);
        vm.searchResults = data.data.hits;
      });
    }
  }
})();