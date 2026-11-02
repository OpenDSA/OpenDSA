/*global window */
(function() {
  "use strict";
  var hashFuncSfold = {
    // Generate a key
    genKey: function(len) {
      var key = "";
      while (key.length < len) {
        key += Khan.randRange(0, 35).toString(36);
      }
      return key;
    },

    // Return the computed Answer
    genAnswer: function(s, M) {
      var intLength = Math.floor(s.length / 4);
      var sum = 0;
      var j, k;
      var curr = 0;
      var mult;
      for (j = 0; j < intLength; j++) {
        mult = 1;
        for (k = 0; k < 4; k++) {
          sum += s.charCodeAt(curr) * mult;
          curr++;
          mult *= 256;
        }
      }

      mult = 1;
      while (curr < s.length) {
        sum += s.charCodeAt(curr) * mult;
        curr++;
        mult *= 256;
      }
      return sum % M;
    }

  };

  window.hashFuncSfold = window.hashFuncSfold || hashFuncSfold;
}());
