"use strict";
/*global alert: true, ODSA */
(function ($) {
  $(document).ready(function () {
    // Process About button: Pop up a message with an Alert
    function about() {
      alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
    }

    // Insertion Sort
    function inssort() {
      var i, j;
      jsav.umsg(interpret("av_c3"));
      pseudo.setCurrentLine(0);
      arr.highlight([0]);
      arr.highlightBlue(1);
      jsav.step();
      for (i = 1; i < arr.size(); i++) { // Insert i'th record
        arr.highlightBlue(i);
        jsav.umsg(interpret("av_c4"));
        pseudo.setCurrentLine(1);
        jsav.step();
        jsav.umsg(interpret("av_c5"));
        pseudo.setCurrentLine(2);
        jsav.step();
        for (j = i; (j > 0) && (arr.value(j) < arr.value(j - 1)); j--) {
          arr.highlightBlue(j);
          arr.swap(j, j - 1); // swap the two indices
          arr.highlight(j).unhighlight(j - 1); // set highlights correctly
          arr.highlightBlue(j - 1);
          jsav.umsg(interpret("av_c6"));
          pseudo.setCurrentLine(3);
          jsav.step();
        }
        arr.highlight(j);
      }
      pseudo.setCurrentLine(4);
      jsav.umsg(interpret("av_c2"));
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
        if (code) {
          // If there is a code object initialize pseudo the regular way
          pseudo = jsav.code(code);
        } else {
          // If there is no code object create a fake object for pseudo
          // This is done in order to avoid errors when pseudo.setCurrentLine(X) is called
          // Alternatively, all the lines where pseudo is mentioned could be placed inside
          // ifs.
          // It would probably be preferrable if JSAV could create this fake object when you
          // call jsav.code() or jsav.code(undefined)
          // In that case we wouldn't even need this if-else
          pseudo = {setCurrentLine: function () {}};
        }
        jsav.umsg(interpret("av_c1"));
        jsav.displayInit();
        inssort();
        arr.unhighlight();
        arr.unhighlightBlue(true);
        jsav.recorded(); // mark the end
      }
    }

    // Connect action callbacks to the HTML entities
    $('#about').click(about);
    $('#run').click(runIt);
    $('#ssperform').submit(function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      runIt();
    });
    $('#reset').click(ODSA.AV.reset);


    //////////////////////////////////////////////////////////////////
    // Start processing here
    //////////////////////////////////////////////////////////////////
    var jsav,   // JSAV library object
        arr,    // JSAV array
        pseudo; // pseudocode display

    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadLangData(),
        interpret = config.interpreter,       // get the interpreter
        code = config.code;                   // get the code object
    $('#arrayValues').attr('placeholder', interpret("av_arrValsPlaceholder"));

    console.log("Code object: " + JSON.stringify(code));
    // create a new settings panel and specify the link to show it
    var settings = new JSAV.utils.Settings($(".jsavsettings"));

    // add the layout setting preference
    var arrayLayout = settings.add("layout", {"type": "select",
            "options": {"bar": "Bar", "array": "Array"},
                        "label": "Array layout: ", "value": "bar"});

    // Initialize the arraysize dropdown list
    ODSA.AV.initArraySize(5, 16, 8);
  });
}(jQuery));
