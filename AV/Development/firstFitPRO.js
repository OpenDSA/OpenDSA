//change text-box with generated block sizes to stack -- look at buffer pool for stack impl.
//bst delete for rendomly generated numbers


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

    var ArraySize = 4; // Size of the exercise array


    /* **************************************************************
    *        Everything below this is specific to this AV           *
    ************************************************************** */

    var incrs = [], //array of randomly generated blocks to insert
        freeValues = [], //array of free block sizea
        $theArray = $("#profArray"),
        initialArray = [], // needed for model answer
        theArray,
        currIncrIndex = 0, // The index for the student's current increment
        usedNum,
        freeNum,
        usedAmountLabel,
        freeAmountLabel,
        freeStartArray,
        freeFinArray,
        connectStartArray,
        linesArray;

    //creates the initial visualization of the memory pool
    function OriginalMemBlock() {

      var memPoolLabel = av.label("Memory Pool", {"left": 150, "top": 230});
      
      var used1Size = Math.floor(Math.random() * 3) + 25;
      var used2Size = Math.floor(Math.random() * 3) + 58;
      var used3Size = Math.floor(Math.random() * 3) + 30;
      var used4Size = Math.floor(Math.random() * 3) + 21;

      var free1Start = 150;
      var free1Finish = free1Start + (freeValues[0]*2);

      var free2Start = free1Finish + used1Size;
      var free2Finish = free2Start + (freeValues[1]*2);

      var free3Start = free2Finish + used2Size;
      var free3Finish = free3Start + (freeValues[2]*2);

      var free4Start = free3Finish + used3Size;    
      var free4Finish = free4Start + (freeValues[3]*2);

      var rectY = 250;
      var rectHeight = 60;

      var used1 = av.g.rect(free1Finish, rectY, used1Size, rectHeight).css({"fill": "coral"});
      var used2 = av.g.rect(free2Finish, rectY, used2Size, rectHeight).css({"fill": "coral"});
      var used3 = av.g.rect(free3Finish, rectY, used3Size, rectHeight).css({"fill": "coral"});
      var used4 = av.g.rect(free4Finish, rectY, used4Size, rectHeight).css({"fill": "coral"});

      var free1 = av.g.rect(free1Start, rectY, freeValues[0]*2, rectHeight).css({"fill": "cornflowerblue"});
      var free2 = av.g.rect(free2Start, rectY, freeValues[1]*2, rectHeight).css({"fill": "cornflowerblue"});
      var free3 = av.g.rect(free3Start, rectY, freeValues[2]*2, rectHeight).css({"fill": "cornflowerblue"});
      var free4 = av.g.rect(free4Start, rectY, freeValues[3]*2, rectHeight).css({"fill": "cornflowerblue"});
      
      freeStartArray = new Array(free1Start, free2Start, free3Start, free4Start);
      freeFinArray = new Array(free1Finish, free2Finish, free3Finish, free4Finish);
      
      var usedRec = av.g.rect(620, 185, 30, 40).css({"fill": "coral"});
      var freeRec = av.g.rect(720, 185, 30, 40).css({"fill": "cornflowerblue"});
      
      var usedLabel = av.label("Used Space", {left :  600, top:  225});
      var freeLabel = av.label("Free Space", {left :  700, top:  225});
      
      usedNum = used1Size + used2Size + used3Size + used4Size;
      freeNum = freeValues[0] + freeValues[1] + freeValues[2] + freeValues[3];
      
      usedAmountLabel = av.label(usedNum, {left :  622, top:  195});
      usedAmountLabel.css({"z-index": 500});

      freeAmountLabel = av.label(freeNum, {left :  720, top:  195});
      freeAmountLabel.css({"z-index": 500});

      var connect1Start = 300;
      var connect2Start = 350;
      var connect3Start = 390;
      var connect4Start = 440;

      var lineY1 = 450;
      var lineY2 = 310; 

      connectStartArray = new Array(connect1Start, connect2Start, connect3Start, connect4Start);

      var connect1end = (free1Start + free1Finish)/2;
      var connect2end = (free2Start + free2Finish)/2;
      var connect3end = (free3Start + free3Finish)/2;
      var connect4end = (free4Start + free4Finish)/2;

      var connect1 = av.g.line(connect1Start, lineY1, connect1end, lineY2);
      var connect2 = av.g.line(connect2Start, lineY1, connect2end, lineY2);
      var connect3 = av.g.line(connect3Start, lineY1, connect3end, lineY2);
      var connect4 = av.g.line(connect4Start, lineY1, connect4end, lineY2);

      linesArray = new Array(connect1, connect2, connect3, connect4);
    }

      
    // Generate a random (but constrained) set of four increments
    function generateIncrements() {

      incrs[0] = Math.floor(Math.random() * 3) + 36;
      incrs[1] = Math.floor(Math.random() * 3) + 10; 
      // incrs[1] is something between incrs[0] and incrs[2]
      incrs[2] = Math.floor(Math.random() * (incrs[0] - incrs[1] - 1)) + incrs[1] + 1;
      incrs[3] = Math.floor(Math.random() * 3) + 3;
    }

    function generateMemoryValues() {
      freeValues[0] = Math.floor(Math.random() * 3) + 20;
      freeValues[1] = Math.floor(Math.random() * 3) + 40; 
      // incrs[1] is something between incrs[0] and incrs[2]
      freeValues[2] = Math.floor(Math.random() * (incrs[0] - incrs[1] - 1)) + incrs[1] + 1;
      freeValues[3] = Math.floor(Math.random() * 3) + 50;
    }
    
    // Process reset button: Re-initialize everything, including the increments
    function initialize() {
      generateIncrements();
      generateMemoryValues();

      $('#increments').val(incrs);
    
      var htmldata = "";
      htmldata = "<li>" + freeValues[0] + "</li><li>" + freeValues[1] + "</li><li>" + freeValues[2] + "</li><li>" + freeValues[3] + "</li>";
      //initialArray[ArraySize - i] = 45;
      $theArray.html(htmldata);
      
      // Log the initial state of the exercise
      OriginalMemBlock();
      var initData = {};
      initData.gen_array = initialArray;
      initData.gen_incrs = incrs;
      ODSA.AV.logExerciseInit(initData);

      theArray = av.ds.array($theArray, {center: false, layout: arrayLayout.val()}).css({"x": "275", "y": "252"});
      av.forward();
      av._undo = [];
      return theArray;
    }

    function insertIntoBlock(index) {

      var currIncr = incrs[currIncrIndex];
      console.log(currIncrIndex);
      console.log(currIncr);
      var newUsedRect = av.g.rect(freeStartArray[index], 250, currIncr * 2, 60).css({"fill": "coral"});

      freeStartArray[index] = freeStartArray[index] + currIncr * 2;

     //move connecting line accordingly
      linesArray[index].movePoints([[0, connectStartArray[index], 450], [1, ((freeStartArray[index] + freeFinArray[index])/2), 310]]).css({"stroke-width": 1});
      
      freeAmountLabel.text(freeNum - currIncr);
      usedNum = usedNum + currIncr;
      usedAmountLabel.text(usedNum);

      var newValue = theArray.value(index)-currIncr;
      theArray.value(index, newValue);

      currIncrIndex += 1;
    }

    function modelSolution(jsav) {

      var modelarr = jsav.ds.array([freeValues[0], freeValues[1], freeValues[2], freeValues[3]], {left: 200});
      jsav.displayInit();

      var i;
      var j;

      for (i = 0; i < 4; i += 1) {
        for(j = 0; j < 4; j += 1) {
                    
          if(incrs[i] <= modelarr.value(j)) {

            modelarr.highlight(j);
            modelarr.unhighlight(j);

            jsav.stepOption("grade", true);

            var newVal = modelarr.value(j) - incrs[i];
            modelarr.value(j, newVal);

            jsav.step();
            break;
          }
        }
      }
      return modelarr;
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
    //  function to call to generate the model answer (modelSolution())
    var exer = av.exercise(modelSolution, initialize, [{css: "background-color"}, {}],
       { controls: $('.jsavexercisecontrols')});
    exer.reset();
    
    // register click handlers for the array indices
    theArray.click(function (index) {
      console.log("INDEX: "+index);
      //av._redo = []; // clear the forward stack, should add a method for this in lib
      if (!theArray.isHighlight(index)) {
        theArray.highlight(index);
        setTimeout(function(){theArray.unhighlight(index)}, 250);
        exer.gradeableStep();
        insertIntoBlock(index);

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
