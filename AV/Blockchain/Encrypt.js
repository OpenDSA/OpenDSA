/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
  // "use strict";

// Declare and initialize state variables
var config = ODSA.UTILS.loadConfig(),
  interpret = config.interpreter;  

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

  function getMessageEncoding() {
    return new TextEncoder().encode(localStorage.secretMsg);
  }

  $(function() {
    $(window).bind("storage", () => {
      $(".secretMsg").val(localStorage.secretMsg);
    });
  });

  function getMessageEncoding() {
    let enc = new TextEncoder();
    return enc.encode(localStorage.secretMsg);
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
    // if the public key is not correct
    if (localStorage.publicKeyReadable !== $(".publicKey").val()) {
      alert("Enter the correct public key from above.");
      return;
    }

    let encoded = getMessageEncoding();
    var publicKey = await getPublicKey();
    
    var encrypted = await crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        publicKey,
        encoded
    );
    
    var buffer = new Uint8Array(encrypted).toString();
    localStorage.encryptedText = buffer;
    $(".encryptMsg").val(new TextDecoder().decode(new Uint8Array(encrypted)));
  }

  $(".encrypt").click(encryptMessage);
});
