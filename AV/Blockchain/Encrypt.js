/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
  // "use strict";

// Declare and initialize state variables
var config = ODSA.UTILS.loadConfig(),
  interpret = config.interpreter;  

  function getMessageEncoding() {
    return new TextEncoder().encode(localStorage.secretMsg);
  }

  $(function() {
    $(window).bind("storage", (e) => {
      $(".secretMsg").val(localStorage.secretMsg);
    });
  });

  function getMessageEncoding() {
    console.log("message: " + localStorage.secretMsg)
    let enc = new TextEncoder();
    let msg = localStorage.secretMsg;
    return enc.encode(msg.value);
  }

  function getPublicKey() {
    var array = localStorage.publicKey.split(",");
    var keyData = Uint8Array.from(array, x => Number(x));
    return crypto.subtle.importKey(
      "spki", 
      keyData.buffer, 
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      }, 
      true, 
      ["encrypt"]);
  }

  async function encryptMessage() {
    // if($(".publicKey").val() === "") {
    //   alert("Please insert a public key to encrypt");
    //   return;
    // }

    let encoded = getMessageEncoding();
    var publicKey = await getPublicKey();
    // console.log("encrypted: " + encoded)
    console.log(publicKey)
    var encryptedMsg = await crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        publicKey,
        encoded
    ).catch(err => console.log(err.name));
    // localStorage.cipherText = encryptedMsg;
    console.log(new Uint8Array(encryptedMsg));
    // $(".encryptMsg").val(localStorage.cipherText);
  }

  $(".encrypt").click(encryptMessage);
});
