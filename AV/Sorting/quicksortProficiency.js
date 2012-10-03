"use strict";
/*global alert*/
(function ($) {
//*****************************************************************************
//*************                  JSAV Extensions                  *************
//*****************************************************************************
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
   * Creates an arrow above the specified indices
   * Does nothing if the element already has an arrow above it
   */
  JSAV._types.ds.AVArray.prototype.setArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    if (!$elems.hasClass("jsavarrow")) {
      $elems.toggleClass("jsavarrow");
    }
  });

  /**
   * Removes any arrays the have been toggled over the specified indices
   */
  JSAV._types.ds.AVArray.prototype.clearArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    if ($elems.hasClass("jsavarrow")) {
      $elems.toggleClass("jsavarrow");
    }
  });

  /**
   * toString function for JSAV arrays, useful for debugging
   */
  JSAV._types.ds.AVArray.prototype.toString = function () {
    var size = this.size();
    var str = '[';
    for (var i = 0; i < size; i++) {
      str += this.value(i);

      if (i < size - 1) {
        str += ', ';
      }
    }
    str += ']';

    return str;
  };

  // Process help button: Give a full help page for this activity
  // We might give them another HTML page to look at.
  function help() {
    window.open("QSprofHelp.html", 'helpwindow');
  }

  // Process about button: Pop up a message with an Alert
  function about() {
    var mystring = "Quicksort Proficiency Exercise\nWritten by Daniel Breakiron\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/eBook\nWritten August, 2012\nLast update: September 6, 2012\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  $('input[name="help"]').click(help);
  $('input[name="about"]').click(about);

//*****************************************************************************
//*************       QUICKSORT PROFICIENCY EXERCISE CODE         *************
//*****************************************************************************

  var arraySize = 10,
    initialArray = [],
    av = new JSAV($("#container"));
  
  av.recorded();     // we are not recording an AV with an algorithm

  // Initialize the variables
  var userArr = [];
  var pivotIndex = av.variable(-1);
  var pivotMoved = av.variable(false);
  var partitioned = av.variable(false);
  var left = av.variable(-1);
  var right = av.variable(-1);

  /**
   * Processes the reset button
   *     - Clears existing arrays
   *     - Generates a new set of random numbers to sort
   *     - Initializes the array the user will sort
   */
  function initialize() {
    // Clear all existing arrays
    $("#arrays").html("");

    // Generate random numbers for the exercise
    initialArray = [];
    for (var i = 0; i < arraySize; i++) {
      initialArray[i] = Math.floor(Math.random() * 100);
    }
    
    // Log initial exercise data
    // TODO
    
    // Create the array the user will intereact with
    userArr = av.ds.array(initialArray, {indexed: true, layout: "array"});

    // Assign a click handler function to the user array
    userArr.click(function (index) {
      clickHandler(this, index);
    });

    resetStateVars();

    //av.umsg("Directions: Click on a numbered block to select it.  Then click on an empty block where it should be placed.");
    av.forward();
    av._undo = [];

    // Return the array containing the user's answer and the state variables we use to grade their solution
    return [userArr, pivotIndex, pivotMoved, partitioned, left, right];
  }

  /**
   * Creates the model solution which is used for grading the exercise
   */
  function modelSolution(jsav) {
    var modelArr = jsav.ds.array(initialArray, {indexed: true, layout: "array"});

    // ModelSolution vars used for fixing the state
    var msPivotIndex = jsav.variable(-1);
    var msPivotMoved = jsav.variable(false);
    var msPartitioned = jsav.variable(false);
    var msLeft = jsav.variable(-1);
    var msRight = jsav.variable(-1);

    // Initialize the display or else the model answer won't show up until the second step of the slideshow
    jsav.displayInit();

    quicksort(jsav, modelArr, 0, modelArr.size() - 1, msPivotIndex, msPivotMoved, msPartitioned, msLeft, msRight);

    // Return the model array and all the state variables we want to use for grading and fixing the state
    return [modelArr, msPivotIndex, msPivotMoved, msPartitioned, msLeft, msRight];
  }

  /**
   * Sorts the specified array using quicksort while marking various
   * steps where the model answer will be compared against the user's
   * solution for grading purposes
   */
  function quicksort(jsav, arr, i, j, msPivotIndex, msPivotMoved, msPartitioned, msLeft, msRight) {
    // Select the pivot
    var pivotIndex = Math.floor((i + j) / 2);
    arr.highlightPivot(pivotIndex);
    jsav.step();

    // Move the pivot to the end of the list being sorted
    arr.swap(pivotIndex, j);
    msPivotIndex.value(j);
    msPivotMoved.value(true);
    jsav.stepOption("grade", true);
    jsav.step();

    // Partition the array
    // k will be the first position in the right subarray
    var k = partition(arr, i, j, arr.value(j));
    msLeft.value(i);
    msRight.value(j - 1);
    msPartitioned.value(true);
    msPivotMoved.value(false);
    jsav.stepOption("grade", true);
    jsav.step();

    // If the pivot is already in its final location, don't need to swap it
    if (k !== j) {
      arr.swap(k, j);
      msPivotMoved.value(true);
      msPivotIndex.value(k);
      jsav.stepOption("grade", true);
      jsav.step();
    }

    arr.markSorted(k);
    resetMSStateVars(msPivotIndex, msPivotMoved, msPartitioned, msLeft, msRight);
    jsav.stepOption("grade", true);
    jsav.step();

    // Sort left partition
    if ((k - i) > 1) {
      quicksort(jsav, arr, i, k - 1, msPivotIndex, msPivotMoved, msPartitioned, msLeft, msRight);
    } else if ((k - i) === 1) {
      // If the sublist is a single element, mark it as sorted
      arr.markSorted(i);
      resetMSStateVars(msPivotIndex, msPivotMoved, msPartitioned, msLeft, msRight);
      jsav.stepOption("grade", true);
      jsav.step();
    }

    // Sort right partition
    if ((j - k) > 1) {
      quicksort(jsav, arr, k + 1, j, msPivotIndex, msPivotMoved, msPartitioned, msLeft, msRight);
    } else if ((j - k) === 1) {
      // If the sublist is a single element, mark it as sorted
      arr.markSorted(j);
      resetMSStateVars(msPivotIndex, msPivotMoved, msPartitioned, msLeft, msRight);
      jsav.stepOption("grade", true);
      jsav.step();
    }
  }

  /**
   * Partitions the elements of an array within the specified range
   * so that all values less than the pivot value are farthest to
   * the left and values larger than the pivot are farthest to the right
   *
   * arr - the array containing the elements to partition
   * l - the left endpoint of the range to partition
   * r - the right endpoint of the range to partition
   * pivot - the value to compare all the elements against
   */
  function partition(arr, l, r, pivot) {
    l -= 1;

    while (l < r) {
      // Move bounds inward until they meet
      while (arr.value(++l) < pivot);
      while ((r !== 0) && (arr.value(--r) > pivot));

      // Stop when all elements have been appropriately swapped
      if (l >= r) {
        break;
      }

      //Highlight elements to swap
      arr.swap(l, r);
    }

    // Return first position in right partition
    return l;
  }

  /**
   * Function that will be called by the exercise if continuous feedback mode
   * is used and the "fix incorrect step" mode is on.
   */
  function fixState(modelState) {
    // Pull the model array and state variables out of the modelState argument
    var modelArray = modelState[0];
    var pIndex = modelState[1];
    var pMoved = modelState[2];
    var part = modelState[3];
    var l = modelState[4];
    var r = modelState[5];

    for (var i = 0; i < modelArray.size(); i++) {
      // Fix any incorrect values
      var val = modelArray.value(i);
      if (val !== userArr.value(i)) {
        userArr.value(i, val);
      }

      // Make the CSS background-color property of each element in the model array match the background-color of each element in the user array
      var bgColor = modelArray.css(i, "background-color");
      if (userArr.css(i, "background-color") !== bgColor) {
        userArr.css(i, {"background-color": modelArray.css(i, "background-color")});
      }

      // Clear any arrows the user put in the wrong place
      userArr.clearArrow(i);
    }

    // Make sure the value of each user state variable is correct
    pivotIndex.value(pIndex.value());
    pivotMoved.value(pMoved.value());
    partitioned.value(part.value());
    left.value(l.value());
    right.value(r.value());

    // Mark the step so that JSAV moves on and expects a new step, not the one we just corrected for the user
    exercise.gradeableStep();
  }

  /**
   * Click handler for all array elements
   */
  function clickHandler(arr, index) {
    if (!partitioned.value()) {
      if (pivotIndex.value() === -1) {
        // Select the pivot
        pivotIndex.value(index);
        arr.highlightPivot(index);
      } else if (pivotIndex.value() === index && !pivotMoved.value()) {
        // Deselect the pivot unless it has already been moved
        pivotIndex.value(-1);
        arr.unhighlight(index);
      } else if (!pivotMoved.value()) {
        // Move the selected pivot to the specified index
        swapPivot(pivotIndex.value(), index);
        //av.umsg("Please select the left endpoint");
      } else if (left.value() === -1) {
        // Select the left end of the range to partition
        left.value(index);
        arr.setArrow(index);
        av.umsg("");
        /*
        if (right.value() === -1)
        {
          av.umsg("Please select the right endpoint");
        }
        */
      } else if (right.value() === -1) {
        // Select the right end of the range to partition
        right.value(index);
        arr.setArrow(index);
        av.umsg("");
      } else if (right.value() === index) {
        // Deselect the right end of the range to partition
        if (left.value() !== right.value()) {
          arr.clearArrow(index);
        }
        right.value(-1);

        // Guide the user by telling them they just deselected the right endpoint
        av.umsg("Please select the right endpoint");
      } else if (left.value() === index) {
        // Deselect the left end of the range to partition
        if (left.value() !== right.value()) {
          arr.clearArrow(index);
        }
        left.value(-1);

        // Guide the user by telling them they just deselected the left endpoint
        av.umsg("Please select the left endpoint");
      }
    } else {
      if (pivotIndex.value() === -1) {
        // Select the pivot
        pivotIndex.value(index);
        arr.highlightPivot(index);
      } else if (pivotIndex.value() === index) {
        // Deselect the pivot
        pivotIndex.value(-1);
        arr.unhighlight(index);
      } else {
        // Move the pivot to its final location
        swapPivot(pivotIndex.value(), index);
      }
    }
  }

  /**
   * Convenience function that swaps the pivot from one position to another
   * and sets the appropriate user state variables
   */
  function swapPivot(pIndex, newPIndex) {
    // Move the selected pivot to the specified index
    userArr.swap(pIndex, newPIndex);
    pivotIndex.value(newPIndex);
    pivotMoved.value(true);

    // Mark this as a step to be graded and a step that can be undone (continuous feedback)
    exercise.gradeableStep();
  }

  /**
   * Performs the partition operation on the user array
   * using the pivot value and range specified by the user
   */
  function partitionButton() {
    // Input validation
    if (pivotIndex.value() === -1) {
      alert("Select a pivot element");
      return;
    }

    if (left.value() === -1 || right.value() === -1) {
      alert("You must select the range to partition");
      return;
    }

    partition(userArr, left.value(), right.value() + 1, userArr.value(pivotIndex.value()));

    // Update state variables and clear left and right marker arrows
    partitioned.value(true);
    pivotMoved.value(false);
    userArr.clearArrow(left.value());
    userArr.clearArrow(right.value());

    // Mark this as a step to be graded and a step that can be undone (continuous feedback)
    exercise.gradeableStep();

    av.umsg("Done partitioning");
  }

  /**
   * Marks the currently selected element as sorted
   */
  function markSortedButton() {
    // Input validation
    if (pivotIndex.value() === -1) {
      alert("Select an element to mark as sorted");
      return;
    }

    userArr.markSorted(pivotIndex.value());
    resetStateVars();

    // Mark this as a step to be graded and a step that can be undone (continuous feedback)
    exercise.gradeableStep();

    av.umsg("");
  }

  // Attach the button handlers
  $('input[name="partition"]').click(partitionButton);
  $('input[name="markSorted"]').click(markSortedButton);

  /**
   * Reset the variables used for each iteration of the algorithm
   */
  function resetStateVars() {
    pivotIndex.value(-1);
    pivotMoved.value(false);
    partitioned.value(false);
    left.value(-1);
    right.value(-1);
  }

  /**
   * Resets the model solution variables
   */
  function resetMSStateVars(msPivotIndex, msPivotMoved, msPartitioned, msLeft, msRight) {
    msPivotIndex.value(-1);
    msPivotMoved.value(false);
    msPartitioned.value(false);
    msLeft.value(-1);
    msRight.value(-1);
  }

  /*
   * Instantiate the exercise
   *    modelSolution - function name
   *        - Creates the model answer that is accessible on the page
   *        - Creates the model answer used to grade the student's answer
   *        - Returns a list containing the model array and all state
   *              variables used for grading and fixing the state if the user makes a mistake
   *    initialize - function name
   *        - Initializes and returns the array the user interacts with and the state variables we use to grade their answer
   *    [{css: "background-color"}, {}, {}, {}, {}, {}]
   *        - Defines how to grade each value returned from 'initialize' and 'modelSolution'
   *            - The values and the background-color css properties of both array will be compared
   *            - Each of the state variables will only be compared by value
   *    {fix: fixState, feedback: "continuous", fixmode: "fix"}
   *        - Defines the name of the function to call to fix the state of the exercise if the user makes a mistake in fixmode
   *        - Defaults to giving the user feedback after each step
   *        - Defaults to fixing the exercise for the user rather than undoing their last step
   */
  var exercise = av.exercise(modelSolution, initialize,
                 [{css: "background-color"}, {}, {}, {}, {}, {}],
                 {fix: fixState, feedback:  "continuous", fixmode: "fix"}); // fixmode: "undo"
  exercise.reset();
}(jQuery));