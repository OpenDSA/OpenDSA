/*global window */
(function() {
  "use strict";
  var av,     // The JSAV object
      arr,    // The JSAV array
      answer; // The correct answer

  var findInversionsPRO = {
    initJSAV: function(a) {
      var i, j;
      av = new JSAV("FindInversionsPRO", {animationMode: "none"});
      arr = av.ds.array(JSAV.utils.rand.numKeys(0, 999, a),
                        {indexed: true, center: false});
      av.displayInit();
      av.recorded();

      // Compute the answer
      answer = 0;
      for (i = 1; i < arr.size(); i++) {
        for (j = 0; j < i; j++) {
          if (arr.value(i) < arr.value(j)) {
            answer++;
          }
        }
      }
    },

    // Return the computed Answer
    genAnswer: function() {
      return answer;
    }

  };

  window.findInversionsPRO = window.findInversionsPRO || findInversionsPRO;
}());
