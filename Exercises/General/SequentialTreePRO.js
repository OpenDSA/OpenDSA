/*global window */
(function() {
  "use strict";
  var av;

  var sequentialTreePRO = {
    initJSAV: function() {
      av = new JSAV("SequentialTreePRO");
      av.displayInit();
      av.recorded();
    },

    makeTree: function() {
      var bt = av.ds.binarytree({center: true, visible: true, nodegap: 35});
      var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      bt.root(letters.charAt(0));
      // Generate a random tree with 4 to 7 nodes
      var numNodes = Math.floor(Math.random() * (7 - 4)) + 4;
      var i = 1;
      while (i <= numNodes) {
        randomNode(bt, bt.root(), letters.charAt(i));
        i++;
      }
      bt.layout();
      return bt;
    },

    preOrderTraversal: function(bt) {
      var retString = "";
      function preorderNode(node) {
        retString += node.value();
        if (node.left()) {
          preorderNode(node.left());
        } else {
          retString += "/";
        }
        if (node.right()) {
          preorderNode(node.right());
        } else {
          retString += "/";
        }
      }

      preorderNode(bt.root());
      return retString;
    }
  };

  function randomNode(bt, root, value) {
    if (root === undefined) return bt.newNode(value);
    if ((Math.floor(Math.random() * 100) % 2) === 1) {
      root.left(randomNode(bt, root.left(), value));
    } else {
      root.right(randomNode(bt, root.right(), value));
    }
  }

  window.sequentialTreePRO = window.sequentialTreePRO || sequentialTreePRO;
}());
