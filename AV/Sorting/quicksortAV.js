"use strict";
/*global alert: true, ODSA, console */
(function ($) {
  var jsav;   // for JSAV library object

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  // add the layout setting preference
  var arrayLayout = settings.add("layout", {"type": "select",
    "options": {"bar": "Bar", "array": "Array"},
    "label": "Array layout: ", "value": "array"});

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(5, 12, 8);

  // Process About button: Pop up a message with an Alert
  function about() {
    var mystring = "Quicksort Algorithm Visualization\nWritten by Daniel Breakiron\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Summer, 2012\nLast update: July, 2012\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Execute the "Run" button function
  function runIt() {
    var arrValues = ODSA.AV.processArrayValues();

    // If arrValues is null, the user gave us junk which they need to fix
    if (arrValues) {
      ODSA.AV.reset(true);
      jsav = new JSAV($('.avcontainer'), {settings: settings});

      // Initialize the original array
      var arr = jsav.ds.array(arrValues, {indexed: true, layout: arrayLayout.val()});
      jsav.displayInit();
      // BEGIN QUICKSORT IMPLEMENTATION

      quicksort(arr, 0, arr.size() - 1);

      // END QUICKSORT IMPLEMENTATION

      jsav.umsg("Done sorting!");
      jsav.recorded(); // mark the end
    }
  }

  function quicksort(arr, left, right)
  {
    jsav.umsg("Select the pivot");
    var pivotIndex = Math.floor((left + right) / 2);
    arr.highlightBlue(pivotIndex);
    jsav.step();

    jsav.umsg("Move the pivot to the end");
    arr.swapWithStyle(pivotIndex, right);
    jsav.step();

    jsav.umsg("Partition the subarray");
    arr.setLeftArrow(left);
    arr.setRightArrow(right - 1);
    jsav.step();
    // finalPivotIndex will be the final position of the pivot
    var finalPivotIndex = partition(arr, left, right - 1, arr.value(right));

    jsav.umsg("When the right bound crosses the left bound, all elements to the left of the left bound are less than the pivot and all elements to the right are greater than or equal to the pivot");
    jsav.step();

    jsav.umsg("Move the pivot to its final location");
    arr.toggleArrow(finalPivotIndex);
    arr.swapWithStyle(right, finalPivotIndex);
    arr.markSorted(finalPivotIndex);
    jsav.step();

    // Sort left partition
    var subArr1 = arr.slice(left, finalPivotIndex);
    if (subArr1.length === 1) {
      jsav.umsg("Left sublist contains a single element which means it is sorted");
      arr.toggleArrow(finalPivotIndex - 1);
      jsav.step();
      arr.toggleArrow(finalPivotIndex - 1);
      arr.markSorted(left);
    }
    else if (subArr1.length > 1) {
      jsav.umsg("Call quicksort on the left sublist");
      jsav.step();
      quicksort(arr, left, finalPivotIndex - 1);
    }

    // Sort right partition
    var subArr2 = arr.slice(finalPivotIndex + 1, right + 1);
    if (subArr2.length === 1) {
      jsav.umsg("Right sublist contains a single element which means it is sorted");
      arr.toggleArrow(finalPivotIndex + 1);
      jsav.step();
      arr.toggleArrow(finalPivotIndex + 1);
      arr.markSorted(finalPivotIndex + 1);
    }
    else if (subArr2.length > 1) {
      jsav.umsg("Call quicksort on the right sublist");
      jsav.step();
      quicksort(arr, finalPivotIndex + 1, right);
    }
  }

  function partition(arr, left, right, pivotVal) {
    var origLeft = left;

    while (left <= right) {
      // Move the left bound inwards
      jsav.umsg("Move the left bound to the right until it reaches a value greater than or equal to the pivot");
      jsav.step();
      while (arr.value(left) < pivotVal) {
        jsav.umsg("Step right");
        arr.clearLeftArrow(left);
        left++;
        arr.setLeftArrow(left);
        jsav.step();
      }

      arr.highlight(left);
      jsav.umsg("That is as far as we go this round");
      jsav.step();

      // Move the right bound inwards
      jsav.umsg("Move the right bound to the left until it crosses the left bound or finds a value less than the pivot");
      jsav.step();
      // If its desirable to have the right bound continue into sorted sections, replace origLeft with 0
      while ((right > origLeft) && (right >= left) && (arr.value(right) >= pivotVal)) {
        jsav.umsg("Step left");
        arr.clearRightArrow(right);
        right--;
        arr.setRightArrow(right);
        jsav.step();
      }

      if (right > left) {
        arr.highlight(right);
        jsav.umsg("That is as far as we go this round");
        jsav.step();
        // Swap highlighted elements
        jsav.umsg("Swap the selected values");
        arr.swap(left, right);
        jsav.step();
        arr.unhighlight([left, right]);
      }
      else {
        jsav.umsg("Bounds have crossed");
        arr.unhighlight(left);
        jsav.step();
        break;
      }
    }

    // Clear the arrows and mark the final position of the pivot
    arr.clearLeftArrow(left);
    arr.clearRightArrow(right);
    arr.toggleArrow(left);

    // Return first position in right partition
    return left;
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
