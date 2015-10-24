/*global window */
(function() {
  "use strict";
  var av,
      sizeOfArray = 0,
      arrayOfNodes = [];

  var sequentialTreeGenTreePRO = {
    initJSAV: function() {
      av = new JSAV("SequentialTreeGenTreePRO");
      av.displayInit();
      av.recorded();
    },

    makeTree: function() {
      var bt = av.ds.tree({center: true, visible: true, nodegap: 35});
      var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      bt.root(letters.charAt(0));
      // Generate a random tree with 4 to 7 nodes
      arrayOfNodes[0] = bt.root();
      sizeOfArray = 1;
      var numNodes = Math.floor(Math.random() * (7 - 4)) + 4;
      var i = 1;
      while (i <= numNodes) {
        if (randomNode(bt, letters.charAt(i)) === true) i++;
      }
      bt.layout();
      return bt;
    },

    preOrderTraversal: function(bt) {
      var retString = "";

      function preorderNode(node) {
        retString += node.value();
        //if node is a leaf
        if (node.child(0)) {
          var i = 0;
          var temp = node.child(i);
          while (temp !== null) {
            preorderNode(temp);
            temp = node.child(++i);
          }
          retString += ")";
        } else {
          retString += ")";
        }
      }

      preorderNode(bt.root());
      return retString;
    }
  };

  function randomNode(bt, value) {
    // Add a child to a random node with value
    var newNode = bt.newNode(value);
    var randomIndex = Math.floor(Math.random() * (sizeOfArray));

    var i = 0;
    var parNode = arrayOfNodes[randomIndex].parent();
    while (parNode !== null) {
      i++;
      parNode = parNode.parent();
    }
    if (i >= 3) return false;
    arrayOfNodes[randomIndex].addChild(newNode);
    arrayOfNodes[sizeOfArray] = newNode;
    sizeOfArray++;
    return true;
  }

  window.sequentialTreeGenTreePRO = window.sequentialTreeGenTreePRO || sequentialTreeGenTreePRO;
}());
