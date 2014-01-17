"use strict";
/*global console: true, ODSA */

(function ($) {

  var settings = ODSA.SETTINGS,
      odsaUtils = ODSA.UTILS;

  // Set the book ID (SHA1 hash of the book URL)
  settings.BOOK_ID = odsaUtils.getBookID();
  //function that displays config page

  var b_json = (function () {
    var b_json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': '../bookdata.json1',
        'dataType': "json",
        'success': function (data) {
            b_json = data;
        }
    });
    return b_json;
  })();

  //prepare data to send to the backend
  var jsonBook = {};
 
  jsonBook.key = odsaUtils.getSessionKey();
  jsonBook.book =  settings.BOOK_ID;
  jsonBook.b_json = JSON.stringify(b_json);

  

  function sendConfig() {
  //Add book build date
  jsonBook.build_date = settings.BUILD_DATE;
  $('#bookjson').html("Sending data ...");
  // Send the data to the server
  jQuery.ajax({
    url:   settings.SERVER_URL + "/api/v1/module/loadbook/",
    type:  "POST",
    data: jsonBook,  
    contentType: "application/json; charset=utf-8",
    datatype: "json",
    xhrFields: {withCredentials: true},
    success: function (data) {
      alert("SUCCESS:\nAll chapters and exercises of book instance " + settings.BOOK_NAME + " have been saved in the data server.");      
      $('#bookjson').html("SUCCESS");
      console.log("success: " + data);
    },
    error: function (data) {
      alert("ERROR:\nSomething went wrong when storing chapters and exercises of book instance " + settings.BOOK_NAME + ".\nRefresh the page, the try again. If the problem persists, contact the administrator.");
      $('#bookjson').html("SUCCESS");
      console.log("error: " + data);
    }
  });

  }

  //*****************************************************************************
  //***********            Runs When Page Finishes Loading            ***********
  //*****************************************************************************
  $(document).ready(function () {
     $('#bookname').val(settings.BOOK_NAME);
     $('#bookid').val(settings.BOOK_ID);
     //$('#bookjson').html(JSON.stringify(b_json));
     $('#registerbook').click(function () { 
         sendConfig();
     });
  });
  
}(jQuery));
