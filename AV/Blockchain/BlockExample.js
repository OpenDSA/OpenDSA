/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
    "use strict";
    // Declare and initialize state variables
    var tsize = Number($("#tablesize").val()), // Table size
        recs = Number($("#numrecs").val()), // Number of records
        birthCredit = false,    // Credit flag for question 1
        thousandCredit = false, // Credit flag for question 2
        noCredit = true;        // Have not yet given credit
    var config = ODSA.UTILS.loadConfig(),
        interpret = config.interpreter;       // get the interpreter
  
    // Convenience function for writing output messages
    function tell(msg) {
      $(".output").val(msg);
    }
  
    // Process About button: Pop up a message with an Alert
    function about() {
      alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
    }
  
    async function sha256(blockNum, data) {
      // encode as UTF-8
      const msgBuffer = new TextEncoder('utf-8').encode(blockNum + data);                    
  
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
      var data = $("#tablesize").val();
      var blockNum = $("#blockNum").val();
      sha256(blockNum, data).then(res => {
          tell(res);
      });
    }
  
    // Action callbacks for form entities
    $("#about").click(about);
    $("#calculate").click(CreateHash);
  });
  