"use strict";
/*global alert*/
(function ($) {
  var
    ASize = $('#arraysize').val(), // Number of values in the array
    theArray = []; // The array of numbers

  // check query parameters from URL
  var params = JSAV.utils.getQueryParameter();
  if ("array" in params) { // set value of array pick if it is a param
    $('#arrayValues').val(params.array).prop("disabled", true);
  }
  
  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  // add the layout setting preference
  var arrayLayout = settings.add("layout", {"type": "select", "options": {"bar": "Bar", "array": "Array"}, "label": "Array layout: ", "value": "bar"});
  
  var context = $("#ssperform");
  var emptyContent = $("#avcontainer").html();
  var av, // for JSAV av
    arr,  // for the JSAV array
    pseudo; // for the pseudocode display

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Bubble Sort Algorithm Visualization\nWritten by Cliff Shaffer and Mauricio De La Barra\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Process Reset button: Reinitialize the output textbox and the AV
  function reset(flag) {
    if (av) {
      av.clearumsg();
      $("#avcontainer").unbind().html(emptyContent);
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
        msg = "Must be 5 to 16 positive integers";
    // Convert user's values to an array,
    // assuming values are space separated
    theArray = $('input[name="arrayValues"]', context).val().match(/[0-9]+/g) || [];
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


  var setBlue = function (index) {
    arr.css(index, {"background-color": "#ddf" });
  };
  
  // Bubble Sort
  function bubblesort() {
    var i, j;
    av.umsg("For each pass, we will move right to left swapping adjacent elements as needed. Each pass moves the next smallest element into position (these will be shown in lighter color).");
    pseudo.setCurrentLine(0);
    av.step();
    for (i = 0; i < arr.size() - 1; i++) {
      av.umsg("Starting pass " + i);
      pseudo.setCurrentLine(1);
      av.step();
      av.umsg("For each element moving through the list");
      pseudo.setCurrentLine(2);
      av.step();
      setBlue(arr.size() - 1);
      for (j = arr.size() - 1; j > i; j--) {
        setBlue(j - 1);
        av.umsg("Compare elements");
        pseudo.setCurrentLine(3);
        av.step();
        if (arr.value(j - 1) > arr.value(j)) {
          av.umsg("Swap");
          pseudo.setCurrentLine(4);
          arr.swap(j - 1, j);
          av.step();
        }
        arr.unhighlight(j);
      }
      arr.highlight(j);
      av.umsg("Done this pass");
      av.step();
    }
    av.umsg("Done sorting!");
    pseudo.setCurrentLine(5);
    arr.highlight(arr.size() - 1);
    av.step();
  }

  // Execute the "Run" button function
  function runIt() {
    var i;
    var newSize = $('#arraysize').val();

    if (processArrayValues()) { // if it is false, then we got junk that
                                // the user needs to fix
      if (theArray.length === 0) { // No user-given array. Make a random array
        ASize = newSize;
        theArray.length = 0; // Out with the old
        // Give random numbers in range 0..999
        for (i = 0; i < ASize; i++) {
          theArray[i] = Math.floor(Math.random() * 1000);
        }
      }
      else { // Use the values we got out of the user's list
        ASize = theArray.length;
      }
      reset(true); // Reset any previous visualization
      av = new JSAV("avcontainer"); // initialize JSAV ..

      // .. and the array. use the layout the user has selected
      arr = av.ds.array(theArray, {indexed: true, layout: arrayLayout.val()});
      pseudo = av.code({url: "../../SourceCode/Processing/Sorting/Bubblesort/Bubblesort.pde",
			startAfter: "/* *** ODSATag: Bubblesort *** */",
                        endBefore: "/* *** ODSAendTag: Bubblesort *** */"});
      av.umsg("Starting Bubble Sort");
      av.displayInit();
      bubblesort();
      arr.unhighlight(function (index) { return true; });
      av.recorded(); // mark the end
    }
  }

  // Connect action callbacks to the HTML entities
  $('input[name="about"]').click(about);
  $('input[name="run"]', context).click(runIt);
  $('input[name="reset"]', context).click(reset);
}(jQuery));
