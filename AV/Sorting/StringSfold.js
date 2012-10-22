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

  function sfold(s) {
    var intLength = Math.floor(s.length / 4);
console.log("String: |" + s + "| of length " + s.length + "; intLength: " + intLength);
    var sum = 0;
    var j, k;
    var curr = 0;
    var mult;
    for (j = 0; j < intLength; j++) {
      mult = 1;
      for (k = 0 ; k < 4; k++) {
	sum += keyValue.charCodeAt(curr) * mult;
console.log("curr: " + curr + "; Add " + keyValue.charCodeAt(curr) + " * " + mult + " = " + keyValue.charCodeAt(curr) * mult);
        curr++;
	mult *= 256;
      }
    }

    mult = 1;
    while (curr < s.length) {
      sum += keyValue.charCodeAt(curr) * mult;
console.log("curr: " + curr + "; Add " + keyValue.charCodeAt(curr) + " * " + mult + " = " + keyValue.charCodeAt(curr) * mult);
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
  $('input[name="keyvalue"]').focusout(CheckKey);
  $('input[name="calculate"]').click(Calculate);
}(jQuery));
