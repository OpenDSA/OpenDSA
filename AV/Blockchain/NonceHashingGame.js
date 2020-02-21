/*global alert: true, console: true, ODSA */
$(document).ready(function () {
    "use strict";
    // Declare and initialize state variables
    var leadingZeroCredit = false, // Credit flag for question 2
        noCredit = true;        // Have not yet given credit
    var config = ODSA.UTILS.loadConfig(),
        interpret = config.interpreter;       // get the interpreter

    // Convenience function for writing output messages
    function tell(msg) {
        $("p.output").text(msg);
    }

    // Process About button: Pop up a message with an Alert
    function about() {
        alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
    }

    // Validate number of records field
    function CheckNonce() {
        var nonce = Number($("#nonce").val());
        if (isNaN(nonce) || (nonce < 1)) {
            alert("Invalid Nonce!");
            $("#nonce").val("");
            $(".output").val("");
        }
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

    // Convenience function for writing output messages
    function tell(msg) {
        $(".output").val(msg);
    }

    // Main action: Result of clicking "Calculate" button
    // Most of this behavior relates to checking against the expected
    // answer for giving credit to the obsolete exercise.
    function CreateHash() {
        var input = $("#inputArea").val().concat($("#nonce").val());

        sha256(input).then(res => {
            tell(res);
        });
    }


    // Main action: Result of clicking "Calculate" button
    // Most of this behavior relates to checking against the expected
    // answer for giving credit to the obsolete exercise.
    function Check() {

        var output = $(".output").val();

        if (output.charAt(0) == '0') {
            leadingZeroCredit = true;
        }

        if (leadingZeroCredit && noCredit) {
            ODSA.AV.awardCompletionCredit();
            noCredit = false;  // Don't keep trying to assign credit
        }
    }

    // Action callbacks for form entities
    $("#about").click(about);
    $("#inputArea").keyup(CreateHash);
    $("#nonce").keyup(CreateHash);
    $("#nonce").focusout(CheckNonce);
    $("#check").click(Check);
});