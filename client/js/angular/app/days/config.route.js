(function() {
  'use strict';

  angular
    .module('dearFoodJ.days')
    .config(ConfigDays);

  ConfigDays.$inject = ['$routeProvider'];

  function ConfigDays($routeProvider) {
    $routeProvider
      .when('/journals/:journal_id/days/:date', {
        templateUrl: '/partials/days/day.html',
        controller: 'DaysController',
        controllerAs: 'vm',
        resolve: {
          // need to [''] this!!! VVVV
          entries: ['$route', 'UserService', 'DayService', function($route, UserService, DayService) {
            var user = UserService.getCurrentUser();
            var date = $route.current.params.date;
            // console.log($route);
            return DayService.getDay(user.journal, date).then(function(data) {
              console.log(data);
              return data;
            });
          }],
          dailyCalGoal: ['UserService', 'JournalService', function(UserService, JournalService) {
            var user = UserService.getCurrentUser();

            return JournalService.journalResource.get({ journal_id: user.journal }).$promise.then(function(data) {
              console.log(data.dailyCalorieGoal);
              return data.dailyCalorieGoal;
            });
          }]
          // put daily meal total in resolve as well???
        }
      });
  }
})();