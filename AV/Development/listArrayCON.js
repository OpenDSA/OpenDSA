"use strict";

//array values for AlistCON1, AlistCON2
var arrValues = [13,12,20,8,3,"",""];
//elements size of array in AlistCON1,AlistCON2
var itemsSize = 5;
//array "It" in AlistCON2 for holding the copied element
var arrItValues = [""];

//sets the backgroud of the array elements according to their values
var bgColor = function(array){
	var i;
	for(i=0; i<array.size();i++)
	{
		if(array.value(i)=="")
		{
			array.css([i], {"background-color": "#eee"});
		}
		else
		{
			array.css([i], {"background-color": "#fff"});
		}
	}
};

//Array-Based list insertion
(function ($) {

	var jsav = new JSAV("AlistCON1");

	//pseudocode
	var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AList.pde",
                        startAfter: "/* *** ODSATag: arrayList *** */",
                        endBefore: "/* *** ODSAendTag: arrayList *** */"});
	
	var leftMargin = 5;
	//vertical arrow in step 1
	var arrow1_x = leftMargin + 15;
	var arrow1 = jsav.g.line(arrow1_x, -10, arrow1_x, 20,{"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
	//label in step 1
	var label = jsav.label("Insert 23", {before: arr, left: arrow1_x - 26, top: -20});	
	//horizontal arrow in step 2
	var arrow2 = jsav.g.line(leftMargin + 50, 5, leftMargin + 150, 5,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	// Create an array object under control of JSAV library
    var arr = jsav.ds.array(arrValues, {indexed: true, layout: "array", left:leftMargin});
	
	//move the array object 2px down to make room
	arr.css({top: 2});
	//sets the background of empty elements to gray
	bgColor(arr);
	
	pseudo.setCurrentLine(0);
	jsav.umsg("A list containing eight elements before inserting an element with value 23");
	jsav.displayInit();	

	// shift all existing elements one position to the right
	var temp, i;
	for(i=arr.size(); i >=0;i--)
	{
		if(i<arr.size()-1)
		{
			jsav.effects.copyValue(arr, i, arr, i+1);
		}		
	}

	arr.css([itemsSize], {"background-color": "#fff"});
	arr.value(0,"");

	arrow1.hide();
	arrow2.show();
	label.hide();
	
	pseudo.setCurrentLine(7);
	pseudo.setCurrentLine(6);
	jsav.umsg("Shift all existing elements one position to the right to make room.");
	//step 2
	jsav.step();
	
	arr.value(0,23);
	arr.highlight([0]);
	arrow2.hide();
	pseudo.setCurrentLine(8);
	jsav.umsg(" Insert 23 in array position 0.  ");
	//step 3
	jsav.step();
	pseudo.setCurrentLine(9);
	jsav.umsg(" Increase list size by 1");
	//step 4
	jsav.step();
	jsav.recorded();

}(jQuery));

//Array-Based list deletion
(function ($) {
	var jsav = new JSAV("AlistCON2");	
	var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AList.pde",
                        startAfter: "  // Remove and return the current element",
                        endBefore: "  void moveToStart() { curr = 0; }        "});

	var leftMargin = 5;	
	var nodeWidth = 35;
	var arrow1_x = 28 +35;

	//vertical arrow pointing to current position
	var arrow1 = jsav.g.line(arrow1_x, 10, arrow1_x, 35,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	//horizontal arrow in step 4
	var arrow2 = jsav.g.line(arrow1_x +100, 20,arrow1_x+20, 20, {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	//label for current position in step 1
	var label = jsav.label("curr", {before: arr, left: arrow1_x - 15, top: -10});	
	label.hide();

	// Create an array object under control of JSAV library
    var arr = jsav.ds.array(arrValues, {indexed: true, layout: "array", left:leftMargin});
	var labelIt =jsav.label("It", {before: arrIt, left: 100, top: 110});
	var arrIt = jsav.ds.array(arrItValues, {indexed: false, layout: "array", left:leftMargin + (nodeWidth + 2) * 3});
	//arrIt.hide();
	labelIt.hide();

	//move array objects down
	arr.css({top: 20});
	arrIt.css({top: 90});	
	
	//sets the background of empty elements to gray
	bgColor(arr);
	pseudo.setCurrentLine(0);
	jsav.umsg("A list containing eight elements before deleting an element at current position");
	jsav.displayInit();

	arr.highlight([1]);
	label.show();
	arrow1.show();
	pseudo.setCurrentLine(1);
	jsav.umsg("12 is the element at current position to be deleted");
	//step 2
	jsav.step();
	
	
	arrIt.show();
	labelIt.show();
	jsav.effects.copyValue(arr, 3, arrIt, 0);
	arr.unhighlight([1]);
	pseudo.setCurrentLine(3);
	jsav.umsg(" Copy  the  element to be deleted");
	//step 3
	jsav.step();

	// shift elements after current position one position to the left
	var i;
	for(i=2; i < itemsSize;i++)
	{

		jsav.effects.copyValue(arr, i, arr, i-1);
	}

	arr.css([itemsSize-1], {"background-color": "#eee"});
	arr.value(itemsSize-1,"");
	arrow2.show();
	arr.unhighlight([1]);
	pseudo.setCurrentLine(5);
	pseudo.setCurrentLine(4);
	jsav.umsg(" Shift all elements after current element one position to the left");
	//step 4
	jsav.step();

	pseudo.setCurrentLine(6);
	jsav.umsg(" Decrease the list size by 1, from 5 to 4");
	//step 5
	jsav.step();
	
	arrow2.hide();
	arrIt.highlight([0]);
	pseudo.setCurrentLine(7);
	jsav.umsg(" return the deleted element");
	//step 6
	jsav.step();
	jsav.recorded();

}(jQuery));
