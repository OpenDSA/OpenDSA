"use strict";
/*global alert: true, initArraySize, processArrayValues, reset */
(function ($) {
  var jsav,   // for JSAV library object
      arr;    // for the JSAV array

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  // Initialize the arraysize dropdown list
  initArraySize(5, 12, 8);

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Mergesort Algorithm Visualization\nWritten by Daniel Breakiron\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Execute the "Run" button function
  function runIt() {
    var arrValues = processArrayValues();
    
    // If arrValues is null, the user gave us junk which they need to fix
    if (arrValues) {
      reset(true);
      jsav = new JSAV($('.avcontainer'));

      // Create a new array using the layout the user has selected
      arr = jsav.ds.array(arrValues, {indexed: true});
      jsav.displayInit();
      // BEGIN MERGESORT IMPLEMENTATION

      var level = 1;
      var column = 1;
      var arrLen = arr.size();

      jsav.umsg("Select the entire array");
      mergesort(arr, level, column);

      // END MERGESORT IMPLEMENTATION
      jsav.umsg("Done sorting!");
      jsav.recorded(); // mark the end
    }
  }

  // The space required for each row to be displayed
  var canvasWidth = $('#container').width();
  var rowHeight = 80;
  var blockWidth = 47;

  /**
   * Recursively splits input array until single element arrays are achieved, arrays are then merged back together in sorted order
   *
   * arr - a JSAV array
   * level - the current depth of the recursion
   * column - the column number of the current array
   */
  function mergesort(arr, level, column) {
    // Correctly position the array
    setPosition(arr, level, column);

    var arrLen = arr.size();
    var returnArr = arr;

    arr.highlight();
    if (arrLen === 1) {    // Base case
      jsav.umsg("An array of length 1 cannot be split, ready for merge");
      jsav.step();
      arr.unhighlight();
    }
    else if (arrLen > 1) { // General recursive case
      jsav.step();
      jsav.umsg("Split the selected array (as evenly as possible)");
      arr.unhighlight();

      // Find the middle of the array,
      // if can't split evenly make the first array larger
      var midPoint = Math.ceil(arrLen / 2);

      // Create and display sub-arrays
      var subArr1 = arr.slice(0, midPoint);
      var avSubArr1 = jsav.ds.array(subArr1, {indexed: true, center: false});

      var subArr2 = arr.slice(midPoint, arrLen);
      var avSubArr2 = jsav.ds.array(subArr2, {indexed: true, center: false});

      jsav.step();

      // Recurse on both sub-arrays
      jsav.umsg("Select the left subarray");
      var childArr1Col = column * 2 - 1;
      var retArr1 = mergesort(avSubArr1, level + 1, childArr1Col);

      jsav.umsg("Select the right subarray");
      var childArr2Col = column * 2;
      var retArr2 = mergesort(avSubArr2, level + 1, childArr2Col);

      returnArr = merge(arr, retArr1, retArr2);
    }

    return returnArr;
  }

  /**
   * Merges two arrays back together in sorted order
   *
   * origArr - the original array that will be overwritten by the merge
   * arr1 - the first array to merge
   * arr2 - the second array to merge
   */
  function merge(origArr, arr1, arr2) {
    jsav.umsg("Merge selected arrays back together, in sorted order");
    // Clear the values from the original array
    for (var i = 0; i < origArr.size(); i++) {
      origArr.value(i, "");
    }

    arr1.highlight();
    arr2.highlight();
    jsav.step();

    if (arr1.size() > 1) {
      arr1.unhighlight();
      arr2.unhighlight();
    }

    var pos1 = 0;
    var pos2 = 0;
    var index = 0;

    // Merge the two arrays together, in sorted order
    while (pos1 < arr1.size() || pos2 < arr2.size()) {
      if (pos1 === arr1.size() || pos2 === arr2.size()) {
        jsav.umsg("When one list becomes empty, copy all values from the remaining array into the sorted array");
      }
      else {
        // Eliminate one step for single element arrays to reduce tedium
        if (arr1.size() > 1) {
          if (pos1 < arr1.size()) {
            arr1.highlight(pos1);
          }
          if (pos2 < arr2.size()) {
            arr2.highlight(pos2);
          }
          jsav.umsg("Select the smallest value from the front of each list (excluding values already in the sorted array)");
          jsav.step();
        }
        jsav.umsg("Select the minimum of the two values");
      }

      if (pos1 < arr1.size() &&
          (arr1.value(pos1) <= arr2.value(pos2) || pos2 === arr2.size())) {
        arr1.highlightBlue(pos1);
        jsav.step();

        origArr.value(index, arr1.value(pos1));
        // Clear the value from the previous array
        arr1.value(pos1, "");
        arr1.unhighlight(pos1);
        pos1++;
      }
      else {
        arr2.highlightBlue(pos2);
        jsav.step();

        origArr.value(index, arr2.value(pos2));
        // Clear the value from the previous array
        arr2.value(pos2, "");
        arr2.unhighlight(pos2);
        pos2++;
      }

      origArr.highlightBlue(index);
      jsav.umsg("Add the selected value to the sorted array");
      jsav.step();

      origArr.markSorted(index);
      index++;
    }

    jsav.umsg("Finished merging");
    arr1.hide();
    arr2.hide();
    jsav.step();

    jsav.clearumsg();
    return origArr;
  }

  /**
   * Calculate and set the appropriate 'top' and 'left' CSS values based
   * on the specified array's level of recursion, column number and the
   * number of elements in the array
   *
   * arr - the JSAV array to set the 'top' and 'left' values for
   * level - the level of recursion, the full-size array is level 1
   * column - the array's column number in the current row
   */
  function setPosition(arr, level, column) {
    // Calculate the number of arrays in the current row
    var numArrInRow = Math.pow(2, level - 1);

    // Calculate the left value of the current array by dividing
    // the width of the canvas by twice the number of arrays that should
    // appear in that row: (canvasWidth / (2 * numArrInRow))
    // Odd multiples of the resulting value define a line through the
    // center of each array in the row and are found using the formula
    // (2 * column - 1)
    // Note: while it is not used, even multiples define the center
    // between two consecutive arrays.
    // Since we want the left value rather than the center value of
    // each array we calculate the length each array
    // (blockWidth *  arr.size()), divide this value in half and
    // subtract it from the center line to find the left value

    var left = (canvasWidth / (2 * numArrInRow)) * (2 * column - 1) -
               (blockWidth * arr.size() / 2);
    var top = rowHeight * (level - 1);

    // Set the top and left values so that all arrays are spaced properly
    arr.element.css({"left": left, "top": top});
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(reset);
}(jQuery));
