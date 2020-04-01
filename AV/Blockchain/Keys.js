/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
    "use strict";

    function readableKey(keydata){
        var keydataS = arrayBufferToString(keydata);
        var keydataB64 = window.btoa(keydataS);
        return keydataB64;
    }

    // function formatAsPem(str) {
    //     var finalString = "";
    //     while(str.length > 0) {
    //         finalString += str.substring(0, 64) + '\n';
    //         str = str.substring(64);
    //     }
    //     return finalString;
    // }

    function arrayBufferToString( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return binary;
    }

    async function exportKey(key, selector) {
        // try {

            console.log(key)
            const exported = await window.crypto.subtle.exportKey(
                "pkcs8",
                key
            );
        // }
        // catch (ex) {
        //     console.log(ex)
        // }
        var pem = readableKey(exported)
        console.log(pem)
        $(selector).val(pem);
    }
    
    function generateKeys() {
        crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                // Consider using a 4096-bit key for systems that require long-term security
                modulusLength: 512,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: {name: "SHA-256"},
            },
            true,
            ["encrypt", "decrypt"]
        ).then(keys => {
            localStorage.publicKey = keys.publicKey;
            localStorage.privateKey = keys.privateKey;
            exportKey(keys.publicKey, ".publicKey");
            exportKey(keys.privateKey, ".privateKey");
        });
    }

    async function copyKey(type) {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        if (type === "public") {
            dummy.value = $(".publicKey").val();
        }
        else if (type === "private") {
            dummy.value = $(".privateKey").val();
        }
        dummy.select();
        document.execCommand("copy");
        dummy.remove();
    }

    $(".getKeys").click(generateKeys);
    $("#copyPublicKey").click(copyKey("public"));
    $("#copyPrivateKey").click(copyKey("private"));
});