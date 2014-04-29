"use strict";
(function ($) {
  var jsav,              // JSAV
      defCtrlState,   // Stores the default state of the controls
      submitRec,      //the rectangle that's created when the user hits submit
      newRect,
      free1,
      linesArray,
      freeListArray,
      freeArray,
      freeStartArray,
      blockLabelArray,
      requestedBlockLabel,
      connectStartArray,
      recArray,
      recArraySize,
      freeOrNot,
      attArray,
      startArray,
      finArray,
      freeFinArray,
      freeAmountLabel,
      freeNum,
      usedAmountLabel,
      usedNum,
      nextCount = 0,
      rectNumber = 0,
      current,
      color,
      fit = 0;


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
    $("rect").on("click", changeUsed);


    var free1Start = 280;
    var free2Start = 367;
    var free3Start = 517;
    var free4Start = 642;
    
    var free1 = jsav.g.rect(free1Start, 150, 62, 60).css({"fill": "cornflowerblue"});
    var free2 = jsav.g.rect(free2Start, 150, 88, 60).css({"fill": "cornflowerblue"});
    var free3 = jsav.g.rect(free3Start, 150, 80, 60).css({"fill": "cornflowerblue"});
    var free4 = jsav.g.rect(free4Start, 150, 113, 60).css({"fill": "cornflowerblue"});

    recArray = new Array(30);

    recArray[0] = free1;
    recArray[1] = used1;
    recArray[2] = free2;
    recArray[3] = used2;
    recArray[4] = free3;
    recArray[5] = used3;
    recArray[6] = free4;
    recArray[7] = used4;

    startArray = new Array(30);
    finArray = new Array(30);
    freeOrNot = new Array(30);  //1 indicates free 0 is not

    startArray[0] = 280;
    startArray[1] = 342;
    startArray[2] = 367;
    startArray[3] = 455;
    startArray[4] = 517;
    startArray[5] = 597;
    startArray[6] = 642;
    startArray[7] = 755;

    finArray[0] = 342;
    finArray[1] = 390;
    finArray[2] = 455;
    finArray[3] = 540;
    finArray[4] = 597;
    finArray[5] = 665;
    finArray[6] = 755;
    finArray[7] = 804;

    freeOrNot[0] = 1;
    freeOrNot[1] = 0;
    freeOrNot[2] = 1;
    freeOrNot[3] = 0;
    freeOrNot[4] = 1;
    freeOrNot[5] = 0;
    freeOrNot[6] = 1;
    freeOrNot[7] = 0;



    // var touch1 = jsav.g.rect(280, 20, 30, 40).css({"fill": "coral"});
    // var touch2 = jsav.g.rect(620, 20, 30, 40).css({"fill": "coral"});
    // var touch3 = jsav.g.rect(620, 20, 30, 40).css({"fill": "coral"});
    // var touch4 = jsav.g.rect(620, 20, 30, 40).css({"fill": "coral"});


    freeStartArray = new Array(free1Start, free2Start, free3Start, free4Start);
    
    var free1Finish = 342;
    var free2Finish = 455;
    var free3Finish = 597;
    var free4Finish = 755;
    
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
    current = 0;
    recArraySize = 8;
  }

 
  function newRec(sizeX)
  {
    sizeX = sizeX*2.5;
    submitRec = jsav.g.rect(280, 300, sizeX, 60).css({"fill": "cyan"});
    requestedBlockLabel = jsav.label("Requested Block", {"left": 280, "top": 270}).css({"font-weight": "bold"});

  }


  function changeUsed(event)
  {
    var x, y;
    console.log("this: " + this + ", event: " + event);
    this.setAttribute("fill", "cornflowerblue");
    //jsav.umsg(event.pageX)
    var click = event.pageX;
    merge(click);
   
   
  }

  function getStart(position)
  {
      return startArray[position -1];
  }

  function getFin(position)
  {
      return finArray[position -1];
  }

 
 
  function enableAllButtons() {
    $("#input").removeAttr("disabled");
    $("#submit").removeAttr("disabled");
    $("#next").removeAttr("disabled");
  }

  function merge(clickSpot)
  {
      //hi
      clickSpot = clickSpot -23; 
      var i = 0;
      while(clickSpot > startArray[i])
      {
        //jsav.umsg("start " + i + " " + startArray[i])
        i++;
      }
      i = i - 1;
      //jsav.umsg("i = " + i)
      //jsav.umsg("click = " + clickSpot)
      if(i != 0 && i != recArraySize)
      {
        var diff = finArray[i + 1] -startArray[i-1];
        var newRect = jsav.g.rect(startArray[i-1], 150, diff, 60).css({"fill": "cornflowerblue"});
        recArray[i] = newRect;
        
        newRect.css({"z-index": 500});
        var j = recArraySize;
        i = i +2;
        jsav.umsg("array size =  " + recArraySize)
        jsav.umsg("i = " + i)
        i = i +1
        for(i; i < recArraySize; i++)
        {
          jsav.umsg("in for")
          recArray[i - 2] = recArray[i];
          recArray[recArraySize -1] = null;
          recArray[recArraySize -2] = null;

          startArray[i - 2] = startArray[i];
          startArray[recArraySize -1] = null;
          startArray[recArraySize -2] = null;

          finArray[i - 2] = finArray[i];
          finArray[recArraySize -1] = null;
          finArray[recArraySize -2] = null;
          jsav.umsg("array size =  " + recArraySize)
        }
        //jsav.umsg("array size =  " + recArraySize)
        recArraySize = recArraySize - 2;
        //jsav.umsg("array size =  " + recArraySize)
      }

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


      
      
      inputVal = inputVal * -1; //multiplied by -1 becuase using '+' was joining the 2 values
      usedNum = usedNum - inputVal; //minus a negitive is equivlent to adding
      inputVal = inputVal * -1;  //multiplied by -1 again to make posiitve
      freeNum = freeNum - inputVal;
      
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
        if(rectNumber == 3 && inputVal > 45)
        {
          freeListArray[rectNumber].css({"fill": "red"});
          jsav.umsg("The value you have entered can not be allocated")
          jsav.umsg("Please enter a smaller value")
          $('#next').attr("disabled", "disabled");
          

        }

          
            if (inputVal <= freeArray[rectNumber]) {
              nextCount = 2;
            
            } 
            
            else {
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

    var max = Math.max.apply(Math, freeArray);
    jsav.umsg("max: " + max)
    rectNumber = current;
    var i;
    for(i = 0; i < 4; i++)
    {
          linesArray[i].css({"stroke-width": 1});
        freeListArray[i].css({"fill": "lightgrey"});
    }
  if(fit != 1)
  {
    if(inputVal <= 45)
    {
        linesArray[rectNumber].css({"stroke-width": 3});
        freeListArray[rectNumber].css({"fill": "yellow"});
    }
    else if(inputVal > 45)
    {

        linesArray[rectNumber].css({"stroke-width": 3});
        freeListArray[rectNumber].css({"fill": "yellow"});
        nextCount++;
        current++;
        if(nextCount == 4)
        {
          freeListArray[rectNumber].css({"fill": "red"});
          jsav.umsg("The value you have entered can not be allocated")
          jsav.umsg("Please enter a smaller value")
          $('#next').attr("disabled", "disabled");

        }
    }
    if(inputVal <= freeArray[rectNumber])
    {
      fit = 1;
    }
    else if(inputVal > freeArray[rectNumber] && inputVal <= 45) 
    {
          
          current++;
    }
    
  }
  else if(fit == 1)
  {
    insertIntoBlock(inputVal);
    fit = 0;
  }
  if (current == 4)
  {
    current = 0;
  }
    

}

  function bestFit(inputVal) {

    var max = Math.max.apply(Math, freeArray);
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
    //var count = 0;

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
    else
    {
      bestBlock = 4;
    }

    if(rectNumber != 0)
    {
      linesArray[rectNumber - 1].css({"stroke-width": 1});
        freeListArray[rectNumber - 1].css({"fill": "lightgrey"});
    }
    if(inputVal > max)
    {
        linesArray[rectNumber].css({"stroke-width": 3});
        freeListArray[rectNumber].css({"fill": "yellow"});
    }
    if(inputVal > max && rectNumber == 3)
    {
          freeListArray[rectNumber].css({"fill": "red"});
          jsav.umsg("The value you have entered can not be allocated")
          jsav.umsg("Please enter a smaller value")
          $('#next').attr("disabled", "disabled");
    }
     else if(bestBlock > rectNumber)
    {
        linesArray[rectNumber].css({"stroke-width": 3});
        freeListArray[rectNumber].css({"fill": "yellow"});
        //rectNumber++;

    }
    else if(bestBlock == rectNumber)
    {   
        jsav.umsg("Best Block found")
        jsav.umsg("Best Block is Block  " + bestBlock)
        linesArray[rectNumber].css({"stroke-width": 3});
        freeListArray[rectNumber].css({"fill": "yellow"});
        

    }
    else if(rectNumber > bestBlock)
    {
      rectNumber--;
      insertIntoBlock(inputVal);
    }

    
  }

  function worstFit(inputVal) {
    var max = Math.max.apply(Math, freeArray);
    if(inputVal <= max)
    {
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
    else
    {

        var i;
        
        for(i = 0; i < 3; i++)
        {
           linesArray[i].css({"stroke-width": 1});
           freeListArray[i].css({"fill": "lightgrey"});
        }

           linesArray[current].css({"stroke-width": 3});
           freeListArray[current].css({"fill": "yellow"});
           current++;



        // for(i = 0; i < 3; i++)
        // {
        //   linesArray[i].css({"stroke-width": 1});
        //   freeListArray[i].css({"fill": "lightgrey"});
        // }
        // linesArray[rectNumber].css({"stroke-width": 3});
        // freeListArray[rectNumber].css({"fill": "yellow"});
        // //rectNumber++;
        if(current == 4)
        {
          //linesArray[rectNumber].css({"stroke-width": 3});
          freeListArray[i].css({"fill": "red"});
           jsav.umsg("The value you have entered can not be allocated")
          jsav.umsg("Please enter a smaller value")
          $('#next').attr("disabled", "disabled");
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
      }
    });

    $('#submit').click(function () {
      var i = 0;
      for(i = 0; i < 4; i++)
      {
        linesArray[i].css({"stroke-width": 1});
      freeListArray[i].css({"fill": "lightgrey"});
      }
      nextCount = 0;
      rectNumber = 0;
      var inputVal = $("#input").val();
      if (inputVal < 1 || inputVal > 100 || isNaN(inputVal)) {
        jsav.umsg("Please enter a number in the range of 1-100");
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
          rectNumber++;
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
