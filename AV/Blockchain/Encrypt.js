/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
  "use strict";

  function getMessageEncoding() {
    return new TextEncoder().encode(localStorage.secretMsg);
  }

  $(function() {
    $(window).bind("storage", (e) => {
      $(".secretMsg").val(localStorage.secretMsg);
    });
  });

  function getMessageEncoding() {
    return new TextEncoder().encode(localStorage.secretMsg);
  }

  async function encryptMessage() {
    let encoded = getMessageEncoding();
    let publicKey = (await keys).publicKey;
    await crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        localStorage.publicKey,
        encoded
    ).then(encrypted => localStorage.cipherText = encrypted);
        
    $(".encryptMsg").val(localStorage.cipherText);
  }

  $(".encrypt").click(encryptMessage);
});
