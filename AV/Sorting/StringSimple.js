"use strict";
/*global alert: true, awardCompletionCredit, getAVName */
(function ($) {
  // Declare and initialize state variables
  var
    keyValue = $('input[name="keyvalue"]').val();
  // Convenience function for writing output messages
  var tell = function (msg) { $('p[class="output"]').html(msg); };

  // Validate Table size field
  function CheckKey() {
    keyValue = $('input[name="keyvalue"]').val();
  }

  // Main action: Result of clicking "Calculate" button
  function Calculate() {
    var i;
    var output = 0;
    for (i = 0; i<keyValue.length; i++) {
      output += keyValue.charCodeAt(i);
    }
console.log(keyValue + " " + output);
    tell('<br/>' + output);
    awardCompletionCredit(getAVName());
  }

  // Action callbacks for form entities
  $('input[name="keyvalue"]').focusout(CheckKey);
  $('input[name="calculate"]').click(Calculate);
}(jQuery));
