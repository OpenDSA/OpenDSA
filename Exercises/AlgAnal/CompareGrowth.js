(function() {
  "use strict";
  var answer = 0,
    compareGrowth = {
      checkAnswer: function(answer, choice) {
        var theInt = parseInt(answer);
        if (answer == "") {
          return "";
        } // User gave no answer
        switch (choice) {
          case 0: // n!
            return ((theInt === 2) || (theInt == 3));
            break;
          case 1: // 2^n
            return ((theInt === 4) || (theInt == 5));
            break;
          case 2: // 2n^2
            return answer == "none";
            break;
          case 3: // 5 n \log n
            return theInt === 1;
            break;
          case 4: // 20n
            return answer == "none";
            break;
          case 5: // 10n
            return theInt >= 6;
            break;
          default: // Should not happen
            return false;
        }
      }
    };
  window.compareGrowth = window.compareGrowth || compareGrowth;
}())
