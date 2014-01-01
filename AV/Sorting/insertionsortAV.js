/*global alert: true, ODSA */
(function ($) {
  "use strict";
  var jsav,   // for JSAV library object
      arr,    // for the JSAV array
      pseudo; // for the pseudocode display

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  // add the layout setting preference
  var arrayLayout = settings.add("layout", {"type": "select",
                      "options": {"bar": "Bar", "array": "Array"},
                      "label": "Array layout: ", "value": "bar"});

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(5, 16, 8);

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Insertion Sort Algorithm Visualization\nWritten by Cliff Shaffer and Nayef Copty\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  function setProcessing(index) {
    arr.addClass(index, "processing");
  }

  function unsetProcessing(index) {
    arr.removeClass(index, "processing");
  }

  // Insertion Sort
  function inssort() {
    var i, j;
    jsav.umsg("Highlighted yellow records to the left are always sorted. We begin with the record in position 0 in the sorted portion, and we will be moving the record in position 1 (in blue) to the left until it is sorted");
    pseudo.setCurrentLine(0);
    arr.highlight([0]);
    setProcessing(1);
    jsav.step();
    for (i = 1; i < arr.size(); i++) { // Insert i'th record
      setProcessing(i);
      jsav.umsg("Processing record in position " + i);
      pseudo.setCurrentLine(1);
      jsav.step();
      jsav.umsg("Move the blue record to the left until it reaches the correct position");
      pseudo.setCurrentLine(2);
      jsav.step();
      for (j = i; (j > 0) && (arr.value(j) < arr.value(j - 1)); j--) {
        setProcessing(j);
        arr.swap(j, j - 1); // swap the two indices
        arr.highlight(j).unhighlight(j-1); // set highlights correctly
        setProcessing(j-1);
        jsav.umsg("Swap");
        pseudo.setCurrentLine(3);
        jsav.step();
      }
      arr.highlight(j);
    }
    pseudo.setCurrentLine(4);
    jsav.umsg("Done sorting!");
    jsav.step();
  }

  // Execute the "Run" button function
  function runIt() {
    var arrValues = ODSA.AV.processArrayValues();

    // If arrValues is null, the user gave us junk which they need to fix
    if (arrValues) {
      ODSA.AV.reset(true);
      jsav = new JSAV($('.avcontainer'));

      // Create a new array using the layout the user has selected
      arr = jsav.ds.array(arrValues, {indexed: true, layout: arrayLayout.val()});
      pseudo = jsav.code({url: "../../SourceCode/Processing/Sorting/Insertionsort.pde",
                        startAfter: "/* *** ODSATag: Insertionsort *** */",
                        endBefore: "/* *** ODSAendTag: Insertionsort *** */"});
      jsav.umsg("Starting Insertion Sort");
      jsav.displayInit();
      inssort();
      arr.unhighlight();
      unsetProcessing(true);
      jsav.recorded(); // mark the end
    }
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#run').click(runIt);
  $('#ssperform').submit(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    runIt();
  });
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
