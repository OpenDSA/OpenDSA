"use strict";
// Huffman coding tree shared functions
// Written by Maoyuan Sun, Rich Episcopo, and Cliff Shaffer
var code = "";  // Used to store a Huffman code

$(document).ready(function () {
  // sorting the elements of an array with Insertion Sort
  var sortArray = function (trees) {
    for (var i = 1; i < trees.length; i++) {
      var key = trees[i].root().freq;
      var tmpTree = trees[i];
      var j = i - 1;
      while (j >= 0 && key < trees[j].root().freq) {
        trees[j + 1] = trees[j];
        j--;
      }
      trees[j + 1] = tmpTree;
    }
  };

  // Shuffle the array by moving left
  var shuffle = function (trees) {
    for (var i = 0; i < (trees.length - 2); i++) {
      trees[i] = trees[i + 2];
    }
    trees.length -= 2;
  };

  // traverse to reset background color of the entire tree
  var traverse_color = function (node) {
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
        node.addClass("huffmanleaf");
      }
    }
  };

  // traverse one tree and copy all its nodes to another tree
  var traverse_copy = function (startNode, treeOne, treeTwoRoot) {
    var val = treeTwoRoot.value();
    var freq = treeTwoRoot.freq;

    // the node is an empty node
    if (!val || val === "jsavnull") {
      return;
    }
    else {
      startNode.value(treeTwoRoot.value());
      startNode.freq = freq;
      // Traverse the left subtree
      if (treeTwoRoot.left()) {
        var lchild = treeOne.newNode();
        lchild.value(treeTwoRoot.left().value());
        lchild.freq = treeTwoRoot.left().freq;
        startNode.left(lchild);
        traverse_copy(lchild, treeOne, treeTwoRoot.left());
      }
      // Traverse the right subtree
      if (treeTwoRoot.right()) {
        var rchild = treeOne.newNode();
        rchild.value(treeTwoRoot.right().value());
        rchild.freq = treeTwoRoot.right().freq;
        startNode.right(rchild);
        traverse_copy(rchild, treeOne, treeTwoRoot.right());
      }
    }
  };

  // Layout all the trees
  var layAll = function (trees) {
    var leftSoFar = 30;
    for (var i = 0; i < trees.length; i++) {
      trees[i].css({"left": leftSoFar});
      traverse_color(trees[i].root());
      trees[i].layout();
      leftSoFar += trees[i].element.width() + 50;
    }
  };

  // Hide all the trees
  var hideAll = function (trees) {
    for (var i = 0; i < trees.length; i++) {
      trees[i].hide();
    }
  };

  // Show all the trees
  var showAll = function (trees) {
    for (var i = 0; i < trees.length; i++) {
      trees[i].show();
    }
  };

  // Set or clear the highlights from a specific leaf node to the root
  var highlight_path = function (aLeafNode, highlight) {
    if (highlight) {
      aLeafNode.highlight();
    } else {
      aLeafNode.unhighlight();
    }
    if (aLeafNode.parent()) {
      highlight_path(aLeafNode.parent(), highlight);
    }
  };

  // Construct the Huffman coding tree without visualization
  // This is rather inefficent and should be re-written
  var huffBuild = function (av, freqs, trees) {
    sortArray(trees);
    hideAll(trees);
    var root;
    while (trees.length > 1) {
      var key = trees[0].root().freq + trees[1].root().freq;

      // construct a new tree
      var newIndex = trees.length;
      trees.length += 1;
      trees[newIndex] = av.ds.binarytree({visible: false, center: false, nodegap: 22});
      root = trees[newIndex].root();
      root.value(key);
      root.freq = key;

      // Construct the left subtree by copying the 1st tree
      var lsub = trees[newIndex].newNode();
      trees[newIndex].root().left(lsub);
      traverse_copy(lsub, trees[newIndex], trees[0].root());

      // Construct the right subtree by copying the 2nd tree
      var rsub = trees[newIndex].newNode();
      trees[newIndex].root().right(rsub);
      traverse_copy(rsub, trees[newIndex], trees[1].root());

      trees[newIndex].hide();

      // Reorder the tree array
      shuffle(trees);
      sortArray(trees);
    }
  };

  // Construct the Huffman coding tree with visualization
  // This is rather inefficent and should be re-written
  var huffBuild_animated = function (av, interpret, freqs, trees) {
    sortArray(trees);
    av.umsg(interpret("av_c25"));
    layAll(trees);
    av.step();
    var root;
    while (trees.length > 1) {
      av.umsg(interpret("av_c26") + trees[0].root().freq + " and " + trees[1].root().freq);
      // Hightlight two elements that will be chosen
      trees[0].root().highlight();
      trees[1].root().highlight();
      av.step();

      hideAll(trees);

      var key = trees[0].root().freq + trees[1].root().freq;

      // construct a new tree
      var newIndex = trees.length;
      trees.length += 1;
      trees[newIndex] = av.ds.binarytree({visible: false, center: false, nodegap: 22});
      root = trees[newIndex].root();
      root.value(key);
      root.freq = key;

      // Construct the left subtree by copying the 1st tree
      var lsub = trees[newIndex].newNode();
      trees[newIndex].root().left(lsub);
      traverse_copy(lsub, trees[newIndex], trees[0].root());

      // Construct the right subtree by copying the 2nd tree
      var rsub = trees[newIndex].newNode();
      trees[newIndex].root().right(rsub);
      traverse_copy(rsub, trees[newIndex], trees[1].root());

      trees[newIndex].hide();
      av.umsg(interpret("av_c27") + key + interpret("av_c28"));
      // Reorder the tree array

      shuffle(trees);
      sortArray(trees);
      showAll(trees);
      layAll(trees);
      av.step();
    }
  };

  // Add "0" or "1" to the label of edges with animation
  var setLabels_animated = function (av, interpret, tree, subroot) {
    if (subroot.left()) {
      av.umsg(interpret("av_c29") + subroot.freq + "\".");
      subroot.edgeToLeft().label(0);
      tree.layout();
      av.step();
      setLabels_animated(av, interpret, tree, subroot.left());
    }
    if (subroot.right()) {
      av.umsg(interpret("av_c30") + subroot.freq + "\".");
      subroot.edgeToRight().label(1);
      tree.layout();
      av.step();
      setLabels_animated(av, interpret, tree, subroot.right());
    } else {
      return;
    }
  };

  // Add "0" or "1" to the label of edges without animation
  var setLabels = function (tree, subroot) {
    if (subroot.left()) {
      subroot.edgeToLeft().label(0);
      setLabels(tree, subroot.left());
    }
    if (subroot.right()) {
      subroot.edgeToRight().label(1);
      setLabels(tree, subroot.right());
    } else {
      return;
    }
  };

  // Find the Huffman Code for a specific leaf node
  var leafCode = function (aLeafNode) {
    var leafVal = aLeafNode.value();
    if (!leafVal || leafVal === "jsavnull") {
      return;
    }
    else {
      if (aLeafNode.parent()) {
        var parent = aLeafNode.parent();
        if (parent.left() === aLeafNode) {
          code += "0";
        } else {
          code += "1";
        }
        leafCode(parent);
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
  };

  // Find and return the leaf node with a specific value
  var findNode = function (node, anValue) {
    var rawval = node.value();
    var temp;
    // Looking for (only) a leaf node that matches
    if (!node.left() && !node.right()) { // Got a leaf node
      if (rawval[rawval.length - 1] === anValue) {
        return node; // Match
      } else {
        return null; // Wrong leaf node
      }
    }
    temp = findNode(node.left(), anValue);
    if (temp !== null) {
      return temp;
    }
    temp = findNode(node.right(), anValue);
    return temp;
  };

  // find the Huffman codes for all leaf nodes with animation
  var showCodes_animated = function (av, interpret, freqs, chars, codeArr, tree) {
    var aLeaf;
    for (var i = 0; i < freqs.length; i++) {
      aLeaf = findNode(tree.root(), chars[i]);
      tree.root().highlight();
      aLeaf.highlight();
      leafCode(aLeaf);
      codeArr[i] = code;
      code = "";
      av.umsg(interpret("av_c31") + chars[i] + interpret("av_c32") +
              codeArr[i] + interpret("av_c33") + tree.root().value() +
              interpret("av_c34") + freqs[i] + "\"");
      highlight_path(aLeaf, true);
      av.step();
      highlight_path(aLeaf, false);
    }
  };

  // Publicize the public functions
  var huff = {};
  huff.traverse_color = traverse_color;
  huff.layAll = layAll;
  huff.hideAll = hideAll;
  huff.showAll = showAll;
  huff.huffBuild_animated = huffBuild_animated;
  huff.huffBuild = huffBuild;
  huff.setLabels_animated = setLabels_animated;
  huff.setLabels = setLabels;
  huff.showCodes_animated = showCodes_animated;
  window.HUFF = huff;
});
