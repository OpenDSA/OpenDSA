/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
  "use strict";
  // Declare and initialize state variables
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter;       // get the interpreter

  // Convenience function for writing output messages
  function tell(msg) {
    $(".output").val(msg);
  }

  async function sha256(input) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(input);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

  // Main action: Result of clicking "Calculate" button
  // Most of this behavior relates to checking against the expected
  // answer for giving credit to the obsolete exercise.
  function CreateHash() {
    var input = $("#inputArea").val();
    sha256(input).then(res => {
        tell(res);
    });
  }

  // Action callbacks for form entities
  $("#inputArea").keyup(CreateHash);
});
