"use strict";
/*global alert*/
(function($) {
  // Number of values in the array
  var ASize = $('#arraysize').val();
  
  // The array of numbers.
  var theArray = [];
  var countArray = [];
  var outArray = [];
  
  // check query parameters from URL
  var params = JSAV.utils.getQueryParameter();
  
  if ("array" in params) { // set value of array pick if it is a param
    $('#arrayValues').val(params["array"]).prop("disabled", true);
  }
  
  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  // add the layout setting preference
  var arrayLayout = settings.add("layout", {"type": "select", "options": {"bar": "Bar", "array": "Array"}, "label":"Array layout: ", "value": "array"});
  
  var context = $("#ssperform");
  var emptyContent = $("#avcontainer").html();
  var av, // for JSAV av
    arr, arrC, arrO;  // for the JSAV array

  // Connect action callbacks to the HTML entities
  $('input[name="help"]').click(help);
  $('input[name="about"]').click(about);
  $('input[name="run"]', context).click(runIt);
  $('input[name="reset"]', context).click(reset);
  
  function about() {
    var mystring = "Radix Sort Linked List Algorithm Visualization\nWritten by ...\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Summer, 2012\nLast update: July, 2012\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Process Reset button: Reinitialize the output textbox and the AV
  function reset(flag) {
    if (av) {
      av.clearumsg();
      $("#avcontainer").unbind().html(emptyContent);
    }
    // Clear the array values field, when no params given and reset button hit
    if (flag !== true) {
      if (!$('#arrayValues').prop("disabled")) {
        $('#arrayValues').val("");
      }
    }
  }

  // Validate the user-defined array values
  function processArrayValues() {
    var i, 
        num, 
        msg = "Must be 5 to 16 positive integers";
    // Convert user's values to an array,
    // assuming values are space separated
    theArray = $('input[name="arrayValues"]', context).val().match(/[0-9]+/g) || [];
    if (theArray.length === 0) { // Empty field
      theArray.length = 0;
      return true;
    }
    if (theArray.length < 5 || theArray.length > 16) {
      alert(msg);
      theArray.length = 0;
      return false;
    }
    for (i=0; i<theArray.length; i++) {
      theArray[i] = Number(theArray[i]);
      if (isNaN(theArray[i]) || theArray[i] < 0) { 
        alert(msg);
        theArray.length = 0;
        return false;
      }
    }
    $('#arraysize').val(theArray.length);
    return true;
  }

  var setBlue = function(index) {
    //arr.css(index, {"background-color": "#bbf" });
	arrC.css(index, {"background-color": "#bbf" });
  };
   var setBlue2 = function(index) {
    //arr.css(index, {"background-color": "#bbf" });
	arrO.css(index, {"background-color": "#bbf" });
  };
  
   var setGreen = function(index) {
	arrC.css(index, {"background-color": "#00FF00" });
  };
  var setGreen2 = function(index) {
	arrO.css(index, {"background-color": "#00FF00" });
  };
  var setGreen3 = function(index) {
	arr.css(index, {"background-color": "#00FF00" });
  };
  
  // Execute the "Run" button function
    function runIt() {
    var i,j,k;
    var newSize = $('#arraysize').val();
    var DSize = $('#digitsize').val();
	var ASize = $('#arraysize').val();
    if (processArrayValues()) { // if it is false, we got junk user
                                // needs to fix
      if (theArray.length === 0) { // Make a random  array
        ASize = newSize;
	
        theArray.length = 0; // Out with the old
        // Give random numbers in range 0..999
		
        for (i=0; i < ASize; i++) {
          theArray[i] = Math.floor(Math.random()*(Math.pow(10,DSize)));
		  }
		for (i=0; i < 10; i++) {
			outArray[i] = i; // need to change in order to represent output array
			
		}
		
		for (k=0; k < ASize; k++) {
		countArray[k] = 0; // need to change in order to represent count array
		}
      }
      else { // Use the values we got out of the user's list
        ASize = theArray.length;
      }
      reset(true); // Reset any previous visualization
      av = new JSAV("avcontainer"); // initialize JSAV ..
      // .. and the array. use the layout the user has selected
	  
	  arr = av.ds.array(theArray, {indexed: true, layout: "vertical", center: false, top: 20, left: 0}); 
	  //av.label("Original Array");
	  arrC = av.ds.array(countArray, {indexed: true, layout: "vertical", center: false, top: 20, left: 700});
	 // av.label("Output Array");
	  
	  av.step();
	 
	  radsort(j);
	  
	  
      av.umsg("Done sorting!");
      av.recorded(); // mark the end
    }
  }
  
  //Radix linked list sort
	
  function radsort(){
    var i, k, j, p, y, z, a, b, c, d, e, f, g, h, i, q;
	var DSize = $('#digitsize').val();
	var size = DSize;
    var count = 1;
    var counter = 0;
	var counting = 0;
	var left = 50;
	var left2 = 0;
	
    while (size > 0){
	  arrO = av.ds.array(outArray, {indexed: false, layout: "vertical", center: false, top: 20, left: 200});
	 // av.label("Count Array");
	  var L0 = av.ds.list({top: 40, left: 250});
	  L0.layout({center: false});
	  var L1 = av.ds.list({top: 86, left: 250});
	  L1.layout({center: false});
	  var L2 = av.ds.list({top: 132, left: 250});
	  L2.layout({center: false});
	  var L3 = av.ds.list({top: 178, left: 250});
	  L3.layout({center: false});
	  var L4 = av.ds.list({top: 224, left: 250});
	  L4.layout({center: false});
	  var L5 = av.ds.list({top: 270, left: 250});
	  L5.layout({center: false});
	  var L6 = av.ds.list({top: 316, left: 250});
	  L6.layout({center: false});
	  var L7 = av.ds.list({top: 362, left: 250});
	  L7.layout({center: false});
	  var L8 = av.ds.list({top: 408, left: 250});
	  L8.layout({center: false});
	  var L9 = av.ds.list({top: 458, left: 250});
	  L9.layout({center: false});
	  
	  
	 console.log(Math.floor(739/10));
	 
	  av.umsg("Creating a linked list by using the rightmost to leftmost digits of the elements in the Original Array and placing them into separate bins according to their digits");
	  av.step();
	  for (i = 0; i < theArray.length; i++) {
	    var answer = Math.floor(((theArray[i]) / count) % 10);
        if(answer === 0){
			av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		  if(L0.size() == 0){
		    L0.addFirst(theArray[i]);
		  }
		  else{
		    L0.addLast(theArray[i]); 
		  }
		  L0.layout({center: false});
		  av.step();
          }
		  
	    if(answer === 1){
		  av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		  if(L1.size() == 0){
		    L1.addFirst(theArray[i]);
		  }
		  else{
		    L1.addLast(theArray[i]);
		  }
		  L1.layout({center: false});
		  av.step();
          }
		  
	    if(answer === 2){
		  av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		 if(L2.size() == 0){
		    L2.addFirst(theArray[i]);
		  }
		  else{
		    L2.addLast(theArray[i]); 
		  }
		  L2.layout({center: false});
		  av.step();
          }
	    if(answer=== 3){
		  av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		  if(L3.size() == 0){
		    L3.addFirst(theArray[i]);
		  }
		  else{
		    L3.addLast(theArray[i]); 
		  }
		  L3.layout({center: false});
		  av.step();
          }
	    if(answer === 4){
		  av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		  if(L4.size() == 0){
		    L4.addFirst(theArray[i]);
		  }
		  else{
		    L4.addLast(theArray[i]); 
		  }
		  L4.layout({center: false});
		  av.step();
          }
	    if(answer === 5){
		  av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		  if(L5.size() == 0){
		    L5.addFirst(theArray[i]);
		  }
		  else{
		    L5.addLast(theArray[i]); 
		  }
		  L5.layout({center: false});
		  av.step();
          }
	     if(answer === 6){
		   av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		  if(L6.size() == 0){
		    L6.addFirst(theArray[i]);
		  }
		  else{
		    L6.addLast(theArray[i]); 
		  }
		  L6.layout({center: false});
		  av.step();
          }
	    if(answer === 7){
		  av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		  if(L7.size() == 0){
		    L7.addFirst(theArray[i]);
		  }
		  else{
		    L7.addLast(theArray[i]); 
		  }
		  L7.layout({center: false});
		  av.step();
          }
	    if(answer === 8){
		  av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		  if(L8.size() == 0){
		    L8.addFirst(theArray[i]);
		  }
		  else{
		    L8.addLast(theArray[i]); 
		  }
		  L8.layout({center: false});
		  av.step();
          }
	    if(answer === 9){
		  av.umsg(arr.value(i) + " has current digit " + answer + ". Add "+ arr.value(i) + " to the " + answer + " bin");
		  if(L9.size() == 0){
		    L9.addFirst(theArray[i]);
		  }
		  else{
		    L9.addLast(theArray[i]); 
		  }
		  L9.layout({center: false});
		  av.step();
          }
       
	   
	      }
		 console.log("size =  " + L0.size()); 
	  av.umsg("Now we use the linked list to add values into the Output Array in sorted order according to their digit");
	  av.step();
      if(L0.size() > 0){		
        for (j = 0; j < L0.size(); j++){
		  av.umsg("Add "+ L0.get(j).value() + " to the Output Array");
		  arrC.value(counting,L0.get(j).value());
		  arrC.highlight([counting]);
		  //arrO.highlight([0]);
		  setBlue2(0);
		  L0.get(j).highlight();
		  counting = counting + 1;
		  av.step();
		  arrC.unhighlight([counting-1]);
		  L0.get(j).unhighlight();
			}
			arrO.unhighlight([0]);
			
		 }
		if(L1.size() > 0){
		for (a = 0; a < L1.size(); a++){
		  av.umsg("Add "+ L1.get(a).value() + " to the Output Array");
		  arrC.value(counting,L1.get(a).value());
		  arrC.highlight([counting]);
		  //arrO.highlight([1]);
		  setBlue2(1);
		  L1.get(a).highlight();
		  counting = counting + 1;
		  av.step();
		  arrC.unhighlight([counting-1]);
		  L1.get(a).unhighlight();
			}
			arrO.unhighlight([1]);
		 }
		if(L2.size() > 0){
		  for (b = 0; b < L2.size(); b++){
		    av.umsg("Add "+ L2.get(b).value() + " to the Output Array");
		  arrC.value(counting,L2.get(b).value());
		  arrC.highlight([counting]);
		  //arrO.highlight([2]);
		  setBlue2(2);
		  L2.get(b).highlight();
		  counting = counting + 1;
		  av.step();
		  arrC.unhighlight([counting-1]);
		  L2.get(b).unhighlight();
			}
			arrO.unhighlight([2]);
	     }
	    if(L3.size() > 0){
		  for (c = 0; c < L3.size(); c++){
		    av.umsg("Add "+ L3.get(c).value() + " to the Output Array");
		  arrC.value(counting,L3.get(c).value());
		  arrC.highlight([counting]);
		  //arrO.highlight([3]);
		  setBlue2(3);
		  L3.get(c).highlight();
		  counting = counting + 1;
		  av.step();
		  arrC.unhighlight([counting-1]);
		  L3.get(c).unhighlight();
			}
			arrO.unhighlight([3]);
			
		}
		if(L4.size() > 0) {
		 for (d = 0; d < L4.size(); d++){
		   av.umsg("Add "+ L4.get(d).value() + " to the Output Array");
		  arrC.value(counting,L4.get(d).value());
		  arrC.highlight([counting]);
		  //arrO.highlight([4]);
		  setBlue2(4);
		  L4.get(d).highlight();
		  counting = counting + 1;
		  av.step();
		  arrC.unhighlight([counting-1]);
		  L4.get(d).unhighlight();
			}
			arrO.unhighlight([4]);
		}
	    if(L5.size() > 0) {
		  for (e = 0; e < L5.size(); e++){
		    av.umsg("Add "+ L5.get(e).value() + " to the Output Array");
		  arrC.value(counting,L5.get(e).value());
		  arrC.highlight([counting]);
		  
		  setBlue2(5);
		  L5.get(e).highlight();
		  counting = counting + 1;
		  
		 av.step();
		 arrC.unhighlight([counting-1]);
		 L5.get(e).unhighlight();
			}
			arrO.unhighlight([5]);
		}
		if(L6.size() > 0) {
		  for (f = 0; f < L6.size(); f++){
		    av.umsg("Add "+ L6.get(f).value() + " to the Output Array");
		  arrC.value(counting,L6.get(f).value());
		  arrC.highlight([counting]);
		  
		  setBlue2(6);
		  L6.get(f).highlight();
		  counting = counting + 1;
		  av.step();
		  arrC.unhighlight([counting-1]);
		  L6.get(f).unhighlight();
			}
			arrO.unhighlight([6]);
		}
		if(L7.size() > 0) {
		  for (g = 0; g < L7.size(); g++){
		    av.umsg("Add "+ L7.get(g).value() + " to the Output Array");
		  arrC.value(counting,L7.get(g).value());
		  arrC.highlight([counting]);
		  
		  setBlue2(7);
		  L7.get(g).highlight();
		  counting = counting + 1;
		  av.step();
		  arrC.unhighlight([counting-1]);
		  L7.get(g).unhighlight();
			}
			arrO.unhighlight([7]);
		}
		if(L8.size() > 0) {
		for (h = 0; h < L8.size(); h++){
		  av.umsg("Add "+ L8.get(h).value() + " to the Output Array");
		  arrC.value(counting,L8.get(h).value());
		  arrC.highlight([counting]);
		  //arrO.highlight([8]);
		  setBlue2(8);
		  L8.get(h).highlight();
		  counting = counting + 1;
		  av.step();
		  arrC.unhighlight([counting-1]);
		  L8.get(h).unhighlight();
			}
			arrO.unhighlight([8]);
		}
		 if(L9.size() > 0) {
		  for (i = 0; i < L9.size(); i++){
		    av.umsg("Add "+ L9.get(i).value() + " to the Output Array");
		  arrC.value(counting,L9.get(i).value());
		  //arrO.highlight([9]);
		  setBlue2(9);
		  arrC.highlight([counting]);
		  L9.get(i).highlight();
		  counting = counting + 1;
		  av.step();
		  arrC.unhighlight([counting-1]);
		  L9.get(i).unhighlight();
			}
			arrO.unhighlight([9]);
		}
		
		av.umsg("Now we set the Original Array equal to Output Array"); 
		av.step();
		for (y=0; y<theArray.length; y++) {
	      arr.value(y,arrC.value(y));
		  theArray[y] = arrC.value(y);
		  arr.highlight([y]);
	     }
		 
	    av.step();
		
		for (z=0; z<theArray.length; z++) {
		  arr.unhighlight([z]);
	     }
		 
		av.step();
		
		for (q=0; q<theArray.length; q++) {
		  arrC.value(q,0);
		  }
		
	  counting = 0;
	  size = size - 1;
      counter = counter + 1;
	  left = left + 320;
	  left2 = left2 + 320;
      count= Math.pow(10, counter);
      av.step();
	  
		  for (j = L0.size()-1; j >= 0; j--) {
		    L0.hide(j);
		    //L0.remove(j);
            L0.layout();
			
			}
		  
	 
		for (a = 0; a < L1.size()-1; a++){
		  L1.hide(a);
		  //L1.remove(a);
          L1.layout();
		  
			}
		
		  for (b = 0; b < L2.size()-1; b++){	
		    L2.hide(b);
		    //L2.remove(b);
            L2.layout();
		   
			}
	     
		  for (c = 0; c < L3.size()-1; c++){	
		    L3.hide(c);
		    L3.remove(c);
		    L3.layout();
			}
			
		 
		 for (d = 0; d < L4.size()-1; d++){	
		   L4.hide(d);
		   //L4.remove(d);
		   L4.layout();	
			}
			     
		 for (e = 0; e < L5.size()-1; e++){	
		   L5.hide(e);
		   //L5.remove(e);
		   L5.layout();
			}
			
		  for (f = 0; f < L6.size()-1; f++){
		    L6.hide(f);
			//L6.remove(f);
			L6.layout();
			}
			
		  for (g = 1; g < L7.size(); g++){
		    L7.hide(g-1);
			//L7.remove(g);
		    L7.layout();
			}
			 
		  for (h = 1; h < L8.size(); h++){
		    L8.hide(h-1);
		    //L8.remove(h);
		    L8.layout();
			}
			
		  for (i = 1; i < L9.size(); i++){
		     L9.hide(i-1);
			 //L9.remove(i);
		     L9.layout();
			}
          
  
          //av.step();
		  console.log("size2 = "+ L0.size());
		  
          }
  }
  

}(jQuery));
