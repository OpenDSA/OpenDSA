/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
  "use strict";
  // Declare and initialize state variables
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter;       // get the interpreter

  function sha256(input) {
    return CryptoJS.SHA256(input);
    // return "0000" + hash.toString().substring(4, hash.length);
}

  // Main action: Result of clicking "Calculate" button
  // Most of this behavior relates to checking against the expected
  // answer for giving credit to the obsolete exercise.
  function CreateHash() {
    var input = $("#inputArea").val();
    var hash = sha256(input);
    $(".output").val(hash);
  }

  // Action callbacks for form entities
  $("#inputArea").keyup(CreateHash);
});
