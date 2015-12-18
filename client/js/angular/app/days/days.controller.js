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
    // WOW -- dry this up!!? (possible w/ dates? = prob not)
    vm.previousDay = new Date(new Date($routeParams.date).setDate(new Date($routeParams.date).getDate() - 1)).toLocaleDateString().replace(/\//g, '-');
    vm.date = new Date($routeParams.date);
    vm.nextDay = new Date(new Date($routeParams.date).setDate(new Date($routeParams.date).getDate() + 1)).toLocaleDateString().replace(/\//g, '-');
    console.log(vm.previousDay, vm.date, vm.nextDay);

    vm.goToYesterday = goToYesterday;
    vm.goToTomorrow = goToTomorrow;
    // console.log($routeParams);
    vm.meals = entries;
    vm.sort = '+time';
    vm.showNewDate = showNewDate;
    vm.pickNewDate = null;

    // make one functino for routing
    function goToYesterday() {
      $location.path('/journals/' + $routeParams.journal_id + '/days/' + vm.previousDay);
    }

    function goToTomorrow() {
      $location.path('/journals/' + $routeParams.journal_id + '/days/' + vm.nextDay);
    }

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