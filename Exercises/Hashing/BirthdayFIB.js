/*global window */
// Written by Yuhui Lyu and Cliff Shaffer
(function() {
  "use strict";
  var BirthdayFIB = {
    // Calculate the minimum number of records needed to exceed the given percentage
    calcAnswer: function(tableSize, percentage) {
      var fact;
      var prob;
      for (var i = 1; i < tableSize; i++) {
        fact = 1.0;
        for (var j = tableSize - i + 1; j < tableSize; j++) {
          fact = fact * j / tableSize;
        }
        prob = 1.0 - fact;
        if (prob * 100 >= percentage) {
          return i;
        }
      }
      return -1; // Should not happen
    }
  };
  window.BirthdayFIB = window.BirthdayFIB || BirthdayFIB;
}());
