/*global ODSA */
"use strict";
// Huffman tree building slideshow: Short version of the full standalone AV
$(document).ready(function () {
  // Constructing the huffmanCodingTree with animation
  var huffTree_animation = function (anArray, hfArray) {
    while (anArray.length >= 4) {
      jsav.umsg("Sorting the data by frequency results in the following:");
      HUFF.sortArray(anArray, hfArray);
      HUFF.layAll(hfArray);

      if (anArray.length == 4) {
        break;
      }
      jsav.step();

      jsav.umsg("Choose the two smallest numbers: " + anArray[0] + " and " + anArray[1]);
      // Hightlight two elements that will be chosen
      hfArray[0].root().highlight();
      hfArray[1].root().highlight();
      jsav.step();

      HUFF.hideAll(hfArray);

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
      HUFF.traverse_copy(lsub, hfArray[newIndex], hfArray[0].root());

      // Construct the right subtree by copying the 2nd tree
      var rsub = hfArray[newIndex].newNode();
      hfArray[newIndex].root().right(rsub);
      HUFF.traverse_copy(rsub, hfArray[newIndex], hfArray[1].root());

      hfArray[newIndex].hide();
      jsav.umsg("Merge them together with the sum of them \"" + key + "\", and update the data as follows: ");
      // Restruct the tree array
      HUFF.shuffle(anArray, hfArray);
      // Shift the merged tree to the 1st place
      HUFF.shift(anArray, hfArray);

      HUFF.showAll(hfArray);
      HUFF.layAll(hfArray);
      jsav.step();
    }
  }

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  var jsav = new JSAV("huffmanBuildCON", {settings: settings});

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
  HUFF.layAll(hfArray);
  jsav.displayInit();

  // Constructing Huffman Coding Tree with animation.
  huffTree_animation(numArray, hfArray);
  jsav.recorded(); // done recording changes, will rewind
});
