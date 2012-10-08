"use strict";
/*global alert log_exercise_init getAVName */
(function ($) {
  var avcId = 'selectionsortAV_avc';
  var
    ASize = $('#arraysize').val(), // Number of values in the array
    theArray = [];  // The array of numbers

  // check query parameters from URL
  var params = JSAV.utils.getQueryParameter();
  if ("array" in params) { // set value of array pick if it is a param
    $('#arrayValues').val(params.array).prop("disabled", true);
  }
  
  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  // add the layout setting preference
  var arrayLayout = settings.add("layout", {"type": "select",
                      "options": {"bar": "Bar", "array": "Array"},
                      "label": "Array layout: ", "value": "bar"});
  
  var context = $("#ssperform");
  var emptyContent = $('#' + avcId).html();
  var av, // for JSAV av
    arr,  // for the JSAV array
    pseudo; // for the pseudocode display

  var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Selection Sort Algorithm Visualization\nWritten by Cliff Shaffer and Mauricio De La Barra\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
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

  var setBlue = function (index) {
    arr.css(index, {"background-color": "#ddf" });
  };
  
  var setGreen = function (index) {
    arr.css(index, {"background-color": "#00FF00" });
  };
  
  // Selection sort
  function selsort() {
    var i, j, bigindex;
    av.umsg("For each pass, we will move left to right looking for the next largest value. Once that is found, it will be swapped into its final position (these will be shown in lighter color).");
    pseudo.setCurrentLine(0);
    av.step();
    for (i = 0; i < arr.size() - 1; i++) {
      av.umsg("Starting pass " + i);
      pseudo.setCurrentLine(1);
      av.step();
      av.umsg("Initialize bigindex");
      pseudo.setCurrentLine(2);
      bigindex = 0;
      setGreen(0);
      av.step();
      av.umsg("For each element moving through the list: the biggest seen so far is always green");
      pseudo.setCurrentLine(3);
      av.step();
      for (j = 1; j < arr.size() - i; j++) {
        setBlue(j);
        av.umsg("Compare to biggest seen so far");
        pseudo.setCurrentLine(4);
        av.step();
        if (arr.value(j) > arr.value(bigindex)) {
          av.umsg("Found something bigger, so switch value of bigindex");
          arr.unhighlight(bigindex);
          pseudo.setCurrentLine(5);
          bigindex = j;
          setGreen(j);
          av.step();
        }
        else {
          arr.unhighlight(j);
        }
      }
      av.umsg("Now swap the next biggest element into place");
      pseudo.setCurrentLine(6);
      av.step();
      if (bigindex !== (arr.size() - i - 1)) {
        arr.swap(bigindex, arr.size() - i - 1); // swap the two indices
      }
      av.step();
      av.umsg("Done this pass");
      arr.unhighlight(arr.size() - i - 1);
      arr.css([arr.size() - i - 1], {"color": LIGHT});
      av.step();
    }
    av.umsg("Done Sorting!");
    pseudo.setCurrentLine(8);
    av.step();
  }

  // Execute the "Run" button function
  function runIt() {
    var i;
    var newSize = $('#arraysize').val();

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
      log_exercise_init(getAVName(), initData);
      
      reset(true); // Reset any previous visualization
      av = new JSAV(avcId); // initialize JSAV ..
      // .. and the array. use the layout the user has selected
      arr = av.ds.array(theArray, {indexed: true, layout: arrayLayout.val()});
      pseudo = av.code({url: "../../SourceCode/Processing/Sorting/Selectionsort/Selectionsort.pde",
          startAfter: "/* *** ODSATag: Selectionsort *** */",
          endBefore: "/* *** ODSAendTag: Selectionsort *** */"});
      av.displayInit();
      selsort();
      arr.unhighlight();
      av.recorded(); // mark the end
    }
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#run', context).click(runIt);
  $('#reset', context).click(reset);
}(jQuery));
