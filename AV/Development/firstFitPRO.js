"use strict";
/*global alert: true, ODSA */
(function ($) {
  $(document).ready(function () {
    /* **************************************************************
    *  This first section is generic initialization that all AVs    *
    *  will need, including initialization for the OpenDSA library  *
    *  The first line you need to set to use your form's name       *
    ************************************************************** */

    // settings for the AV
    var settings = new JSAV.utils.Settings($(".jsavsettings"));

    // add the layout setting preference
    var arrayLayout = settings.add("layout", {"type": "select",
          "options": {"bar": "Bar", "array": "Array"},
          "label": "Array layout: ", "value": "array"});

    //containing HTML element with id ShellsortProficiency.
    var av = new JSAV($('.avcontainer'), {settings: settings});
    av.recorded();

    // Create a convenience function named tell for writing to the
    // output buffer
    var tell = function (msg, color) { av.umsg(msg, {color: color}); };

    var ArraySize = 4; // Size of the exercise array

    /* **************************************************************
    *        Everything below this is specific to this AV           *
    ************************************************************** */

    var incrs = [], // The array of increments
        $theArray = $("#profArray"),
        initialArray = [], // needed for model answer
        theArray,
        currIncrIndex; // The index for the student's current increment

    //creates the initial visualization of the memory pool
    function OriginalMemBlock() {

      var memPoolLabel = av.label("Memory Pool (Size: 200)", {"left": 150, "top": 230});
      
      var free1Finish = 212;
      var free2Finish = 325;
      var free3Finish = 467;
      var free4Finish = 625;

      var free1Start = 150;
      var free2Start = 237;
      var free3Start = 387;
      var free4Start = 512;    

      var used1 = av.g.rect(free1Finish, 250, 25, 60).css({"fill": "coral"});
      var used2 = av.g.rect(free2Finish, 250, 62, 60).css({"fill": "coral"});
      var used3 = av.g.rect(free3Finish, 250, 45, 60).css({"fill": "coral"});
      var used4 = av.g.rect(free4Finish, 250, 25, 60).css({"fill": "coral"});

      var free1 = av.g.rect(free1Start, 250, 62, 60).css({"fill": "cornflowerblue"});
      var free2 = av.g.rect(free2Start, 250, 88, 60).css({"fill": "cornflowerblue"});
      var free3 = av.g.rect(free3Start, 250, 80, 60).css({"fill": "cornflowerblue"});
      var free4 = av.g.rect(free4Start, 250, 113, 60).css({"fill": "cornflowerblue"});
      
      var freeStartArray = new Array(free1Start, free2Start, free3Start, free4Start);
      var freeFinArray = new Array(free1Finish, free2Finish, free3Finish, free4Finish);
      
      var usedRec = av.g.rect(620, 170, 30, 40).css({"fill": "coral"});
      var freeRec = av.g.rect(720, 170, 30, 40).css({"fill": "cornflowerblue"});
      
      var usedLabel = av.label("Used Space", {left :  600, top:  220});
      var freeLabel = av.label("Free Space", {left :  700, top:  220});
      
      var usedNum = 63;
      var freeNum = 137;
      
      var usedAmountLabel = av.label(usedNum, {left :  625, top:  180});
      usedAmountLabel.css({"z-index": 500});

      var freeAmountLabel = av.label(freeNum, {left :  720, top:  180});
      freeAmountLabel.css({"z-index": 500});

      var block1 = 25;
      var block2 = 35;
      var block3 = 32;
      var block4 = 45;

      var freeArray = new Array(block1, block2, block3, block4);

      var connect1Start = 300;
      var connect2Start = 350;
      var connect3Start = 390;
      var connect4Start = 440;

      var connectStartArray = new Array(connect1Start, connect2Start, connect3Start, connect4Start);
    
      var connect1 = av.g.line(connect1Start, 450, 181, 310);
      var connect2 = av.g.line(connect2Start, 450, 281, 310);
      var connect3 = av.g.line(connect3Start, 450, 427, 310);
      var connect4 = av.g.line(connect4Start, 450, 568, 310);

      var linesArray = new Array(connect1, connect2, connect3, connect4);
    }

      
    // Generate a random (but constrained) set of four increments
    function generateIncrements() {
      incrs[0] = Math.floor(Math.random() * 60) + 1; 
      incrs[2] = Math.floor(Math.random() * 50) + 4;
      incrs[1] = Math.floor(Math.random() * 30) + 9;
      incrs[3] = Math.floor(Math.random() * 10) + 3;
    }
    
    // Process reset button: Re-initialize everything, including the increments
    function initialize() {
      generateIncrements();
      $('#increments').val(incrs);
    
      var htmldata = "";
      htmldata = "<li>" + 25 + "</li><li>" + 35 + "</li><li>" + 32 + "</li><li>" + 45 + "</li>";
      //initialArray[ArraySize - i] = 45;
      $theArray.html(htmldata);
      
      // Log the initial state of the exercise
      OriginalMemBlock();
      var initData = {};
      initData.gen_array = initialArray;
      initData.gen_incrs = incrs;
      ODSA.AV.logExerciseInit(initData);

      theArray = av.ds.array($theArray, {center: false, layout: arrayLayout.val()}).css({"x": "275", "y": "252"});
      currIncrIndex = av.variable(0);
      av.forward();
      av._undo = [];
      return theArray;
    }

    function modelSolution(jsav) {
      var modelarr = jsav.ds.array(initialArray, {indexed: true, layout: arrayLayout.val()});
      var i;
      var j;

      jsav.displayInit();

      for (i = 0; i < incrs.length; i += 1) {
        for(j = 0; j < modelarr.size(); j += 1) {
          if(incrs[i] <= modelarr[j]) {
            modelarr.highlight(j);
            jsav.stepOption("grade", true);
            jsav.step();
            modelarr[j] -= incrs[i];
            jsav.step();
            modelarr.unhighlight(j);
            jsav.step();
            break;
          }
        }
      }
      return [modelarr];
    }

    // Process help button: Give a full help page for this activity
    // We might give them another HTML page to look at.
    function help() {
      window.open("shellsorthelpPRO.html", 'helpwindow');
    }

    // Process About button: Pop up a message with an Alert
    function about() {
      alert("Shellsort Proficiency Exercise\nWritten by Cliff Shaffer and Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/OpenDSA/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
    }

    // Initialize the exercise
    // Defines the function to call on reset (initialize()), and the
    //  function to call to generate the model answer (shellsort())
    var exer = av.exercise(modelSolution, initialize, [{css: "background-color"}, {}],
       { controls: $('.jsavexercisecontrols')});
    exer.reset();
    
    var swapIndex;
    // register click handlers for the array indices
    theArray.click(function (index) {
      av._redo = []; // clear the forward stack, should add a method for this in lib
      if (!theArray.isHighlight(index)) {
        theArray.highlight(index);
        exercise.gradeableStep();

      } else {
        theArray.unhighlight(index);
      }
      av.step();
    });

    // Connect the action callbacks to the HTML entities
    $('#help').click(help);
    $('#about').click(about);
  });
}(jQuery));
