"use strict";
/*global alert log_exercise_init getAVName */
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
    theArray = $('#arrayValues', context).val().match(/[0-9]+/g) || [];
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
      var initData = {};
      if (theArray.length === 0) { // No user-given array. Make a random array
        ASize = newSize;
        theArray.length = 0; // Out with the old
        // Give random numbers in range 0..999
        for (i = 0; i < ASize; i++) {
          theArray[i] = Math.floor(Math.random() * 1000);
        }
        initData.gen_array = theArray;
      }
      else { // Use the values we got out of the user's list
        ASize = theArray.length;
        initData.user_array = theArray;
      }
      // Log initial state of exercise
      log_exercise_init(getAVName(), initData);
      
      reset(true); // Reset any previous visualization
      av = new JSAV(avcId); // initialize JSAV ..

      // Initialize the original array
      initialArray = av.ds.array(theArray, {indexed: true});
      av.displayInit();
      // BEGIN QUICKSORT IMPLEMENTATION

      // Save the left edge of the original array so sublists can be positioned relative to it
      leftEdge = parseFloat(initialArray.element.css("left"));

      var level = 1;
      var leftOffset = 0;
      quicksort(initialArray, level, leftOffset);

      // END QUICKSORT IMPLEMENTATION

      av.umsg("Done sorting!");
      av.recorded(); // mark the end
    }
  }
  
  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#run', context).click(runIt);
  $('#reset', context).click(reset);

  // The space required for each row to be displayed
  var leftEdge = 0;

  function quicksort(arr, level, leftOffset)
  {
    var left = 0;
    var right = arr.size() - 1;

    // Correctly position the array
    setPosition(arr, level, leftOffset);

    av.umsg("Select the pivot");
    var pivotIndex = Math.floor((left + right) / 2);
    arr.highlightPivot(pivotIndex);
    av.step();

    av.umsg("Move the pivot to the end");
    arr.toggleArrow(right);
    av.step();
    arr.swap(pivotIndex, right);
    av.step();
    arr.toggleArrow(right);

    av.umsg("Partition the array");
    av.step();
    // finalPivotIndex will be the final position of the pivot
    var finalPivotIndex = partition(arr, left, right - 1, arr.value(right));

    arr.toggleArrow(finalPivotIndex);
    av.umsg("When the right bound is less than or equal to the left bound, all elements to the right of this element are less than the pivot and all elements to the right are greater than or equal to the pivot");
    av.step();
    arr.toggleArrow(finalPivotIndex);

    av.umsg("Move the pivot to its final location");
    arr.swap(finalPivotIndex, right);
    arr.markSorted(finalPivotIndex);
    av.step();

    // Create and display sub-arrays

    // Sort left partition
    var subArr1 = arr.slice(left, finalPivotIndex);
    if (subArr1.length === 1) {
      av.umsg("Left sublist contains a single element which means it is sorted");
      av.step();
      arr.markSorted(left);
    }
    else if (subArr1.length > 1) {
      var avSubArr1 = av.ds.array(subArr1, {indexed: true, center: false});
      av.umsg("Call quicksort on the left sublist");
      av.step();
      quicksort(avSubArr1, level + 1, leftOffset);
    }

    // Sort right partition
    var subArr2 = arr.slice(finalPivotIndex + 1, right + 1);
    if (subArr2.length === 1) {
      av.umsg("Right sublist contains a single element which means it is sorted");
      av.step();
      arr.markSorted(finalPivotIndex + 1);
    }
    else if (subArr2.length > 1) {
      var avSubArr2 = av.ds.array(subArr2, {indexed: true, center: false});
      av.umsg("Call quicksort on the right sublist");
      av.step();
      quicksort(avSubArr2, level + 1, leftOffset + finalPivotIndex + 1);
    }
  }

  function partition(arr, left, right, pivot) {
    var pivotIndex = right + 1;
    arr.setRightArrow(right);

    while (left <= right) {
      // Move the left bound inwards
      av.umsg("Select a value larger than the pivot to swap to the right");
      while (arr.value(left) < pivot) {
        arr.setLeftArrow(left);
        av.step();
        arr.clearLeftArrow(left);
        left++;
      }

      // Only highlight element at index left if it isn't the pivot
      if (left < pivotIndex) {
        arr.highlight(left);
      }
      arr.setLeftArrow(left);
      av.step();

      // Move the right bound inwards
      av.umsg("Select a value smaller than the pivot to swap to the left");
      arr.clearRightArrow(right);
      while ((right >= left) && (arr.value(right) >= pivot)) {
        arr.setRightArrow(right);
        av.step();
        arr.clearRightArrow(right);
        right--;
      }
      
      // Stop when all elements have been appropriately swapped
      if (left >= right) {
        if (left < pivotIndex) {
          arr.unhighlight(left);
        }
        arr.clearLeftArrow(left);
        break;
      }

      arr.highlight(right);
      arr.setRightArrow(right);
      av.step();

      // Swap highlighted elements
      av.umsg("Swap the selected values");
      arr.swap(left, right);
      av.step();
      arr.unhighlight([left, right]);
      arr.clearLeftArrow(left);
    }

    // Return first position in right partition
    return left;
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
  JSAV._types.ds.AVArray.prototype.markSorted = function (index) {
    this.css(index, {"background-color": "#ffffcc" });
  };
  
    /**
   * Creates a left bound indicator above the specified indices
   * Does nothing if the element already has a left bound arrow above it
   */
  JSAV._types.ds.AVArray.prototype.setLeftArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    if (!$elems.hasClass("jsavarrow")) {
      $elems.toggleClass("jsavarrow");
    }
    
    if ($elems.hasClass("rightarrow")) {
      // If the selected index already has a right arrow, remove it
      // and don't add a left arrow (will simply use the jsavarrow class)
      $elems.toggleClass("rightarrow");
    } else if (!$elems.hasClass("leftarrow")) {
      // If the index does not have a right arrow, add a left one
      $elems.toggleClass("leftarrow");
    }
  });

  /**
   * Creates a right bound indicator above the specified indices
   * Does nothing if the element already has a right bound arrow above it
   */
  JSAV._types.ds.AVArray.prototype.setRightArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    if (!$elems.hasClass("jsavarrow")) {
      $elems.toggleClass("jsavarrow");
    }
    
    if ($elems.hasClass("leftarrow")) {
      // If the selected index already has a left arrow, remove it
      // and don't add a right arrow (will simply use the jsavarrow class)
      $elems.toggleClass("leftarrow");
    } else if (!$elems.hasClass("rightarrow")) {
      // If the index does not have a left arrow, add a right one
      $elems.toggleClass("rightarrow");
    }
  });

  /**
   * Removes a left arrow (if it exists) from above the specified indices
   */
  JSAV._types.ds.AVArray.prototype.clearLeftArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    if ($elems.hasClass("jsavarrow") && !$elems.hasClass("leftarrow") && !$elems.hasClass("rightarrow")) {
      // A plain jsavarrow class without a left or right arrow
      // class indicates both bounds are on the same element
      // Replace the shared bound indicator with a right bound indicator
      $elems.toggleClass("rightarrow");
    } else if ($elems.hasClass("jsavarrow") && $elems.hasClass("leftarrow")) {
      // Remove the left arrow
      $elems.toggleClass("leftarrow");
      $elems.toggleClass("jsavarrow");
    }
  });

  /**
   * Removes a right arrow (if it exists) from above the specified indices
   */
  JSAV._types.ds.AVArray.prototype.clearRightArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    if ($elems.hasClass("jsavarrow") && !$elems.hasClass("leftarrow") && !$elems.hasClass("rightarrow")) {
      // A plain jsavarrow class without a left or right arrow
      // class indicates both bounds are on the same element
      // Replace the shared bound indicator with a left bound indicator
      $elems.toggleClass("leftarrow");
    } else if ($elems.hasClass("jsavarrow") && $elems.hasClass("rightarrow")) {
      // Remove the right arrow
      $elems.toggleClass("rightarrow");
      $elems.toggleClass("jsavarrow");
    }
  });
}(jQuery));