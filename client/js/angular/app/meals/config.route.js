(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .config(ConfigMeals);

  ConfigMeals.$inject = ['$routeProvider'];

  // can just use directives?
  // just use one Controller?

  function ConfigMeals($routeProvider) {
    // clean up w/ var for routes?
    $routeProvider
      .when('/:user_id/:journal_id/meals', {
        templateUrl: '/partials/meals/index.html',
        controller: 'MealsController',
        controllerAs: 'vm'
        // add restricted
      })
      .when('/:user_id/:journal_id/meals/new', {
        templateUrl: '/partials/meals/new.html',
        controller: 'MealsCreateController',
        controllerAs: 'vm'
        // restricted
      })
      .when('/:user_id/:journal_id/meals/edit', {
        templateUrl: '/partials/meals/edit.html',
        controller: 'MealsEditController',
        controllerAs: 'vm'
      })
      // .when('/:user_id/:journal_id/meals/delete', {
      //   templateUrl:
      // no template or controller?
      // })
  }
});