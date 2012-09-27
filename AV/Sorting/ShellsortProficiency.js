"use strict";
/*global alert, getAVName, log_exercise_init_array*/
(function ($) {
  /* **************************************************************
  *  This first section is generic initialization that all AVs    *
  *  will need, including initialization for the OpenDSA library  *
  *  The first line you need to set to use your form's name       *
  ************************************************************** */
  // Define the local context (from form name)
  var context = $("#ShellsortProficiency");

  // settings for the AV
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  // add the layout setting preference
  var arrayLayout = settings.add("layout", {"type": "select",
        "options": {"bar": "Bar", "array": "Array"},
        "label": "Array layout: ", "value": "array"});

  //containing HTML element with id ShellsortProficiency.
  var av = new JSAV(context, {settings: settings});
  av.recorded();

  // Create a convenience function named tell for writing to the
  // output buffer
  var tell = function (msg, color) { av.umsg(msg, {color: color}); };

  var ArraySize = 10; // Size of the exercise array

  /* **************************************************************
  *        Everything below this is specific to this AV           *
  ************************************************************** */

  var incrs = [], // The array of increments
      $theArray = $("#profArray"),
      initialArray = [], // needed for model answer
      theArray,
      mode,
      currIncrIndex, // The index for the student's current increment
      currSublist = 0; // the current sublist number
    
  // Partial Shellsort. Sweep with the given increment
  function sweep(jsav, arr, incr, modelmode) {
    var j = 0,
        numElem = 0,
        highlightFunction = function (index) { return index % incr === j; };
    for (j = 0; j < incr; j++) {         // Sort each sublist
      // Highlight the sublist
      numElem = Math.ceil(arr.size() / incr);
      if (j + (incr * (numElem - 1)) >= arr.size()) {
        numElem = numElem - 1;
      }
      if (numElem === 1) {
        return;
      } else {
        arr.highlight(highlightFunction);
        modelmode.value("SORTING");
        jsav.stepOption("grade", true);
        jsav.step();
      }
      inssort(jsav, arr, j, incr);
      arr.unhighlight(highlightFunction);
      modelmode.value("SELECTING");
      jsav.stepOption("grade", true);
      jsav.step();
    }
  }

  // Insertion sort using increments
  function inssort(jsav, arr, start, incr) {
    var i, j;
    for (i = start + incr; i < arr.size(); i += incr) {
      for (j = i; j >= incr; j -= incr) {
        if (parseInt(arr.value(j), 10) < parseInt(arr.value(j - incr), 10)) {
          arr.swap(j, j - incr); // swap the two indices
          jsav.step();
        } else {
          break; // Done pushing element, leave for loop
        }
      }
    }
  }

  // generates the model answer; calls sweep above
  function shellsort(jsav) {
    var modelarr = jsav.ds.array(initialArray, {indexed: true, layout: arrayLayout.val()}),
      modelmode = jsav.variable("SORTING");
    var i;
    jsav.displayInit();
    for (i = 0; i < incrs.length; i += 1) {
      if (incrs[i] < modelarr.size()) {
        sweep(jsav, modelarr, incrs[i], modelmode); // run the sweep to create the AV
      }
      modelmode.value("FIRSTSELECTING");
      modelarr.unhighlight();
      jsav.stepOption("grade", true);
      jsav.step();
    }
    return [modelarr, modelmode];
  }
    
  // Generate a random (but constrained) set of four increments
  // (tuned for an array size of 10)
  function generateIncrements() {
    incrs[0] = Math.floor(Math.random() * 3) + 6; // incrs[0]: 6 to 8
    incrs[2] = Math.floor(Math.random() * 3) + 2; // incrs[2]: 2 to 4
    // incrs[1] is something between incrs[0] and incrs[2]
    incrs[1] = Math.floor(Math.random() * (incrs[0] - incrs[2] - 1)) + incrs[2] + 1;
    incrs[3] = 1; // Always end in 1
  }
  
  // Process reset button: Re-initialize everything, including the increments
  function initialize() {
    generateIncrements();
    $('#incrField').val(incrs);
  
    var htmldata = "";
    for (var i = ArraySize; i > 0; i--) {
      var randomVal = Math.floor(Math.random() * 100);
      htmldata += "<li>" + randomVal + "</li>";
      initialArray[ArraySize - i] = randomVal;
    }
    $theArray.html(htmldata);

    // Log the exercise initialization
    log_exercise_init_array(getAVName(), initialArray);

    theArray = av.ds.array($theArray, {indexed: true, layout: arrayLayout.val()});
    currIncrIndex = av.variable(0);
    currSublist = av.variable(0);
    mode = av.variable("SELECTING");
    swapIndex = av.variable(-1);
    tell("To start the exercise: Click on array elements to highlight those that make up the first sublist. Use increment " + incrs[currIncrIndex.value()]);
    av.forward();
    av._undo = [];
    return [theArray, mode];
  }

  // Process help button: Give a full help page for this activity
  // We might give them another HTML page to look at.
  function help() {
    window.open("SSprofHelp.html", 'helpwindow');
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Shellsort Proficiency Exercise\nWritten by Cliff Shaffer and Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Process Done selecting button: change the message, array status
  function selecting() {
    // Don't do anything if user not in SELECTING mode
    if (mode.value() !== "SELECTING" && mode.value() !== "FIRSTSELECTING") { return; }
    mode.value("SORTING");
    tell("Click on two array elements to swap them. Swap elements in the sublist until it is sorted.");
    exer.gradeableStep(); // mark this as a gradeable step; also handles continuous feedback
  }

  // Process Done sorting Sublist button: change the message, array status
  function sorting() {
    // Don't do anything if user not in SORTING mode
    if (mode.value() !== "SORTING") { return; }
    mode.value("SELECTING");
    tell("Current increment is " + incrs[currIncrIndex.value()] + ". Click on array elements to highlight those that make up the next sublist. If you have already sorted the last sublist for this increment, then click the 'Done Increment' button. Do not bother to process sublists with only one element.");
    theArray.unhighlight();
    if (currSublist.value() > 0) {
      theArray.toggleArrow(currSublist.value());
    }
    theArray.toggleArrow(currSublist.value() + 1);
    currSublist.value(currSublist.value() + 1);
    
    exer.gradeableStep(); // mark this as a gradeable step; also handles continuous feedback
  }

  // Process Done Increment button: change the message, array status
  function incrementing() {
    // Don't do anything if user not in SELECTING mode
    if (mode.value() !== "SELECTING") { return; }
    var currIndex = currIncrIndex.value();
    if (currIndex < 3) {
      theArray.unhighlight();
      currIncrIndex.value(currIndex + 1);
      theArray.toggleArrow(currSublist.value());
      currSublist.value(0);
      
      tell("Click on array elements to highlight those that make up the first sublist. Use increment " + incrs[currIndex + 1]);
    } else {
      tell("Exercise is done, check your grade.");
    }
    mode.value("FIRSTSELECTING");
    exer.gradeableStep(); // mark this as a gradeable step; also handles continuous feedback
  }

  // function that will be called by the exercise if continuous feedback mode
  // is used and the fix errors mode is on.
  function fixState(modelState) {
    var modelArray = modelState[0],
        size = modelArray.size(),
        modelMode = modelState[1];
    for (var i = 0; i < size; i++) {
      var val = modelArray.value(i),
          hl = modelArray.isHighlight(i);
      if (theArray.isHighlight(i) !== hl) { // fix highlights
        if (hl) { theArray.highlight(i); } else { theArray.unhighlight(i); }
      }
      if (val !== theArray.value(i)) { // fix values
        theArray.value(i, val);
      }
    }
    var modelModeVal = modelMode.value();
    // every gradable step changes the mode, so we can use it to deduce the
    // action we should take. this will set the state of the exercise correctly
    if (modelModeVal === "SORTING") {
      // if the mode in model answer is sorting, we should call selecting
      // since after selecting(), the mode will be sorting
      selecting();
    } else if (modelModeVal === "SELECTING") {
      sorting();
    } else if (modelModeVal === "FIRSTSELECTING") {
      incrementing();
    }
  }

  // Initialize the exercise
  // Defines the function to call on reset (initialize()), and the
  //  function to call to generate the model answer (shellsort())
  var exer = av.exercise(shellsort, initialize, [{css: "background-color"}, {}],
      { controls: $('.jsavexercisecontrols'),
      fix: fixState,
      feedback: "continuous",
      fixmode: "fix"});
  exer.reset();
  
  var swapIndex;
  // register click handlers for the array indices
  theArray.click(function (index) {
    av._redo = []; // clear the forward stack, should add a method for this in lib
    if (mode.value() === "SELECTING" || mode.value() === "FIRSTSELECTING") { // in selecting mode, highlight index
      if (!theArray.isHighlight(index)) {
        theArray.highlight(index);
      } else {
        theArray.unhighlight(index);
      }
      av.step();
    } else if (mode.value() === "SORTING") { // in sorting mode
      var sIndex = swapIndex.value();
      if (sIndex === -1) { // if first click
        theArray.css(index, {"font-size": "130%"});
        swapIndex.value(index);
        av.forward();
      } else { // second click will swap
        theArray.swap(sIndex, index);
        theArray.css([sIndex, index], {"font-size": "100%"});
        swapIndex.value(-1);
        av.forward();
      }
    }
  });

  // Connect the action callbacks to the HTML entities
  $('input[name="help"]').click(help);
  $('input[name="about"]').click(about);
  $('input[name="selecting"]', context).click(selecting);
  $('input[name="sorting"]', context).click(sorting);
  $('input[name="incrementing"]', context).click(incrementing);

}(jQuery));

