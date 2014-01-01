"use strict";

//array values for AlistCON1, AlistCON2
var arrValues = [13, 12, 20, 8, 3, "", "", ""];
//elements size of array in AlistCON1, AlistCON2
var itemsSize = 5;

//sets the backgroud of the array elements according to their values
function bgColor(array) {
  var i;
  for(i=0; i<array.size();i++) {
    if(array.value(i)=="") {
      array.css([i], {"background-color": "#eee"});
    } else {
      array.css([i], {"background-color": "#fff"});
    }
  }
}

// Array-Based list insertion
(function ($) {
  var jsav = new JSAV("AlistInsertCON");

  //pseudocode
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: AListInsert *** */",
                       endBefore: "/* *** ODSAendTag: AListInsert *** */"});
  var leftMargin = 7;
  //vertical arrow in step 1
  var arrow1_x = leftMargin + 15;
  var arrow1 = jsav.g.line(arrow1_x, -10, arrow1_x, 20,
			   {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  arrow1.hide();
  //label in step 1
  var label = jsav.label("Insert 23",
			  {before: arr, left: arrow1_x - 16, top: -20}).hide();
  //horizontal arrow in step 2
  var arrow2 = jsav.g.line(leftMargin + 50, 5, leftMargin + 150, 5,
        {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  arrow2.hide();
  var arrow3 = jsav.g.line(arrow1_x+90, -10, arrow1_x+90, 20,
			   {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  arrow3.hide();
  // Create the array object
  var arr = jsav.ds.array(arrValues,
        {indexed: true, layout: "array", left:leftMargin}).hide();
	
  // Create the graphics for maxSize and listSize variables
  var arrMS = jsav.ds.array([8], {indexed: false, layout: "array",
					  left: 100, top: 70});
  arrMS.hide();
  var labelMaxSize = jsav.label("maxSize", {before: arrMS, left: 33, top: 89});
  labelMaxSize.hide();

  var arrLS = jsav.ds.array([5], {indexed: false, layout: "array",
					  left: 100, top: 105});
  arrLS.hide();
  var labelListSize =jsav.label("listSize", {before: arrLS, left: 42, top: 124});
  labelListSize.hide();


  //set the background of empty elements to gray
  bgColor(arr);
  jsav.umsg("Inserting an element at the head of an array-based list requires shifting all existing elements in the array by one position toward the tail.");
  jsav.displayInit();
  arr.show();
  arrow1.show();
  label.show();
  jsav.umsg("Here is an array-based list with five elements. We will insert an element with value 23 to position 0");
  pseudo.highlight(1);
  arrMS.show();
  labelMaxSize.show();
  arrLS.show();
  labelListSize.show();
  jsav.step();

// shift all existing elements one position to the right
  var temp, i;
  for(i = arr.size(); i >= 0; i--) {
    if(i < arr.size() - 1) {
      jsav.effects.copyValue(arr, i, arr, i+1);
    }		
  }
  arr.css([itemsSize], {"background-color": "#fff"});
  arr.value(0, "");
  arrow1.hide();
  arrow2.show();
  label.hide();
  pseudo.unhighlight(1)
  pseudo.highlight(3);
  pseudo.highlight(4);
  jsav.umsg("Shift all existing elements one position to the right to make room.");
  jsav.step();
	
  //step 2
  arr.value(0,23);
  arr.highlight([0]);
  arrow2.hide();
  pseudo.unhighlight(3);
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  jsav.umsg("Insert 23 into array position 0");
  jsav.step();

  //step 3
  pseudo.unhighlight(5);
  pseudo.highlight(6);
  arr.unhighlight([0]);
  arrLS.highlight(0);
  arrLS.value(0, 6);
  jsav.umsg(" Increase list size by 1");
  jsav.recorded();
}(jQuery));

//Array-Based list deletion
(function ($) {
  var jsav = new JSAV("AlistRemoveCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: AListRemove *** */",
                       endBefore: "/* *** ODSAendTag: AListRemove *** */"});

  var leftMargin = 5;	
  var nodeWidth = 30;
  var arrow1_x = 25 + nodeWidth;

  //vertical arrow pointing to current position
  var arrow1 = jsav.g.line(arrow1_x, 10, arrow1_x, 35,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  //horizontal arrow in step 4
  var arrow2 = jsav.g.line(arrow1_x +100, 20,arrow1_x+20, 20, 
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  //label for current position in step 1
  var label = jsav.label("curr", 
	  {before: arr, left: arrow1_x - 10, top: -10});	
  label.hide();

  // Create an array object under control of JSAV library
  var arr = jsav.ds.array(arrValues, 
	  {indexed: true, layout: "array", left:leftMargin, top: 20});
  //array "it" for holding the copied element
  var arrItValues = [""];
  var labelIt = jsav.label("it", {before: arrIt, left: 85, top: 110});
  var arrIt = jsav.ds.array(arrItValues,
	  {indexed: false, layout: "array", left:leftMargin + (nodeWidth + 2) * 3 , top: 90});
  arrIt.hide();
  labelIt.hide();	
	
  //sets the background of empty elements to gray
  bgColor(arr);
  jsav.umsg("Here is a list containing five elements. We will remove the value 12 in position 1 of the array, which is the current position");
  arr.highlight([1]);
  label.show();
  arrow1.show();
  pseudo.highlight(1);
  jsav.displayInit();

  arrIt.show();
  labelIt.show();
  jsav.effects.copyValue(arr, 1, arrIt, 0);
  arr.value(1, "");
  arr.unhighlight([1]);
  pseudo.unhighlight(1);
  pseudo.highlight(4);
  jsav.umsg("Copy  the  element to be deleted");
  jsav.step();

  // shift elements after current position one position to the left
  var i;
  for(i = 2; i < itemsSize; i++) {
    jsav.effects.copyValue(arr, i, arr, i-1);
  }
  arr.css([itemsSize-1], {"background-color": "#eee"});
  arr.value(itemsSize-1,"");
  arrow2.show();
  arr.unhighlight([1]);
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  pseudo.highlight(6);
  arr.highlight([1, 2, 3]);
  jsav.umsg("Shift all elements after current element one position to the left");
  jsav.step();

  pseudo.unhighlight(5);
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  arr.unhighlight([1, 2, 3]);
  jsav.umsg("Decrease the list size by 1, from 5 to 4");
  arrow2.hide();
  jsav.step();
	
  arrIt.highlight([0]);
  pseudo.unhighlight(7);
  pseudo.highlight(8);
  jsav.umsg("Return the deleted element");
  jsav.recorded();

}(jQuery));


// Append visualization
(function ($) {
  var jsav = new JSAV("AlistAppendCON");	
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AList.pde",
                        lineNumbers: false,
                        startAfter: "/* *** ODSATag: AListAppend *** */",
                        endBefore: "/* *** ODSAendTag: AListAppend *** */"});
  var arr = jsav.ds.array(arrValues,
        {indexed: true, layout: "array", top: 12, left: 10}).hide();
  var arrow1 = jsav.g.line(180, 3, 180, 28,
        {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  arrow1.hide();
  var label = jsav.label("Append 23",
			 {before: arr, left: 140, top: -20}).hide();

  var arrMS = jsav.ds.array([8], {indexed: false, layout: "array",
					  left: 100, top: 70});
  arrMS.hide();
  var labelMaxSize = jsav.label("maxSize", {before: arrMS, left: 33, top: 89});
  labelMaxSize.hide();

  var arrLS = jsav.ds.array([5], {indexed: false, layout: "array",
					  left: 100, top: 105});
  arrLS.hide();
  var labelListSize =jsav.label("listSize", {before: arrLS, left: 42, top: 124});
  labelListSize.hide();

  jsav.umsg("Inserting at the tail of the list is easy");
  jsav.displayInit();

  arr.show();
  arr.highlight(5);
  arrow1.show();
  label.show();
  pseudo.highlight(1);
  jsav.umsg("We will append the value 23");
  arrMS.show();
  labelMaxSize.show();
  arrLS.show();
  labelListSize.show();
  jsav.step();

  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.umsg("First check that the array has a free slot");
  arrMS.highlight(0);
  arrLS.highlight(0);
  jsav.step();

  jsav.umsg("Now simply insert the value into the empty position, and update <code>listSize</code>");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  arrLS.value(0, 6);
  arrMS.unhighlight(0);
  arr.value(5, "23");
  jsav.step();

  jsav.umsg("The append operation requires &theta;(1) time");
  arr.unhighlight(5);
  arrLS.unhighlight(0);
  pseudo.unhighlight(3);
  jsav.recorded();
}(jQuery));
