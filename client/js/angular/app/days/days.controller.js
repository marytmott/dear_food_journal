(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .controller('DaysController', DaysController);

  DaysController.$inject = ['$routeParams', '$location', 'entries'];

// NEED TO DO HANDLING FOR NULL FIELDS
  function DaysController($routeParams, $location, entries) {
    var vm = this;
    // only returning meals for now
    vm.date = new Date($routeParams.date);
    // console.log($routeParams);
    vm.meals = entries;
    vm.sort = '+time';
    vm.showNewDate = showNewDate;
    vm.pickNewDate = null;


    function todaysTotalNutrition() {
      var todaysNutrition = {
        calories: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        protein: 0,
        sugars: 0
      };
      var currentMeal;

      // move this to separate service as function?
      for (var i = 0; i < vm.meals.length; i++) {
        currentMeal = vm.meals[i];

        todaysNutrition.calories += currentMeal.totalNutrition.calories;
        todaysNutrition.fat += currentMeal.totalNutrition.fat;
        todaysNutrition.carbs += currentMeal.totalNutrition.carbs;
        todaysNutrition.fiber += currentMeal.totalNutrition.fiber;
        todaysNutrition.protein += currentMeal.totalNutrition.protein;
        todaysNutrition.sugars += currentMeal.totalNutrition.sugars;
      }

      return vm.todaysNutrition = todaysNutrition;
    }

    function showNewDate() {
      // NEED TO MAKE SURE NEW DATE IS PICKED!
      var newDate = vm.pickNewDate.toLocaleDateString();
      newDate = newDate.replace(/\//g, '-');
      $location.path('/journals/' + $routeParams.journal_id + '/days/' + newDate);
      // $location.path('/journals')
    }

    todaysTotalNutrition();
  }
})();