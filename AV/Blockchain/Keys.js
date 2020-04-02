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

    async function exportKey(key, selector, format) {
        const exported = await window.crypto.subtle.exportKey(
            format,
            key
        );
        
        var buffer = new Uint8Array(exported).toString();
        // var string = buffer.ToString();
        console.log("buffer:")
        console.log(exported)
        console.log(buffer)
        var readable = readableKey(exported);
        if (selector === ".publicKey") {
            localStorage.publicKey = buffer
        }
        else if (selector === ".privateKey") {
            localStorage.privateKey = buffer;
        }
        $(selector).val(readable);
    }
    function getMessageEncoding() {
        console.log("message: " + localStorage.secretMsg)
        let enc = new TextEncoder();
        return enc.encode(localStorage.secretMsg);
      }
    function generateKeys() {
        crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 512,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: {name: "SHA-256"},
            },
            true,
            ["encrypt", "decrypt"]
        ).then(keys => {
            exportKey(keys.publicKey, ".publicKey", "spki");
            exportKey(keys.privateKey, ".privateKey", "pkcs8");
        });
    }

    function copyKey(type) {
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

    // ------------ added stuff--------------
    // function arrayBufferToBase64(arrayBuffer) {
    //     var byteArray = new Uint8Array(arrayBuffer);
    //     var byteString = '';
    //     for(var i=0; i < byteArray.byteLength; i++) {
    //         byteString += String.fromCharCode(byteArray[i]);
    //     }
    //     var b64 = window.btoa(byteString);
    
    //     return b64;
    // }
    
    // function addNewLines(str) {
    //     var finalString = '';
    //     while(str.length > 0) {
    //         finalString += str.substring(0, 64) + '\n';
    //         str = str.substring(64);
    //     }
    
    //     return finalString;
    // }
    
    // function toPem(privateKey) {
    //     var b64 = addNewLines(arrayBufferToBase64(privateKey));
    //     var pem = "-----BEGIN PRIVATE KEY-----\n" + b64 + "-----END PRIVATE KEY-----";
        
    //     return pem;
    // }
    
    // // Let's generate the key pair first
    // window.crypto.subtle.generateKey(
    //     {
    //         name: "RSA-OAEP",
    //         modulusLength: 2048, // can be 1024, 2048 or 4096
    //         publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    //         hash: {name: "SHA-256"} // or SHA-512
    //     },
    //     true,
    //     ["encrypt", "decrypt"]
    // ).then(function(keyPair) {
    //     /* now when the key pair is generated we are going
    //        to export it from the keypair object in pkcs8
    //     */
    //     window.crypto.subtle.exportKey(
    //         "pkcs8",
    //         keyPair.privateKey
    //     ).then(function(exportedPrivateKey) {
    //         // converting exported private key to PEM format
    //         var pem = toPem(exportedPrivateKey);
    //         console.log(pem);
    //     }).catch(function(err) {
    //         console.log(err);
    //     });
    // });
    // ---------- end of added ---------------

    $(".getKeys").click(generateKeys);
    $("#copyPublicKey").click(copyKey("public"));
    $("#copyPrivateKey").click(copyKey("private"));
});