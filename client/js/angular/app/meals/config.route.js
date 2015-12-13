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
      .when('/journals/:journal_id/meals', {
        templateUrl: '/partials/meals/index.html',
        controller: 'MealsController',
        controllerAs: 'vm'
        // add restricted
      })
      .when('/journals/:journal_id/meals/new', {
        templateUrl: '/partials/meals/new.html',
        controller: 'MealsController',
        controllerAs: 'vm'
        // restricted
      })
      .when('/journals/:journal_id/meals/edit', {
        templateUrl: '/partials/meals/edit.html',
        controller: 'MealsController',
        controllerAs: 'vm'
      })
      .when('/journals/:journal_id/meals/delete', {
      // resolve
      // no template or controller?
      });
  }
})();