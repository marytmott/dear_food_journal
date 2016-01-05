(function() {
  'use strict';

  angular
    .module('dearFoodJ.journals')
    .factory('JournalService', JournalService);

  JournalService.$inject = ['$resource'];

  function JournalService($resource) {
    function getWeightChangeMessage(typeOfChange, weightChange, messageName) {
      weightChange = Math.abs(weightChange);
      if (messageName === 'success') {
        return 'You\'re doing great! You' + typeOfChange + weightChange + ' pounds so far! Keep it up!';
      } else if (messageName === 'noSuccess') {
        return 'You\'ve' + typeOfChange + weightChange + ' pounds. Don\'t worry, get focused, you can do it!';
      } else {
        return 'You haven\'t' + typeOfChange + 'any weight yet. Stay focused, you can do it!';
      }
    }

    return {
      journalResource: $resource('/api/journals/:journal_id', { journal_id: '@journal_id' },
        { update: { method: 'PUT'} }
      ),
      calcWeightChange: function(journalInfo) {
        var trackingWeight = journalInfo.currentWeight && journalInfo.startWeight;
        var weightChange;
        var typeOfChange;
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
            return getWeightChangeMessage(loseWeight, weightChange, 'success');
          // if lose weight goal && user gained weight OR gain weight goal and user is losing weight
          } else if ((weightChange < 0 && loseWeightGoal) || (weightChangeType > 0 && gainWeightGoal)) {
            return getWeightChangeMessage(gainWeight, weightChange, 'noSuccess');
          // if no change
          } else {
            return getWeightChangeMessage();
          }


          // if (weightChange )

          // if gained weight && user is losing weight


          // if achieving goals?

        }
      }
    };
  }
})();