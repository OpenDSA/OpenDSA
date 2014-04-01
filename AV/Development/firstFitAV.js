"use strict";
(function ($) {
  var jsav,              // JSAV
      defCtrlState,   // Stores the default state of the controls
      submitRec,      //the rectangle that's created when the user hits submit
      free1,
      linesArray,
      freeListArray,
      freeArray,
      freeStartArray,
      blockLabelArray,
      requestedBlockLabel,
      connectStartArray,
      freeFinArray,
      freeAmountLabel,
      freeNum,
      usedAmountLabel,
      usedNum,
      nextCount = 0,
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

    var free1Start = 280;
    var free2Start = 367;
    var free3Start = 517;
    var free4Start = 642;
    
    var free1 = jsav.g.rect(free1Start, 150, 62, 60).css({"fill": "cornflowerblue"});
    var free2 = jsav.g.rect(free2Start, 150, 88, 60).css({"fill": "cornflowerblue"});
    var free3 = jsav.g.rect(free3Start, 150, 80, 60).css({"fill": "cornflowerblue"});
    var free4 = jsav.g.rect(free4Start, 150, 113, 60).css({"fill": "cornflowerblue"});
    
    freeStartArray = new Array(free1Start, free2Start, free3Start, free4Start);
    
    var free1Finish = 342;
    var free2Finish = 455;
    var free3Finish = 517;
    var free4Finish = 642;
    
    freeFinArray = new Array(free1Finish, free2Finish, free3Finish, free4Finish);
    
    var usedRec = jsav.g.rect(620, 20, 30, 40).css({"fill": "coral"});
    var freeRec = jsav.g.rect(720, 20, 30, 40).css({"fill": "cornflowerblue"});
    
    var usedLabel = jsav.label("Used Space", {left :  600, top:  70});

    var freeLabel = jsav.label("Free Space", {left :  700, top:  70});
    
    usedNum = 63;
    freeNum = 137;
    
    usedAmountLabel = jsav.label(usedNum, {left :  625, top:  30});
    usedAmountLabel.css({"z-index": 500});

    freeAmountLabel = jsav.label(freeNum, {left :  720, top:  30});
    freeAmountLabel.css({"z-index": 500});

    var block1 = 25;
    var block2 = 35;
    var block3 = 32;
    var block4 = 45;

    freeArray = new Array(block1, block2, block3, block4);

    var block1Label = jsav.label(block1, {left :  280, top:  410});
    var block2Label= jsav.label(block2, {left :  310, top:  410});
    var block3Label = jsav.label(block3, {left :  340, top:  410});
    var block4Label = jsav.label(block4, {left :  370, top:  410});

    block1Label.css({"z-index": 500});
    block2Label.css({"z-index": 500});
    block3Label.css({"z-index": 500});
    block4Label.css({"z-index": 500});

    blockLabelArray = new Array(block1Label, block2Label, block3Label, block4Label);
    
    var freeListRect = jsav.g.rect(275, 400, 30, 40).css({"fill": "lightgrey"});
    var freeListRect2 = jsav.g.rect(305, 400, 30, 40).css({"fill": "lightgrey"});
    var freeListRect3 = jsav.g.rect(335, 400, 30, 40).css({"fill": "lightgrey"});
    var freeListRect4 = jsav.g.rect(365, 400, 30, 40).css({"fill": "lightgrey"});

    freeListArray = new Array(freeListRect, freeListRect2, freeListRect3, freeListRect4);

    var freeLabel = jsav.label("Free List", {left : 300, top: 460});

    var connect1Start = 290;
    var connect2Start = 320;
    var connect3Start = 350;
    var connect4Start = 375;
    connectStartArray = new Array(connect1Start, connect2Start, connect3Start, connect4Start);
  
    var connect1 = jsav.g.line(connect1Start, 400, 311, 210);
    var connect2 = jsav.g.line(connect2Start, 400, 411, 210);
    var connect3 = jsav.g.line(connect3Start, 400, 557, 210);
    var connect4 = jsav.g.line(connect4Start, 400, 698, 210);

    linesArray = new Array(connect1, connect2, connect3, connect4);
  }
 
  function newRec(sizeX)
  {
    sizeX = sizeX*2.5;
    submitRec = jsav.g.rect(280, 300, sizeX, 60).css({"fill": "cyan"});
    requestedBlockLabel = jsav.label("Requested Block", {"left": 280, "top": 270}).css({"font-weight": "bold"});

  }
 
  function updateLabels()
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

  function enableAllButtons() {
    $("#input").removeAttr("disabled");
    $("#submit").removeAttr("disabled");
    $("#next").removeAttr("disabled");
  }

  function insertIntoBlock(inputVal) {
      var newUsedRect = jsav.g.rect(freeStartArray[rectNumber], 150, inputVal * 2.5, 60).css({"fill": "coral"});
      freeStartArray[rectNumber] = freeStartArray[rectNumber] + inputVal * 2.5;
      freeArray[rectNumber] = freeArray[rectNumber] - inputVal;
      blockLabelArray[rectNumber].text(freeArray[rectNumber]);

      freeListArray[rectNumber].css({"fill": "lightgrey"});
      //jsav.umsg(((freeStartArray[rectNumber] + freeFinArray[rectNumber])/2));
      //jsav.umsg(freeStartArray[rectNumber]);
      //jsav.umsg(freeFinArray[rectNumber]);

      linesArray[rectNumber].movePoints([[0, connectStartArray[rectNumber], 400], [1, ((freeStartArray[rectNumber] + freeFinArray[rectNumber])/2), 210]]).css({"stroke-width": 1});

      jsav.umsg("free = " + freeNum + " used = " + usedNum + " input = " + inputVal)
      
      inputVal = inputVal * -1;
      usedNum = usedNum - inputVal;
      inputVal = inputVal * -1;
      freeNum = freeNum - inputVal;
      jsav.umsg(" free2 = " + freeNum + " used2 = " + usedNum + " input2 = " + inputVal)
      freeAmountLabel.text(freeNum);
      usedAmountLabel.text(usedNum);


      nextCount = 0;
      rectNumber = 0;
      $('#next').attr("disabled", "disabled");
  }

  function firstFit(inputVal) {
    

    if(nextCount == 0) {
      linesArray[rectNumber].css({"stroke-width": 3});
      freeListArray[rectNumber].css({"fill": "yellow"});
      jsav.umsg("Free list " + rectNumber + " block size = " + freeArray[rectNumber])

      if (inputVal <= freeArray[rectNumber]) {
        nextCount = 2;

      } else {
        nextCount = 1;
      }

    } else if(nextCount == 1) {

      linesArray[rectNumber].css({"stroke-width": 1});
      freeListArray[rectNumber].css({"fill": "lightgrey"});

      rectNumber++;
      linesArray[rectNumber].css({"stroke-width": 3});
      freeListArray[rectNumber].css({"fill": "yellow"});
      jsav.umsg("Free list " + rectNumber + " block size = " + freeArray[rectNumber])

        
      if (inputVal <= freeArray[rectNumber]) {
        nextCount = 2;
      
      } else {
        nextCount = 1;
      }

    } else if(nextCount == 2) {


        jsav.umsg("We have a fit")
        jsav.umsg("Allocation Complete")
        jsav.umsg("Please schedule another request")
      insertIntoBlock(inputVal);
    }
  }

  function circularFit(inputVal) {

  }

  function bestFit(inputVal) {


    var minValue = Math.min.apply(Math, freeArray);
    jsav.umsg(minValue)
    var dist0 = freeArray[0] - inputVal;
    var dist1 = freeArray[1] - inputVal;
    var dist2 = freeArray[2] - inputVal;
    var dist3 = freeArray[3] - inputVal;

    var distArray = new Array(dist0, dist1, dist2, dist3);
    var i = 0;
    for(i =0; i < 4; i++)
    {
      if( distArray[i] < 0)
      {
        distArray[i] = 100;
      }
    }



    var best = Math.min.apply(Math, distArray);
    var bestBlock;

    if(best == dist0)
    {
      bestBlock = 0;
    }
     else if(best == dist1)
    {
       bestBlock = 1;
    }
     else if(best == dist2)
    {
       bestBlock = 2;
    }
     else if(best == dist3)
    {
       bestBlock = 3;
    }

    jsav.umsg("best: " + bestBlock)
    
    if(nextCount == 0) {
      rectNumber = freeArray.indexOf(minValue);

      linesArray[rectNumber].css({"stroke-width": 3});
      freeListArray[rectNumber].css({"fill": "yellow"});

      if (inputVal <= minValue) {
        nextCount = 2;
      } else {
        nextCount = 1;
      }
    } else if(nextCount == 1) {

      linesArray[rectNumber].css({"stroke-width": 1});
      freeListArray[rectNumber].css({"fill": "lightgrey"});
      //need to get second smallest!!!
      minValue = Math.min.apply(Math, freeArray);
      rectNumber = freeArray.indexOf(minValue);

      linesArray[rectNumber].css({"stroke-width": 3});
      freeListArray[rectNumber].css({"fill": "yellow"});
        
      if (inputVal <= freeArray[rectNumber]) {
        nextCount = 2;
      
      } else {
        nextCount = 1;
      }

    } else if(nextCount == 2) {
        insertIntoBlock(inputVal);
    }
  }

  function worstFit(inputVal) {
    if(nextCount == 0) {
      var maxValue = Math.max.apply(Math, freeArray);
      rectNumber = freeArray.indexOf(maxValue);

      linesArray[rectNumber].css({"stroke-width": 3});
      freeListArray[rectNumber].css({"fill": "yellow"});

      if (inputVal <= maxValue) {
        nextCount = 2;
      } else {
        jsav.umsg("Value entered is too large for the Memory Pool.");
        $('#next').attr("disabled", "disabled");
      }
    } else if(nextCount == 2) {
        insertIntoBlock(inputVal);
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
      }
    });

    $('#submit').click(function () {
      var inputVal = $("#input").val();
      if (inputVal < 0 || inputVal > 99999 || isNaN(inputVal)) {
        jsav.umsg("Please enter a number in the range of 0-99999");
        $('#next').attr("disabled", "disabled");


      } else { 
        jsav.umsg("The request has been scheduled.");
        jsav.umsg("Size Request: " + inputVal);

        newRec(inputVal);
        $('#submit').attr("disabled", "disabled");
        $("#next").removeAttr("disabled");
      }
    });

    $('#next').click(function () {

      submitRec.css({"opacity": "0"});
      requestedBlockLabel.css({"opacity": "0"});

      var inputValue = $("#input").val();

      switch ($("#fitAlgorithm").val()) {
        case '0':  // No function chosen
          reset();
          break;
        case '1':
          firstFit(inputValue);
          break;
        case '2':
          circularFit(inputValue);
          break;
        case '3':
          bestFit(inputValue);
          break;
        case '4':
          worstFit(inputValue);
          break;
        // case '5':
        //   sequentialFit(inputValue);
        //   break;
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
          jsav.clearumsg();
          jsav.umsg("First Fit Selected")
          
          jsav.umsg("To allocate a block, enter a size and click submit")
          enableAllButtons(); 
          break;
        case '2':
          jsav.clearumsg();
          jsav.umsg("Circular Fit Selected")
          jsav.umsg("To allocate a block, enter a size and click submit")
         enableAllButtons();
          break;
        case '3':
          jsav.clearumsg();
          jsav.umsg("Best Fit Selected")
          jsav.umsg("To allocate a block, enter a size and click submit")
          enableAllButtons();
          break;
        case '4':
          jsav.clearumsg();
          jsav.umsg("Worst Fit Selected")
          jsav.umsg("To allocate a block, enter a size and click submit")
          enableAllButtons();
          break;
        // case '5':
        //   jsav.umsg("Sequential Fit Selected")
        //   jsav.umsg("")
        //   jsav.umsg("To allocate a block, enter a size and click submit")
        //   enableAllButtons();
        //   break;
      }
    });

    $('#reset').click(function () {
      submitRec.css({"opacity": "0"});
      requestedBlockLabel.css({"opacity": "0"});
          var i = 0;
          while(i < 4)
          {
            blockLabelArray[i].clear();
            linesArray[i].hide();
            i++;
          }
          freeAmountLabel.clear();
          usedAmountLabel.clear();
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
