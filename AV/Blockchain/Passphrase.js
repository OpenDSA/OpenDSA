/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
    "use strict";
    // Declare and initialize state variables
    var config = ODSA.UTILS.loadConfig(),
        interpret = config.interpreter;       // get the interpreter
      
    function savePassPhrase() {
      localStorage.passPhrase = $("#inputPassphrase").val();
    }

    $(".inputPassphrase").keyup(savePassPhrase);
  });
  