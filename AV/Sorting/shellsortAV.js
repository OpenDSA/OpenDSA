"use strict";
/*global alert*/
/*global logExerciseInit sweep */
(function ($) {
  var AV_NAME = 'shellsortAV';
  var av = new AV(AV_NAME, 5, 16, 8),
      jsav, // for JSAV library object av
      arr;  // for the JSAV array

  // check query parameters from URL
  var params = JSAV.utils.getQueryParameter();
  if ("increments" in params) { // set value of increments if it is a param
    $('#increments').val(params.increments).prop("disabled", true);
  }

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  // add the layout setting preference
  var arrayLayout = settings.add("layout",
    {"type": "select", "options": {"bar": "Bar", "array": "Array"},
     "label": "Array layout: ", "value": "bar"});

  // Process help button: Give a full help page for this activity
  // We might give them another HTML page to look at.
  function help() {
    window.open("SSavHelp.html", 'helpwindow');
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Shellsort Algorithm Visualization\nWritten by Cliff Shaffer and Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Validate the increment series
  function checkIncrements() {
    var i,
      prev = Number.MAX_VALUE,
      msg = "Increments sequence must be decreasing positive values ending with 1";
    // Convert user's increments to an array,
    // assuming values are space separated
    var incrs = $('#increments').val().match(/[0-9]+/g) || [];
    for (i = 0; i < incrs.length; i++) {
      incrs[i] = Number(incrs[i]);
      if (isNaN(incrs[i]) || incrs[i] < 0 || incrs[i] > prev) {
        alert(msg);
        return null;
      }
      prev = incrs[i];
    }
    if (incrs[incrs.length - 1] !== 1) {
      alert(msg);
      return null;
    }
    return incrs;
  }

  // Execute the "Run" button function
  function runIt() {
    var incrs = checkIncrements();

    // Validate the user's increments and array values
    // If processArrayValues is false, the user gave us junk which they need to fix
    if (incrs && av.processArrayValues()) {
      // Log initial state of exercise
      var initData = av.initData;
      initData.user_incrs = incrs;
      logExerciseInit(AV_NAME, initData);

      jsav = av.initJSAV();

      // Create a new array using the layout the user has selected
      arr = jsav.ds.array(av.arrValues, {indexed: true, layout: arrayLayout.val()});
      jsav.displayInit();

      for (var i = 0; i < incrs.length; i += 1) {
        if (incrs[i] < av.arrValues.length) {
          sweep(jsav, arr, incrs[i]); // run the sweep to create the AV
        }
      }
      jsav.umsg("Done sorting!");
      jsav.recorded(); // mark the end
    }
  }

  // Connect action callbacks to the HTML entities
  $('#help').click(help);
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(av.reset);
  $('#increments').focusout(checkIncrements);
}(jQuery));
