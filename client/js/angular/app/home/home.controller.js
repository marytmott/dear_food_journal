(function() {
  'use strict';

  angular
    .module('dearFoodJ.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['user'];

  function HomeController(user) {
    var vm = this;

    vm.user = user;
  }
})();