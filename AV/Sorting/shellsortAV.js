"use strict";
/*global alert*/
/*global log_exercise_init getAVName sweep */
(function ($) {
  var avcId = 'shellsortAV_avc';
  
  // Number of values in the array
  var ASize = $('#arraysize').val();
  // The array of numbers.
  var theArray = [];

  // This sets the default value of the speed setting to "7"
  JSAV.ext.SPEED = 300;

  // check query parameters from URL
  var params = JSAV.utils.getQueryParameter();
  if ("increments" in params) { // set value of increments if it is a param
    $('#increments').val(params.increments).prop("disabled", true);
  }
  if ("array" in params) { // set value of array pick if it is a param
    $('#arrayValues').val(params.array).prop("disabled", true);
  }
  
  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  // add the layout setting preference
  var arrayLayout = settings.add("layout",
    {"type": "select", "options": {"bar": "Bar", "array": "Array"},
     "label": "Array layout: ", "value": "bar"});

  var context = $("#ssperform");
  var emptyContent = $('#' + avcId).html();
  var av, // for JSAV av
    arr;  // for the JSAV array

  // Process help button: Give a full help page for this activity
  // We might give them another HTML page to look at.
  function help() {
    var myRef = window.open("SSavHelp.html", 'helpwindow');
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Shellsort Algorithm Visualization\nWritten by Cliff Shaffer and Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Process Reset button: Reinitialize the output textbox and the AV
  function reset(flag) {
    if (av) {
      av.clearumsg();
      $('#' + avcId).unbind().html(emptyContent);
    }
    // Clear the array values field, when no params given and reset button hit
    if (flag !== true) {
      if (!$('#arrayValues').prop("disabled")) {
        $('#arrayValues').val("");
      }
    }
  }

  // Validate the increment series
  function checkIncrements() {
    var i,
      num,
      prev = Number.MAX_VALUE,
      msg = "Increments sequence must be decreasing positive values ending with 1";
    // Convert user's increments to an array,
    // assuming values are space separated
    var incrs = $('#increments', context).val().match(/[0-9]+/g) || [];
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

  // Validate the user-defined array values
  function processArrayValues() {
    var i,
        num,
        msg = "Must be 5 to 16 positive integers";
    // Convert user's values to an array,
    // assuming values are space separated
    theArray = $('#arrayValues', context).val().match(/[0-9]+/g) || [];
    if (theArray.length === 0) { // Empty field
      theArray.length = 0;
      return true;
    }
    if (theArray.length < 5 || theArray.length > 16) {
      alert(msg);
      theArray.length = 0;
      return false;
    }
    for (i = 0; i < theArray.length; i++) {
      theArray[i] = Number(theArray[i]);
      if (isNaN(theArray[i]) || theArray[i] < 0) {
        alert(msg);
        theArray.length = 0;
        return false;
      }
    }
    $('#arraysize').val(theArray.length);
    return true;
  }

  // Execute the "Run" button function
  function runIt() {
    var i;
    var newSize = $('#arraysize').val();
    var incrs = checkIncrements(); // Validate the user's increments

    if (!incrs) {
      return;
    }

    if (processArrayValues()) { // if it is false, we got junk user
                                // needs to fix
      var initData = {};
      if (theArray.length === 0) { // No user-given array. Make a random array
        ASize = newSize;
        theArray.length = 0; // Out with the old
        // Give random numbers in range 0..999
        for (i = 0; i < ASize; i++) {
          theArray[i] = Math.floor(Math.random() * 1000);
        }
        initData.gen_array = theArray;
      }
      else { // Use the values we got out of the user's list
        ASize = theArray.length;
        initData.user_array = theArray;
      }
      // Log initial state of exercise
      initData.user_incrs = incrs;
      log_exercise_init(getAVName(), initData);
      
      reset(true); // Reset any previous visualization
      av = new JSAV(avcId); // initialize JSAV ..
      // .. and the array. use the layout the user has selected
      arr = av.ds.array(theArray, {indexed: true, layout: arrayLayout.val()});
      av.displayInit();
      for (i = 0; i < incrs.length; i += 1) {
        if (incrs[i] < theArray.length) {
          sweep(av, arr, incrs[i]); // run the sweep to create the AV
        }
      }
      av.umsg("Done sorting!");
      av.recorded(); // mark the end
    }
  }

  // Connect action callbacks to the HTML entities
  $('#help').click(help);
  $('#about').click(about);
  $('#run', context).click(runIt);
  $('#reset', context).click(reset);
  $('#increments', context).focusout(checkIncrements);
}(jQuery));
