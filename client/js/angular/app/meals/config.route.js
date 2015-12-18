(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .config(ConfigMeals);

  ConfigMeals.$inject = ['$routeProvider'];

  // can just use directives?
  // just use one Controller?
  // CANNOT INJECT FACTORIES AND SERVICES INTO CONFIG!!!

  // DO THESE NEED TO bE NESTED UNDER JOURNAL?


  function ConfigMeals($routeProvider) {
    // clean up w/ var for routes?
    $routeProvider
      .when('/journals/:journal_id/meals/new', {
        templateUrl: '/partials/meals/new.html',
        controller: 'NewMealsController',
        controllerAs: 'vm'
        // restricted
      })
      .when('/journals/:journal_id/meals/:meal_id', {
        templateUrl: '/partials/meals/meal.html',
        controller: 'MealsController',
        controllerAs: 'vm',
        resolve: {
            // dry this up w/ other controllers!!!
          mealData: function($route, MealService) {
            var journal = $route.current.params.journal_id;
            var meal = $route.current.params.meal_id;
            console.log(journal,meal);

            return MealService.mealResource.get({ journal_id: journal, meal_id: meal });
          }
          // need restriction
        }
      })
      .when('/journals/:journal_id/meals/:meal_id/edit', {
        templateUrl: '/partials/meals/edit.html',
        controller: 'MealsController',
        controllerAs: 'vm',
        resolve: {
            // dry this up w/ other controllers!!!
          mealData: function($route, MealService) {
            var journal = $route.current.params.journal_id;
            var meal = $route.current.params.meal_id;

            return MealService.mealResource.get({ journal_id: journal, meal_id: meal })
          }
        }
      })
      .when('/journals/:journal_id/meals/:meal_id/delete', {
        resolve: {
          deleteMeal: function($route, $location, MealService) {
            var journal = $route.current.params.journal_id;
            var meal = $route.current.params.meal_id;

            console.log('***ROUTE:', $route);
            MealService.mealResource.delete({ journal_id: journal, meal_id: meal });
            $location.path('/journals/' + journal);
          }
        }

      });
  }
})();