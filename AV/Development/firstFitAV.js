(function ($) {
  "use strict";
  var jsav,              // JSAV
      arr,				// for the JSAV array
   	  defCtrlState, 	// Stores the default state of the controls
   	  nextStep = new Queue();

//  jsav = new JSAV($('.avcontainer'));
 jsav = new JSAV($('.avcontainer'));
//  var av = new JSAV("firstFit", {"animationMode": "none"});

  /*
   * Queue Data Structure
   * Created by Stephen Morley - http://code.stephenmorley.org
   * Released under the terms of Creative Commons
   */
  function Queue() {
    // initialise the queue and offset
    var queue  = [];
    var offset = 0;

    /* Returns true if the queue is empty, and false otherwise.
     */
    this.isEmpty = function () {
      return (queue.length === 0);
    };

    /* Returns the length of the queue
     */
    this.getLength = function () {
      return (queue.length - offset);
    };

    /* Enqueues the specified item.
     */
    this.enqueue = function (item) {
      queue.push(item);
    };

    /* Dequeues an item and returns it. If the queue is empty then undefined is
     * returned.
     */
    this.dequeue = function () {

      // if the queue is empty, return undefined
      if (queue.length === 0) {
        return undefined;
      }

      // store the item at the front of the queue
      var item = queue[offset];

      // increment the offset and remove the free space if necessary
      if (++offset * 2 >= queue.length) {
        queue  = queue.slice(offset);
        offset = 0;
      }

      // return the dequeued item
      return item;
    };
  }
  /* End Queue */

  function setDefaultControlState() {
    defCtrlState = {};
    defCtrlState.fitAlgorithm = 0;
	
    var params = JSAV.utils.getQueryParameter();

    if(params.fitAlgorithm) {
      if(params.fitAlgorithm > 0 && params.fitAlgorithm <= 5) {
	    defCtrlState.fitAlgorithm = params.fitAlgorithm;
	  }
    }
  }

  function about() {
    alert("First Fit Algorithm Visualization\nWritten by Cliff Shaffer and Mauricio De La Barra\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }


  function resetAV() {
    // Display a message telling them what fields they need to select
    jsav.clearumsg();
    var missingFields = [];

    // Ensure user selected a fit function
    var funct = Number($('#fitAlgorithm').val());
    if (funct === 0) {
      missingFields.push('fit algorithm');
    } else {
      jsav.umsg('Algorithm Selected: ' + $("#fitAlgorithm option:selected").text());
    }
      // Craft an appropriate message to the user, telling them what fields they are missing
    if (missingFields.length > 0) {
      // Disable the input box if fields are missing
      $("#input").attr("disabled", "disabled");

      var msg = 'Please select a ' + missingFields.join(', ');
      var commaIndex = msg.lastIndexOf(",");

      if (commaIndex > -1) {
        msg = msg.substring(0, commaIndex) + ' and' + msg.substring(commaIndex + 1, msg.length);
      }

      jsav.umsg(msg);
    } else {
      // If all necessary fields are selected, enable the input box and tell the user to begin
      $("#input").removeAttr("disabled");

      jsav.umsg("Enter a value and click Next");
      jsav.umsg("<br />");

      //repopulate view with original rectangle structure
    }
    
    var firstFit = $('#firstFit');



    OriginalMemBlock();
    nextStep = new Queue();
  }

   /**
   * Resets the visualization
   */
  function reset() {
    // Clear any existing messages and hash table data
    jsav.clearumsg();
    $('#firstFit').html('');

    // Reset controls to their default state
    $("#fitAlgorithm").val(defCtrlState.fitAlgorithm);

    if(Number($('#fitAlgorithm').val()) === 0) {
      $('#input').attr("disabled", "disabled");
    }

    resetAV();

    // Clear input textbox and disable next button
    $("#input").val("");
    $('#next').attr("disabled", "disabled");

    // Make sure the queue is empty
    nextStep = new Queue();
  }

    function loadNextSlide() {
    var step = nextStep.dequeue();

    if (step.canInsert) {
      if (step.insert) {    // Insertion step
        jsav.umsg("Inserting " + step.value + " at position " + step.position + ".");
      } else {    // Highlighting step
      }
    }
  }

  function OriginalMemBlock() {
  
	  var used1 = jsav.g.rect(85, 200, 30, 80).css({"fill": "red"});
	  var used2 = jsav.g.rect(220, 200, 75, 80).css({"fill": "red"});
	  var used3 = jsav.g.rect(391, 200, 54, 80).css({"fill": "red"});
	  var used4 = jsav.g.rect(580, 200, 30, 80).css({"fill": "red"});
	  
	  var free1 = jsav.g.rect(10, 200, 75, 80).css({"fill": "blue"});
	  var free2 = jsav.g.rect(115, 200, 105, 80).css({"fill": "blue"});
	  var free3 = jsav.g.rect(295, 200, 96, 80).css({"fill": "blue"});
	  var free4 = jsav.g.rect(445, 200, 135, 80).css({"fill": "blue"});
	  
	  var free1Start = 10;
	  var free2Start = 115;
	  var free3Start = 295;
	  var free4Start = 445;
	  
	  var freeStartArray = new Array();
	  freeStartArray[0] = free1Start;
	  freeStartArray[1] = free2Start;
	  freeStartArray[2] = free3Start;
	  freeStartArray[3] = free4Start;
	  
	  var free1Finish = 85;
	  var free2Finish = 220;
	  var free3Finish = 391;
	  var free4Finish = 580;
	  
	  var freeFinArray = new Array();
	  freeFinArray[0] = free1Finish;
	  freeFinArray[1] = free2Finish;
	  freeFinArray[2] = free3Finish;
	  freeFinArray[3] = free4Finish;
	  
	  
	  
	  var usedRec = jsav.g.rect(430, 50, 50, 50).css({"fill": "red"});
	  var freeRec = jsav.g.rect(510, 50, 50, 50).css({"fill": "blue"});
	  
	  var usedLabel = jsav.label("Used Space", {left :  430, top:  105});
	  var freeLabel = jsav.label("Free Space", {left :  510, top:  105});
	  
	  var usedNum = 63;
	  var freeNum = 137;
	  
	  var usedAmountLabel = jsav.label(usedNum, {left :  450, top:  65});
	  var freeAmountLabel = jsav.label(freeNum, {left :  530, top:  65});
	  
	  
	  
	   
	  
	  var freeListRect = jsav.g.rect(10, 400, 25, 50).css({"fill": "lightgrey"});
	  var freeListRect2 = jsav.g.rect(35, 400, 25, 50).css({"fill": "lightgrey"});
	  var freeListRect3 = jsav.g.rect(60, 400, 25, 50).css({"fill": "lightgrey"});
	  var freeListRect4 = jsav.g.rect(85, 400, 25, 50).css({"fill": "lightgrey"});
	  
	  
	  var block1 = 25;
	  var block2 = 35;
	  var block3 = 32;
	  var block4 = 45;
	 
	  var freeArray = new Array();
	  freeArray[0] = block1;
	  freeArray[1] = block2;
	  freeArray[2] = block3;
	  freeArray[3] = block4;
	 
	  var block1Label = jsav.label(block1, {left :  22, top:  420});
	  var block2Label= jsav.label(block2, {left :  47, top:  420});
	  var block3Label = jsav.label(block3, {left :  72, top:  420});
	  var block4Label = jsav.label(block4, {left :  97, top:  420});
	  var freeLabel = jsav.label("Free List", {left : 15, top: 455});
	 
	  var connect1 = jsav.g.line(22.5, 400, 47.5, 280);
	  var connect2 = jsav.g.line(47.5, 400, 167.5, 280);
	  var connect3 = jsav.g.line(72.5, 400, 343, 280);
	  var connect4 = jsav.g.line(97.5, 400, 512.5, 280);
  }
 
  function newRec(startX, sizeX)
  {
	var newRec = av.g.rect(stratX, 50, sizeX, 50).css({"fill": "red"});
  }
 
  function updadateLabels()
  {
    block1Label = jsav.label(freeArray[0], {left :  22, top:  420});
    block2Label= jsav.label(freeArray[1], {left :  47, top:  420});
    block3Label = jsav.label(freeArray[2], {left :  72, top:  420});
    block4Label = jsav.label(freeArray[3], {left :  97, top:  420});
    usedAmountLabel = jsav.label(usedNum, {left :  450, top:  65});
    freeAmountLabel = jsav.label(freeNum, {left :  530, top:  65});
  }
 
  function updateLines()
  {
    connect1 = jsav.g.line(22.5, 400, (freeStartArray[1] + freeFinArray[1])/2, 280);
    connect2 = jsav.g.line(47.5, 400, (freeStartArray[2] + freeFinArray[2])/2, 280);
    connect3 = jsav.g.line(72.5, 400, (freeStartArray[3] + freeFinArray[3])/2, 280);
    connect4 = jsav.g.line(97.5, 400, (freeStartArray[4] + freeFinArray[4])/2, 280);
  }
 
  function firstFit(inputVal) {
	
	//var input = params;
	if (inputVal < 0 || inputVal > 99999 || isNaN(inputVal)) {
      error("Please enter a number in the range of 0-99999");
      // Return error
      return 1;
	else
	{
		jsav.umsg("The request has been scheduled\n Algorithm: First Fit\n Size Required: " + input + "\n");
		var rec2 = jsav.g.rect(10, 300, input * 3, 80).css({"fill": "lightblue"}); //creates lightblue rectangle
		jsav.step();
		rec2 = jsav.g.rect(0, 0, 0, 0).css({"fill": "white"}); //deletes lightblue rectangle after step
		var stop = 0;
		var i = 0;
		for(i = 0; i <= 4; i++)
		while(i <= 4 && stop != 1)
		{ 
			if(i == 0)
			{
				connect1 = jsav.g.line(22.5, 400, 47.5, 280, {'stroke-width' : 3}); //sets line 1 to bold
				freeListRect = jsav.g.rect(10, 400, 25, 50).css({"fill": "yellow"}); //sets 1 to yellow
			}
			else if(i == 1)
			{
				connect2 = jsav.g.line(47.5, 400, 167.5, 280, {'stroke-width' : 3});
				connect1 = jsav.g.line(22.5, 400, 47.5, 280); //sets line 1 back to original color
				freeListRect = jsav.g.rect(10, 400, 25, 50).css({"fill": "lightgrey"}); //sets 1 back to grey
				freeListRect2 = jsav.g.rect(35, 400, 25, 50).css({"fill": "yellow"}); //sets 2 to yellow
				
			}
			else if(i == 2)
			{
				connect3 = jsav.g.line(72.5, 400, 343, 280, {'stroke-width' : 3});
				connect2 = jsav.g.line(47.5, 400, 167.5, 280); //sets line 2 back to original color
				freeListRect2 = jsav.g.rect(35, 400, 25, 50).css({"fill": "lightgrey"}); //sets 2 back to grey
				freeListRect3 = jsav.g.rect(60, 400, 25, 50).css({"fill": "yellow"}); //sets 3 to yellow
			}
			else if(i == 3)
			{
				connect4 = jsav.g.line(97.5, 400, 512.5, 280, {'stroke-width' : 3});
				connect3 = jsav.g.line(72.5, 400, 343, 280); //sets line 3 back to original color
				freeListRect3 = jsav.g.rect(60, 400, 25, 50).css({"fill": "lightgrey"}); //turns 3 back to grey
				freeListRect4 = jsav.g.rect(85, 400, 25, 50).css({"fill": "yellow"}); //turns 4 yellow
			}
			else if (i == 4){
			connect4 = jsav.g.line(97.5, 400, 512.5, 280); //sets 4 back to non bold
			freeListRect4 = jsav.g.rect(85, 400, 25, 50).css({"fill": "lightgrey"}); //sets 4 back to grey
			jsav.umsg("End of freelistreached\n Try a smaller size!\n");
			
			}
			
			jsav.umsg("Freelist's " + i + "th block size " + freeArray[i] + "\n");
			
			
			if(input <= freeArray[i])
			{
				jsav.umsg("Appropriate block size found!\n");
				jsav.umsg("Freelist's " + i + "th block size " + freeArray[i] + "\n");
				jsav.step();
				newRec(freeStartArray[i], freeStartArray[i] + input);
				freeArray[i] = freeArray[i] - input;
				freeStartArray[i] = freeStartArray[i] + input;
				usedNum = UsedNum + input;
				freeNum = freeNum - input;
				updateLabels();
				updateLines();
				stop = 1;
				jsav.step();
				
				
			}
			jsav.step();
		
		}
	}
	
  }
 
 }

  $(document).ready(function () {

    //jsav = new JSAV($('.avcontainer'));
    OriginalMemBlock();
      // If the user hits 'Enter' while the focus is on the textbox,
    // click 'Next' rather than refreshing the page
    $("#input").keypress(function (event) {
      // Capture 'Enter' press
      if (event.which === 13) {
        // Prevent 'Enter' from posting the form and refreshing the page
        event.preventDefault();

        // If the user entered a value and inserting is allowed, trigger 'Next'
        if ($("#input").val() !== "" && !$('#next').attr('disabled')) {
          $('#next').click();
        }
      } else {
        // Enable the 'Next' button when the user enters a value
        $('#next').removeAttr('disabled');
      }
    });

    $('#next').click(function () {
      var ret = 1;
      if (nextStep.isEmpty()) {    // Perform first step
        // Input field value
        var inputVal = $("#input").val();
        
        // Log the state of the exercise
        var state = {};
        state.user_function = $("#fitAlgorithm option:selected").text();
        state.user_input = inputVal;
        ODSA.AV.logExerciseInit(state);

        switch ($("#fitAlgorithm").val()) {
        case '0':  // No function chosen
        //  reset();
          break;
        case '1':
        jsav.umsg("First Fit Selected")
         // ret = firstFit(inputVal);
          break;
        }
      }
    });

    $("#fitAlgorithm").change(function () {

      OriginalMemBlock();
    });

    $('#about').click(about);
    $('#reset').click(reset);
    $('#help').click(function () {
      window.open("hashAVHelp.html", 'helpwindow');
    });

    var settings = new JSAV.utils.Settings($(".jsavsettings"));
    setDefaultControlState();
   // reset();
  });
 }(jQuery));