"use strict";
/*global serverEnabled, userLoggedIn, flushStoredData, sendEventData,
getAVName, logUserAction */
// General utilities

// Randomly scramble the contents of an array
function permute(A) {
  for (var i = 0; i < A.length; i++) {                // for each i
    var randompos = Math.floor(Math.random() * A.length);
    var temp = A[i];
    A[i] = A[randompos];
    A[randompos] = temp;
  }
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
  var avName = getAVName();

  $(document).ready(function () {
    if (serverEnabled()) {
      // Log the browser ready event
      logUserAction(avName, 'document-ready', 'User loaded the ' + avName + ' AV');

      // Send any stored event data when the page loads
      if (userLoggedIn()) {
        flushStoredData();
      } else {
        sendEventData();
      }

      $(window).focus(function (e) {
        logUserAction(avName, 'window-focus', 'User looking at ' + avName + ' window');
      });

      $(window).blur(function (e) {
        logUserAction(avName, 'window-blur', 'User is no longer looking at ' + avName + ' window');
      });
    }
  });
}(jQuery));