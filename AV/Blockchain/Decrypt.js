/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
    "use strict";  
    $(function() {
      $(window).bind("storage", () => {
        var encryptedMsg = localStorage.encryptedText;
        $(".encryptedMsg").val(encryptedMsg);
      });
    });
  
    function decryptMessage() {
      var crypt = new JSEncrypt();
      var privateKey = $(".privateKey").val();
      crypt.setPrivateKey(privateKey);
      var encryptMsg = $(".encryptedMsg").val();
      var decodedText = crypt.decrypt(encryptMsg);
      $(".decryptMsg").val(decodedText);
    }
  
    $(".decrypt").click(decryptMessage);
  });
  