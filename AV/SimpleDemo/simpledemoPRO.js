"use strict";
/*global alert: true, ODSA */
$(document).ready(function () {
  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }


    // generates the model answer
    function modelSolution(modeljsavAV) {
      var modelArray = modeljsavAV.ds.array(initialArray);
      modeljsavAV.displayInit();
      for (var i = 0; i < arraySize; i++) {
        modelArray.highlight(i);
	  modelArray.value(i,modelArray.value(i)+1);
        modeljsavAV.umsg("Increment and highlight " + i);
        modeljsavAV.gradeableStep();
      }
      // swap the first and last element
      modelArray.swap(0, arraySize - 1);
      modeljsavAV.umsg("Now swap");
      modeljsavAV.gradeableStep();
      return modelArray;
    }
    

    // Process reset button: Re-initialize everything
    function initialize() {
      if (jsavArray) {
        jsavArray.clear();
        swapIndex.clear();
      }
      av.umsg("Directions: In the first phase, click on each array element from left to right to highlight it after you have filled in its newly incremented value in the space provided. Then click on the first and last elements to swap them."); 
      initialArray = JSAV.utils.rand.numKeys(10, 100, arraySize);

      jsavArray = av.ds.array(initialArray, {indexed: true});
      swapIndex = av.variable(-1);
      // bind a function to handle all click events on the array
      jsavArray.click(arrayClickHandler);
      return jsavArray;
    }

  // function that will be called by the exercise if continuous feedback mode
  // is used and the fix errors mode is on.
  function fixState(modelState) {
      var modelArray = modelState;
      var size = modelArray.size();
      for (var i = 0; i < size; i++) {
	  var val = modelArray.value(i),
              hl = modelArray.isHighlight(i);
      if (jsavArray.isHighlight(i) !== hl) { // fix highlights
        if (hl) { jsavArray.highlight(i); } else { jsavArray.unhighlight(i); }
      }
      if (jsavArray.value(i) !== val) { // fix value
	  jsavArray.value(i,modelArray.value(i));
      }

      }
    }

  // Click handler for all array elements.  When not swapping, we
  // assume that the user has entered the new value for the array cell
  // in the answer box provided on the form
   function arrayClickHandler(index) {
      // if last index is highlighted, we are in "swap mode"
      if (jsavArray.isHighlight(arraySize - 1)) {
        // when in swap mode, first click on index will store that index
        // and change the font size on the value
        if (swapIndex.value() == -1) {
          swapIndex.value(index);
          // apply the CSS property change to index
            jsavArray.addClass(index, "enlarge");
          av.step(); // add a step to the animation
        } else {
          // the second click (swapIndex has some value) will cause
          // the swap of indices index and stored swapIndex
          jsavArray.swap(index, swapIndex.value());
          swapIndex.value(-1);
          jsavArray.removeClass(index, "enlarge");
          // change the font-size back to normal
          exer.gradeableStep(); // this step will be graded
        }
      } else { // we are in highlight mode
        // highlight the index and check for the correctness of its
        // new value
  	var answer = $('#answer').val().replace(/\s+/g, '');
	  $('#answer').val("");
	  jsavArray.value(index, answer);
	  jsavArray.highlight(index);
        if (index == (arraySize - 1)) {
          av.umsg("Good, now swap the first and last index");
        }
        // mark this as a gradeable step; also handles continuous feedback
        exer.gradeableStep();
      }
   }


  // Connect the action callbacks to the HTML entities
  $('#help').click(help);
  $('#about').click(about);

  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////
  // Load config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,       // get the interpreter
      settings = config.getSettings();      // Settings for the AV

  // add the layout setting preference
  var arrayLayout = settings.add("layout", {"type": "select",
        "options": {"bar": "Bar", "array": "Array"},
        "label": "Array layout: ", "value": "array"});

    var arraySize = 8,
        initialArray = [],
        jsavArray;
    var av = new JSAV($('.avcontainer'), {settings: settings});

    // define a variable to hold the value of index to be swapped
    var swapIndex;

    av.recorded(); // we are not recording an AV with an algorithm

  // Initialize the exercise.  Defines the function to call on reset
  // (initialize()), and the function to call to generate the model
  // answer

  var exer = av.exercise(modelSolution, initialize,
               {compare: {"class": "jsavhighlight"},
                controls: $('.jsavexercisecontrols'), fix: fixState});

    
  exer.reset();

});
