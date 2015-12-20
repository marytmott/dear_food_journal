(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .config(ConfigInspirations);

  ConfigInspirations.$inject = ['$routeProvider'];

  function ConfigInspirations($routeProvider) {
    $routeProvider
      .when('/journals/:journal_id/inspirations', {
        templateUrl: '/partials/inspirations/index.html',
        controller: 'InspirationsController',
        controllerAs: 'vm',
        resolve: {
          inspirationData: ['UserService', 'InspirationService', function(UserService, InspirationService) {
            var user = UserService.getCurrentUser();

            return InspirationService.inspirationResource.query({ journal_id: user.journal });
            // .$promise.then(function(data) {
            //   var quoteInsps = [];
            //   var imgInsps = [];
            //   var tipInsps = [];
            //   var currentInsp;

            //   for (var i = 0; i < data.length; i++) {
            //     currentInsp = data[i];

            //     if (currentInsp.type === 'quote') {
            //       quoteInsps.push(currentInsp);
            //     } else if (currentInsp.type === 'image') {
            //       imgInsps.push(currentInsp);
            //     } else {
            //       tipInsps.push(currentInsp);
            //     }
            //   }
            //   return { quotes: quoteInsps, images: imgInsps, tips: tipInsps };
            // });
          }]
        }
      })
      .when('/journals/:journal_id/inspirations/new', {
        templateUrl: '/partials/inspirations/new.html',
        controller: 'NewInspirationsController',
        controllerAs: 'vm'
      });
  }

})();