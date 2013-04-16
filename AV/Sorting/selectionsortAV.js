/*global alert: true, ODSA */
(function ($) {
  "use strict";
  var jsav, // for JSAV av
      arr,  // for the JSAV array
      pseudo; // for the pseudocode display

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

  var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(5, 16, 8);

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Selection Sort Algorithm Visualization\nWritten by Cliff Shaffer and Mauricio De La Barra\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  var setBlue = function (index) {
    arr.css(index, {"background-color": "#ddf" });
  };

  var setGreen = function (index) {
    arr.css(index, {"background-color": "#00FF00" });
  };

  var setGray = function (index) {
    arr.css(index, {"background-color": "#eee"});
  };

  // Selection sort
  function selsort() {
    var i, j, bigindex;
    jsav.umsg("For each pass, we will move left to right looking for the next largest value. Once that is found, it will be swapped into its final position (these will be shown in lighter color).");
    pseudo.setCurrentLine(0);
    jsav.step();
    for (i = 0; i < arr.size() - 1; i++) {
      jsav.umsg("Starting pass " + i);
      pseudo.setCurrentLine(1);
      jsav.step();
      jsav.umsg("Initialize bigindex");
      pseudo.setCurrentLine(2);
      bigindex = 0;
      setGreen(0);
      jsav.step();
      jsav.umsg("For each element moving through the list: the biggest seen so far is always green");
      pseudo.setCurrentLine(3);
      jsav.step();
      for (j = 1; j < arr.size() - i; j++) {
        setBlue(j);
        jsav.umsg("Compare to biggest seen so far");
        pseudo.setCurrentLine(4);
        jsav.step();
        if (arr.value(j) > arr.value(bigindex)) {
          jsav.umsg("Found something bigger, so switch value of bigindex");
          setGray(bigindex);
          pseudo.setCurrentLine(5);
          bigindex = j;
          setGreen(j);
          jsav.step();
        }
        else {
          setGray(j);
        }
      }
      jsav.umsg("Now swap the next biggest element into place");
      pseudo.setCurrentLine(6);
      jsav.step();
      if (bigindex !== (arr.size() - i - 1)) {
        arr.swap(bigindex, arr.size() - i - 1); // swap the two indices
      }
      jsav.step();
      jsav.umsg("Done this pass");
      setGray(arr.size() - i - 1);
      arr.css([arr.size() - i - 1], {"color": LIGHT});
      jsav.step();
    }
    jsav.umsg("Done Sorting!");
    pseudo.setCurrentLine(8);
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
      pseudo = jsav.code({url: "../../SourceCode/Processing/Sorting/Selectionsort.pde",
          startAfter: "/* *** ODSATag: Selectionsort *** */",
          endBefore: "/* *** ODSAendTag: Selectionsort *** */"});
      jsav.displayInit();
      selsort();
      setGray();
      jsav.recorded(); // mark the end
    }
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
