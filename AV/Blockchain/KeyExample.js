/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
    "use strict";
    // Declare and initialize state variables
    var config = ODSA.UTILS.loadConfig(),
        interpret = config.interpreter;       // get the interpreter

    // Action callbacks for form entities
    $(".encrypt").click(() => {
        $(".encryptMsg").val(CryptoJS.AES.encrypt($(".msg").val(), "Test Passphrase"));
        $(".decrypt").prop('disabled', false);
        $(".encrypt").prop('disabled', true);
        if ($(".decryptMsg").val() !== "") {
            $(".decryptMsg").val("");
            $(".msgReadable").val("");
        }
    });

    $(".decrypt").click(() => {
        var decrypt = CryptoJS.AES.decrypt($(".encryptMsg").val(), "Test Passphrase");
        $(".decryptMsg").val(decrypt);
        $(".msgReadable").val(decrypt.toString(CryptoJS.enc.Utf8));
        $(".decrypt").prop('disabled', true);
        $(".encrypt").prop('disabled', false);
    });
  });
  