/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
  "use strict";
  
  let keys = crypto.subtle.generateKey(
    {
        name: "RSA-OAEP",
        // Consider using a 4096-bit key for systems that require long-term security
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: {name: "SHA-256"},
    },
    true,
    ["encrypt", "decrypt"]
  );

  var secretMsg = "";
  var cipherText = "";

  function setMessage() {
    secretMsg = $("#inputSecretMsg").val();
  }

  function getMessageEncoding() {
    return new TextEncoder().encode(secretMsg);
  }

  /*
    need to try and make a function that will determine if the 
    keys are on the screen and if they are, we need to display them.
    Or, i can make it easy in the beginning and have them click a 
    button to obtain them. Can use alerts if they have not typed a secret 
    message yet.
  */

  async function encryptMessage() {
    let encoded = getMessageEncoding();
    let publicKey = (await keys).publicKey;
    await crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        publicKey,
        encoded
    ).then(encrypted => cipherText = encrypted);
        
    $(".encryptMsg").val(`${buffer}...[${cipherText.byteLength} bytes total]`);
  }

  async function decryptMessage() {
    let privateKey = (await keys).privateKey;
    var decrypted = await crypto.subtle.decrypt(
        {
          name: "RSA-OAEP"
        },
        privateKey,
        cipherText
    );

    console.log(cipherText)
    $(".decryptMsg").val(new TextDecoder().decode(decrypted))
    console.log(data)
  }

  $("#inputSecretMsg").keyup(setMessage);
  $(".encrypt").click(encryptMessage);
  $(".decrypt").click(decryptMessage);
});
