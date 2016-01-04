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
    console.log('journal', vm.journal);

    vm.temp = {};
    // temp -- in case they change it and go back

    // if they clicked to change something
    vm.change = {
      weightChangeReason: false,
      weightChangeType: false,
      dailyCalorieGoal: false,
      weightGoal: false,
      startWeight: false,
      weightChange: false
    };
    console.log(vm.journal);

    vm.weightChange = {
      type: 'lost'
    };

    vm.changeAllActive = false;
    vm.changeMode = changeMode;
    vm.changeAll = changeAll;
    vm.updateJournal = updateJournal;
    vm.weightChangeTypeHeading;

    function checkUserNamePluralGrammar() {
      var userNameLastChar = user.firstName[user.firstName.length - 1];
      if (userNameLastChar === 's' || userNameLastChar === 'z') {
        console.log('yes');
        vm.userNameLastCharCheck = true;
      } else {
        console.log('no');
        vm.userNameLastCharCheck = false;
      }
    }

    function changeMode(property, cancel) {
      vm.change[property] = !vm.change[property];
      // if true, put in temp value for cancelling
      if (vm.change[property] && property !== 'weightChange') {
        vm.temp[property] = vm.journal[property];
      }
      // reset
      if (cancel) {
        vm.journal[property] = vm.temp[property];
      }
    }

    function changeAll() {
      vm.changeAllActive = !vm.changeAllActive;
      for (var property in vm.change) {
        vm.change[property] = !vm.change[property];
      }
    }

    function updateJournal(property) {
      var user = UserService.getCurrentUser();
      console.log(property);
      changeMode(property);

      if (property === 'weightChange') {
        // update journal object w/ total weight change, then save
        getChangedWeight();
      }
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

    // function getChangedWeight() {
    //   if (vm.weightChange.type === 'lost') {
    //     return vm.journal.updateWeightChange = -
    //   }
    // }
    checkUserNamePluralGrammar();
  }
})();