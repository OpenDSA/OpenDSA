/*global window */
(function() {
  "use strict";
  var av;

  var sequentialTreeBitVectorPRO = {
    initJSAV: function() {
      av = new JSAV("SequentialTreeBitVectorPRO");
      av.displayInit();
      av.recorded();
    },

    makeTree: function() {
      var bt = av.ds.binarytree({center: true, visible: true, nodegap: 35});
      bt.root(" ");
      //generate random tree with between 4-7nodes
      var numNodes = Math.floor(Math.random() * (7 - 4)) + 4;
      var i = 1;
      while (i <= numNodes) {
        //var temp = Math.floor(Math.random() * 100) % 2;
        randomNode(bt, bt.root(), " ");
        i++;
      }
      bt.layout();
      return bt;
    },

    preOrderTraversal: function(bt) {
      var retString = "";

      function preorderNode(node) {
        //retString+=node.value();
        if (node.left()) {
          retString += "1";
          preorderNode(node.left());
        } else if (node.right()) {
          retString += "1";
          retString += "/";
        } else {
          retString += "0";
        }
        if (node.right()) {
          preorderNode(node.right());
        } else if (node.left()) {
          retString += "/";
        }
      }

      preorderNode(bt.root());
      return retString;
    }
  };

  function randomNode(bt, root, value) {
    if (root === null) return bt.newNode(value);
    if ((Math.floor(Math.random() * 100) % 2) === 1) {
      root.left(randomNode(bt, root.left(), value));
    } else {
      root.right(randomNode(bt, root.right(), value));
    }
  }

  window.sequentialTreeBitVectorPRO = window.sequentialTreeBitVectorPRO || sequentialTreeBitVectorPRO;
}());
