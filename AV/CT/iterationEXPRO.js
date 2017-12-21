/*global alert: true, console: true, ODSA */
$(document).ready(function() {
  "use strict";

  // Load the interpreter created by odsaAV.js
  var config = ODSA.UTILS.loadConfig();
  var interpret = config.interpreter;

  var settings = config.getSettings();

  var arraySize = 5,
      initialArray = [],
      jsavArray,
      av = new JSAV("jsavcontainer", {settings: settings});

  av.recorded(); // we are not recording an AV with an algorithm

  // Process help button: Give a full help page for this activity
  function help() {
    window.open("iterationEXHelpPRO.html", "helpwindow");
  }

  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  // Set click handlers
  $("#help").click(help);
  $("#about").click(about);

  function initialize() {
    var arrValues = [4, 13, 6, 9, 11];
    var arrValues = [4, 13, 6, 9, 11];
    var leftMargin = 270,
        rect_left = leftMargin - 150,
        rect0_top = 0,
        rect_top = 40,
        topMargin = rect_top + 20;

    var nodegap = 40;

    // blue boxes, floor 1
    // var topblue = av.g.rect(rect_left, rect0_top, 280, 35, 10).addClass("bluebox");
    var topblue1 = av.g.rect(rect_left , rect0_top, 130, 35, 10).addClass("bluebox");
    var toppurple1 = av.g.rect(rect_left + 95, rect0_top + 10, 20, 17, 17).addClass("calbox");
    var toppurple2 = av.g.rect(rect_left + 110, rect0_top, 55, 35, 10).addClass("calbox");

    var botblue = av.g.rect(rect_left, rect0_top + 295, 280, 35, 10).addClass("bluebox");

    // floor 2
    av.g.rect(rect_left, rect_top, 250, 35, 10).addClass("purplebox");
    av.g.rect(rect_left, rect_top + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

    //floor 3 and the JSAV array contains arrValues
    av.g.rect(rect_left, rect_top + 25, 30, 60, 10).addClass("purplebox").css({opacity: 0.9});
    av.g.rect(rect_left + 73, rect_top + 25, 30, 60, 10).addClass("purplebox").css({opacity: 0.9});
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});

    //floor 4, long purple
    av.g.rect(rect_left, rect_top + 76, 300, 30, 10).addClass("purplebox");

    //floor 5, left big purple box
    av.g.rect(rect_left, rect_top + 80, 110, 170, 10).addClass("purplebox");
    av.g.rect(rect_left, rect_top + 76, 50, 15).addClass("purplebox");

    //mid blue/calculate boxes ( and "set total = ..." blue box )
    var midblue1 = av.g.rect(rect_left + 130, rect_top + 120, 130, 66, 10).addClass("bluebox");
    var midblue2 = av.g.rect(rect_left + 220, rect_top + 139, 20, 32, 15).addClass("calbox");
    var midblue3 = av.g.rect(rect_left + 240, rect_top + 120, 120, 66, 10).addClass("calbox");

    // last purple floor
    av.g.rect(rect_left + 90, rect_top + 200, 240, 50, 10).addClass("purplebox");
    // if (jsavArray) {
    //   jsavArray.clear();
    //   swapIndex.clear();
    // }
    // initialArray = JSAV.utils.rand.numKeys(10, 100, arraySize);
    //
    // jsavArray = av.ds.array(initialArray, {indexed: true});
    // swapIndex = av.variable(-1);
    // // bind a function to handle all click events on the array
    // jsavArray.click(arrayClickHandler);
    // return jsavArray;
    return null;
  }

  function modelSolution(modeljsav) {
    // var modelArray = modeljsav.ds.array(initialArray);
    // modeljsav.displayInit();
    // for (var i = 0; i < arraySize; i++) {
    //   modelArray.highlight(i);
    //   modeljsav.umsg("Highlight " + i);
    //   modeljsav.gradeableStep();
    // }
    // // swap the first and last element
    // modelArray.swap(0, arraySize - 1);
    // modeljsav.umsg("Now swap");
    // modeljsav.gradeableStep();
    // return modelArray;
    return null;
  }

  // define a variable to hold the value of index to be swapped
  var swapIndex;

  var exercise = av.exercise(modelSolution, initialize,
                            { feedback: "continuous", compare: {class: "jsavhighlight"}});
  exercise.reset();

  function arrayClickHandler(index) {
    // // if last index is highlighted, we are in "swap mode"
    // if (this.isHighlight(arraySize - 1)) {
    //   // when in swap mode, first click on index will store that index
    //   // and change the font size on the value
    //   if (swapIndex.value() == -1) {
    //     swapIndex.value(index);
    //     // apply the CSS property change to index
    //     this.css(index, {"font-size": "130%"});
    //     av.step(); // add a step to the animation
    //   } else {
    //     // the second click (swapIndex has some value) will cause
    //     // the swap of indices index and stored swapIndex
    //     this.swap(index, swapIndex.value());
    //     // change the font-size back to normal
    //     this.css(swapIndex.value(), {"font-size": "100%"});
    //     swapIndex.value(-1);
    //     exercise.gradeableStep(); // this step will be graded
    //   }
    // } else { // we are in highlight mode
    //   // highlight the index
    //   this.highlight(index);
    //   if (index == (arraySize - 1)) {
    //     av.umsg("Good, now swap the first and last index");
    //   }
    //   // mark this as a gradeable step; also handles continuous feedback
    //   exercise.gradeableStep();
    // }
  }

});
