/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
  "use strict";

  function setMessage() {
    localStorage.secretMsg = $("#inputSecretMsg").val();
  }

  $("#inputSecretMsg").keyup(setMessage);
});
