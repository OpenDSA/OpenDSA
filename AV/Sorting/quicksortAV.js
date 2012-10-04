"use strict";
/*global alert*/
(function ($) {
  var avcId = 'quicksortAV_avc';
  
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
    initialArray;  // for the JSAV array

  // Process About button: Pop up a message with an Alert
  function about() {
    var mystring = "Quicksort Algorithm Visualization\nWritten by Daniel Breakiron\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Summer, 2012\nLast update: July, 2012\nJSAV library version " + JSAV.version();
    alert(mystring);
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
    var i;

    if (processArrayValues()) { // if it is false, we got junk user
                                // needs to fix
      if (theArray.length === 0) { // Make a random  array
        ASize = newSize;
        theArray.length = 0; // Out with the old
        // Give random numbers in range 0..999
        for (i = 0; i < ASize; i++) {
          theArray[i] = Math.floor(Math.random() * 1000);
        }
      }
      else { // Use the values we got out of the user's list
        ASize = theArray.length;
      }

      reset(true); // Reset any previous visualization
      av = new JSAV(avcId); // initialize JSAV ..

      // Initialize the list of sorted elements to be empty
      sortedArr = av.ds.array(new Array(theArray.length), {indexed: true});

      // Initialize the original array
      initialArray = av.ds.array(theArray, {indexed: true});
      av.displayInit();
      // BEGIN QUICKSORT IMPLEMENTATION

      // Save the left edge of the original array so sublists can be positioned relative to it
      leftEdge = parseFloat(initialArray.element.css("left"));

      var level = 2;
      var leftOffset = 0;

      quicksort(initialArray, level, leftOffset);

      // END QUICKSORT IMPLEMENTATION

      av.umsg("Done sorting!");
      av.recorded(); // mark the end
    }
  }
  
  // Connect action callbacks to the HTML entities
  $('input[name="about"]').click(about);
  $('input[name="run"]', context).click(runIt);
  $('input[name="reset"]', context).click(reset);

  // The space required for each row to be displayed
  var leftEdge = 0;
  var sortedArr = [];

  function quicksort(arr, level, leftOffset)
  {
    var i = 0;
    var j = arr.size() - 1;

    // Correctly position the array
    setPosition(arr, level, leftOffset);

    av.umsg("Select the pivot");
    var pivotIndex = Math.floor((i + j) / 2);
    arr.highlightPivot(pivotIndex);
    av.step();

    av.umsg("Move the pivot to the end");
    arr.toggleArrow(j);
    av.step();
    arr.swap(pivotIndex, j);
    av.step();
    arr.toggleArrow(j);

    av.umsg("Partition the array");
    av.step();
    // k will be the final position of the pivot
    var k = partition(arr, i, j, arr.value(j));

    arr.toggleArrow(k);
    av.umsg("All elements to the right of this value are less than the pivot and all elements to the right are greater than or equal to the pivot");
    av.step();
    arr.toggleArrow(k);

    av.umsg("Move the pivot to its final location");
    arr.swap(k, j);
    arr.markSorted(k, leftOffset);
    av.step();

    // Create and display sub-arrays

    // Sort left partition
    var subArr1 = arr.slice(i, k);
    if (subArr1.length === 1) {
      av.umsg("Left sublist contains a single element which means it is sorted");
      av.step();
      arr.markSorted(i, leftOffset);
    }
    else if (subArr1.length > 1) {
      var avSubArr1 = av.ds.array(subArr1, {indexed: true, center: false});
      av.umsg("Call quicksort on the left sublist");
      av.step();
      quicksort(avSubArr1, level + 1, leftOffset);
    }

    // Sort right partition
    var subArr2 = arr.slice(k + 1, j + 1);
    if (subArr2.length === 1) {
      av.umsg("Right sublist contains a single element which means it is sorted");
      av.step();
      arr.markSorted(k + 1, leftOffset);
    }
    else if (subArr2.length > 1) {
      var avSubArr2 = av.ds.array(subArr2, {indexed: true, center: false});
      av.umsg("Call quicksort on the right sublist");
      av.step();
      quicksort(avSubArr2, level + 1, leftOffset + k + 1);
    }
  }

  function partition(arr, l, r, pivot)
  {
    l -= 1;

    while (l < r)
    {
      av.umsg("Select a value larger than the pivot to swap to the right");
      while ((arr.value(++l) < pivot))
      {
        arr.highlight(l);
        av.step();
        arr.unhighlight(l);
      }

      arr.highlight(l);
      av.step();

      av.umsg("Select a value smaller than the pivot to swap to the left");
      while ((r !== 0) && (arr.value(--r) > pivot) && (r > l))
      {
        arr.highlight(r);
        av.step();
        arr.unhighlight(r);
      }

      arr.highlight(r);
      av.step();

      // Stop when all elements have been appropriately swapped
      if (l >= r)
      {
        arr.unhighlight([l, r]);
        break;
      }

      //Highlight elements to swap
      av.umsg("Swap the selected values");
      arr.swap(l, r);
      av.step();
      arr.unhighlight([l, r]);
    }

    // Return first position in right partition
    return l;
  }

  /**
   * Calculates and sets the appropriate 'top' and 'left' CSS values based
   * on the specified array's level of recursion and number of blocks the array should be offset from the left
   *
   * arr - the JSAV array to set the 'top' and 'left' values for
   * level - the level of recursion, the full-size array is level 1
   * leftOffset - the number of blocks from the left the array should be positioned
   */
  function setPosition(arr, level, leftOffset) {
    var blockWidth = 46;
    var rowHeight = 80;
    var left = leftEdge + leftOffset * blockWidth;
    var top = rowHeight * (level - 1);

    // Set the top and left values so that all arrays are spaced properly
    arr.element.css({"left": left, "top": top});
  }

  /**
   * Extends the JSAV AV array to have the slice functionality of JavaScript arrays
   */
  JSAV._types.ds.AVArray.prototype.slice = function (start, end) {
    var array = [];

    for (var i = 0; i < (end - start); i++)
    {
      array[i] = this.value(start + i);
    }

    return array;
  };

  /**
   * Convenience function for highlighting the pivot value in blue
   */
  JSAV._types.ds.AVArray.prototype.highlightPivot = function (index) {
    this.css(index, {"background-color": "#ddf" });
  };

  /**
   * Convenience function for highlighting sorted values
   */
  JSAV._types.ds.AVArray.prototype.markSorted = function (index, leftOffset) {
    this.css(index, {"background-color": "#ffffcc" });

    // Add the value to the sorted array
    var sortedIndex = index + leftOffset;
    sortedArr.value(sortedIndex, this.value(index));
    sortedArr.css(sortedIndex, {"background-color": "#ffffcc" });
  };
}(jQuery));