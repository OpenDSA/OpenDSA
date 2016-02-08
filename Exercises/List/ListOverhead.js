/*global window */
(function() {
  "use strict";
  var listOverhead = {
    genAnswer: function(p, d) {
      var sum = p + d;
      while ((sum % 2 === 0) && (d % 2 === 0)) {
        d = d / 2;
        sum = sum / 2;
      }
      return d.toString() + "/" + sum.toString();
    }
  };

  window.listOverhead = window.listOverhead || listOverhead;
}());