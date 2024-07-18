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
      var gt = av.ds.tree({center: true, visible: true, nodegap: 35});
      var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      gt.root(letters.charAt(0));
      // Generate a random tree with 4 to 7 nodes
      arrayOfNodes[0] = gt.root();
      sizeOfArray = 1;
      var numNodes = Math.floor(Math.random() * (7 - 4)) + 4;
      var i = 1;
      while (i <= numNodes) {
        if (randomNode(gt, letters.charAt(i)) === true) i++;
      }
      gt.layout();
      return gt;
    },

    preOrderTraversal: function(gt) {
      var retString = "";

      function preorderNode(node) {
        retString += node.value();
        //if node is a leaf
        if (node.child(0)) {
          var i = 0;
          var temp = node.child(i);
          while (temp !== undefined) {
            preorderNode(temp);
            temp = node.child(++i);
          }
          retString += ")";
        } else {
          retString += ")";
        }
      }

      preorderNode(gt.root());
      return retString;
    }
  };

  function randomNode(gt, value) {
    // Add a child to a random node in gt with value value

    // Pick a random node to be the parent
    var randomIndex = Math.floor(Math.random() * (sizeOfArray));

    // We don't want to let the tree get too deep
    var i = 0;
    var parNode = arrayOfNodes[randomIndex].parent();
    while (parNode !== null) {
      i++;
      parNode = parNode.parent();
    }
    if (i >= 3) { // Bail and we'll try again later
      return false;
    }
    
    var newNode = gt.newNode(value);
    arrayOfNodes[randomIndex].addChild(newNode);
    arrayOfNodes[sizeOfArray] = newNode;
    sizeOfArray++;
    return true;
  }

  window.sequentialTreeGenTreePRO = window.sequentialTreeGenTreePRO || sequentialTreeGenTreePRO;
}());
