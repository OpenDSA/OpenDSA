"use strict";
(function ($) {
  var jsav,              // JSAV
      defCtrlState,   // Stores the default state of the controls
      submitRec,      //the rectanlge that's created when the user hits submit
      free1,
      connect1,
      freeListRect,
      rectNumber = 0;

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

   /**
   * Resets the visualization
   */
  function reset() {
    // Clear any existing messages and hash table data
    jsav.clearumsg();

    // Reset controls to their default state
    $("#fitAlgorithm").val(0);

   // if(Number($('#fitAlgorithm').val()) === 0) {
      $('#input').attr("disabled", "disabled");
   // }

    // Ensure user selected a fit function
      jsav.umsg("Please select a fit algorithm");
      // If all necessary fields are selected, enable the input box and tell the user to begin
     // $("#input").removeAttr("disabled");
  
    //var firstFit = $('#firstFit');

    // Clear input textbox and disable next button
    $("#input").val("");
    OriginalMemBlock();

    $('#submit').attr("disabled", "disabled");
    $('#next').attr("disabled", "disabled");
  }

  function OriginalMemBlock() {

    var memPoolLabel = jsav.label("Memory Pool (Size: 200)", {"left": 280, "top": 130});
  
    var used1 = jsav.g.rect(342, 150, 25, 60).css({"fill": "coral"});
    var used2 = jsav.g.rect(455, 150, 62, 60).css({"fill": "coral"});
    var used3 = jsav.g.rect(597, 150, 45, 60).css({"fill": "coral"});
    var used4 = jsav.g.rect(755, 150, 25, 60).css({"fill": "coral"});
    
    var free1 = jsav.g.rect(280, 150, 62, 60).css({"fill": "cornflowerblue"});
    var free2 = jsav.g.rect(367, 150, 88, 60).css({"fill": "cornflowerblue"});
    var free3 = jsav.g.rect(517, 150, 80, 60).css({"fill": "cornflowerblue"});
    var free4 = jsav.g.rect(642, 150, 113, 60).css({"fill": "cornflowerblue"});
    
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
    
    var usedRec = jsav.g.rect(620, 20, 30, 40).css({"fill": "coral"});
    var freeRec = jsav.g.rect(720, 20, 30, 40).css({"fill": "cornflowerblue"});
    
    var usedLabel = jsav.label("Used Space", {left :  600, top:  70});

    var freeLabel = jsav.label("Free Space", {left :  700, top:  70});
    
    var usedNum = 63;
    var freeNum = 137;
    
    var usedAmountLabel = jsav.label(usedNum, {left :  625, top:  30});
    usedAmountLabel.css({"z-index": 500});
    var freeAmountLabel = jsav.label(freeNum, {left :  720, top:  30});
    freeAmountLabel.css({"z-index": 500});

    var block1 = 25;
    var block2 = 35;
    var block3 = 32;
    var block4 = 45;

    var block1Label = jsav.label(block1, {left :  280, top:  410});
    var block2Label= jsav.label(block2, {left :  310, top:  410});
    var block3Label = jsav.label(block3, {left :  340, top:  410});
    var block4Label = jsav.label(block4, {left :  370, top:  410});

    block1Label.css({"z-index": 500});
    block2Label.css({"z-index": 500});
    block3Label.css({"z-index": 500});
    block4Label.css({"z-index": 500});
    
    freeListRect = jsav.g.rect(275, 400, 30, 40).css({"fill": "lightgrey"});
    var freeListRect2 = jsav.g.rect(305, 400, 30, 40).css({"fill": "lightgrey"});
    var freeListRect3 = jsav.g.rect(335, 400, 30, 40).css({"fill": "lightgrey"});
    var freeListRect4 = jsav.g.rect(365, 400, 30, 40).css({"fill": "lightgrey"});
    
    var freeArray = new Array();
    freeArray[0] = block1;
    freeArray[1] = block2;
    freeArray[2] = block3;
    freeArray[3] = block4;

    var freeLabel = jsav.label("Free List", {left : 300, top: 460});
   
    connect1 = jsav.g.line(290, 400, 311, 210);
    var connect2 = jsav.g.line(320, 400, 411, 210);
    var connect3 = jsav.g.line(350, 400, 557, 210);
    var connect4 = jsav.g.line(375, 400, 698, 210);
  }
 
  function newRec(sizeX)
  {
    sizeX = sizeX*2.5;
    submitRec = jsav.g.rect(280, 300, sizeX, 60).css({"fill": "cyan"});
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
  
  if (inputVal < 0 || inputVal > 99999 || isNaN(inputVal)) {
      error("Please enter a number in the range of 0-99999");
      // Return error
      return 1;
  }
  else
  {
    var stop = 0;
    var i = 0;
    //for(i = 0; i <= 4; i++)
    while(i <= 4 && stop != 1)
    { 
      if(i == 0)
      {
        connect1 = jsav.g.line(290, 400, 311, 210, {'stroke-width' : 3}); //sets line 1 to bold
        freeListRect = jsav.g.rect(275, 400, 30, 40).css({"fill": "yellow"}); //sets 1 to yellow
      }
      else if(i == 1)
      {
        connect2 = jsav.g.line(320, 400, 411, 210, {'stroke-width' : 3});
        connect1 = jsav.g.line(290, 400, 311, 210); //sets line 1 back to original color
        freeListRect = jsav.g.rect(275, 400, 30, 40).css({"fill": "lightgrey"}); //sets 1 back to grey
        freeListRect2 = jsav.g.rect(305, 400, 30, 40).css({"fill": "yellow"}); //sets 2 to yellow
        
      }
      else if(i == 2)
      {
        connect3 = jsav.g.line(350, 400, 557, 210, {'stroke-width' : 3});
        connect2 = jsav.g.line(320, 400, 411, 210); //sets line 2 back to original color
        freeListRect2 = jsav.g.rect(305, 400, 30, 40).css({"fill": "lightgrey"}); //sets 2 back to grey
        freeListRect3 = jsav.g.rect(335, 400, 30, 40).css({"fill": "yellow"}); //sets 3 to yellow
      }
      else if(i == 3)
      {
        connect4 = jsav.g.line(375, 400, 698, 210, {'stroke-width' : 3});
        connect3 = jsav.g.line(350, 400, 557, 210); //sets line 3 back to original color
        freeListRect3 = jsav.g.rect(335, 400, 30, 40).css({"fill": "lightgrey"}); //turns 3 back to grey
        freeListRect4 = jsav.g.rect(365, 400, 30, 40).css({"fill": "yellow"}); //turns 4 yellow
      }
      else if (i == 4){
      connect4 = jsav.g.line(375, 400, 698, 210); //sets 4 back to non bold
      freeListRect4 = jsav.g.rect(365, 400, 30, 40).css({"fill": "lightgrey"}); //sets 4 back to grey
      jsav.umsg("End of freelistreached\n Try a smaller size!\n");
      
      }
      
      jsav.umsg("Freelist's " + i + "th block size " + freeArray[i] + "\n");
      
      
      if(input <= freeArray[i])
      {
        jsav.umsg("Appropriate block size found!\n");
        jsav.umsg("Freelist's " + i + "th block size " + freeArray[i] + "\n");
        newRec(freeStartArray[i], freeStartArray[i] + input);
        freeArray[i] = freeArray[i] - input;
        freeStartArray[i] = freeStartArray[i] + input;
        usedNum = UsedNum + input;
        freeNum = freeNum - input;
        updateLabels();
        updateLines();
        stop = 1;
        i++;
        
        
      }
    
    }
  }
  
  }
 
 
  $(document).ready(function () {
    jsav = new JSAV($('.avcontainer'));
    reset();

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

    $('#submit').click(function () {
      var inputVal = $("#input").val();

      jsav.umsg("The request is scheduled.");
      jsav.umsg("Size Request: " + inputVal);

      newRec(inputVal);
      $('#submit').attr("disabled", "disabled");

    });

    $('#next').click(function () {

      submitRec.css({"opacity": "0"});
      // Input field value
      var inputVal = $("#input").val();
      if(rectNumber == 0) {

        if (inputVal <= 25) {
          connect1.css({"stroke-width": 3});
          freeListRect.css({"fill": "yellow"}); //sets 1 to yellow
          var newUsedRect = jsav.g.rect(280, 150, inputVal, 60).css({"fill": "coral"});
        } else {
          rectNumber++;

          if(rectNumber == 1) {
            if (inputVal <= 25) {
              //connect2 stuff here
              newUsedRect = jsav.g.rect(280, 150, inputVal, 60).css({"fill": "coral"});
            } else {
              rectNumber++;
              if(rectNumber == 2) {
                if (inputVal <= 25) {
                  //connect3 stuff here
                  newUsedRect = jsav.g.rect(280, 150, inputVal, 60).css({"fill": "coral"});
                } else {
                  rectNumber++;
                  if(rectNumber == 3) {
                    if (inputVal <= 25) {
                      //connect4 stuff here
                      newUsedRect = jsav.g.rect(280, 150, inputVal, 60).css({"fill": "coral"});
                    } else {
                      jsav.umsg("VALUE IS TOO BIG!");
                    }
                  }
                }
              }
            }
          }
        }
      }
      $("#submit").removeAttr("disabled");
    });


    $("#fitAlgorithm").change(function () {
     // OriginalMemBlock();
      switch ($("#fitAlgorithm").val()) {
        case '0':  // No function chosen
          reset();
          break;
        case '1':
        jsav.umsg("First Fit Selected")
         $("#input").removeAttr("disabled");
         $("#submit").removeAttr("disabled");
         $("#next").removeAttr("disabled");
         // ret = firstFit(inputVal);
          break;
      }
    });

    $('#reset').click(function () {
        reset();
        submitRec.css({"opacity": "0"});
    });


    $('#about').click(about);

    $('#help').click(function () {
      window.open("hashAVHelp.html", 'helpwindow');
    });

    var settings = new JSAV.utils.Settings($(".jsavsettings"));
    setDefaultControlState();
    // reset();
  });
}(jQuery));
