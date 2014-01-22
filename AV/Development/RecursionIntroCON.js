"use strict";

//Possible positions for Array-Based list
(function ($) {
  var arrPositions = [" ",5, 7, 3, 9," "];

  //calculate left margin for the JSAV array object
  var canvasWidth = $('.jsavcanvas').width();
  var arrWidth3 = arrPositions.length * 65;
  var leftMargin3 = (canvasWidth - arrWidth3) / 2;
  var jsav = new JSAV("RecursionIntroCON1");
  var i;
  var arrowArray = [];
  var arr = jsav.ds.array(arrPositions, {indexed: false, layout: "array"}).hide();
 
  //arr.css({top: 10});

  jsav.umsg('Since insertions take place at the current position, and since we want to be able to insert to the front or the back of the list as well as anywhere in between, there are actually <i>n</i> + 1 possible "current positions" when there are <i>n</i> elements in the list');
  jsav.displayInit();
  arr.show();
  for(i = 0; i < 5; i++) {
    arrowArray[i] = jsav.g.line(leftMargin3 + 65 + 65 * i, 0,
                                leftMargin3 + 65 + 65 * i, 25,
      {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  }
  jsav.umsg("Here is a list with 4 elements");
  jsav.step();
  for(i = 0; i < 5; i++) {
    arrowArray[i].show();
  }
  jsav.umsg('The arrows show the five possible positions for "current"');
  jsav.step();
  jsav.recorded();
}(jQuery));

//listADT insertion
/*
(function ($) {

  var jsav = new JSAV("listADTCON2");
  var arrPositions = ["<", 20,",", 23,"|", 12,",", 15,">","","","",""];
  var length = arrPositions.length;
  var curr = 4;

  //calculate left margin for the JSAV array object
  var canvasWidth = $('.jsavcanvas').width();
  var arrWidth3 = (length-4) * 40;
  var leftMargin3 = (canvasWidth - arrWidth3) / 2;

  //Hidden jsav array for copyValue animation
  var temp = ["10","|","17"];
  var arr1 = jsav.ds.array(temp, {indexed: false, layout: "array"}).hide();
  arr1.css({left: 10});
  
  //jsav array object of the sildeshow
  var arr = jsav.ds.array(arrPositions, {indexed: false, layout: "array"});
  arr.css({top: 10});

  jsav.umsg("We can make our list display notation more clear by showing the position of the current element. We will use a vertical bar like this:");
  jsav.displayInit();

  jsav.umsg("This example shows a list of four elements, with the current position being to the right of the bar at element 12");
  jsav.step();

  var i;
  for(i = length-3; i > curr ; i--){
	jsav.effects .copyValue(arr, i, arr, i+2);
  }
  jsav.effects .copyValue(arr1, 0, arr, curr+1);
  arr.value(curr+2, ",");
  jsav.umsg("Given this configuration, calling insert with value 10 will change the list to be:");
  jsav.step();

//  jsav.effects.copyValue(arr1, 1, arr, 10);
  arr.value(4, ",");
  arr.value(10, "|");
  arr.value(11, ">");  
  jsav.umsg("Here is another example, showing the current position set to allow insertion at the end of the list");
  jsav.step();

  jsav.effects .copyValue(arr, 11, arr, 12);
  jsav.effects .copyValue(arr1, 2, arr, 11);
  jsav.umsg("Here is the result of inserting 17");
  jsav.step();

  arr.css([11], {"color": "red"});
  jsav.umsg("The current element is now 17");
  jsav.step();
  jsav.recorded();
}(jQuery));*/
