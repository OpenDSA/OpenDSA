"use strict";
/*global alert*/
(function ($) {
  var avcId = 'mergesortAV_avc';
  
  // Number of values in the array
  var ASize = $('#arraysize').val();
  // The array of numbers.
  var theArray = [];

  // check query parameters from URL
  var params = JSAV.utils.getQueryParameter();
  if ("array" in params) { // set value of array pick if it is a param
    $('#arrayValues').val(params.array).prop("disabled", true);
  }
  
  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  
  var context = $("#ssperform");
  var emptyContent = $('#' + avcId).html();
  var av, // for JSAV av
    arr;  // for the JSAV array

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Mergesort Algorithm Visualization\nWritten by Daniel Breakiron\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Process Reset button: Reinitialize the output textbox and the AV
  function reset(flag) {
    if (av) {
      av.clearumsg();
      $('#' + avcId).unbind().html(emptyContent);
    }
    // Clear the array values field, when no params given and reset button hit
    if (flag !== true) {
      if (!$('#arrayValues').prop("disabled")) {
        $('#arrayValues').val("");
      }
    }
  }

  // Validate the user-defined array values
  function processArrayValues() {
    var i,
        num,
        msg = "Must be 5 to 16 positive integers";
    // Convert user's values to an array,
    // assuming values are space separated
    theArray = $('input[name="arrayValues"]', context).val().match(/[0-9]+/g) || [];
    if (theArray.length === 0) { // Empty field
      theArray.length = 0;
      return true;
    }
    if (theArray.length < 5 || theArray.length > 16) {
      alert(msg);
      theArray.length = 0;
      return false;
    }
    for (i = 0; i < theArray.length; i++) {
      theArray[i] = Number(theArray[i]);
      if (isNaN(theArray[i]) || theArray[i] < 0) {
        alert(msg);
        theArray.length = 0;
        return false;
      }
    }
    $('#arraysize').val(theArray.length);
    return true;
  }
  
  // Execute the "Run" button function
  function runIt() {
    var newSize = $('#arraysize').val();

    if (processArrayValues()) { // if false, we got junk user should fix
      if (theArray.length === 0) { // Make a random  array
        ASize = newSize;
        theArray.length = 0; // Out with the old
        // Give random numbers in range 0..999
        for (var i = 0; i < ASize; i++) {
          theArray[i] = Math.floor(Math.random() * 1000);
        }
      }
      else { // Use the values we got out of the user's list
        ASize = theArray.length;
      }
      reset(true); // Reset any previous visualization
      av = new JSAV(avcId); // initialize JSAV ..
      // .. and the array.
      arr = av.ds.array(theArray, {indexed: true});
      av.displayInit();
      // BEGIN MERGESORT IMPLEMENTATION

      var level = 1;
      var column = 1;
      var arrLen = arr.size();
     
      av.umsg("Select the entire array");
      mergesort(arr, level, column);
      av.umsg("Done sorting!");
      av.recorded(); // mark the end
    }
  }
  
  // The space required for each row to be displayed
  var canvasWidth = $('#container').width();
  var rowHeight = 80;
  var blockWidth = 47;
  
  // Extend JSAV AV array to have the slice functionality of JavaScript arrays
  JSAV._types.ds.AVArray.prototype.slice = function (start, end) {
    var array = [];
    for (var i = 0; i < (end - start); i++) {
      array[i] = this.value(start + i);
    }
    return array;
  };
  
  // Convenience function for setting another type of highlight
  // Used to show which elements will be compared during sort
  var setBlue = function (arr, index) {
    arr.css(index, {"background-color": "#ddf" });
  };
  
  // Convenience function for setting another type of highlight
  // Used to show which elements have already been merged back together
  var markMerged = function (arr, index) {
    // Clears the value
    arr.value(index, "");
    // Change the background color to gray
    arr.css(index, {"background-color": "#c0c0c0" });
  };
  
  // Convenience function for setting another type of highlight
  // Used to show which elements are already sorted
  var highlightSorted = function (arr, index) {
    arr.css(index, {"background-color": "#ffffcc" });
  };
  
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
      av.umsg("An array of length 1 cannot be split, ready for merge");
      av.step();
      arr.unhighlight();
    }
    else if (arrLen > 1) { // General recursive case
      av.step();
      av.umsg("Split the selected array (as evenly as possible)");
      arr.unhighlight();
    
      // Find the middle of the array,
      // if can't split evenly make the first array larger
      var midPoint = Math.ceil(arrLen / 2);

      // Create and display sub-arrays
      var subArr1 = arr.slice(0, midPoint);
      var avSubArr1 = av.ds.array(subArr1, {indexed: true, center: false});
      
      var subArr2 = arr.slice(midPoint, arrLen);
      var avSubArr2 = av.ds.array(subArr2, {indexed: true, center: false});
    
      av.step();
    
      // Recurse on both sub-arrays
      av.umsg("Select the left subarray");
      var childArr1Col = column * 2 - 1;
      var retArr1 = mergesort(avSubArr1, level + 1, childArr1Col);

      av.umsg("Select the right subarray");
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
    av.umsg("Merge selected arrays back together, in sorted order");
    // Clear the values from the original array
    for (var i = 0; i < origArr.size(); i++) {
      origArr.value(i, "");
    }

    arr1.highlight();
    arr2.highlight();
    av.step();
    
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
        av.umsg("When one list becomes empty, copy all values from the remaining array into the sorted array");
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
          av.umsg("Select the smallest value from the front of each list (excluding values already in the sorted array)");
          av.step();
        }
        av.umsg("Select the minimum of the two values");
      }
      
      if (pos1 < arr1.size() &&
          (arr1.value(pos1) <= arr2.value(pos2) || pos2 === arr2.size())) {
        setBlue(arr1, pos1);
        // Bold outline the selected element
        arr1.css(pos1, {"border-width": "2px"});
        av.step();
        // Un-bold outline the selected element
        arr1.css(pos1, {"border-width": "1px"});
        origArr.value(index, arr1.value(pos1));
        markMerged(arr1, pos1);
        pos1++;
      }
      else {
        setBlue(arr2, pos2);
        // Bold outline the selected element
        arr2.css(pos2, {"border-width": "2px"});
        av.step();
        
        // Un-bold outline the selected element
        arr2.css(pos2, {"border-width": "1px"});
        origArr.value(index, arr2.value(pos2));
        markMerged(arr2, pos2);
        pos2++;
      }
      
      setBlue(origArr, index);
      av.umsg("Add the selected value to the sorted array");
      av.step();
      
      highlightSorted(origArr, index);
      index++;
    }
    
    av.umsg("Finished merging");
    arr1.hide();
    arr2.hide();
    av.step();
    
    av.clearumsg();
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
  $('input[name="about"]').click(about);
  $('input[name="run"]', context).click(runIt);
  $('input[name="reset"]', context).click(reset);
}(jQuery));
