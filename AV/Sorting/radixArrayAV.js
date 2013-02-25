"use strict";
/*global alert: true, ODSA */
(function ($) {
  var jsav,   // for JSAV library object
      arr,    // for the JSAV array
      arrC,
      arrO;

  // Number of values in the array
  var ASize = $('#arraysize').val();

  // The array of numbers
  var countArray = [];
  var outArray = [];

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(5, 16, 8);

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
        i;
    var arrValues = ODSA.AV.processArrayValues(Math.pow(10, dSize));
    
    // If arrValues is null, the user gave us junk which they need to fix
    if (arrValues) {
      ODSA.AV.reset(true);
      jsav = new JSAV($('.avcontainer'));

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
        countArray[i] = 0;
      }

      arr = jsav.ds.array(arrValues, {indexed: true, layout: "array"});
      jsav.label("Input Array", {before: arr, left: 0, top: -25});
      arrC = jsav.ds.array(countArray, {indexed: true, layout: "array"});
      jsav.label("Count Array", {before: arrC, left: 0, top: 95});
      arrO = jsav.ds.array(outArray, {indexed: true, layout: "array"});
      jsav.label("Auxilliary Array", {before: arrO, left: 0, top: 165});
      jsav.umsg("Starting Radix Sort. We will process digits from right to left. The first step will be to count occurances of digits from the input array.");
      jsav.displayInit();
      radsort();
      jsav.umsg("Done sorting!");
      jsav.recorded(); // mark the end
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
        jsav.umsg(arr.value(i) + " has current digit " + answer +
                ". Add one to the " + answer + " bin");
        arr.highlight([i]);
        arrC.highlight([answer]);
        jsav.step();
        arr.unhighlight([i]);
        arrC.unhighlight([answer]);
        if (arrC.value(answer) === 0) {
          arrC.value(answer, 1);
        } else {
          arrC.value(answer, arrC.value(answer) + 1);
        }
      }
      jsav.umsg("Now we will do a rolling summation of the count array, to be used next as positions");
      jsav.step();
      arrC.highlight(0);
      jsav.umsg("But first we subtract 1 from the 0 position so that the resulting sums yield correct positions in the Auxilliary array.");
      arrC.value(0, arrC.value(0) - 1);
      jsav.step();
      for (i = 1; i < 10; i++) {
        jsav.umsg(arrC.value(i - 1) + " + " + arrC.value(i) + " is " +
                (arrC.value(i - 1) + arrC.value(i)) + ". Put that in position " + i);
        arrC.highlight(i);
        jsav.step();
        arrC.value(i, arrC.value(i) + arrC.value(i - 1));
        jsav.step();
        arrC.unhighlight(i - 1);
      }
      arrC.unhighlight(9);

      jsav.umsg("Now use the Count array to decide where to move values into the Auxilliary array");
      jsav.step();
      for (i = ASize - 1; i >= 0; i--) {
        answer = Math.floor((arr.value(i) / shift) % 10);
        jsav.umsg(arr.value(i) + " has digit " + answer + ". So we look in position " +
                answer + " of the Count array, to see that we put it in position " +
                arrC.value(answer) + " of the Auxilliary array.");
        arrO.highlight(arrC.value(answer));
        arrC.highlight(answer);
        arr.highlight(i);
        arrO.value(arrC.value(answer), arr.value(i));
        jsav.step();
        arrC.value(answer, arrC.value(answer) - 1);
        jsav.umsg("And we decrement the value of Count array position " + answer);
        jsav.step();
        arrO.unhighlight([arrC.value(answer) + 1]);
        arrC.unhighlight([answer]);
        arr.unhighlight([i]);
      }

      jsav.umsg("Clear Count Array");
      for (i = 0; i < 10; i++) {
        arrC.value(i, 0);
      }
      jsav.umsg("Done with this pass.");
      jsav.step();
      for (i = 0; i < ASize; i++) {
        jsav.effects.moveValue(arrO, i, arr, i);
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
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
