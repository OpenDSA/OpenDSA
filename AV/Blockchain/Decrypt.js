/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
    "use strict";  
    $(function() {
      $(window).bind("storage", () => {
        // to make sure that there is no stale data in local storage
        if (localStorage.prevEncryptedText !== localStorage.encryptedText) {
          var encryptedBuffer = stringToBuffer(localStorage.encryptedText)
          var encryptedMsg = new TextDecoder().decode(encryptedBuffer);
          $(".encryptedMsg").val(encryptedMsg);
        }
        else {
          localStorage.prevEncryptedText = localStorage.encryptedText;
          localStorage.encryptedText = "";
        }
        
      });
    });

    function stringToBuffer(str) {
      var array = str.split(",");
      return Uint8Array.from(array, x => Number(x)).buffer;
    }

    function getPrivateKey() {
      var keyData = stringToBuffer(localStorage.privateKey);
      return crypto.subtle.importKey(
        "pkcs8", 
        keyData, 
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        }, 
        true, 
        ["decrypt"]);
    }
  
    async function decryptMessage() {
      if($(".publicKey").val() === "") {
        alert("Please insert a public key to encrypt");
        return;
      }

      var privateKey = await getPrivateKey();
      var encryptedBuffer = stringToBuffer(localStorage.encryptedText);

      var decrypted = await crypto.subtle.decrypt(
            {
              name: "RSA-OAEP"
            },
            privateKey,
            encryptedBuffer
        );
    
        $(".decryptMsg").val(new TextDecoder().decode(decrypted))
    }
  
    $(".decrypt").click(decryptMessage);
  });
  