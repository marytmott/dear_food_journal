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
      var loseWeight = ' lost ';
      var gainWeight = ' gained ';
      var loseWeightGoal = journalInfo.weightChangeType === 'lose';
      var gainWeightGoal = journalInfo.weightChangeType === 'gain';

      console.log('tracking weight', journalInfo);
      if (trackingWeight) {
        weightChange = Math.floor(journalInfo.startWeight - journalInfo.currentWeight);
        console.log(weightChange);


        // if lose weight goal && user lost weight OR gain weight goal and user gained weight
        if ((weightChange > 0 && loseWeightGoal) || (weightChange < 0 && gainWeightGoal)) {
          getWeightChangeMessage(loseWeight, weightChange, 'success');
        // if lose weight goal && user gained weight OR gain weight goal and user is losing weight
        } else if ((weightChange < 0 && loseWeightGoal) || (weightChange > 0 && gainWeightGoal)) {
          getWeightChangeMessage(gainWeight, weightChange, 'noSuccess');
        // if no change
        } else {
          if (loseWeightGoal) {
            getWeightChangeMessage(loseWeight);
          } else if (gainWeightGoal) {
            getWeightChangeMessage(gainWeight);
          }
        }
      }
    }

    function getWeightChangeMessage(typeOfChange, weightChange, messageName) {
      weightChange = Math.abs(weightChange);
      if (messageName === 'success') {
        vm.weightChangeMessage = 'You\'re doing great! You' + typeOfChange + weightChange + ' pounds so far! Keep it up!';
      } else if (messageName === 'noSuccess') {
        vm.weightChangeMessage = 'You\'ve' + typeOfChange + weightChange + ' pounds. Don\'t worry...get focused, you can do it!';
      } else {
        vm.weightChangeMessage = 'You haven\'t' + typeOfChange + 'any weight yet. Stay focused, you can do it!';
      }
    }

    function updateJournal(property) {
      var user = UserService.getCurrentUser();
      console.log(property);
      changeMode(property);

      // if (property === 'weightChange') {
      //   // update journal object w/ total weight change, then save
      //   getChangedWeight();
      // }
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
    // calcWeightChange(journal, true);
  }
})();