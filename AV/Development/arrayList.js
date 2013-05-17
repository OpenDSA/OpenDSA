/*global alert: true, ODSA */
(function ($) {
  "use strict";
  var jsav,   // for JSAV library object
      arr,    // for the JSAV array
      pseudo; // for the pseudocode display

  //create a new settings panel and specify the link to show it
  //var settings = new JSAV.utils.Settings($(".jsavsettings"));

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(5, 12, 8);

  // Execute the "Run" button function
  function runIt() {

	var newArrValues = ODSA.AV.processArrayValues();
	var temArr = ["","","",""];
	var arrValues = [];
	var itemsSize = newArrValues.length;


	arrValues.push.apply(arrValues, newArrValues);
	arrValues.push.apply(arrValues, temArr);
	
	ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'));

	var arrow1 = jsav.g.line(128, 25, 128, 45,{"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

	var arrow2 = jsav.g.line(160, 30, 230, 30,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});

	// Create a new array
    arr = jsav.ds.array(arrValues, {indexed: true, layout: "array"});
	var lable = jsav.label("Insert 23", {before: arr, left: 105, top: 0});
	arr.css({top: 50});

	pseudo = jsav.code({url: "../../SourceCode/Processing/Lists/arrayList.pde",
                        startAfter: "/* *** ODSATag: arrayList *** */",
                        endBefore: "/* *** ODSAendTag: arrayList *** */"});

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
	
	pseudo.setCurrentLine(0);
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
	lable.hide();
	arrow2.show();
	pseudo.setCurrentLine(2);
	pseudo.setCurrentLine(1);
	jsav.umsg(" The list after shifting all existing elements one position to the right.");
	jsav.step();

	arr.value(0,23);
	arr.highlight([0]);
	arrow2.hide();
	pseudo.setCurrentLine(3);
	jsav.umsg(" The list after 23 has been inserted in array position 0.  ");
	jsav.step();
	jsav.recorded();
  }

  // Connect action callbacks to the HTML entities
  
  $('#run').click(runIt);
  $('#reset').click(ODSA.AV.reset);
  
}(jQuery));