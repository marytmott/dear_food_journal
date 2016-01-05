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
      dailyCalorieGoal: false,
      weightGoal: false,
      startWeight: false,
      weightChange: false
    };
    console.log(vm.journal);

    vm.changeAllActive = false;
    vm.changeMode = changeMode;
    vm.changeAll = changeAll;
    vm.updateJournal = updateJournal;
    vm.weightChangeTypeHeading;
    // vm.calcWeightChange = calcWeightChange;

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
      // if (vm.change[property] && property !== 'weightChange') {
      // }
      // reset
      if (cancel) {
        vm.journal[property] = vm.temp[property];
      } else {
        vm.temp[property] = vm.journal[property];
      }
    }

    function changeAll() {
      vm.changeAllActive = !vm.changeAllActive;
      for (var property in vm.change) {
        vm.change[property] = !vm.change[property];
      }
    }

    function calcWeightChange(journalInfo) {
      var trackingWeight = journalInfo.currentWeight && journalInfo.startWeight;
      var weightChange;
      var weightLost = ' lost ';
      var weightGained = ' gained ';
      var loseWeightGoal = journalInfo.weightChangeType === 'lose';
      var gainWeightGoal = journalInfo.weightChangeType === 'gain';

      console.log('tracking weight', journalInfo);
      if (trackingWeight) {
        weightChange = Math.floor(journalInfo.startWeight - journalInfo.currentWeight);
        console.log(weightChange);

        if (weightChange > 0) {
          if (loseWeightGoal) {
            // if lose weight goal && user lost weight
            getWeightChangeMessage(weightLost, weightChange, 'success');
          } else if (gainWeightGoal) {
            // if user gained weight goal and user gained weight
            getWeightChangeMessage(weightLost, weightChange, 'noSuccess');
          }
        } else if (weightChange < 0) {
          if (loseWeightGoal) {
            // if lose weight goal && user gained weight
            getWeightChangeMessage(weightGained, weightChange, 'noSuccess');
          } else if (gainWeightGoal) {
            // if gain weight goal && user gained weight
            getWeightChangeMessage(weightGained, weightChange, 'success');
          }
        } else {
          // if no change
          if (loseWeightGoal) {
            getWeightChangeMessage(weightLost);
          } else {
            getWeightChangeMessage(weightGained);
          }
        }
      }
    }

    function getWeightChangeMessage(typeOfChange, weightChange, messageName) {
      var poundText = ' pounds';
      weightChange = Math.abs(weightChange);

      // pluralization for 1 pound
      if (weightChange === 1) {
        poundText = ' pound';
      }

      if (messageName === 'success') {
        vm.weightChangeMessage = 'You\'re doing great! You' + typeOfChange + weightChange + poundText + ' so far! Keep it up!';
      } else if (messageName === 'noSuccess') {
        vm.weightChangeMessage = 'You' + typeOfChange + weightChange + poundText + '. Don\'t worry...get focused, you can do it!';
      } else {
        vm.weightChangeMessage = 'You haven\'t' + typeOfChange + 'any weight yet. Stay focused, you can do it!';
      }
    }

    function updateJournal(property) {
      var user = UserService.getCurrentUser();
      console.log(property);
      changeMode(property);

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
            calcWeightChange(data.journal);
          }
        });
    }

    checkUserNamePluralGrammar();

    // b/c weight change message does not initially load always, load it within a promise
    JournalService.journalResource.get({ journal_id: user.journal }).$promise.then(function(data) {
      console.log(data);
      calcWeightChange(data);
    });
    // calcWeightChange(journal);
  }
})();