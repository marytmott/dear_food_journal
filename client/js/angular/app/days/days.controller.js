(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .controller('DaysController', DaysController);

  DaysController.$inject = ['$routeParams', '$location', 'UserService', 'entries', 'dailyCalGoal'];

  // NEED TO DO HANDLING FOR NULL FIELDS
  function DaysController($routeParams, $location, UserService, entries, dailyCalGoal) {
    var vm = this;
    // WOW -- dry this up!!? (possible w/ dates? = prob not)
    // only returning meals for now
    vm.meals = entries;
    vm.previousDay = new Date(new Date($routeParams.date).setDate(new Date($routeParams.date).getDate() - 1));
    vm.date = new Date($routeParams.date);
    vm.nextDay = new Date(new Date($routeParams.date).setDate(new Date($routeParams.date).getDate() + 1));
    vm.routeToDiffDay = routeToDiffDay;
    vm.goToNewMeal = goToNewMeal;
    vm.dailyCalGoal = dailyCalGoal;
    vm.overCalGoal = false;
    vm.sort = '+time';
    vm.pickNewDate = null;
    vm.journalId = $routeParams.journal_id;

    // make one function for routing
    function routeToDiffDay(day) {
      var dayPath = day.toLocaleDateString().replace(/\//g, '-');
      var user = UserService.getCurrentUser();
      $location.path('/journals/' + user.journal + '/days/' + dayPath);
    }

    function goToNewMeal() {
      var user = UserService.getCurrentUser();
      $location.path('/journals/' + user.journal + '/meals/new');
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
      vm.todaysNutrition = todaysNutrition;
      dailyCalGoalComparison();
    }

    function dailyCalGoalComparison() {
      var dailyCalComparison = dailyCalGoal - vm.todaysNutrition.calories;

      if (dailyCalComparison > 0) {
        vm.calGoalComparison = vm.todaysNutrition.calories;
      } else {
        vm.overCalGoal = true;
        vm.calGoalComparison = Math.abs(dailyCalComparison);
      }
    }
    todaysTotalNutrition();
  }
})();