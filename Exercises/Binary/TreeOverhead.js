/*global window */
(function() {
  "use strict";
  var treeOverhead = {
    genAnswer: function(overhead, sum) {
      while ((sum % 2 === 0) && (overhead % 2 === 0)) {
        overhead = overhead / 2;
        sum = sum / 2;
      }
console.log("Overhead: " + overhead.toString() + "/" + sum.toString());
      return overhead.toString() + "/" + sum.toString();
    }
  };

  window.treeOverhead = window.treeOverhead || treeOverhead;
}());
