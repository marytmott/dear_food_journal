(function() {
  'use strict';

  angular
    .module('dearFoodJ.auth')
    .config(ConfigInterceptor);

  ConfigInterceptor.$inject = ['$httpProvider'];

  function ConfigInterceptor($httpProvider) {

  }
})();