"use strict";
var
  jsav,           // The JSAV object
  arr ,
  arr_clone,
  arr_left,
  arr_right,
  userInput,      // Boolean: Tells us if user ever did anything
  arrdata,
  useranswer,
  left_size,
  isSelected,     // Boolean: True iff user has already clicked an array element
  sel1 ;

var rowHeight = 80;     // Space required for each row to be displayed
var canvasWidth = 800;  // Width of the display
var blockWidth = 47;    // Width of an array element

// Variables used to keep track of the index and array of the
// currently selected element 
var mergeValueIndex = -1;
var mergeValueArr = null;

// function to handle a click event on an array
// Right now, this does not give the behavior that we want.
// User should be restricted to allow only moving elements from
// the bottom arrays to the top array.
// On click of bottom array element, highlight.
// On click of (free) position in top array, move highlighted element there.
var clickHandler = function (arr, index) {
  if (isSelected === false) {
    // No element is selected, select an element in a bottom array
    // and highlight
    // Don't let the user select an empty element
    if (arr.value(index) == "") { return; }
    arr.highlight(index);
    isSelected = true;
    mergeValueArr = arr;
    mergeValueIndex = index;
  }
  else {
    if (arr == mergeValueArr && index == mergeValueIndex) {
      // Deselect the currently selected element
      arr.unhighlight(index);
      isSelected = false;
    }
    else {
      if (arr != mergeValueArr) {
        // Don't let the user overwrite a merged element
        if (arr.value(index) != "") return;
        var arrLevel = getLevel(arr);
        var mvaLevel = getLevel(mergeValueArr);
        // Ensure the user only merges one level up, not down or too far up
        if (arrLevel == mvaLevel - 1) {
          // Complete merge by setting the value of the current element to the stored value
          arr.value(index, mergeValueArr.value(mergeValueIndex));
          useranswer.value(index, mergeValueArr.value(mergeValueIndex));
          // Clear values the user has already merged
          mergeValueArr.value(mergeValueIndex, "");
          mergeValueArr.unhighlight(mergeValueIndex);
          isSelected = false;
        }
      }
      else {
        if (arr === mergeValueArr) {
          var arrLevel = getLevel(arr);
          if (arrLevel  === 2) {
            arr.swap(index,mergeValueIndex);
            isSelected = false;
            arr.unhighlight(index);
            arr.unhighlight(mergeValueIndex);
            var temp = useranswer.value(index);
            useranswer.value(index,useranswer.value(mergeValueIndex));
            useranswer.value(mergeValueIndex,temp);
          }
        }
      }
    }
  }
  userInput = true;
}

// function that initialise JSAV library 
var initJSAV = function (arr_size) {
  var i;

  userInput = false;  
  isSelected = false;
  jsav = new JSAV($("#container"));
  left_size = Math.floor(arr_size/2);
  arrdata = JSAV.utils.rand.numKeys(10, 100,arr_size);
  initArrays(arr_size,0,arr_size-1, 2, 1,0);
  initArrays(arr_size,0,left_size-1,3,1,1);
  initArrays(arr_size,left_size,arr_size-1,3,2,2);
  arrdata.sort(function(a,b){return a-b});
  arr_clone = jsav.ds.array(arrdata, {indexed: true, center: false, layout: "array"});
  arr_clone.hide();
  var emptycontent = new Array(arr_size);
  useranswer = jsav.ds.array(emptycontent, {indexed: true, center: false, layout: "array"});
  useranswer.hide();
}
	
// function that creates and initialises the arrays for mergesort
function initArrays(a,l, r, level, column,data_type) {
  var i;
  var numElements = r - l + 1;
  var contents = new Array(numElements);
  var top = rowHeight * (level - 1);			
  if (data_type == 1)  {
    for (i=0; i<numElements; i++) {
      contents[i]=arrdata[i];
    }
    contents.sort(function(a,b){return a-b});
  }
  if (data_type == 2) {
    for (i=0; i<numElements; i++) {
      contents[i]=arrdata[i+left_size];
    }
    contents.sort(function(a,b){return a-b});

    var left = (( a - numElements) *blockWidth ) + blockWidth;
  }
                
  // Dynamically create and position arrays
  var arr = jsav.ds.array(contents, {indexed: true, center: false, layout: "array"});
  // Set the ID for the array
  arr.element.attr("id", "array_" + level + "_" + column + "_" + l);
  if (data_type == 2) {
    arr.element.css({"left": left, "top": top});
  } else 
    arr.element.css({"top": top});
  // Attach the click handler to the array
  arr.click(function(index){clickHandler(this, index)});
}

// Check user's answer for correctness: User's array must match answer
function checkAnswer (arr_size) {
  var i;
  for (i=0; i < arr_size; i++) {
    if (useranswer.value(i) != arr_clone.value(i)) {
      return false;
    }
  }
  return true;
} 

// Return the level of the given array
var getLevel = function (arr) {
  return parseArrId(arr)[0];
}

var parseArrId = function (arr) {
  var id = arr.element.attr("id");
  var args = id.split("_");

  var level = parseInt(args[1]);
  var column = parseInt(args[2]);
  var arrOffset = parseInt(args[3]);

  return [level, column, arrOffset];
}
