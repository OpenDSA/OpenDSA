/*global window */
(function() {
  "use strict";
  var compareGrowth = {
    checkAnswer: function(answer, choice) {
      var theInt = parseInt(answer, 10);
      if (answer === "") { return ""; } // User gave no answer
      switch (choice) {
      case 0: // n!
        return ((theInt === 2) || (theInt === 3));
      case 1: // 2^n
        return ((theInt === 4) || (theInt === 5));
      case 2: // 2n^2
        return answer === "none";
      case 3: // 5 n \log n
        return theInt === 1;
      case 4: // 20n
        return answer === "none";
      case 5: // 10n
        return theInt >= 6;
      default: // Should not happen
        return false;
      }
    }
  };

  window.compareGrowth = window.compareGrowth || compareGrowth;
}());
