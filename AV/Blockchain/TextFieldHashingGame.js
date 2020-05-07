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

    function sha256(input) {
        // return Hash
        return CryptoJS.SHA256(input);
    }

    // Convenience function for writing output messages
    function tell(msg) {
        $(".output").val(msg);
    }

    // Main action: Result of clicking "Calculate" button
    // Most of this behavior relates to checking against the expected
    // answer for giving credit to the obsolete exercise.
    function CreateHash() {
        var input = $("#inputArea").val();
        var hash = sha256(input)
        tell(hash);

        Check();
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
});