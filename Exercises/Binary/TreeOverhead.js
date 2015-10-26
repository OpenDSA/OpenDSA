/*global window */
(function() {
  "use strict";
  var treeOverhead = {
    genAnswer: function(overhead, sum) {
      var o = overhead,
          s = sum;
      while ((s % 2 === 0) && (o % 2 === 0)) {
        o = o / 2;
        s = s / 2;
      }
      return o.toString() + "/" + s.toString();
    }
  };

  window.treeOverhead = window.treeOverhead || treeOverhead;
}());
