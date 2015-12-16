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
        controllerAs: 'vm'
        // resolve: {

        // }
      })
  }
})();