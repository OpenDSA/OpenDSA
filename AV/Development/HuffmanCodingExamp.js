"use strict";
(function($) {
  // sorting the elements of an array with Insertion Sort
  var sortArray = function (anArray, hfArray) {
    for (var i = 1; i < anArray.length; i++) {
      var key = anArray[i];
      var tmpTree = hfArray[i];
      var j = i - 1;
      while(j >= 0 && key < anArray[j]) {
        anArray[j + 1] = anArray[j];
        hfArray[j + 1] = hfArray[j];
        j--;
      }
      anArray[j + 1] = key;
      hfArray[j + 1] = tmpTree;
    }
  }

  // Shuffle the array by moving left
  var shuffle = function (anArray, hfArray) {
    for (var i = 0; i < anArray.length - 2; i++) {
      anArray[i] = anArray[i + 2];
      hfArray[i] = hfArray[i + 2];
    }
    anArray.length -= 2;
    hfArray.length -= 2;
  }

  // shift the merged tree to the 1st place
  var shift = function (anArray, hfArray) {
    var key = anArray[anArray.length - 1];
    var tmp = hfArray[hfArray.length -1];
    for (var i = anArray.length - 1; i > 0; i--) {
      anArray[i] = anArray[i - 1];
      hfArray[i] = hfArray[i - 1];
    }
    anArray[0] = key;
    hfArray[0] = tmp;
  }

  // traverse to reset background color of the entire tree
  var traverse_color = function(node) {
    var val = node.value();

    // the node is an empty node
    if (!val || val === "jsavnull") {
      return;
    } else {
      // if the node is an internal node, then display an circle
      if (node.left()) {
        traverse_color(node.left());
      }
      if (node.right()) {
        traverse_color(node.right());
      }
      // if the node is a leaf node, then display an rectangle
      else {
        node.addClass('huffmanleaf');
      }
    }
  }

  // traverse one tree and copy all its nodes to another tree
  var traverse_copy = function(startNode, treeOne, treeTwoRoot) {
    var val = treeTwoRoot.value();

    // the node is an empty node
    if (!val || val === "jsavnull") {
      return;
    }
    else {
      startNode.value(treeTwoRoot.value());
      // Traverse the left subtree
      if (treeTwoRoot.left()) {
        var lchild = treeOne.newNode();
        lchild.value(treeTwoRoot.left().value());
        startNode.left(lchild);
        traverse_copy(lchild, treeOne, treeTwoRoot.left());
      }
      // Traverse the right subtree
      if (treeTwoRoot.right()) {
        var rchild = treeOne.newNode();
        rchild.value(treeTwoRoot.right().value());
        startNode.right(rchild);
        traverse_copy(rchild, treeOne, treeTwoRoot.right());
      }
    }
  }

  // Layout all the trees
  var layAll = function(trees) {
    var leftSoFar = 30;
    for (var i = 0; i < trees.length; i++) {
      trees[i].css({"left": leftSoFar, "top":"-40px"});
      traverse_color(trees[i].root());
      trees[i].layout();
      leftSoFar += trees[i].element.width() + 50;
    }
  }

  // Hide all the trees
  var hideAll = function(trees) {
    for (var i = 0; i < trees.length; i++) {
      trees[i].hide();
    }
  }

  // Show all the trees
  var showAll = function(trees) {
    for (var i = 0; i < trees.length; i++) {
      trees[i].show();
    }
  }

  // Constructing the huffmanCodingTree with animation
  var huffTree_animation = function (anArray, hfArray) {
    while (anArray.length >= 4) {
      jsav.umsg("Sorting the data by frequency results in the following:");
      sortArray(anArray, hfArray);
      layAll(hfArray);

      if (anArray.length == 4) {
        break;
      }
      jsav.step();

      jsav.umsg("Choose the two smallest numbers: " + anArray[0] + " and " + anArray[1]);
      // Hightlight two elements that will be chosen
      hfArray[0].root().highlight();
      hfArray[1].root().highlight();
      jsav.step();

      hideAll(hfArray);

      var key = anArray[0] + anArray[1];
      // Extend the numArray
      var newIndex = anArray.length;
      anArray.length += 1;
      anArray[newIndex] = key;

      // construct a new tree
      hfArray.length += 1;
      hfArray[newIndex] = jsav.ds.binarytree({visible: false, center: false, nodegap: 22});
      hfArray[newIndex].root(key);

      // Construct the left subtree by copying the 1st tree
      var lsub = hfArray[newIndex].newNode();
      hfArray[newIndex].root().left(lsub);
      traverse_copy(lsub, hfArray[newIndex], hfArray[0].root());

      // Construct the right subtree by copying the 2nd tree
      var rsub = hfArray[newIndex].newNode();
      hfArray[newIndex].root().right(rsub);
      traverse_copy(rsub, hfArray[newIndex], hfArray[1].root());

      hfArray[newIndex].hide();
      jsav.umsg("Merge them together with the sum of them \"" + key + "\", and update the data as follows: ");
      // Restruct the tree array
      shuffle(anArray, hfArray);
      // Shift the merged tree to the 1st place
      shift(anArray, hfArray);

      showAll(hfArray);
      layAll(hfArray);
      jsav.step();
    }
  }


  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  var jsav = new JSAV("huffmanCON1", {settings: settings});

  // numArray: used for logic control
  var numArray = new Array();

  // chaArray: used for storing characters
  var chaArray = new Array();

  // hfArray: used for holding the root of several binary trees
  var hfArray = new Array();

  // userArry: an array to store the number and character
  var userArray = new Array();
  userArray[0] = 32;
  userArray[1] = "C";
  userArray[2] = 42;
  userArray[3] = "D";
  userArray[4] = 120;
  userArray[5] = "E";
  userArray[6] = 7;
  userArray[7] = "K"
  userArray[8] = 42;
  userArray[9] = "L"
  userArray[10] = 24;
  userArray[11] = "M";
  userArray[12] = 37;
  userArray[13] = "U";
  userArray[14] = 2;
  userArray[15] = "Z";

  var value;

  // initialization for all the arrays
  for (var i = 0, j = 0; i < userArray.length - 1; i += 2, j++) {
    value = userArray[i] + "<br>" + userArray[i + 1];
    hfArray[j] = jsav.ds.binarytree({center: false});
    hfArray[j].root(value);
    numArray[j] = userArray[i];
    chaArray[j] = userArray[i+1];
  }

  // Initialize the display
  jsav.umsg("The following letters will be placed in a Huffman tree:");
  layAll(hfArray);
  jsav.displayInit();

  // Constructing Huffman Coding Tree with animation.
  huffTree_animation(numArray, hfArray);
  jsav.recorded(); // done recording changes, will rewind
})(jQuery);
