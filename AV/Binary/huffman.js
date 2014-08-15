/*global ODSA */
"use strict";
// Huffman coding tree shared functions
$(document).ready(function () {
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


  var huff = {};
  huff.sortArray = sortArray;
  huff.shuffle = shuffle;
  huff.shift = shift;
  huff.traverse_color = traverse_color;
  huff.traverse_copy = traverse_copy;
  huff.layAll = layAll;
  huff.hideAll = hideAll;
  huff.showAll = showAll;
  window.HUFF = huff;
});
