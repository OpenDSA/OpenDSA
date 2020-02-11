/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
    "use strict";
    // Declare and initialize state variables
    var config = ODSA.UTILS.loadConfig(),
        interpret = config.interpreter;       // get the interpreter
  
    let cipherText;

    let keys = crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            // Consider using a 4096-bit key for systems that require long-term security
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );

    function getMessageEncoding() {
        const messageBox = $("#msg").val();
        let message = messageBox.value;
        let enc = new TextEncoder();
        return enc.encode(message);
    }

    async function encryptMessage() {
        let encoded = getMessageEncoding();
        cipherText = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            (await keys).publicKey,
            encoded
        );
    
        let buffer = new Uint8Array(cipherText, 0, 8);
        $(".encryptMsg").val(`${buffer}...[${cipherText.byteLength} bytes total]`);
        // ciphertextValue.classList.add('fade-in');
        // ciphertextValue.addEventListener('animationend', () => {
        //     ciphertextValue.classList.remove('fade-in');
        // });
        // ciphertextValue.textContent = `${buffer}...[${cipherText.byteLength} bytes total]`;
    }

    async function decryptMessage() {
        let privateKey = (await keys).privateKey;
        let decrypted = await crypto.subtle.decrypt(
            {
                name: "RSA-OAEP"
            },
            privateKey,
            cipherText
        );
        
        let dec = new TextDecoder();
        $(".decryptMsg").val(dec.decode(decrypted));
        console.log(dec.decode(decrypted));
    }
    
    // Action callbacks for form entities
    $(".encrypt").click(encryptMessage);
    $(".decrypt").click(decryptMessage);
  });
  