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
  
    function sha256(blockNum, data) {
      // create hash
      let hash = CryptoJS.SHA256(blockNum + data);
      
      return hash.toString().substring(0, 16);
  }
  
    // Main action: Result of clicking "Calculate" button
    // Most of this behavior relates to checking against the expected
    // answer for giving credit to the obsolete exercise.
    function CreateHash() {
      var data = $("#tablesize").val();
      var blockNum = $("#blockNum").val();
      tell(sha256(blockNum, data));
    }
  
    // Action callbacks for form entities
    $("#tablesize").keyup(CreateHash);
    $("#blockNum").keyup(CreateHash);
  });
  