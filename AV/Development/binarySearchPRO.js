(function ($) {
  "use strict";

  var arraySize = 20,
    key,
    initialArray = [],
    array,
    keyholder,
    findLabel,
    av = new JSAV($("#jsavcontainer")),
    code = av.code(
      "int binarySearch(int[] table, int x) {\n"+
      "    int low = 0;\n"+
      "    int high = table.length - 1;\n"+
      "    int mid;\n"+
      "\n"+
      "    while( low <= high )\n"+
      "    {\n"+
      "        // Division truncates\n"+
      "        mid = (low + high) / 2;\n"+
      "        if( table[mid] < x)\n"+
      "            low = mid + 1;\n"+
      "        else if(table[mid] > x)\n"+
      "            high = mid - 1;\n"+
      "        else\n"+
      "            return mid;\n"+
      "    }\n"+
      "    return -1;     // Not found\n"+
      "}");

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {

    // show the code and highlight the row where mid is calculated
    code.show();
    code.highlight(8);

    //generate random array with ascending values
    var randomVal = 0;
    for (var i = 0; i < arraySize; i++) {
      randomVal += Math.floor(Math.random()*10);
      initialArray[i] = randomVal;
    }

    //generate a random key, the value of which is between the min and max of the array
    key = Math.ceil(5* (initialArray[0] + initialArray[arraySize -1]) / 7);
    
    // clear old elements
    if (keyholder) {
      keyholder.clear();
    }
    if (findLabel) {
      findLabel.clear();
    }
    if (array) {
      array.clear();
    }

    //insert key into the array (the blue box)
    keyholder = av.ds.array([key], {indexed: false});
    keyholder.css(0, {"background-color": "#ddf"});
    findLabel = av.label("Find", {relativeTo: keyholder, anchor: "center top", myAnchor: "center bottom"});

    // create the empty array
    array = av.ds.array(new Array(arraySize), {indexed: true, autoresize: false});
    array.click(clickhandler);
    array.layout();

    return array;
  }

  function modelSolution(jsav) {
    jsav.ds.array([key], {indexed: false}).css(0, {"background-color": "#ddf"});
    var modelArray = jsav.ds.array(Array(arraySize), {indexed: true, autoresize: false});

    jsav._undo = [];

    var low = 0, high = arraySize - 1, mid;

    while (low <= high) {
      mid = Math.floor( (low + high)/2);
      jsav.umsg("Low = " + low + " and high = " + high +
        ", so mid = ( " + low + " + " + high + " ) / 2 = <strong>" + mid + "</strong> (line 9, division truncates!)");
      modelArray.value(mid, initialArray[mid]);
      modelArray.highlight(mid);
      if (modelArray.value(mid) < key) {
        jsav.umsg("<br/>Because " + modelArray.value(mid) + " is less than " + key + ", the new low will be <strong>" + (mid + 1) + "</strong>. (line 10 and 11)", {preserve: true});
        low = mid + 1;
        paintGrey(modelArray, 0, mid);
      }
      if (modelArray.value(mid) > key) {
        jsav.umsg("<br/>Because " + modelArray.value(mid) + " is greater than " + key + ", the new high will be <strong>" + (mid - 1) + "</strong>. (line 12 and 13)", {preserve: true});
        high = mid - 1;
        paintGrey(modelArray, mid, arraySize - 1);
      }
      if (modelArray.value(mid) === key) {
        jsav.umsg("<br/>The key was found at index " + mid + "!", {preserve: true});

        paintGrey(modelArray, 0, arraySize - 1);
      }
      jsav.stepOption("grade", true);
      jsav.step();
      if (modelArray.value(mid) === key) {
        return modelArray;
      }
    }
    jsav.umsg("<br/>The key wasn't found in the table.", {preserve: true});
    return modelArray;
  }

  var exercise = av.exercise(modelSolution, initialize, {}, {feedback: "atend", modelDialog: {width: 780}});
  exercise.reset();

  // bind a function to handle all click events on the array
  function clickhandler(index) {
    
    //if the clicked index is not higlighted earlier, highlight it and paint the ones which are outside of the new range
    if (!this.isHighlight(index)) {
      this.value(index, initialArray[index]);
      // if (this.value(index) > key) {
      //     paintGrey(this, index, arraySize - 1);
      // } else if (this.value(index) < key) {
      //     paintGrey(this, 0, index);
      // }
      // if (this.value(index) === key) {
      //     paintGrey(this, 0, arraySize - 1);
      // }
      // highlight the index
      this.highlight(index);
      exercise.gradeableStep();
    }
  }

  // paints the background gray for indices [first, last].
  function paintGrey(array, first, last) {
    array.addClass(
      function(index) {return index >= first && index <= last},
      "greybg"
      );
  }

}(jQuery));