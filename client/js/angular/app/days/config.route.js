(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .config(ConfigDays);

  ConfigDays.$inject = ['$routeProvider'];

  function ConfigDays($routeProvider) {
    $routeProvider
      .when('/journals/:journal_id/days', {
        templateUrl: '/partials/days/index.html',
        controller: 'DaysController',
        controllerAs: 'vm'
        // resolve: {
        //   // entries: function(UserService, MealService) {
        //   //   var user = UserService.getCurrentUser();
        //   //   return MealService.mealResource.query({ journal_id: user.journal });
        //   }
        // }
      })
      .when('/journals/:journal_id/days/:date', {
        templateUrl: '/partials/days/day.html',
        controller: 'DaysController',
        controllerAs: 'vm',
        resolve: {
          // need to [''] this!!! VVVV
          entries: function($route, UserService, DayService) {
            var user = UserService.getCurrentUser();
            var date = $route.current.params.date;
            // console.log($route);
            return DayService.getDay(user.journal, date).then(function(data) {
              console.log(data);
              return data;
              // return data.map(function(meal) {
              //   meal.totalNutrition = JSON.parse(meal.totalNutrition);
              //   console.log(meal.totalNutrition);
              //   return meal.totalNutrition;
              // });
            });

             // console.log(DayService.dayResource.get({ journal_id: user.journal, date: date }));
              // console.log('/users/' + user.id + '/' + user.journal);
          }
        }
      });
  }
})();