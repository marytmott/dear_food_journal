(function() {
  'use strict';

  angular
    .module('dearFoodJ.journals')
    .controller('JournalsController', JournalsController);

  JournalsController.$inject = ['JournalService', 'journal', 'user'];

  function JournalsController(JournalService, journal, user) {
    var vm = this;

    vm.user = user;
    vm.journal = journal;
    console.log(vm.journal);
  }
})();