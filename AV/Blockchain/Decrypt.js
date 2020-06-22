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
      
      // since library only encrypts with public key and decrypts 
      // private key, lets try the reverse
      if (decodedText === null) {
        crypt.setPublicKey(privateKey);
        var e = crypt.encrypt(localStorage.secretMsg);
        crypt.setPrivateKey(localStorage.publicKey);
        decodedText = crypt.decrypt(e)
      }
      $(".decryptMsg").val(decodedText);
    }
  
    $(".decrypt").click(decryptMessage);
  });
