/*global window */
(function() {
  "use strict";
  var hashFuncSsimple = {
    // Generate a key
    genKey: function(len) {
      return Math.random().toString(36).substring(2, len + 2);
    },

    // Return the computed Answer
    genAnswer: function(k, M) {
      var i;
      var output = 0;
      for (i = 0; i < k.length; i++) {
        output += k.charCodeAt(i);
      }
      return output % M;
    }

  };

  window.hashFuncSsimple = window.hashFuncSsimple || hashFuncSsimple;
}());
