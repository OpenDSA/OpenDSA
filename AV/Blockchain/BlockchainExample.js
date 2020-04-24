/*global alert: true, ODSA */
$(document).ready(function() {
    "use strict";

    ODSA.UTILS.loadConfig();

    // Creates the hash
    function sha256(blockNum, data, prevHash = "") {
        // encode as UTF-8
        return CryptoJS.SHA256(prevHash + blockNum + data).toString().substring(0,16);
    }

    function testKeyDown(e) {
        var one = 1, two = 2, three = 3;
        var block1Data = $("#data1").val();
        var block2Data = $("#data2").val();
        var block3Data = $("#data3").val();
        var block1Hash, block2Hash, block3Hash;

        block1Hash = sha256(one, block1Data);

        block2Hash = sha256(two, block2Data, block1Hash);

        block3Hash = sha256(three, block3Data, block2Hash);

        if (e.target.id === "data1") {
            $("#block1PrevHash").val("0000000000000000");
            $("#block1Hash").val(block1Hash);
            $("#block2Hash").val(block2Hash);
            $("#block2PrevHash").val(block1Hash);
            $("#block3PrevHash").val(block2Hash);
        }
        else if (e.target.id === "data2") {
            $("#block2Hash").val(block2Hash);
            $("#block3PrevHash").val(block2Hash);
        }
        $("#block3Hash").val(block3Hash);

        if ($("#arrow1").css("display") === "none") {
            $("#arrow1").css("display", "block");
            $("#arrow2").css("display", "block");
        }
    }

    // Connect action callbacks to the HTML entities
    $(".data").keyup(testKeyDown);
});
