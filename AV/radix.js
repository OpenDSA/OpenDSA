(function ($) {
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
  var arrayLayout = settings.add("layout", {"type": "select", "options": {"bar": "Bar", "array": "Array"}, "label": "Array layout: ", "value": "array"});
  
  var context = $("#ssperform");
  var emptyContent = $("#avcontainer").html();
  var av, // for JSAV av
    arr, arrC, arrO;  // for the JSAV array

  function about() {
    var mystring = "Radix Sort Algorithm Visualization\nWritten by ...\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Summer, 2012\nLast update: June, 2012\nJSAV library version " + JSAV.version();
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
	
  // Connect action callbacks to the HTML entities
  $('input[name="help"]').click(help);
  $('input[name="about"]').click(about);
  $('input[name="run"]', context).click(runIt);
  $('input[name="reset"]', context).click(reset);
  
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
    for (i = 0; i < theArray.length; i ++) {
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
  
  var setBlue = function (index) {
    //arr.css(index, {"background-color": "#bbf" });
	  arrC.css(index, {"background-color": "#bbf" });
  };
  
  var setGreen = function (index) {
	  arrC.css(index, {"background-color": "#00FF00" });
  };
  var setGreen2 = function (index) {
	  arrO.css(index, {"background-color": "#00FF00" });
  };
  var setGreen3 = function (index) {
	  arr.css(index, {"background-color": "#00FF00" });
  };

  // Radixsort
  function radsort() {
    var i, k, j, p, y;
    var DSize = $('#digitsize').val();
    var size = DSize;
    var count = 1;
    var counter = 0;
    while (size > 0){
      for (i = 0; i < theArray.length; i++) {
        var answer = Math.floor((arr.value(i)/ count)% 10);
	      av.umsg(arr.value(i) + " has current digit " + answer + ". Add one to the " + answer + " bin");
		    arr.highlight([i]);
		    arrC.highlight([answer]);
		av.step();
		arr.unhighlight([i]);
		arrC.unhighlight([answer]);
		if(arrC.value(answer)=== 0){
		  arrC.value(answer,1);
		}
		else{
		  arrC.value(answer,arrC.value(answer)+1);
		}
		
      }

      av.umsg("Now we will do a rolling summation of the count array, to be used next as positions");
      av.step();
      setBlue(0);
      av.umsg("But first we subtract 1 from the 0 position so that the resulting sums are correct as positions in the output array.");
      arrC.value(0, arrC.value(0) - 1);
      av.step();
      for (k = 1; k < 10; k++) {
        av.umsg(arrC.value(k-1) + " + " + arrC.value(k) + " is " + (arrC.value(k-1)+arrC.value(k)) + ". Put that in position " + (k));
        setBlue(k);
        av.step();
        arrC.value(k,arrC.value(k)+arrC.value(k-1));
        av.step();
        arrC.unhighlight(k-1);
      }
      arrC.unhighlight(9);
  
      av.umsg("Now use the Count array to create the Output array");
      av.step();
      for (j = theArray.length-1; j >= 0; j--) {
	      var answer = Math.floor((arr.value(j)/ count)% 10);	
        av.umsg(arr.value(j) + " has digit " + answer + ". So we look in position " + answer + " of the Count array, to see that we put it in position " + arrC.value(answer) + " of the output array.");
        setGreen2(arrC.value(answer));
        setGreen(answer);
        setGreen3(j);
        arrO.value(arrC.value(answer), arr.value(j));
        av.step();
        arrC.value(answer,arrC.value(answer)-1);
        av.umsg("And we decrement the value of Count array position " + answer);
        av.step();
        arrO.unhighlight([arrC.value(answer)+1]);
        arrC.unhighlight([answer]);
        arr.unhighlight([j]);
      }
	
      av.umsg("Clear Count Array");
      for (p=0; p < 10; p++) {
        arrC.value(p,0);
      }
      av.umsg("Done with this pass.");
      av.step();
      for (y=0; y<theArray.length; y++) {
        arr.value(y,arrO.value(y));
      }
      size = size -1;
      av.umsg("Now we set the Original Array equal to Output Array"); 
      av.step();
      counter = counter +1;
      count= Math.pow(10,counter);
    }

  }
  
  // Execute the "Run" button function
  function runIt() {
    var i, j, k;
    var newSize = $('#arraysize').val();
    var DSize = $('#digitsize').val();
	  var ASize = $('#arraysize').val();
    if (processArrayValues()) { // if it is false, we got junk user
                                // needs to fix
      if (theArray.length === 0) { // Make a random  array
        ASize = newSize;
		
        theArray.length = 0; // Out with the old
        // Give random numbers in range 0..999
		
        for (i = 0; i < ASize; i++) {
          theArray[i] = Math.floor(Math.random()*(Math.pow(10,DSize)));
		    }
		for (i=0; i < ASize; i++) {
			outArray[i] = 0; // need to change in order to represent output array
		    }
		
		for (k = 0; k < 10; k++) {
		countArray[k] = 0; // need to change in order to represent count array
		    }
      }
      else { // Use the values we got out of the user's list
        ASize = theArray.length;
      }
      reset(true); // Reset any previous visualization
      av = new JSAV("avcontainer"); // initialize JSAV ..
      // .. and the array. use the layout the user has selected
      arr = av.ds.array(theArray, {indexed: true, layout: arrayLayout.val()});
      av.label("Original Array");
      arrC = av.ds.array(countArray, {indexed: true, layout: arrayLayout.val()});
      av.label("Count Array");
      arrO = av.ds.array(outArray, {indexed: true, layout: arrayLayout.val()});
      av.label("Output Array");
      av.umsg("Starting Radix Sort. The first step will be to count occurances of digits from the input array.");
      av.displayInit();
      radsort(j);
      av.umsg("Done sorting!");
      av.recorded(); // mark the end
    }
  }
})(jQuery);