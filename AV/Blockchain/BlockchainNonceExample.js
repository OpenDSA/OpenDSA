/*global alert: true, ODSA */
$(document).ready(function() {
    "use strict";

    ODSA.UTILS.loadConfig();

    const defaultHash = "0000000000000000000000000000000000000000000000000000000000000000";

    // Creates the hash
    async function sha256(blockNum, data, nonce, prevHash = defaultHash) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder('utf-8').encode(blockNum + nonce + data + prevHash);

        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string                  
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
        console.log("hashHex: " + hashHex);
        return hashHex;
    }

    function checkHash() {
        if ($("#block1Hash").val().substring(0,4) === "0000") {
            $("#cell1").css("background-color", "#E2EEDD");
            $("#arrow1").css("display", "block");
        }
        else {
            $("#cell1").css("background-color", "#FA8072");
            $("#arrow1").css("display", "none");
        }

        if ($("#block2Hash").val().substring(0,4) === "0000") {
            $("#cell2").css("background-color", "#E2EEDD");
            $("#arrow2").css("display", "block");
        }
        else {
            $("#cell2").css("background-color", "#FA8072");
            $("#arrow2").css("display", "none");
        }

        if ($("#block3Hash").val().substring(0,4) === "0000") {
            $("#cell3").css("background-color", "#E2EEDD");
        }
        else {
            $("#cell3").css("background-color", "#FA8072");
        }
    }

    async function testKeyDown() {
        var one = 1, two = 2, three = 3;
        var block1Data = $("#data1").val();
        var block2Data = $("#data2").val();
        var block3Data = $("#data3").val();
        var block1Nonce = $("#nonce1").val();
        var block2Nonce = $("#nonce2").val();
        var block3Nonce = $("#nonce3").val();
        var block1Hash, block2Hash, block3Hash;

        await sha256(one, block1Data, block1Nonce).then(res => {
            console.log("one: " + one);
            console.log("data: " + block1Data);
            console.log("nonce: " + block1Nonce);
            console.log("Prev: " + block1Hash)
            console.log("Hash: " + res);
            block1Hash = res;
        });

        await sha256(two, block2Data, block2Nonce, block1Hash).then(res => {
            block2Hash = res;
        });

        await sha256(three, block3Data, block3Nonce, block2Hash).then(res => {
            block3Hash = res;
        });

        $("#block1PrevHash").val(defaultHash);
        $("#block1Hash").val(block1Hash);
        $("#block2Hash").val(block2Hash);
        $("#block2PrevHash").val(block1Hash);
        $("#block3PrevHash").val(block2Hash);
        $("#block2Hash").val(block2Hash);
        $("#block3PrevHash").val(block2Hash);
        $("#block3Hash").val(block3Hash);

        checkHash();
    }

    async function mine() {
        // Setting up a max nonce
        var maxNonce = 500000;
        var one = 1, two = 2, three = 3;
        var block1Data = $("#data1").val();
        var block2Data = $("#data2").val();
        var block3Data = $("#data3").val();
        var block1Hash, block2Hash, block3Hash;
        
        for (var i = 0; i < maxNonce; i++) {
            await sha256(one, block1Data, i).then(res => {
                block1Hash = res;
            });

            if (block1Hash.substring(0,4) === "0000") {
                $("#block1Hash").val(block1Hash);
                $("#block2PrevHash").val(block1Hash);
                $("#nonce1").val(i);
                checkHash();
                break;
            }
        }

        for (var i = 0; i < maxNonce; i++) {
            await sha256(two, block2Data, i).then(res => {
                block2Hash = res;
            });

            if (block2Hash.substring(0,4) === "0000") {
                $("#block2Hash").val(block2Hash);
                $("#block3Hash").val(block2Hash);
                $("#nonce2").val(i);
                checkHash();
                break;
            }
        }

        for (var i = 0; i < maxNonce; i++) {
            await sha256(three, block3Data, i).then(res => {
                block3Hash = res;
            });

            if (block3Hash.substring(0,4) === "0000") {
                $("#block3Hash").val(block3Hash);
                $("#nonce3").val(i);
                break;
            }
        }

    }

    // Connect action callbacks to the HTML entities
    $(".data").keyup(testKeyDown);
    $(".nonce").keyup(testKeyDown);
    $("#mine").click(mine)
});
