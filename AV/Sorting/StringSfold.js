"use strict";
/*global alert: true, console: true, awardCompletionCredit, getAVName */
(function ($) {
  // Declare and initialize state variables
  var keyValue = $('#keyvalue').val();
  // Convenience function for writing output messages
  var tell = function (msg) { $('p[class="output"]').html(msg); };

  // Validate Table size field
  function CheckKey() {
    keyValue = $('#keyvalue').val();
  }

  function sfold(s) {
    var intLength = Math.floor(s.length / 4);
    console.debug("String: |" + s + "| of length " + s.length + "; intLength: " + intLength);
    var sum = 0;
    var j, k;
    var curr = 0;
    var mult;
    for (j = 0; j < intLength; j++) {
      mult = 1;
      for (k = 0 ; k < 4; k++) {
        sum += s.charCodeAt(curr) * mult;
        console.debug("curr: " + curr + "; Add " + s.charCodeAt(curr) + " * " + mult + " = " + s.charCodeAt(curr) * mult);
        curr++;
        mult *= 256;
      }
    }

    mult = 1;
    while (curr < s.length) {
      sum += s.charCodeAt(curr) * mult;
      console.debug("curr: " + curr + "; Add " + s.charCodeAt(curr) + " * " + mult + " = " + s.charCodeAt(curr) * mult);
      curr++;
      mult *= 256;
    }

    return sum;
  }

  // Main action: Result of clicking "Calculate" button
  function Calculate() {
    var i;
    var output = sfold(keyValue);
    tell('<br/>' + output);
    awardCompletionCredit(getAVName());
  }

  // Action callbacks for form entities
  $('#keyvalue').focusout(CheckKey);
  $('#calculate').click(Calculate);
}(jQuery));
