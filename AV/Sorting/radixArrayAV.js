"use strict";
/*global alert*/
(function ($) {
  var avcId = 'radixArray_avc';

  // Number of values in the array
  var ASize = $('#arraysize').val();

  // The array of numbers
  var theArray = [];
  var countArray = [];
  var outArray = [];

  // check query parameters from URL
  var params = JSAV.utils.getQueryParameter();

  if ("array" in params) { // set value of array pick if it is a param
    $('#arrayValues').val(params.array).prop("disabled", true);
  }

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  var context = $("#ssperform");
  var emptyContent = $('#' + avcId).html();
  var av, // for JSAV av
      arr, arrC, arrO;  // for the JSAV array

  // Process help button: Give a full help page for this activity
  // We might give them another HTML page to look at.
  function help() {
    window.open("radixAVHelp.html", 'helpwindow');
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Radix Sort algorithm visualization\nWritten by Brandon Watkins and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
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

  // Validate the user-defined array values
  function processArrayValues() {
    var i,
        num,
        max = 0,
        dsize = 0,
        msg = "Must be 5 to 16 positive integers between 0 and 9999";
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
      if (isNaN(theArray[i]) || (theArray[i] < 0) || (theArray[i] > 9999)) {
        alert(msg);
        theArray.length = 0;
        return false;
      }
      if (theArray[i] > max) {
        max = theArray[i];
      }
    }
    $('#arraysize').val(theArray.length);
    // Set the digit size
    if (max < 10) { dsize = 1; }
    else if (max < 100) { dsize = 2; }
    else if (max < 1000) { dsize = 3; }
    else { dsize = 4; }
    $('#digitsize').val(dsize);
    return true;
  }

  // Execute the "Run" button function
  function runIt() {
    var i;
    var newSize = $('#arraysize').val();
    var DSize = $('#digitsize').val();
    ASize = $('#arraysize').val();
    if (processArrayValues()) { // if it is false, we got junk user
                                // needs to fix
      if (theArray.length === 0) { // Make a random  array
        ASize = newSize;
        theArray.length = 0; // Out with the old
        // Give random numbers in range 0..999
        for (i = 0; i < ASize; i++) {
          theArray[i] = Math.floor(Math.random() * (Math.pow(10, DSize)));
        }
      } else { // Use the values we got out of the user's list
        ASize = theArray.length;
      }
      outArray.length = 0; // Out with the old
      for (i = 0; i < ASize; i++) {
        outArray[i] = "";
      }
      for (i = 0; i < 10; i++) {
        countArray[i] = 0;
      }
      reset(true); // Reset any previous visualization
      av = new JSAV(avcId); // initialize JSAV ..
      // .. and the array. use the layout the user has selected
      arr = av.ds.array(theArray, {indexed: true, layout: "array"});
      av.label("Input Array", {before: arr, left: 0, top: -25});
      arrC = av.ds.array(countArray, {indexed: true, layout: "array"});
      av.label("Count Array", {before: arrC, left: 0, top: 95});
      arrO = av.ds.array(outArray, {indexed: true, layout: "array"});
      av.label("Auxilliary Array", {before: arrO, left: 0, top: 150});
      av.umsg("Starting Radix Sort. We will process digits from right to left. The first step will be to count occurances of digits from the input array.");
      av.displayInit();
      radsort();
      av.umsg("Done sorting!");
      av.recorded(); // mark the end
    }
  }
  
  // Radixsort
  function radsort() {
    var i, d;
    var shift = 1;
    var answer;
    for (d = 0; d < $('#digitsize').val(); d++) {
      for (i = 0; i < ASize; i++) {
        answer = Math.floor((arr.value(i) / shift) % 10);
        av.umsg(arr.value(i) + " has current digit " + answer +
                ". Add one to the " + answer + " bin");
        arr.highlight([i]);
        arrC.highlight([answer]);
        av.step();
        arr.unhighlight([i]);
        arrC.unhighlight([answer]);
        if (arrC.value(answer) === 0) {
          arrC.value(answer, 1);
        } else {
          arrC.value(answer, arrC.value(answer) + 1);
        }
      }
      av.umsg("Now we will do a rolling summation of the count array, to be used next as positions");
      av.step();
      arrC.highlight(0);
      av.umsg("But first we subtract 1 from the 0 position so that the resulting sums yield correct positions in the Auxilliary array.");
      arrC.value(0, arrC.value(0) - 1);
      av.step();
      for (i = 1; i < 10; i++) {
        av.umsg(arrC.value(i - 1) + " + " + arrC.value(i) + " is " +
                (arrC.value(i - 1) + arrC.value(i)) + ". Put that in position " + i);
        arrC.highlight(i);
        av.step();
        arrC.value(i, arrC.value(i) + arrC.value(i - 1));
        av.step();
        arrC.unhighlight(i - 1);
      }
      arrC.unhighlight(9);
  
      av.umsg("Now use the Count array to decide where to move values into the Auxilliary array");
      av.step();
      for (i = ASize - 1; i >= 0; i--) {
        answer = Math.floor((arr.value(i) / shift) % 10);
        av.umsg(arr.value(i) + " has digit " + answer + ". So we look in position " +
                answer + " of the Count array, to see that we put it in position " +
                arrC.value(answer) + " of the Auxilliary array.");
        arrO.highlight(arrC.value(answer));
        arrC.highlight(answer);
        arr.highlight(i);
        arrO.value(arrC.value(answer), arr.value(i));
        av.step();
        arrC.value(answer, arrC.value(answer) - 1);
        av.umsg("And we decrement the value of Count array position " + answer);
        av.step();
        arrO.unhighlight([arrC.value(answer) + 1]);
        arrC.unhighlight([answer]);
        arr.unhighlight([i]);
      }

      av.umsg("Clear Count Array");
      for (i = 0; i < 10; i++) {
        arrC.value(i, 0);
      }
      av.umsg("Done with this pass.");
      av.step();
      for (i = 0; i < ASize; i++) {
        av.effects.moveValue(arrO, i, arr, i);
      }
      av.umsg("Now we move the value back to the Input Array");
      av.step();
      shift = shift * 10;
    }
  }
  
  // Connect action callbacks to the HTML entities
  $('#help').click(help);
  $('#about').click(about);
  $('#run', context).click(runIt);
  $('#reset', context).click(reset);
}(jQuery));
