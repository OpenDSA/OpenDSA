"use strict";
/*global alert: true, console: true, serverEnabled, userLoggedIn, flushStoredData, sendEventData, AV_NAME: true, getNameFromURL, logUserAction */

/**
 * The avcontainer element
 */
var avc = '';

/**
 * Stores the empty contents of the avcontainer, used for reset
 */
var emptyContent = '';

//*****************************************************************************
//*************                    AV FUNCTIONS                   *************
//*****************************************************************************

/**
 * Generates a JSAV event to log the initial state of an AV or exercise
 *   - initData - A JSON object that contains the initial state of an exercise
 *     Conventions:
 *       - The key for automatically generated data should have a prefix 'gen_'
 *         - Ex: an automatically generated array would be 'gen_array'
 *       - The key for user generated data should have a prefix 'user_'
 *         - Ex: Array data the user enters in the textbox should have a key 'user_array'
 */
function logExerciseInit(initData) {
  var data = {type: 'odsa-exercise-init', desc: JSON.stringify(initData)};
  $("body").trigger("jsav-log-event", [data]);
}
/**
 * Generates a JSAV event which triggers the code to give a user credit for an exercise
 */
function awardCompletionCredit() {
  var data = {type: 'odsa-award-credit'};
  $("body").trigger("jsav-log-event", [data]);
}

/**
 * Initializes the arraysize drop down list
 */
function initArraySize(min, max, selected) {
  // Uses the midpoint between the min and max as a default, if a selected value isn't provided
  selected = (selected) ? selected : Math.round((max + min) / 2);

  var html = "";
  for (var i = min; i <= max; i++) {
    html += '<option ';

    if (i === selected) {
      html += 'selected="selected" ';
    }

    html += 'value="' + i + '">' + i + '</option>';
  }

  $('#arraysize').html(html);

  // Save the min and max values as data attributes so
  // they can be used by processArrayValues()
  $('#arraysize').data('min', min);
  $('#arraysize').data('max', max);
}

/**
 * Resets the AV to its initial state
 */
function reset(flag) {
  // Replace the contents of the avcontainer with the save initial state
  avc.unbind().html(emptyContent);

  // Clear the array values field, when no params given and reset button hit
  if (flag !== true && !$('#arrayValues').prop("disabled")) {
    $('#arrayValues').val("");
  }
}

/**
 * Validates the array values a user enters or generates an array of random numbers if none are provided
 */
function processArrayValues(upperLimit) {
  upperLimit = (upperLimit) ? upperLimit : 999;

  if (!$('#arraysize').data('min') || !$('#arraysize').data('max')) {
    console.warn('processArrayValues() called without calling initArraySize()');
  }

  var i,
      initData = {},
      minSize = $('#arraysize').data('min'),
      maxSize = $('#arraysize').data('max'),
      msg = "Please enter " + minSize + " to " + maxSize + " positive integers between 0 and " + upperLimit;

  // Convert user's values to an array,
  // assuming values are space separated
  var arrValues = $('#arrayValues').val().match(/[0-9]+/g) || [];

  if (arrValues.length === 0) { // Empty field
    // Generate (appropriate length) array of random numbers between 0 and the given upper limit
    for (i = 0; i < $('#arraysize').val(); i++) {
      arrValues[i] = Math.floor(Math.random() * (upperLimit + 1));
    }
    initData.gen_array = arrValues;
  } else {
    // Ensure user provided array is in correct range
    if (arrValues.length < minSize || arrValues.length > maxSize) {
      alert(msg);
      return null;
    }

    // Ensure all user entered values are positive integers
    for (i = 0; i < arrValues.length; i++) {
      arrValues[i] = Number(arrValues[i]);
      if (isNaN(arrValues[i]) || arrValues[i] < 0 || arrValues[i] > upperLimit) {
        alert(msg);
        return null;
      }
    }

    initData.user_array = arrValues;

    // Update the arraysize dropdown to match the length of the user entered array
    $('#arraysize').val(arrValues.length);
  }

  // Dynamically log initial state of text boxes
  $('input[type=text]').each(function (index, item) {
    var id = $(item).attr('id');

    if (id !== 'arrayValues') {
      initData['user_' + id] = $(item).val();
    }
  });

  // Dynamically log initial state of dropdown lists
  $('select').each(function (index, item) {
    var id = $(item).attr('id');
    initData['user_' + id] = $(item).val();
  });

  // Log initial state of exercise
  logExerciseInit(initData);

  return arrValues;
}

(function ($) {
//*****************************************************************************
//*************                  JSAV Extensions                  *************
//*****************************************************************************
  /**
   * Extends the JSAV AV array to have the slice functionality of JavaScript arrays
   */
  JSAV._types.ds.AVArray.prototype.slice = function (start, end) {
    var array = [];

    for (var i = 0; i < (end - start); i++) {
      array[i] = this.value(start + i);
    }

    return array;
  };

  /**
   * Extends the JSAV array with an isEmpty method that returns true
   * if the array contains no values
   */
  JSAV._types.ds.AVArray.prototype.isEmpty = function () {
    for (var i = 0; i < this.size(); i++) {
      if (this.value(i) !== "") { return false; }
    }
    return true;
  };

  /**
   * Convenience function for highlighting the pivot value in blue
   */
  JSAV._types.ds.AVArray.prototype.highlightBlue = function (index) {
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

    // Sets the arrow for every element specified
    $elems.each(function (index, item) {
      if (!$elems.hasClass("jsavarrow")) {
        $elems.toggleClass("jsavarrow");
      }

      if ($elems.hasClass("rightarrow")) {
        // If the selected index already has a right arrow, remove it
        // and add leftrightarrow class
        $elems.toggleClass("rightarrow");
        $elems.toggleClass("leftrightarrow");
      } else if (!$elems.hasClass("leftarrow")) {
        // If the index does not have a right arrow, add a left one
        $elems.toggleClass("leftarrow");
      }
    });
  });

  /**
   * Creates a right bound indicator above the specified indices
   * Does nothing if the element already has a right bound arrow above it
   */
  JSAV._types.ds.AVArray.prototype.setRightArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    // Sets the arrow for every element specified
    $elems.each(function (index, item) {
      if (!$elems.hasClass("jsavarrow")) {
        $elems.toggleClass("jsavarrow");
      }

      if ($elems.hasClass("leftarrow")) {
        // If the selected index already has a left arrow, remove it
        // and add leftrightarrow class
        $elems.toggleClass("leftarrow");
        $elems.toggleClass("leftrightarrow");
      } else if (!$elems.hasClass("rightarrow")) {
        // If the index does not have a left arrow, add a right one
        $elems.toggleClass("rightarrow");
      }
    });
  });

  /**
   * Removes a left arrow (if it exists) from above the specified indices
   */
  JSAV._types.ds.AVArray.prototype.clearLeftArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    // Clears the arrow for every element specified
    $elems.each(function (index, item) {
      if ($elems.hasClass("leftrightarrow")) {
        // Replace the shared bound indicator with a right bound indicator
        $elems.toggleClass("leftrightarrow");
        $elems.toggleClass("rightarrow");
      } else if ($elems.hasClass("leftarrow")) {
        // Remove the left arrow
        $elems.toggleClass("leftarrow");
        $elems.toggleClass("jsavarrow");
      }
    });
  });

  /**
   * Removes a right arrow (if it exists) from above the specified indices
   */
  JSAV._types.ds.AVArray.prototype.clearRightArrow = JSAV.anim(function (indices) {
    var $elems = JSAV.utils._helpers.getIndices($(this.element).find("li"), indices);

    // Clears the arrow for every element specified
    $elems.each(function (index, item) {
      if ($(item).hasClass("leftrightarrow")) {
        // Replace the shared bound indicator with a left bound indicator
        $(item).toggleClass("leftrightarrow");
        $(item).toggleClass("leftarrow");
      } else if ($(item).hasClass("rightarrow")) {
        // Remove the right arrow
        $(item).toggleClass("rightarrow");
        $(item).toggleClass("jsavarrow");
      }
    });
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

//*****************************************************************************
//*************                      LOGGING                      *************
//*****************************************************************************
  $(document).ready(function () {
    // Initialize the global AV_NAME variable
    AV_NAME = getNameFromURL();
    
    avc = $('.avcontainer');
    emptyContent = $(avc).html();
  
    if (serverEnabled()) {
      // Log the browser ready event
      logUserAction(AV_NAME, 'document-ready', 'User loaded the ' + AV_NAME + ' AV');

      // Send any stored event data when the page loads
      if (userLoggedIn()) {
        flushStoredData();
      } else {
        sendEventData();
      }

      $(window).focus(function (e) {
        logUserAction(AV_NAME, 'window-focus', 'User looking at ' + AV_NAME + ' window');
      });

      $(window).blur(function (e) {
        logUserAction(AV_NAME, 'window-blur', 'User is no longer looking at ' + AV_NAME + ' window');
      });

      $(window).on('beforeunload', function () {
        // Log the browser unload event
        logUserAction(AV_NAME, 'window-unload', 'User closed or refreshed ' + AV_NAME + ' window');
      });
    }
  });
}(jQuery));