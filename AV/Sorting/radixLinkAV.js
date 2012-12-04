"use strict";
/*global alert*/
(function ($) {
  var jsav,   // for JSAV library object
      arr,    // for the JSAV array
      arrDigit,
      arrOut;

  // Number of values in the array
  var ASize = $('#arraysize').val();

  // The array of numbers
  var digitArray = [];
  var outArray = [];

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  // Initialize the arraysize dropdown list
  initArraySize(5, 10, 8);

  // Process help button: Give a full help page for this activity
  // We might give them another HTML page to look at.
  function help() {
    window.open("radixAVHelp.html", 'helpwindow');
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Radix Sort algorithm visualization\nWritten by Brandon Watkins and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Execute the "Run" button function
  function runIt() {
    var dSize = $('#digitsize').val(),
        i,
        arrValues = processArrayValues(Math.pow(10, dSize));
    
    // If arrValues is null, the user gave us junk which they need to fix
    if (arrValues) {
      reset(true);
      jsav = new JSAV(avcId);

      // Set the digit size to the length of the largest number in the array
      var max = Math.max.apply(Math, arrValues);
      dSize = String(max).length;
      $('#digitsize').val(dSize);

      ASize = $('#arraysize').val();

      // Reset outArray and digitArray
      outArray.length = 0;
      for (i = 0; i < ASize; i++) {
        outArray[i] = "";
      }
      for (i = 0; i < 10; i++) {
        digitArray[i] = "";
      }

      // Create a new array using the layout the user has selected
      arr = jsav.ds.array(arrValues, {indexed: true, layout: "vertical",
                                   center: false, top: 20, left: 0});
      jsav.label("Input", {before: arr, left: 15, top: 12});
      arrDigit = jsav.ds.array(digitArray, {indexed: true, layout: "vertical",
                                      center: false, top: 20, left: 170});
      jsav.label("Digit", {before: arrDigit, left: 185, top: 12});
      arrOut = jsav.ds.array(outArray, {indexed: true, layout: "vertical",
                                      center: false, top: 20, left: 720});
      jsav.label("Output", {before: arrOut, left: 728, top: 12});
      jsav.umsg("Starting Radix Sort. We will process digits from right to left.");
      jsav.displayInit();
      radsort();
      jsav.umsg("Done sorting!");
      jsav.recorded(); // mark the end
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
      jsav.umsg("Starting a new pass.");
      jsav.step();
      // Initialize the lists
      for (i = 0; i < 10; i++) {
//        if (lists[i]) { lists[i].clear(); }
        lists[i] = jsav.ds.list({top: (40 + i * 46), left: 240, nodegap: 30});
        lists[i].layout({center: false});
        // create initially hidden arrows from array indices to lists
        arrows[i] = jsav.g.line(200, 60 + i * 46, 240, 60 + i * 46,
                    {"arrow-end": "classic-wide-long", "opacity": 0, "stroke-width": 2});
      }
      jsav.umsg("Phase 1: Move the records from the input array to the digit array.");
      jsav.step();
      oldanswer = -1;
      for (i = 0; i < ASize; i++) {
        answer = Math.floor((arr.value(i) / shift) % 10);
        jsav.umsg(arr.value(i) + " has current digit " + answer +
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
        jsav.step();
      }
      arrDigit.unhighlight(oldanswer);
      arr.unhighlight(ASize - 1);
      jsav.umsg("Phase 2: Move the records from the digit lists to the output array.");
      jsav.step();
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
          jsav.step();
        }
        arrDigit.unhighlight(9);
      }
      jsav.umsg("Done with this pass.");
      jsav.step();
      for (i = 0; i < ASize; i++) {
        jsav.effects.moveValue(arrOut, i, arr, i);
      }
      jsav.umsg("Now we move the value back to the Input Array");
      jsav.step();
      shift = shift * 10;
    }
  }

  // Connect action callbacks to the HTML entities
  $('#help').click(help);
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(reset);
}(jQuery));
