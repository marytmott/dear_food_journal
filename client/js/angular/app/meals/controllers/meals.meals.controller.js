(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['meals'];

  function MealsController(meals) {
    var vm = this;

    vm.meals = meals;
  }


})();