(function ($) {

	"use strict";

	var jsav,   // for JSAV library object
		arr;    // for the JSAV array
	//array items in step 1
	var newArrValues = [1,2,3,4,5,6,7,8];
	//empty array items in step 1
	var temArr = ["","","",""];
	//for generating JSAV array object
	var arrValues = [];
	var itemsSize = newArrValues.length;

	jsav = new JSAV("AlistCON1");

	//arrow in step 1
	var arrow1 = jsav.g.line(256, -10, 256, 20,{"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
	//arrow in step 2
	var arrow2 = jsav.g.line(290, 10, 400, 10,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	//label in step 1
	var lable = jsav.label("Insert 23", {before: arr, left: 230, top: -20});

	//appends empty items to the array
	arrValues.push.apply(arrValues, newArrValues);
	arrValues.push.apply(arrValues, temArr);
	
		

	// Create an array object under control of JSAV library
    arr = jsav.ds.array(arrValues, {indexed: true, layout: "array"});
	//move 20px down to make room
	arr.css({top: 20});
	
	for(i=0; i<arr.size();i++)
	{
		if(arr.value(i)=="")
		{
			arr.css([i], {"background-color": "#eee"});
		}
		else
		{
			arr.css([i], {"background-color": "#fff"});
		}
	}
	
	jsav.umsg("A list containing five elements before inserting an element with value 23");
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
	lable.hide();
	jsav.umsg(" The list after shifting all existing elements one position to the right.");
	jsav.step();
	
	//step 3
	arr.value(0,23);
	arr.highlight([0]);
	arrow2.hide();
	jsav.umsg(" The list after 23 has been inserted in array position 0.  ");
	jsav.step();
	jsav.recorded();

}(jQuery));
