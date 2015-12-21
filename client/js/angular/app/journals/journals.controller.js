(function() {
  'use strict';

  angular
    .module('dearFoodJ.journals')
    .controller('JournalsController', JournalsController);

  JournalsController.$inject = ['UserService', 'JournalService', 'journal', 'user'];

  function JournalsController(UserService, JournalService, journal, user) {
    var vm = this;

    vm.user = user;
    vm.journal = journal;

    vm.temp = {};
    // temp -- in case they change it and go back

    // if they clicked to change something
    vm.change = {
      weightChangeReason: false,
      weightChangeType: false,
      dailyCalGoal: false,
      wtGoal: false,
      addWtChange: false
    };
    console.log(vm.journal);

    vm.changeMode = changeMode;
    vm.updateJournal = updateJournal;

    function changeMode(property, cancel) {
      vm.change[property] = !vm.change[property];
      // if true, put in temp value for cancelling
      if (vm.change[property]) {
        vm.temp[property] = vm.journal[property];
      }

      // reset
      if (cancel) {
        vm.journal[property] = vm.temp[property];
      }
    }

    function updateJournal(property) {
      var user = UserService.getCurrentUser();
      // console.log(property);

      // update property in case they change something and cancel, don't want to send the whole modified object!
      JournalService.journalResource.update({ journal_id: user.journal },
        {
          _id: vm.journal._id,
          [property]: vm.journal[property]
        }
        ).$promise.then(function(data) {
          console.log(data);
          if (data.success) {
            vm.change[property] = false;
            vm.journal = data.journal;
          }
        });

    }
  }
})();