/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
    "use strict";

    // this is used to clear the localStorage object
    // when the page refreshs
    $(() => {
        localStorage.clear();
    });

    function readableKey(keydata){
        var keydataS = arrayBufferToString(keydata);
        var keydataB64 = window.btoa(keydataS);
        return keydataB64;
    }

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
        var readable = readableKey(exported);

        if (selector === ".publicKey") {
            localStorage.publicKey = buffer
            localStorage.publicKeyReadable = readable;
        }
        else if (selector === ".privateKey") {
            localStorage.privateKey = buffer;
            localStorage.privateKeyReadable = readable;
        }
        $(selector).val(readable);
    }
 
    function generateKeys() {
        crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048,
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

    function copyKey() {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        
        if (this.id === "copyPublicKey") {
            dummy.value = $(".publicKey").val();
        }
        else if (this.id === "copyPrivateKey") {
            dummy.value = $(".privateKey").val();
        }

        dummy.select();
        document.execCommand("copy");
        dummy.remove();
    }

    $(".getKeys").click(generateKeys);
    $("#copyPublicKey").click(copyKey);
    $("#copyPrivateKey").click(copyKey);
});