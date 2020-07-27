/*global window */
(function() {
  "use strict";
  var completeFIB = {
    genAnswer: function(node, relation) {
      var num;
      var maxnode = 11;
      switch (relation) {
      case 0: // parent
        if (node === 0) {
          return "NONE";
        }
        return Math.floor((node - 1) / 2);
      case 1: // left child
        num = (node * 2) + 1;
        if (num > maxnode) {
          return "NONE";
        }
        return num;
      case 2: // right child
        num = (node * 2) + 2;
        if (num > maxnode) {
          return "NONE";
        }
        return num;
      case 3: // left sibling
        if (((node % 2) !== 0) || (node === 0)) {
          return "NONE";
        }
        return node - 1;
      case 4: // right sibling
        num = node + 1;
        if (((node % 2) === 0) || (num > maxnode)) {
          return "NONE";
        }
        return num;
      default: // Should never happen
        return "";
      }
    }
  };

  window.completeFIB = window.completeFIB || completeFIB;
}());
