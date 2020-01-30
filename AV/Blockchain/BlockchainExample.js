/*global alert: true, ODSA */
$(document).ready(function() {
    "use strict";

    async function sha256(blockNum, data, prevHash = "") {
        // encode as UTF-8
        const msgBuffer = new TextEncoder('utf-8').encode(prevHash + blockNum + data);                    

        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string                  
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
        return hashHex;
    }

    var RecomputeHashes = () => {
        var one = 1, two = 2, three = 3;
        var block1Data = $("#blockNum1").text();
        var block2Data = $("#blockNum2").text();
        var block3Data = $("#blockNum3").text();

        // create the block one hash
        var block1Hash;
        sha256(one, block1Data).then(res => {
            block1Hash = res;
        });

        //create the second block hash
        var block2Hash;
        sha256(two, block2Data, block1Hash).then(res => {
            block2Hash = res;
        });

        //create the second block hash
        var block3Hash;
        sha256(three, block3Data, block2Hash).then(res => {
            block3Hash = res;
        });

        $("#block1Hash").text(block1Hash);
        $("#block2Hash").text(block2Hash);
        $("#block3Hash").text(block3Hash);
        $("#block2PrevHash").text(block1Hash);
        $("#block3PrevHash").text(block2Hash);
    }



    // Connect action callbacks to the HTML entities
    $("#calculate").click(RecomputeHashes);
});
