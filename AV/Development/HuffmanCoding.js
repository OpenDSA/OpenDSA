"use strict";
/*global alert: true, ODSA */
(function ($) {
  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  var jsav = new JSAV($('.avcontainer'), {settings: settings});

  // numArray: used for logic control
  var numArray = new Array();

  // chaArray: used for storing characters
  var chaArray = new Array();

  // hfArray: used for holding the root of several binary trees
  var hfArray = new Array();

  // valArray: used for finding the Huffman Codes, which store the value with both the character and its frequency
  var valArray = new Array();

  // codeArray: used for storing the Huffman codes
  var codeArray = new Array();

  // Process About button: Pop up a message with an Alert
  function about() {
    var mystring = "HuffmanCoding Tree Visualization\nWritten by Maoyuan Sun\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/eBook\nWritten during June, 2012\nLast update: June 19, 2012\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // sorting the elements of an array with Insertation Sort
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

  // traverse to reset background color of the entire tree
  var traverse_color = function(node, col) {
    var val = node.value();

    // the node is an empty node
    if (!val || val === "jsavnull") {
      return;
    }
    else {
      // if the node is an internal node, then display a circle
      if (node.left()) {
        node.css("background-color", col);
        traverse_color(node.left(),col);
      }
      if (node.right()) {
        node.css("background-color", col);
        traverse_color(node.right(),col);
      }
      // if the node is a leaf node, then display a rectangle
      else {
        node.css({"border-radius": 1, "background-color": "orange", "line-height": "22px"});
      }
    }
  }

  // adding "0" or "1" to the label of edges in Huffman Coding tree without animation
  var traverse_code = function(node) {
    if (node.left()) {
      node.left().edgeToParent().label(0);
      traverse_code(node.left());
    }
    if (node.right()) {
      node.right().edgeToParent().label(1);
      traverse_code(node.right());
    }
    else
    return;
  }

  // adding "0" or "1" to the label of edges in Huffman Coding tree with animation
  var traverse_code_animation = function(node) {
    if (node.left()) {
      jsav.umsg("\"0\" is set to the edge connecting the left child of the node \"" + node.value() + "\".");
      node.left().edgeToParent().label(0);
      jsav.step();
      traverse_code_animation(node.left());
    }
    if (node.right()) {
      jsav.umsg("\"1\" is set to the edge connecting the right child of the node \"" + node.value() + "\".");
      node.right().edgeToParent().label(1);
      jsav.step();
      traverse_code_animation(node.right());
    }
    else
    return;
  }

  // find a leaf node in Huffman Tree with a specific value
  var findNode = function(node, anValue) {
    var val = node.value();
    if (!val || val === "jsavnull")
    return
    else {
      if (node.left()) {
        if (node.left().value() == anValue)
        anLeaf = node.left();
        else
        findNode(node.left(), anValue);
      }
      if (node.right()) {
        if (node.right().value() == anValue)
        anLeaf = node.right();
        else
        findNode(node.right(), anValue);
      }
    }
  }

  // find the Huffman Code for a specific leaf node without animation
  var leafCode = function(aLeafNode) {
    var leafVal = aLeafNode.value();
    if (!leafVal || leafVal === "jsavnull")
    return;
    else {
      if (aLeafNode.parent()) {
        code += aLeafNode.edgeToParent().label();
        leafCode(aLeafNode.parent());
      }
      else {
        var tmpCode = "";
        for (var i = code.length - 1; i >= 0; i--) {
          tmpCode += code.substr(i, 1);
        }
        code = tmpCode;
        return;
      }
    }
  }

  // find the Huffman Code for a specific leaf node with animation
  var leafCode_animation = function(aLeafNode) {
    var leafVal = aLeafNode.value();
    if (!leafVal || leafVal === "jsavnull")
    return;
    else {
      if (aLeafNode.parent()) {
        code += aLeafNode.edgeToParent().label();
        aLeafNode.parent().highlight();
        leafCode_animation(aLeafNode.parent());
      }
      else {
        var tmpCode = "";
        for (var i = code.length - 1; i >= 0; i--) {
          tmpCode += code.substr(i, 1);
        }
        code = tmpCode;
        return;
      }
    }
  }

  // Clear the highlight node from a specific leaf node to the root
  var path_clear = function(aLeafNode) {
    var leafVal = aLeafNode.value();
    if (!leafVal || leafVal === "jsavnull")
    return;
    else {
      if (aLeafNode.parent()) {
        aLeafNode.parent().css("background-color", "white");
        path_clear(aLeafNode.parent());
      }
      else
      return;
    }
  }

  // find the Huffman codes for all leaf nodes without animation
  var hfCode = function(valArr, codeArr, aTree) {
    for (var i = 0; i < valArr.length; i++) {
      findNode(aTree.root(), valArr[i]);
      leafCode(anLeaf);
      codeArr[i] = code;
      code = "";
    }
  }

  // find the Huffman codes for all leaf nodes with animation
  var hfCode_animation = function(valArr, codeArr, aTree) {
    for (var i = 0; i < valArr.length; i++) {
      findNode(aTree.root(), valArr[i]);
      var tmpArray = new Array();
      tmpArray = valArr[i].split("<br>");
      jsav.umsg("Next we will show the path from the leaf node \"" + tmpArray[1] + "\" to the root \"" + aTree.root().value() + "\", and get the Huffman code of \"" + tmpArray[1]+ "\".");
      aTree.root().highlight();
      anLeaf.highlight();
      jsav.step();
      leafCode_animation(anLeaf);
      codeArr[i] = code;
      code = "";
      jsav.umsg("Huffman code for character \"" + tmpArray[1] + "\" is: \"" + codeArr[i] + "\", which is the value along the path from the root \"" + aTree.root().value() + "\" to \"" + tmpArray[1] + "\"");
      jsav.step();
      path_clear(anLeaf);
      anLeaf.css("background-color", "orange");
    }
  }

  // Layout all the trees
  var layAll = function(trees) {
    //trees.css()
    var leftSoFar = 30;
    for (var i = 0; i < trees.length; i++) {
      trees[i].css({"left": leftSoFar, "top":"0px"});
      traverse_color(trees[i].root(), "white");
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

  // Constructing the huffmanCodingTree
  var huffTree = function (anArray, hfArray) {
    while (anArray.length > 1) {
      sortArray(anArray, hfArray);
      var key = anArray[0] + anArray[1];

      // Extend the numArray
      var newIndex = anArray.length;
      anArray[1] = key;

      // construct a new tree
      hfArray.length += 1;
      hfArray[newIndex] = jsav.ds.binarytree({visible: false, center: false});
      hfArray[newIndex].root(key);

      // Construct the left subtree by copying the 1st tree
      var lsub = hfArray[newIndex].newNode();
      hfArray[newIndex].root().left(lsub);
      traverse_copy(lsub, hfArray[newIndex], hfArray[0].root());

      // Construct the right subtree by copying the 2nd tree
      var rsub = hfArray[newIndex].newNode();
      hfArray[newIndex].root().right(rsub);
      traverse_copy(rsub, hfArray[newIndex], hfArray[1].root());

      // Restruct the tree array
      shuffle(anArray, hfArray);
    }
  }

  // Constructing the huffmanCodingTree with animation
  var huffTree_animation = function (anArray, hfArray) {
    while (anArray.length > 1) {
      jsav.umsg("Sorting the data by frequency results in the following:");
      sortArray(anArray, hfArray);
      layAll(hfArray);
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

  // Create a table showing the letters and their huffman codes
  var createTable = function(valArr, codeArr) {
    var theMatrix = new jsav.ds.matrix({rows: 10, columns: 4, style: "plain"});
    // Why doesn't this line with the array work?
    // theMatrix.value(0, ["<b>Char</b>", "<b>Freq</b>", "<b>Code</b>", "<b>Bits</b>"]);
    theMatrix.value(0, 0, "<b>Char</b>");
    theMatrix.value(0, 1, "<b>Freq</b>");
    theMatrix.value(0, 2, "<b>Code</b>");
    theMatrix.value(0, 3, "<b>Bits</b>");
    for (var i = 1; i <= valArr.length; i++) {
      theMatrix.value(i, 0, valArr[i - 1].split("<br>")[1]);
      theMatrix.value(i, 1, valArr[i - 1].split("<br>")[0]);
      theMatrix.value(i, 2, codeArr[i - 1]);
      theMatrix.value(i, 3, codeArr[i - 1].length);
    }
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);

  $(".jsavtreenode").live("hover", function() {
    //console.log($(this).text(), $(this).offset().left, $(this).offset().top);
  });
  $("path").live("hover", function() {
    //console.log($(this).attr("d"));
  });

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
    valArray[j] = value;
    hfArray[j] = jsav.ds.binarytree({center: false});
    hfArray[j].root(value);
    numArray[j] = userArray[i];
    chaArray[j] = userArray[i+1];
  }

  jsav.umsg("The initial data is as follows (the first line indicates frequency and the second line is the character): ");
  layAll(hfArray);
  jsav.step();

  // Constructing Huffman Coding Tree with animation.
  huffTree_animation(numArray, hfArray);
  jsav.umsg("The Huffman Coding Tree is as follows: ");
  layAll(hfArray);
  jsav.step();

  jsav.umsg("The codes for each node are as follows: ");
  traverse_code_animation(hfArray[0].root());

  var anLeaf;
  var code = "";  // used for record Huffman code
  hfCode_animation(valArray, codeArray, hfArray[0]);
  jsav.umsg("Huffman codes for all characters are as follows:");
  hfArray[0].hide();

  // Display a tabel which contains information of each character.
  createTable(valArray, codeArray);

  jsav.recorded(); // done recording changes, will rewind
}(jQuery));
