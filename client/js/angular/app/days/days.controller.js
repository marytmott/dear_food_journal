(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .controller('DaysController', DaysController);

  DaysController.$inject = ['$routeParams', '$location', 'UserService', 'entries', 'dailyCalGoal'];

// NEED TO DO HANDLING FOR NULL FIELDS
  function DaysController($routeParams, $location, UserService, entries, dailyCalGoal) {
    var vm = this;
    // console.log(dailyCalGoal.dailyCalorieGoal);
    // only returning meals for now
    // WOW -- dry this up!!? (possible w/ dates? = prob not)
    vm.previousDay = new Date(new Date($routeParams.date).setDate(new Date($routeParams.date).getDate() - 1));
    vm.date = new Date($routeParams.date);
    vm.nextDay = new Date(new Date($routeParams.date).setDate(new Date($routeParams.date).getDate() + 1));
    console.log(vm.previousDay, vm.date, vm.nextDay);
    vm.routeToDiffDay = routeToDiffDay;
    vm.goToNewMeal = goToNewMeal;

    // vm.goToYesterday = goToYesterday;
    // vm.goToTomorrow = goToTomorrow;
    // console.log($routeParams);
    vm.meals = entries;
    vm.dailyCalGoal = dailyCalGoal;
    // console.log(vm.meals);
// console.log(vm.meals[0].foodEntries);
    vm.sort = '+time';
    // vm.showNewDate = showNewDate;
    vm.pickNewDate = null;
    vm.journalId = $routeParams.journal_id;

    // make one functino for routing
    function routeToDiffDay(day) {
      var dayPath = day.toLocaleDateString().replace(/\//g, '-');
      $location.path('/journals/' + $routeParams.journal_id + '/days/' + dayPath);
    }

    // function goToTomorrow() {
    //   $location.path('/journals/' + $routeParams.journal_id + '/days/' + vm.nextDay);
    // }


    function goToNewMeal() {
      var user = UserService.getCurrentUser();
      $location.path('/journals/' + user.journal + '/meals/new');
    }

    function todaysTotalNutrition() {
      var todaysNutrition = {
        Calories: 0,
        Carbs: 0,
        Fat: 0,
        Fiber: 0,
        Protein: 0,
        Sugars: 0
      };
      var currentMeal;

      // move this to separate service as function?
      for (var i = 0; i < vm.meals.length; i++) {
        currentMeal = vm.meals[i];

        todaysNutrition.Calories += currentMeal.totalNutrition.calories;
        todaysNutrition.Fat += currentMeal.totalNutrition.fat;
        todaysNutrition.Carbs += currentMeal.totalNutrition.carbs;
        todaysNutrition.Fiber += currentMeal.totalNutrition.fiber;
        todaysNutrition.Protein += currentMeal.totalNutrition.protein;
        todaysNutrition.Sugars += currentMeal.totalNutrition.sugars;
      }

      vm.todaysNutrition = todaysNutrition;
      vm.calGoalComparison = dailyCalGoal - vm.todaysNutrition.Calories;
    }

    // function dailyCalGoalComparison() {
    // }
    // function showNewDate() {
    //   // NEED TO MAKE SURE NEW DATE IS PICKED!
    //   var newDate = vm.pickNewDate.toLocaleDateString();
    //   newDate = newDate.replace(/\//g, '-');
    //   $location.path('/journals/' + $routeParams.journal_id + '/days/' + newDate);
    //   // $location.path('/journals')
    // }

    todaysTotalNutrition();
    // dailyCalGoalComparison();

  }
})();