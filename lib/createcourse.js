"use strict";

(function($) {
  var settings = ODSA.SETTINGS,
    odsaUtils = ODSA.UTILS;

  var book_json = (function() {
    var book_json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': '_static/' + settings.BOOK_NAME + '.json',
      'dataType': "json",
      'success': function(data) {
        book_json = data;
      }
    });
    return book_json;
  })();

  function createCourse() {
    //prepare data to send to the backend
    var jsonBook = {};

    jsonBook.key = odsaUtils.getSessionKey();
    jsonBook.canvas_url = $('#canvas_url').val() + "/api";
    jsonBook.course_code = $('#course_code').val();
    jsonBook.access_token = $('#access_token').val();
    jsonBook.consumer_key = $('#consumer_key').val();
    jsonBook.consumer_secret = $('#consumer_secret').val();
    jsonBook.book_id = $('#consumer_secret').val();

    jsonBook.url = location.href.substring(0, location.href.lastIndexOf('/') + 1);
    jsonBook.book_json = JSON.stringify(book_json);
    jsonBook.build_date = settings.BUILD_DATE;
    console.dir(jsonBook);

    $('#coursejson').html("Creating Canvas course, please wait ...");

    jQuery.ajax({
      url: settings.SCORE_SERVER + "/api/v1/module/createcourse/",
      type: "POST",
      data: jsonBook,
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {
        withCredentials: true
      },
      success: function(data) {
        alert("SUCCESS:\nCanvas course with all modules, assignments, and assignments groups of this book instance has been created successfully.\n You can safely revoke the access token used in this operation now.");
        $('#coursejson').html("SUCCESS");
        console.log("success: " + data);
      },
      error: function(data) {
        alert("ERROR:\nSomething went wrong when creating canvas course.\nYou might not have created the empty course " + $('#course_code').val() + " in Canvas. Refresh the page, the try again. If the problem persists, contact the administrator.");
        $('#coursejson').html("FAILED");
        console.log("error: " + data);
      }
    });
  }

  $(document).ready(function() {
    $('#canvas_url').val('https://canvas.instructure.com');
    $('#course_code').val('OpenDSA');
    $('#access_token').val('7~98d8KnPbCj7wnA3GLyHIvh4yxHz7t2U6SPp7OLdvscWSN82qCnZbEWebFJVEb0b3');
    $('#consumer_key').val('test');
    $('#consumer_secret').val('secret');

    $('#createcourse').click(function() {
      createCourse();
    });
  });

}(jQuery));