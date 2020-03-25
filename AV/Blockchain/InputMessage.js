/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
  "use strict";
  // Declare and initialize state variables
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter;       // get the interpreter
    
    // setting up variables
    var plainText = "Great job, you successfully decrypted my secret message";
    let privateKey = "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQABAoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fvxTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeHm7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAFz/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIMV7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATeaTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5AzilpsLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Ozuku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876";
    let publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB";
    var encrypted = "";
    function encryptMsg() {
        // var encrypt = new JSEncrypt();
        // encrypt.setPublicKey(publicKey);
        // encrypted = encrypt.encrypt(plainText);
        // $(".encryptMsg").val(encrypted);
    }

    function decryptMsg() {
        // var decrypt = new JSEncrypt();
        // var usersKey = $(".publicKey").val();
        // console.log(usersKey)
        // decrypt.setPrivateKey(usersKey);
        // var decrypted = decrypt.decrypt(encrypted);
        // $(".decryptMsg").val(decrypted)
    }

    function copyPrivateKey() {
        // var dummy = document.createElement("textarea");
        // // to avoid breaking orgain page when copying more words
        // // cant copy when adding below this code
        // // dummy.style.display = 'none'
        // document.body.appendChild(dummy);
        // //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        // dummy.value = privateKey;
        // dummy.select();
        // document.execCommand("copy");
        // dummy.remove();
    }

    encryptMsg();

    $(".decrypt").click(decryptMsg);

    $(".copyKey").click(copyPrivateKey);
});
