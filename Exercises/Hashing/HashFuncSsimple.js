/*global window */
(function() {
  "use strict";
  var hashFuncSsimple = {
    // Generate a key
    genKey: function(len) {
      var key = "";
      while (key.length < len) {
        key += Khan.randRange(0, 35).toString(36);
      }
      return key;
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
