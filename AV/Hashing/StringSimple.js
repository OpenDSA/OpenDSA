"use strict";
/*global logExerciseInit, awardCompletionCredit */
(function ($) {
  // Declare and initialize state variables
  var
    keyValue = $('#keyvalue').val();
  // Convenience function for writing output messages
  var tell = function (msg) { $('p[class="output"]').html(msg); };

  // Validate Table size field
  function CheckKey() {
    keyValue = $('#keyvalue').val();
  }

  // Main action: Result of clicking "Calculate" button
  function Calculate() {
    logExerciseInit({'user_key': keyValue});
    
    var i;
    var output = 0;
    for (i = 0; i < keyValue.length; i++) {
      output += keyValue.charCodeAt(i);
    }
    tell('<br/>' + output);
    awardCompletionCredit();
  }

  // Action callbacks for form entities
  $('#keyvalue').focusout(CheckKey);
  $('#calculate').click(Calculate);
}(jQuery));
