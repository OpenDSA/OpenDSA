"use strict";
/*global alert*/
(function ($) {
  var avcId = 'radixLinkAV_avc';

  // Number of values in the array
  var ASize = $('#arraysize').val();

  // The array of numbers
  var theArray = [];
  var digitArray = [];
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
      arr, arrDigit, arrOut;  // for the JSAV array

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

  var setBlue = function (arr, index) {
    arr.css(index, {"background-color": "#bbf" });
  };

  // Execute the "Run" button function
  function runIt() {
    var i;
    var newSize = $('#arraysize').val();
    var DSize = $('#digitsize').val();
    var ASize = $('#arraysize').val();
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
        digitArray[i] = "";
      }
      reset(true); // Reset any previous visualization
      av = new JSAV(avcId); // initialize JSAV ..
      // .. and the array. use the layout the user has selected
      arr = av.ds.array(theArray, {indexed: true, layout: "vertical",
                                   center: false, top: 20, left: 0});
      av.label("Input", {before: arr, left: 15, top: 12});
      arrDigit = av.ds.array(digitArray, {indexed: true, layout: "vertical",
                                      center: false, top: 20, left: 170});
      av.label("Digit", {before: arrDigit, left: 185, top: 12});
      arrOut = av.ds.array(outArray, {indexed: true, layout: "vertical",
                                      center: false, top: 20, left: 720});
      av.label("Output", {before: arrOut, left: 728, top: 12});
      av.umsg("Starting Radix Sort. We will process digits from right to left.");
      av.displayInit();
      radsort();
      av.umsg("Done sorting!");
      av.recorded(); // mark the end
    }
  }

  //Radix linked list sort
  function radsort() {
    var i, j, d, curr;
    var shift = 1;
    var answer;
    var lists = [];
    var arrows = [];
    var oldanswer;

    for (d = 0; d < $('#digitsize').val(); d++) {
      av.umsg("Starting a new pass.");
      av.step();
      // Initialize the lists
      for (i = 0; i < 10; i++) {
//        if (lists[i]) { lists[i].clear(); }
        lists[i] = av.ds.list({top: (40 + i * 47), left: 240, nodegap: 30});
        lists[i].layout({center: false});
        // create initially hidden arrows from array indices to lists
        arrows[i] = av.g.line(200, 60 + i * 47, 240, 60 + i * 47, 
                    {"arrow-end": "classic-wide-long", "opacity": 0, "stroke-width": 2});
      }
      av.umsg("Phase 1: Move the records from the input array to the digit array.");
      av.step();
      oldanswer = -1;
      for (i = 0; i < ASize; i++) {
        answer = Math.floor((arr.value(i) / shift) % 10);
        av.umsg(arr.value(i) + " has current digit " + answer +
                ". Add it to the " + answer + " bin");
        arr.highlight(i);
        arr.unhighlight(i - 1);
        lists[answer].addLast(arr.value(i));
        if (lists[answer].size() === 1) { // show arrow when adding first item to list
          arrows[answer].show();
        }
        lists[answer].layout({center: false});
        if (answer !== oldanswer) { arrDigit.highlight(answer); }
        arrDigit.unhighlight(oldanswer);
        oldanswer = answer;
        av.step();
      }
      arrDigit.unhighlight(oldanswer);
      arr.unhighlight(ASize - 1);
      av.umsg("Phase 2: Move the records from the digit lists to the output array.");
      av.step();
      curr = 0;
      for (i = 0; i < 10; i++) {
        arrDigit.highlight(i);
        arrDigit.unhighlight(i - 1);
        while (lists[i].size() !== 0) {
          arrOut.value(curr++, lists[i].get(0).value());
          lists[i].remove(0);
          lists[i].layout({center: false});
          if (lists[i].size() === 0) { // hide arrow when removing last item from list
            arrows[i].hide();
          }
          av.step();
        }
        arrDigit.unhighlight(9);
      }
      av.umsg("Done with this pass.");
      av.step();
      for (i = 0; i < ASize; i++) {
        av.effects.moveValue(arrOut, i, arr, i);
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
