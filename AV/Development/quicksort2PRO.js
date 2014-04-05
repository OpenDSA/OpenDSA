(function ($) {
  "use strict";
  var arraySize = 10,
    pivotSelectionMethod = PARAMS.pivot || "last",     // use the last element in the bound as the pivot
    noPivotSize = PARAMS.nopivotifle? parseInt(PARAMS.nopivotifle): 1,
    swapOptions = {arrow: false, highlight: false},
    initialArray,
    array,
    stack,
    mode,
    clickHandler,
    av = new JSAV($("#jsavcontainer"));

  var pivotFunction = {
    last: function (left, right) { return right; },
    middle: function (left, right) { return Math.floor((right + left) / 2); }
  }

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {
    
    exercise.jsav.container.find(".jsavcanvas").css({height: 350});

    //set up click handler
    if (typeof clickHandler === "undefined") {
      clickHandler = new ClickHandler(av, exercise, {effect: "swap", selectedClass: "selected"});
    }
    clickHandler.reset();

    //generate random infix and insert in the array
    initialArray = JSAV.utils.rand.numKeys(10, 125, arraySize);

    // initialize array
    if (array) {
      clickHandler.remove(array);
      array.clear();
    }
    array = av.ds.array(initialArray, {indexed: true, layout: "bar"});
    array.element.css({top: 40});
    array.layout();
    clickHandler.addArray(array, {
      onSelect: function (index) {
        // don't allow selection of inactive values
        if (array.hasClass(index, "inactive"))
          return false;

        switch (mode.value()) {
          case 0:
            //return true to tell clickHandler to select the item
            return true;
            break;
          case 1:
            extendStackValue("Left", index);
            av.umsg("Select the <strong>right endpoint</strong>.");
            mode.value(2);
            av.step();
            break;
          case 2:
            extendStackValue("Right", index);
            av.umsg("");
            var left = getCurrentValue("Left", stack);
            var right = index;
            focusOn(array, left, right);
            if (right - left >= noPivotSize)
              highlightAndSwapPivot(array, left, right);
            mode.value(0);
            exercise.gradeableStep();
            break;
        }
        //disable selecting
        return false;
      }
    });


    //stack
    if (stack) {
      clickHandler.remove(stack);
      stack.clear();
    }
    stack = av.ds.stack({xtransition: 5, ytransition: 25, center: false});
    // stack = av.ds.list({nodegap: 15, layout: "vertical", center: false, autoresize: false});
    stack.element.css({width: 180, position: "absolute"});
    stack.element.css({top: 250, left: av.canvas.width() / 2 - 90});
    stack.addFirst("Left: 0, Right: "+(arraySize - 1));
    stack.layout();
    
    //mode variable
    //0 when swapping
    //1 when selecting left endpoint
    //2 when selecting right endpoint
    if (mode) {
      mode.clear();
    }
    mode = av.variable(0);

    // clear all the Raphael elements
    av.getSvg().clear();

    // add text
    var font = {
      "font-size": 16,
      "font-family": "Times New Roman",
      "font-weight": "bold"
    };
    var canvasWidth = exercise.jsav.container.find(".jsavcanvas").width();
    av.getSvg().text(canvasWidth / 2, 20, "Table to be sorted").attr(font);
    av.getSvg().text(canvasWidth / 2, 230, "Call Stack").attr(font);

    //hide old umsg messages
    av.umsg("");

    focusOn(array, 0, arraySize - 1);

    return array;
  }

  function modelSolution(jsav) {
    //array
    var modelArray = jsav.ds.array(initialArray, {indexed: true, layout: "bar"});

    // var modelStack = jsav.ds.list({nodegap: 15, layout: "vertical", center: false, autoresize: false});
    var modelStack = jsav.ds.stack({xtransition: 5, ytransition: 25, center: false});
    modelStack.element.css({width: 180, position: "absolute"});
    modelStack.element.css({top: 200, left: jsav.canvas.width() / 2 - 90});

    jsav.canvas.css({height: 350});

    jsav._undo = [];

    function modelRadix(left, right) {
      var partitionHasPivot = false;

      modelStack.addFirst("Left: " + left + ", Right: " + right);
      modelStack.layout();

      focusOn(modelArray, left, right);
      if (right - left >= noPivotSize) {
        highlightAndSwapPivot(modelArray, left, right);
        partitionHasPivot = true;
      }

      //add a step if not first call
      if (left !== 0 || right !== arraySize - 1) {
        jsav.stepOption("grade", true);
        jsav.step();
      } else {
        jsav.displayInit();
      }

      if (partitionHasPivot) {
        var i = left;
        var j = right - 1;

        do {
          while ( modelArray.value(i) < modelArray.value(right))
            i++;
          while ( j >= left && modelArray.value(j) >= modelArray.value(right))
            j--;
          if (i < j) {
            modelArray.swap(i, j, swapOptions);
            jsav.stepOption("grade", true);
            jsav.step();
          }
        } while (i < j);

        // swap i and right
        if (i !== right) {
          modelArray.swap(i, right, swapOptions);
          jsav.stepOption("grade", true);
          jsav.step();
        }

        //call function recursivley for both sides
        if (i - left > 1)
          modelRadix(left, i - 1);
        if (right - i > 1)
          modelRadix(i + 1, right);
      } else {
        //TODO
      }

      //return
      returnClick(modelArray, modelStack);
      jsav.stepOption("grade", true);
      jsav.step();
    }

    modelRadix(0, arraySize - 1);

    return modelArray;
  }

  //create excercise
  var exercise = av.exercise(modelSolution, initialize, {css: "background-color"}, {feedback: "atend"});
  // edit reset function so that it calls highlightAndSwapPivot when done
  var origreset = exercise.reset;
  exercise.reset = function () {
    origreset.apply(this);
    highlightAndSwapPivot(array, 0, arraySize - 1);
    av.displayInit();
  };
  exercise.reset();


  var $callButton = $("#callButton");
  var $returnButton = $("#returnButton");
  
  // add buttons if they don't exist
  if ($callButton.length === 0) {
    $callButton = $("<button>Call</button>");
    $("#jsavcontainer .jsavcanvas").append($callButton);
  }
  if ($returnButton.length === 0) {
    $returnButton = $("<button>Return</button>")
    $("#jsavcontainer .jsavcanvas").append($returnButton);
  }

  //position buttons
  $callButton.css({position: "absolute", left: 50, top: 250, width: 100});
  $returnButton.css({position: "absolute", left: 50, top: 280, width: 100});
  //add click handlers
  $callButton.click(function () {
    mode.value(1);
    clickHandler.deselect();
    stack.addFirst("");
    stack.layout();
    av.umsg("Select the <strong>left endpoint</strong>.");
    av.step();
  });
  $returnButton.click(function () {
    returnClick(array, stack);
    exercise.gradeableStep();
  });



  //returns the value of Left or Right of the topmost item of the stack
  function getCurrentValue(name, stack) {
    var result;
    var value;
    if (stack.first()) {
      value = stack.first().value();
    } else {
      value = "Left: " + 0 + ", Right: " + (arraySize - 1);
    }
    var parts = value.split(", ");
    parts.forEach(function (val) {
      var newparts = val.split(": ")
      if (newparts[0] === name){
        result = newparts[1];
      }
    });
    return parseInt(result);
  }

  //extends the value of the topmost element on the stack
  function extendStackValue(name, value) {
    var oldvalue = stack.first().value();
    if (!oldvalue) {
      oldvalue = name + ": " + value;
    } else {
      oldvalue += ", " + name + ": " + value;
    }
    stack.first().value(oldvalue);
  }

  function highlightAndSwapPivot(arr, first, last) {
    var index = pivotFunction[pivotSelectionMethod](first, last);

    arr.addClass(index, "pivot");

    if (index !== last) {
      arr.swap(index, last, swapOptions);
    }
  }

  // fades out all the squares outside of [first, last]
  function focusOn(arr, first, last) {
    arr.removeClass(function (index) {
      return index >= first && index <= last;
    },
    "inactive");
    arr.addClass(function (index) {
      return index < first || index > last;
    },
    "inactive");
  }

  //pops the stack and focuses on the previous range
  function returnClick(array, stack) {
    if (stack.size()) {
      // remove pivots from the range
      array.removeClass(function (index) {
        return index >= getCurrentValue("Left", stack) && index <= getCurrentValue("Right", stack);
      }, "pivot");

      // add green background
      array.addClass(function (index) {
        return index >= getCurrentValue("Left", stack) && index <= getCurrentValue("Right", stack);
      }, "greenbg");

      stack.removeFirst();
      stack.layout();
    }
    if (stack.size()) {
      focusOn(array,
        getCurrentValue("Left", stack),
        getCurrentValue("Right", stack));
    } else {
      focusOn(array, 0, arraySize - 1);
    }
  }

}(jQuery));