/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
  // "use strict";

// Declare and initialize state variables
var config = ODSA.UTILS.loadConfig(),
  interpret = config.interpreter;  

  $(function() {
    $(window).bind("storage", () => {
      $(".secretMsg").val(localStorage.secretMsg);
    });
  });

  function encryptMessage() {
    var crypt = new JSEncrypt();
    var publicKey = $(".publicKey").val();
    crypt.setPublicKey(publicKey);
    localStorage.publicKey = publicKey;
    var secretMsg = $(".secretMsg").val();
    var cipherText = crypt.encrypt(secretMsg);
    localStorage.encryptedText = cipherText;
    $(".encryptMsg").val(cipherText);
  }

  $(".encrypt").click(encryptMessage);
});
