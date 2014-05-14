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
      end = false,
      array,
      insert,
      index = 0,
      finn,
      flag,
      prevClick,
      startIndex = 0,
      sizee,
      ins = 0,
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

    var used1 = jsav.g.rect(342.5, 150, 25, 60).css({"fill": "coral"});
    var used2 = jsav.g.rect(455, 150, 62.5, 60).css({"fill": "coral"});
    var used3 = jsav.g.rect(597.5, 150, 45, 60).css({"fill": "coral"});
    var used4 = jsav.g.rect(755, 150, 25, 60).css({"fill": "coral"});
     $("rect").on("click", changeUsed);
     flag = 0;


    var free1Start = 280;
    var free2Start = 367.5;
    var free3Start = 517.5;
    var free4Start = 642.5;
    
    var free1 = jsav.g.rect(free1Start, 150, 62.5, 60).css({"fill": "cornflowerblue"});
    var free2 = jsav.g.rect(free2Start, 150, 87.5, 60).css({"fill": "cornflowerblue"});
    var free3 = jsav.g.rect(free3Start, 150, 80, 60).css({"fill": "cornflowerblue"});
    var free4 = jsav.g.rect(free4Start, 150, 112.5, 60).css({"fill": "cornflowerblue"});
   

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
    startArray[1] = 342.5;
    startArray[2] = 367.5;
    startArray[3] = 455; // 
    startArray[4] = 517.5; //was 517
    startArray[5] = 597.5; //642
    startArray[6] = 642.5;
    startArray[7] = 755;
    startArray[8] = 780; //780

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

     array = jsav.ds.array([25, 35, 32, 45], {"left": 280, "top": 400, "bottom": 500});
     //array = jsav.ds.array(5, {"left": 280, "top": 400, "bottom": 500})

    //freeArray = new Array(block1, block2, block3, block4);

    insert = 0;

    // var block1Label = jsav.label(block1, {left :  280, top:  410});
    // var block2Label= jsav.label(block2, {left :  310, top:  410});
    // var block3Label = jsav.label(block3, {left :  340, top:  410});
    // var block4Label = jsav.label(block4, {left :  370, top:  410});

    // block1Label.css({"z-index": 500});
    // block2Label.css({"z-index": 500});
    // block3Label.css({"z-index": 500});
    // block4Label.css({"z-index": 500});

   // blockLabelArray = new Array(block1Label, block2Label, block3Label, block4Label);
    
    // var freeListRect = jsav.g.rect(275, 400, 30, 40).css({"fill": "lightgrey"});
    // var freeListRect2 = jsav.g.rect(305, 400, 30, 40).css({"fill": "lightgrey"});
    // var freeListRect3 = jsav.g.rect(335, 400, 30, 40).css({"fill": "lightgrey"});
    // var freeListRect4 = jsav.g.rect(365, 400, 30, 40).css({"fill": "lightgrey"});

    //freeListArray = new Array(freeListRect, freeListRect2, freeListRect3, freeListRect4);

    var freeLabel = jsav.label("Free List", {left : 300, top: 510});

    var connect1Start = 305;
    var connect2Start = 350;
    var connect3Start = 400;
    var connect4Start = 435;
    connectStartArray = new Array(connect1Start, connect2Start, connect3Start, connect4Start);
  
    var connect1 = jsav.g.line(connect1Start, 422, 311, 210);
    var connect2 = jsav.g.line(connect2Start, 422, 411, 210);
    var connect3 = jsav.g.line(connect3Start, 422, 557, 210);
    var connect4 = jsav.g.line(connect4Start, 422, 698, 210);

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
     var i = 0;
     var clickSpot = click -23;

      while(clickSpot > startArray[i])
      {
        i++;
      }
       i--;
       
       
       if(flag == 1)
       {
          if(clickSpot != prevClick)
          {
            
            merge(click);
            
          }
         
       }
       else
       {
        
          merge(click);
          
          flag = 1;
       }
  

        prevClick = clickSpot;
        
    
    // if(clickSpot >= startArray[recArraySize -1] && flag == 1)
    // {
    //   jsav.umsg("got him")
    // }
    // else
    // {

    //   merge(click);
    //   updateArray();
    // } 
   
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
      
      clickSpot = clickSpot -23; 
      
      var i = 0;
      while(clickSpot > startArray[i])
      {
        i++;
      }
       i--;
     
      if(clickSpot <= 780 && clickSpot >= startArray[recArraySize -1])
      {
        
        //var start = startArray[end-1];
        
        var start = startArray[recArraySize-2]
        
        var diff = 780 - start;
        
        // jsav.umsg("start= "+ start)
        var newrec = jsav.g.rect(start, 150, diff, 60).css({"fill": "cornflowerblue"});
        newrec.css({"z-index": 500});
        //jsav.umsg("start = " + start + "diff = " + diff)
         
        // jsav.umsg("start array i -2" + startArray[i-2])
        // jsav.umsg("start array i -1" + startArray[i-1])
        // jsav.umsg("start array i " + startArray[i])
        // startArray[i-2] = startArray[i];
        startArray[i] = 780;
        
      
     
          
        freeOrNot[recArraySize -1] = null;
        freeOrNot[recArraySize -2] = 1;
        recArraySize--;
        
        flag = 1;
        end = true;

      }

      else if(i == 0 && freeOrNot[0] == 0)
      {

        var diff = startArray[2]-280;
        freeOrNot[0] = 1;
        freeOrNot[1] = 0;
        startArray[1] = startArray[2];
        var j;
        for(j =2; j < recArraySize; j++)
        {
          freeOrNot[j-1] = freeOrNot[j];
          startArray[j-1] = startArray[j];
        }
        freeOrNot[0] = 1;
        startArray[0] = 280;
        var newRect = jsav.g.rect(280, 150, diff, 60).css({"fill": "cornflowerblue"});
        newRect.css({"z-index": 500});
        recArraySize--;
      }
      else if(freeOrNot[i] == 0)
      {  
        
      
        var diff = startArray[i +2] - startArray[i-1];
        
        var newRect = jsav.g.rect(startArray[i-1], 150, diff, 60).css({"fill": "cornflowerblue"});
        newRect.css({"z-index": 500});
       
        if(recArraySize > 2)
        {
          recArraySize = recArraySize - 2;
        }
        else if(recArraySize == 2)
        {
          recArraySize = recArraySize -1;
        }
        var j = recArraySize;

        for(i; i < j; i++)
        {
          recArray[i] = recArray[i + 2];
          startArray[i] = startArray[i + 2];
          freeOrNot[i] = freeOrNot[i+2];
          // finArray[i] = finArray[i + 2];
       }

       startArray[recArraySize +1] = null;
       freeOrNot[recArraySize +1 ] = null;
       freeOrNot[recArraySize] = null;
       startArray[recArraySize] = null;
       recArray[recArraySize +1] = null;
       recArray[recArraySize] = null;
       // finArray[recArraySize] = null;
       // finArray[recArraySize + 1] = null;
     }

          var n = recArraySize;
          for (n; n<30; n++)
            {
              startArray[n] = null;
              recArray[n] = null;
            }
            if(end == true)
            {
              //startArray[recArraySize] = 780;
              if(recArraySize ==1)
                {
                  startArray[recArraySize -1] = 280;
                }
            }

            startArray[recArraySize] = 780;
            freeCheck();
            updateArray();
            updateLinesOnMerge();
            //  jsav.umsg("startArray 0= " + startArray[0])
            // jsav.umsg("startArray 1= " + startArray[1])
            // jsav.umsg("startArray 2= " + startArray[2])
            // jsav.umsg("startArray 3= " + startArray[3])
            //  jsav.umsg("startArray 4= " + startArray[4])
            // jsav.umsg("startArray 5= " + startArray[5])
            // jsav.umsg("startArray 6= " + startArray[6])
            // jsav.umsg("startArray 7= " + startArray[7])
            // jsav.umsg("startArray 8= " + startArray[8])
            // jsav.umsg("startArray 9= " + startArray[9])


    }

    function freeCheck()
    {
      var i = 0;
      
      
        
          for(i; i<recArraySize;i++)
          {
            if(freeOrNot[i] == 0)
            {
              freeOrNot[i+1] = 1;
            }
            else if(freeOrNot[i] == 1)
            {
              freeOrNot[i+1] = 0;
            }
          }
          freeOrNot[recArraySize] = null;
      }
      
    

    function updateArray()
    {
        
       
        if(recArraySize == 1 && freeOrNot[0] == 1)
        {
          array.hide();
          array = jsav.ds.array([200], {"left": 280, "top": 400, "bottom": 500});
        }
        else
        {
          
          var i;
          var num = 0;
          var one;
          var two;
          var three; 
          var four;
           //jsav.umsg("rect array size = " + recArraySize)
          for(i = 0; i < recArraySize; i++)
          {
            //jsav.umsg("free or not 0 = " + freeOrNot[0]);
            if(freeOrNot[i] == 1) 
            {
              //jsav.umsg("i = " + i)
              //array.value(num, startArray[i+1] - startArray[i]);
              num++;
              if(num == 1)
              {
                //jsav.umsg("startArray +1 = " + startArray[i+1] + "startArray = " + startArray[i])
                one = startArray[i +1] - startArray[i];
                one = one/2.5;
                one = Math.round(one);
                
              }
               else if(num == 2)
              {
                //jsav.umsg("startArray +1 = " + startArray[i+1] + "startArray = " + startArray[i])
                two = startArray[i +1] - startArray[i];
                two = two/2.5;
                two = Math.round(two);
              }
               else if(num == 3)
              {
                //jsav.umsg("startArray +1 = " + startArray[i+1] + "startArray = " + startArray[i])
                three = startArray[i +1] - startArray[i];
                three = three/2.5;
                three = Math.round(three);

              }
               else if(num == 4)
              {
           
                four = startArray[i+1] - startArray[i];
              
                four = four/2.5
               four = Math.round(four);
                //four = 55;
               
                
              }
              if(one < 1 || one == null)
              {
                 
                 one = 780 - startArray[i];
                 one = one/2.5;
                 one = Math.round(one);
                
              }
              else if(two < 1 || two == null)
              {
                 
                 two= 780 - startArray[i];
                 two = two/2.5;
                two = Math.round(two);
                
              }
              else if(three < 1 || three == null)
              {
                
                 three = 780 - startArray[i];
                 three = three/2.5;
                three = Math.round(three);
                 
              }
              else if(four < 1 || four == null)
              {
                  
                 
                 four = 780 - startArray[i];
                 four = four/2.5;
                 four = Math.round(four);
                 
              }
              
            }

          }
          var count;
          var i;
          for(i=0; i < recArraySize; i++)
          {
            if(freeOrNot[i]==1)
            {
              count++;
            }
          }
          
          
            
          array.hide();
              jsav.umsg("num === " + num)
              if(num == 1)
              {

                array = jsav.ds.array([one], {"left": 280, "top": 400, "bottom": 500});
              }
              else if(num ==2)
              {
                array = jsav.ds.array([one, two], {"left": 280, "top": 400, "bottom": 500});
              }
              else if (num == 3)
              {
                array = jsav.ds.array([one, two, three], {"left": 280, "top": 400, "bottom": 500});
              }
              else if (num == 4)
              {
                array = jsav.ds.array([one, two, three, four], {"left": 280, "top": 400, "bottom": 500});
              }
              else if(count == 0)
              {
                array = jsav.ds.array([], {"left": 280, "top": 400, "bottom": 500});
              }


            
    
        }
        var i = 0;
        while(freeOrNot[i] == 0)
        {
          if(i == recArraySize)
          {
            array.hide();
          }
          i++;

        }
        //jsav.umsg("size: " + array.size())
        updateLabels();
        
    }

    function getSize(rect)
    {
        //var rec = rect -1;
        var size = startArray[rect +1] - startArray[rect];
        size = size/2.5;
        return size;
  
  }

  function updateLabels()
  {
      usedAmountLabel.clear();
      freeAmountLabel.clear();

      var one = 0;
      var two = 0;
      var three = 0;
      var four = 0;

      if(array.value(0) != null)
      {
        var one = array.value(0);
      }
      if(array.value(1) != null)
      {
        two = array.value(1);
      }
      
      if(array.value(2) != null)
      {
        three = array.value(2);
      }
      
      if(array.value(3) != null)
      {
         four = array.value(3);
      }
      
     

     
      freeNum = one + two + three + four;
      usedNum = 200 - freeNum;
      usedAmountLabel = jsav.label(usedNum, {left :  625, top:  30});
      usedAmountLabel.css({"z-index": 500});

      freeAmountLabel = jsav.label(freeNum, {left :  720, top:  30});
      freeAmountLabel.css({"z-index": 500});

      var i = 0;
      var count = 0;
      for(i; i <recArraySize; i++)
      {
        if(freeOrNot[i]==1)
        {
          count++;
        }
      }

      if(count == 0)
      {
        usedAmountLabel.clear();
        freeAmountLabel.clear();
        usedNum = 200;
        freeNum = 0;
         usedAmountLabel = jsav.label(usedNum, {left :  625, top:  30});
      usedAmountLabel.css({"z-index": 500});

      freeAmountLabel = jsav.label(freeNum, {left :  720, top:  30});
      freeAmountLabel.css({"z-index": 500});
       
      }
  }
  function updateLinesOnAdd()
  {   var j = 0;
      while(i < recArraySize)
      {
        if(freeOrNot[i] == 1)
        {
          j++;
        }
        if(i == finn)
        {
          
          break;
        }
        i++;
      }
      var k = 0;
      i = 0;
      jsav.umsg("startArray ")
      while(i < recArraySize)
      { 
        if(freeOrNot[i] == 1)
        {
          //jsav.umsg("i = " + i)
          freeStartArray[k] = startArray[i];
          freeFinArray[k]= startArray[i+1];
          if(i == 0)
          {
            freeStartArray[i] = 280;
          }
          if(i == 1)
          {
            freeStartArray[0] = startArray[1];
            jsav.umsg("start array = "+ freeStartArray[k])
            jsav.umsg("fin array = "+ freeFinArray[k])
          }
          //jsav.umsg("free startArray i" + k + "    "+ freeStartArray[k])
          k++;
        }
        i++;
            
      }
            jsav.umsg("start array3 = "+ freeStartArray[1])
            jsav.umsg("fin array3 = "+ freeFinArray[1])

          var count =0;
          for(i = 0; i <recArraySize; i++)
          {
            if( freeOrNot[i] == 1)
            {
              count++;
            }
          }
      // jsav.umsg("connect = " + connectStartArray[2])
      // jsav.umsg("fin array = " + freeFinArray[0])
      // jsav.umsg("start array =" + freeStartArray[0])
      // jsav.umsg("freeOrNot[0] " + freeOrNot[0])
      // var si = array.size();
      
      //linesArray[j].movePoints([[0, connectStartArray[j], 400], [1, ((freeStartArray[finn] + freeFinArray[finn])/2), 210]]).css({"stroke-width": 1});
      if(array.size() == 4)
      {
          linesArray[0].movePoints([[0, connectStartArray[0], 422], [1, ((freeStartArray[0] + freeFinArray[0])/2), 210]]).css({"stroke-width": 1});
          linesArray[1].movePoints([[0, connectStartArray[1], 422], [1, ((freeStartArray[1] + freeFinArray[1])/2), 210]]).css({"stroke-width": 1});
          linesArray[2].movePoints([[0, connectStartArray[2], 422], [1, ((freeStartArray[2] + freeFinArray[2])/2), 210]]).css({"stroke-width": 1});
          linesArray[3].movePoints([[0, connectStartArray[3], 422], [1, ((freeStartArray[3] + freeFinArray[3])/2), 210]]).css({"stroke-width": 1});
      }
       else if(array.size() == 3)
      {
          jsav.umsg("size == 3")
          linesArray[0].movePoints([[0, connectStartArray[0], 422], [1, ((freeStartArray[0] + freeFinArray[0])/2), 210]]).css({"stroke-width": 1});
          linesArray[1].movePoints([[0, connectStartArray[1], 422], [1, ((freeStartArray[1] + freeFinArray[1])/2), 210]]).css({"stroke-width": 1});
          linesArray[2].movePoints([[0, connectStartArray[2], 422], [1, ((freeStartArray[2] + freeFinArray[2])/2), 210]]).css({"stroke-width": 1});
          linesArray[3].movePoints([[0, 0, 0], [1,0,0]]);
      }
       else if(array.size() == 2)
      {
          linesArray[0].movePoints([[0, connectStartArray[0], 422], [1, ((freeStartArray[0] + freeFinArray[0])/2), 210]]).css({"stroke-width": 1});
          linesArray[1].movePoints([[0, connectStartArray[1], 422], [1, ((freeStartArray[1] + freeFinArray[1])/2), 210]]).css({"stroke-width": 1});
          linesArray[2].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[3].movePoints([[0, 0, 0], [1,0,0]]);
      }
      else if(array.size() == 1 & count != 0)
      {
          linesArray[0].movePoints([[0, connectStartArray[0], 422], [1, ((freeStartArray[0] + freeFinArray[0])/2), 210]]).css({"stroke-width": 1});
          linesArray[1].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[2].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[3].movePoints([[0, 0, 0], [1,0,0]]);
      }
      else 
      {

          linesArray[0].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[1].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[2].movePoints([[0, 0, 0], [1,0,0]]); 
          linesArray[3].movePoints([[0, 0, 0], [1,0,0]]); 
      }
      var as = array.size();

      jsav.umsg("array at 0  " + as)
  }
  


  function updateLinesOnMerge()
  {   var j = 0;
      while(i < recArraySize)
      {
        if(freeOrNot[i] == 1)
        {
          j++;
        }
        if(i == finn)
        {
          
          break;
        }
        i++;
      }
      var k = 0;
      i = 0;
      //jsav.umsg("startArray ")
      while(i < recArraySize)
      { 
        if(freeOrNot[i] == 1)
        {
          //jsav.umsg("i = " + i)
          freeStartArray[k] = startArray[i-1];
          freeFinArray[k]= startArray[i+1];
          if(i == 0)
          {
            freeStartArray[i] = 280;
          }
          if(i > 0)
          {
            freeStartArray[k] = startArray[i];
            freeFinArray[k] = startArray[i + 1];
            jsav.umsg("start array = "+ freeStartArray[k])
            jsav.umsg("fin array = "+ freeFinArray[k])
          }
          jsav.umsg("free startArray i" + k + "    "+ freeStartArray[k])
          k++;
        }
        i++;
            
      }
          var size = array.size();
          //jsav.umsg("size = " + size)
          //jsav.umsg("arr3 arr4 " + array.value(2) + " " + array.value(3))
      
      //linesArray[j].movePoints([[0, connectStartArray[j], 400], [1, ((freeStartArray[finn] + freeFinArray[finn])/2), 210]]).css({"stroke-width": 1});
      if(array.size() == 4)
      {
          linesArray[0].movePoints([[0, connectStartArray[0], 422], [1, ((freeStartArray[0] + freeFinArray[0])/2), 210]]).css({"stroke-width": 1});
          linesArray[1].movePoints([[0, connectStartArray[1], 422], [1, ((freeStartArray[1] + freeFinArray[1])/2), 210]]).css({"stroke-width": 1});
          linesArray[2].movePoints([[0, connectStartArray[2], 422], [1, ((freeStartArray[2] + freeFinArray[2])/2), 210]]).css({"stroke-width": 1});
          linesArray[3].movePoints([[0, connectStartArray[3], 422], [1, ((freeStartArray[3] + freeFinArray[3])/2), 210]]).css({"stroke-width": 1});
      }
       else if(array.size() == 3)
      {
          
          linesArray[0].movePoints([[0, connectStartArray[0], 422], [1, ((freeStartArray[0] + freeFinArray[0])/2), 210]]).css({"stroke-width": 1});
          linesArray[1].movePoints([[0, connectStartArray[1], 422], [1, ((freeStartArray[1] + freeFinArray[1])/2), 210]]).css({"stroke-width": 1});
          linesArray[2].movePoints([[0, connectStartArray[2], 422], [1, ((freeStartArray[2] + freeFinArray[2])/2), 210]]).css({"stroke-width": 1});
          linesArray[3].movePoints([[0, 0, 0], [1,0,0]]);
      }
       else if(array.size() == 2)
      {
          linesArray[0].movePoints([[0, connectStartArray[0], 422], [1, ((freeStartArray[0] + freeFinArray[0])/2), 210]]).css({"stroke-width": 1});
          linesArray[1].movePoints([[0, connectStartArray[1], 422], [1, ((freeStartArray[1] + freeFinArray[1])/2), 210]]).css({"stroke-width": 1});
          linesArray[2].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[3].movePoints([[0, 0, 0], [1,0,0]]);
      }
      else if(array.size() == 1)
      {
          linesArray[0].movePoints([[0, connectStartArray[0], 422], [1, ((freeStartArray[0] + freeFinArray[0])/2), 210]]).css({"stroke-width": 1});
          linesArray[1].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[2].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[3].movePoints([[0, 0, 0], [1,0,0]]);
      }
      else if(array.value(0) == null)
      {
          linesArray[0].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[1].movePoints([[0, 0, 0], [1,0,0]]);
          linesArray[2].movePoints([[0, 0, 0], [1,0,0]]); 
          linesArray[3].movePoints([[0, 0, 0], [1,0,0]]); 
      }
  }
  

  // function insertIntoBlock(inputVal) {
  //     var newUsedRect = jsav.g.rect(freeStartArray[rectNumber], 150, inputVal * 2.5, 60).css({"fill": "coral"});
  //     freeStartArray[rectNumber] = freeStartArray[rectNumber] + inputVal * 2.5;
  //     freeArray[rectNumber] = freeArray[rectNumber] - inputVal;
  //     blockLabelArray[rectNumber].text(freeArray[rectNumber]);

  //     freeListArray[rectNumber].css({"fill": "lightgrey"});
  //     //jsav.umsg(((freeStartArray[rectNumber] + freeFinArray[rectNumber])/2));
  //     //jsav.umsg(freeStartArray[rectNumber]);
  //     //jsav.umsg(freeFinArray[rectNumber]);

     
  //     linesArray[rectNumber].movePoints([[0, connectStartArray[rectNumber], 400], [1, ((freeStartArray[rectNumber] + freeFinArray[rectNumber])/2), 210]]).css({"stroke-width": 1});


      
      
  //     inputVal = inputVal * -1; //multiplied by -1 becuase using '+' was joining the 2 values
  //     usedNum = usedNum - inputVal; //minus a negitive is equivlent to adding
  //     inputVal = inputVal * -1;  //multiplied by -1 again to make posiitve
  //     freeNum = freeNum - inputVal;
      
  //     freeAmountLabel.text(freeNum);
  //     usedAmountLabel.text(usedNum);


  //     nextCount = 0;
  //     rectNumber = 0;
  //     $('#next').attr("disabled", "disabled");
  // }

  function stepsToInsert(fin, size)
  {
      
      var whichRec;
      var i = 0;
      var j = 0;
      jsav.umsg("fin = " + fin)
      while(i < recArraySize)
      {
        if(freeOrNot[i] == 1)
        {
          j++;
        }
        if(i == fin)
        {
          
          break;
        }
        i++;
      }
      fin = j;
      //jsav.umsg("steps to insert fin " + fin)
      var error = array.size();
      if(fin > error)
      {
        jsav.umsg("There is an error")
      }
      if(fin == insert && finn != 30)
      {
        
        addRec(finn, size);
        ins = 0;
        insert = 0;

      }
      else if(fin > insert && insert <= 3)
      {
          var size = array.value(insert);
          jsav.umsg("Free List Block " + "size " + size)
          array.unhighlight(insert -1);
          array.highlight(insert);
          //jsav.umsg("here")
          insert++;

      }
      else if(insert == 4)
      {
          
          //jsav.umsg("Free List Block " + "size " + size)
          array.unhighlight(insert -1);
          array.highlight(insert);
          
          jsav.umsg("Your allocation is too big  deallocate and try again")
      }
      jsav.umsg("insert = " + insert)

      

  }



  function firstFit(inputVal) {
    //jsav.umsg("in first fit")
    var size = inputVal *2.5;
    var freeAmount = array.size();
    var rec1Size;
    var rec2Size;
    var rec3Size;
    var rec4Size;

    var freeRecs = new Array(0, 0, 0, 0);
    var i = 0;
    var j = 0;
    for(i; i < recArraySize ; i++)
    {

        if(freeOrNot[i] == 1)
        {
          freeRecs[j] = i;
          j++;
        }

    }

   // jsav.umsg("free0 = " + freeRecs[0])
    var rec1 = freeRecs[0];
    var rec2 = freeRecs[1];
    var rec3 = freeRecs[2];
    var rec4 = freeRecs[3];

    //jsav.umsg("rec2 = " + rec2)

    var fin;

    if(rec1 != null)
    {
        rec1Size = getSize(rec1);
    }
    if(rec2 != null)
    {
        rec2Size = getSize(rec2);
    }
    if(rec3 != null)
    {
        rec3Size = getSize(rec3);
    }
    if(rec4 != null)
    {
        rec4Size = getSize(rec4);
    }

    if(inputVal <= rec1Size)
    {
        fin = rec1;
    }
    else if(inputVal <= rec2Size)
    {
        fin = rec2;
    }
    else if(inputVal <= rec3Size)
    {
        fin = rec3;
    }
    else if(inputVal <= rec4Size)
    {
        fin = rec4;
    }
    else{
      fin = 30;
    }
    
    //addRec(fin, size);
    finn = fin;
    sizee = size;
    //jsav.umsg("fin = "+ fin)
    var range = size/2.5;
  
    stepsToInsert(fin, size);
    
  }
function addRec(fin, size)
{
  //jsav.umsg("fin is  =  to " + fin)
  var showSize = size /2.5;
  var size1 = size;
    //jsav.umsg("fin !!!!= " + fin)
    if(fin != 0 )
    {
      
      if(getSize(fin) != showSize)
       { 

       // jsav.umsg("problems here")
        var add = getSize(fin-1);
        add = add*2.5;
        size1 =size;
        size = add + size;
        var newRect2 = jsav.g.rect(startArray[fin - 1], 150, size, 60).css({"fill": "coral"});
        $("rect").on("click", changeUsed);
        newRect2.css({"z-index": 500});
        //jsav.umsg("finnnnn = " + fin)
        startArray[fin] =startArray[fin] + size1;
        
        var i;
        
       } //var diff = startArray[fin] + inputVal
      else if(getSize(fin) == showSize)
      {
       //jsav.umsg("error here") 
        var next = startArray[fin+2] - startArray[fin-1];
        var newRect2 = jsav.g.rect(startArray[fin - 1], 150, next, 60).css({"fill": "coral"});
        $("rect").on("click", changeUsed);
        newRect2.css({"z-index": 500});
        var i;
        
        var dif = startArray[fin +1] - startArray[fin-1];
        var a = startArray[fin+2] - startArray[fin+1];
        startArray[fin] = a + dif;
        freeOrNot[fin -1] = 0;
        //startArray[fin-1] = startArray[fin-1] + dif;
       
        for(i = fin + 2; i< recArraySize +1; i++)
        {
          if(startArray[i-2] > 0)
          {
            if(startArray[i -2] < 0)
            {
              jsav.umsg("0 at " + i)
            }
            startArray[i-2]= startArray[i];
            freeOrNot[i-2] = freeOrNot[i];
            
          }
        }
        recArraySize= recArraySize - 2;
      }
      else{
            //   jsav.umsg("size =" + size)
            // jsav.umsg("startArrayfin = " + startArray[fin])
            startArray[fin] = startArray[fin] + size1;
        }
      

  }

  else if(fin == 0)
  {
      //jsav.umsg("fin = 0")
      if(freeOrNot[1] == 0)
      {
        if(getSize(fin) != showSize)
        {  
          var newRect2 = jsav.g.rect(280, 150, size1, 60).css({"fill": "coral"});
          $("rect").on("click", changeUsed);
          newRect2.css({"z-index": 500});
          recArraySize++;
          var j;
          var tmpStArray = new Array(30);
          var tmpfreeArray = new Array(30);
          tmpStArray[0] = 280;
          tmpStArray[1] = 280 + size;
          tmpfreeArray[0] = 0;
          tmpfreeArray[1] = 1;
          
            for(j = 2;j< 20; j++)
            {
              tmpfreeArray[j] = freeOrNot[j-1];
              tmpStArray[j] = startArray[j-1];
            }
          
              freeOrNot = tmpfreeArray;
              startArray = tmpStArray;
          }
            else if(getSize(fin) == showSize)
            {
                
                var diff = startArray[2] -280;
                var newRect2 = jsav.g.rect(280, 150, diff, 60).css({"fill": "coral"});
                $("rect").on("click", changeUsed);
                newRect2.css({"z-index": 500});
                var i = 1;
                startArray[0] = 280;
                freeOrNot[1] = 0;
                //startArray[1] = startArray[2];
                freeOrNot[0] = 0;
                freeOrNot[1] = freeOrNot[2];
                startArray[1] = startArray[2];
               
                for(i =1; i < recArraySize+1;i++)
                {
                  startArray[i-1]= startArray[i];
                  freeOrNot[i-1] = freeOrNot[i];
                }
              freeOrNot[0] = 0;
              startArray[0] = 280;
              recArraySize--;
            }
           
        }
         else if(freeOrNot[0] == 1)
            {   
                var newRect2 = jsav.g.rect(280, 150, size, 60).css({"fill": "coral"});
                $("rect").on("click", changeUsed);
                newRect2.css({"z-index": 500});
                startArray[1] = 280 + size;
                freeOrNot[0] = 0;
                freeOrNot[1] = 1;
                startArray[2] = 780;
                recArraySize++;
                
            }

            
    }
          startArray[recArraySize] =780;
            // jsav.umsg("startArray 0= " + startArray[0])
            // jsav.umsg("startArray 1= " + startArray[1])
            // jsav.umsg("startArray 2= " + startArray[2])
            // jsav.umsg("startArray 3= " + startArray[3])
            //  jsav.umsg("startArray 4= " + startArray[4])
            // jsav.umsg("startArray 5= " + startArray[5])
            // jsav.umsg("startArray 6= " + startArray[6])
            // jsav.umsg("startArray 7= " + startArray[7])
            // jsav.umsg("startArray 8= " + startArray[8])
            // jsav.umsg("startArray 9= " + startArray[9])

            // jsav.umsg("size of 0 " + getSize(0))
            // jsav.umsg("size of 1 " + getSize(1))
            // jsav.umsg("size of 2 " + getSize(2))
            // jsav.umsg("size of 3 " + getSize(3))
            // jsav.umsg("size of 4 " + getSize(4))
            // jsav.umsg("size of 5 " + getSize(5))
            // jsav.umsg("size of 6 " + getSize(6))
            // jsav.umsg("size of 7 " + getSize(7))
            // jsav.umsg("size of 8 " + getSize(8))
            // jsav.umsg("startArray 0= " + freeOrNot[0])
            // jsav.umsg("startArray 1= " + freeOrNot[1])
            // jsav.umsg("startArray 2= " + freeOrNot[2])
            // jsav.umsg("startArray 3= " + freeOrNot[3])
            // jsav.umsg("startArray 4= " + freeOrNot[4])
            // jsav.umsg("startArray 5= " + freeOrNot[5])
            // jsav.umsg("startArray 6= " + freeOrNot[6])
            // jsav.umsg("startArray 7= " + freeOrNot[7])
            // jsav.umsg("recArraySize = " + recArraySize)
            

freeCheck();
updateArray();
updateLabels();
updateLinesOnAdd();
flag = 0;

}

function worstFit(inputVal)
{
    var size = inputVal *2.5;
    var rec1Size;
    var rec2Size;
    var rec3Size;
    var rec4Size;
    var freeRecs = new Array(0, 0, 0, 0);
    var i = 0;
    var j = 0;
    for(i; i < recArraySize ; i++)
    {

        if(freeOrNot[i] == 1)
        {
          freeRecs[j] = i;
          j++;
        }

    }

   // jsav.umsg("free0 = " + freeRecs[0])
    var rec1 = freeRecs[0];
    var rec2 = freeRecs[1];
    var rec3 = freeRecs[2];
    var rec4 = freeRecs[3];

    //jsav.umsg("rec2 = " + rec2)

    var fin;

    if(rec1 != null)
    {
        rec1Size = getSize(rec1);
    }
    if(rec2 != null)
    {
        rec2Size = getSize(rec2);
    }
    if(rec3 != null)
    {
        rec3Size = getSize(rec3);
    }
    if(rec4 != null)
    {
        rec4Size = getSize(rec4);
    }

    var free = new Array(rec1Size,rec2Size,rec3Size,rec4Size);
    var max = free.indexOf(Math.max.apply(Math, free));
    jsav.umsg("max = " + max)
    // if(inputVal <= max)
    // {
    //   fin = max;
    // }
    fin
    if(max == 0)
    {
        fin = freeRecs[0];
    }
    else if(max == 1)
    {
        fin = freeRecs[1];
    }
    else if(max == 2)
    {
        fin = freeRecs[2];
    }
    else if(max == 3)
    {
        fin = freeRecs[3];
        jsav.umsg("free rec 3 = " + freeRecs[3])
    }
    stepsToInsert(fin, size);
    //addRec(fin, size);
    finn = fin;
    sizee = size;
    jsav.umsg("finn = " + fin)


}

function bestFit(inputVal)
{
    var size = inputVal;
    var rec1Size;
    var rec2Size;
    var rec3Size;
    var rec4Size;
    var freeRecs = new Array(0, 0, 0, 0);
    var i = 0;
    var j = 0;
    for(i; i < recArraySize ; i++)
    {

        if(freeOrNot[i] == 1)
        {
          freeRecs[j] = i;
          j++;
        }

    }

   // jsav.umsg("free0 = " + freeRecs[0])
    var rec1 = freeRecs[0];
    var rec2 = freeRecs[1];
    var rec3 = freeRecs[2];
    var rec4 = freeRecs[3];

    //jsav.umsg("rec2 = " + rec2)

    var fin;

    if(rec1 != null)
    {
        rec1Size = getSize(rec1);
    }
    if(rec2 != null)
    {
        rec2Size = getSize(rec2);
    }
    if(rec3 != null)
    {
        rec3Size = getSize(rec3);
    }
    if(rec4 != null)
    {
        rec4Size = getSize(rec4);
   }

   var minArray = new Array(4);
   var arraySize = array.size();
   

   if(rec1Size >= size)
    {
        
        minArray[0] = rec1Size - size;
    }
      else
      {
        minArray[0] = 200;
      }
    if(rec2Size >= size)
    {
        
        minArray[1] = rec2Size - size;
        if(arraySize < 2)
        {
          minArray[1] = 200;
        }
    }
     else
      {
        minArray[1] = 200;
      }
    if(rec3Size >= size)
    {
        
        minArray[2] = rec3Size - size;
        if(arraySize < 3)
        {
          minArray[2] = 200;
        }
    }
     else
      {
        minArray[2] = 200;
      }
    if(rec4Size >= size)
    {

        minArray[3] = rec4Size - size;
        if(arraySize < 4)
        {
          minArray[3] = 200;
        }
    }
     else
      {
        minArray[3] = 200;
      }
      jsav.umsg("min 2 = " + minArray[2])
    //jsav.umsg("minArray[3] = " + minArray[3])

    var min = minArray.indexOf(Math.min.apply(Math, minArray));
    if (min == 200)
     {
        fin = 30;
     }
    jsav.umsg("min = " + min)
    if(min == 0)
    {
        min = rec1Size;
        jsav.umsg("min in else 0 = " + min)
    }
    else if(min == 1)
    {
      min = rec2Size;
      jsav.umsg("min in else 1 = " + min)
    }
    else if(min == 2)
    {
      min = rec3Size;
      jsav.umsg("min in else 2 = " + min)
    }
    else if(min == 3)
    {
      min = rec4Size;
      jsav.umsg("min in else 3 = " + min)
    }

    var i = 0;
    for(i; i< recArraySize; i++)
    {
      if(getSize(i) == min && freeOrNot[i] == 1)
      {
        fin = i;
        break;
      }
    }

jsav.umsg("fin = " + fin)
finn = fin;
sizee = size*2.5;
stepsToInsert(fin, size);



}

function circularFit(inputVal)
{
    //index = 0;
    var size = inputVal;
    var rec1Size;
    var rec2Size;
    var rec3Size;
    var rec4Size;
    var freeFin;
    var freeRecs = new Array(0, 0, 0, 0);
    var i = 0;
    var j = 0;
    var startIndex = index;
    for(i; i < recArraySize ; i++)
    {

        if(freeOrNot[i] == 1)
        {
          freeRecs[j] = i;
          j++;
        }

    }

   jsav.umsg("free0 = " + freeRecs[0])
    var rec1 = freeRecs[0];
    var rec2 = freeRecs[1];
    var rec3 = freeRecs[2];
    var rec4 = freeRecs[3];
    var fin;
    
    var arrSize = array.size();
    if(arrSize == 3)
    {
        freeRecs[3] = 0;
    }
    else if(arrSize == 2)
    {
      freeRecs[3] = 0;
      freeRecs[2] = 0;
    }
    else if(arrSize == 1)
    {
      freeRecs[3] = 0;
      freeRecs[2] = 0;
      freeRecs[1] = 0;
    }
    jsav.umsg("free3 = " + freeRecs[3])
    jsav.umsg("array size = " + arrSize)
    if(index == arrSize)
    {
      index = 0;
    }

    for(index; index < arrSize; i++)
    {
      if(size <= getSize(freeRecs[index]) && getSize(freeRecs[index]) != 0)
      {

          freeFin = index;
          break;
      }
      else
      {
        index++;
      }  
      if(index == arrSize)
      {
        index = 0;
      }
      if(index == startIndex)
      {
        fin = 30;
        break;
      }

  }

  jsav.umsg("index = " + index)


  var rec = getSize(freeRecs[index]);


  if(fin != 30)
  {
    if(freeOrNot[0] == 1)
    {
      fin = 2*index;
    }
    else
    {
      fin = 2* index;
      fin = fin + 1;
    }
    
    // var i = 0;
    // for(i = index; i < recArraySize; i++)
    // {
    //   if(getSize(i) == rec && freeOrNot[i] == 1)
    //   {
    //     fin = i;
    //     break;
    //   }

    // }
  }

  //size = getSize(i);
  finn = fin;
  size = inputVal *2.5;
  sizee = size;
  //jsav.umsg("index is " + index)
  var finish = index;
  circleFitInsert(fin, size, finish);
  

}

function circleFitInsert(fin, size, index)
  {
      var arrSize = array.size();
    
      if(startIndex >= arrSize)
      {
        jsav.umsg("bad news")
        startIndex = 0;
      }
      var i = 0;
      var j = 0;
      var tooBig = fin;
      //startIndex = 0;
      jsav.umsg("fin = " + fin)
      jsav.umsg("size = " + size)
      jsav.umsg("index = " + index)
      jsav.umsg("start index = " + startIndex)


      if(startIndex == index && tooBig != 30 && insert == 0)
      {
        insert = 1;
        if(startIndex != 0)
        {
          array.unhighlight(startIndex -1);
        }
        else if(startIndex == 0)
        {
          array.unhighlight(3);
        }
        
        array.highlight(startIndex);
        
      }
      else if(insert == 1)
      {
        jsav.umsg("Free List Block " + "size " + size)
        jsav.umsg("We have a fit")
        addRec(finn, sizee);
        ins = 0;
        insert = 0;
      }
      else if(startIndex == index && tooBig == 30)
      {
          array.unhighlight(startIndex -1);
          array.highlight(startIndex);
          jsav.umsg("Your allocation is too big  deallocate and try again")
      }
      else if(startIndex != index)
      {
          var size = array.value(startIndex);
          jsav.umsg("Free List Block " + "size " + size)
          jsav.umsg("start index in else if " + startIndex)
          array.unhighlight(startIndex -1);
          array.highlight(startIndex);
          //jsav.umsg("here")
          startIndex++;
          if(startIndex == 4)
          {
            startIndex = 0;
          }

      }
    

      
  }

//   function circularFit(inputVal) {

//     var max = Math.max.apply(Math, freeArray);
//     jsav.umsg("max: " + max)
//     rectNumber = current;
//     var i;
//     for(i = 0; i < 4; i++)
//     {
//           linesArray[i].css({"stroke-width": 1});
//         freeListArray[i].css({"fill": "lightgrey"});
//     }
//   if(fit != 1)
//   {
//     if(inputVal <= 45)
//     {
//         linesArray[rectNumber].css({"stroke-width": 3});
//         freeListArray[rectNumber].css({"fill": "yellow"});
//     }
//     else if(inputVal > 45)
//     {

//         linesArray[rectNumber].css({"stroke-width": 3});
//         freeListArray[rectNumber].css({"fill": "yellow"});
//         nextCount++;
//         current++;
//         if(nextCount == 4)
//         {
//           freeListArray[rectNumber].css({"fill": "red"});
//           jsav.umsg("The value you have entered can not be allocated")
//           jsav.umsg("Please enter a smaller value")
//           $('#next').attr("disabled", "disabled");

//         }
//     }
//     if(inputVal <= freeArray[rectNumber])
//     {
//       fit = 1;
//     }
//     else if(inputVal > freeArray[rectNumber] && inputVal <= 45) 
//     {
          
//           current++;
//     }
    
//   }
//   else if(fit == 1)
//   {
//     insertIntoBlock(inputVal);
//     fit = 0;
//   }
//   if (current == 4)
//   {
//     current = 0;
//   }
    

// }

  // function bestFit(inputVal) {

  //   var max = Math.max.apply(Math, freeArray);
  //   var minValue = Math.min.apply(Math, freeArray);
  //   jsav.umsg(minValue)
  //   var dist0 = freeArray[0] - inputVal;
  //   var dist1 = freeArray[1] - inputVal;
  //   var dist2 = freeArray[2] - inputVal;
  //   var dist3 = freeArray[3] - inputVal;

  //   var distArray = new Array(dist0, dist1, dist2, dist3);
  //   var i = 0;
  //   for(i =0; i < 4; i++)
  //   {
  //     if( distArray[i] < 0)
  //     {
  //       distArray[i] = 100;
  //     }
  //   }



  //   var best = Math.min.apply(Math, distArray);
  //   var bestBlock;
  //   //var count = 0;

  //   if(best == dist0)
  //   {
  //     bestBlock = 0;
  //   }
  //    else if(best == dist1)
  //   {
  //      bestBlock = 1;
  //   }
  //    else if(best == dist2)
  //   {
  //      bestBlock = 2;
  //   }
  //    else if(best == dist3)
  //   {
  //      bestBlock = 3;
  //   }
  //   else
  //   {
  //     bestBlock = 4;
  //   }

  //   if(rectNumber != 0)
  //   {
  //     linesArray[rectNumber - 1].css({"stroke-width": 1});
  //       freeListArray[rectNumber - 1].css({"fill": "lightgrey"});
  //   }
  //   if(inputVal > max)
  //   {
  //       linesArray[rectNumber].css({"stroke-width": 3});
  //       freeListArray[rectNumber].css({"fill": "yellow"});
  //   }
  //   if(inputVal > max && rectNumber == 3)
  //   {
  //         freeListArray[rectNumber].css({"fill": "red"});
  //         jsav.umsg("The value you have entered can not be allocated")
  //         jsav.umsg("Please enter a smaller value")
  //         $('#next').attr("disabled", "disabled");
  //   }
  //    else if(bestBlock > rectNumber)
  //   {
  //       linesArray[rectNumber].css({"stroke-width": 3});
  //       freeListArray[rectNumber].css({"fill": "yellow"});
  //       //rectNumber++;

  //   }
  //   else if(bestBlock == rectNumber)
  //   {   
  //       jsav.umsg("Best Block found")
  //       jsav.umsg("Best Block is Block  " + bestBlock)
  //       linesArray[rectNumber].css({"stroke-width": 3});
  //       freeListArray[rectNumber].css({"fill": "yellow"});
        

  //   }
  //   else if(rectNumber > bestBlock)
  //   {
  //     rectNumber--;
  //     insertIntoBlock(inputVal);
  //   }

    
  // }

  // function worstFit(inputVal) {
  //   var max = Math.max.apply(Math, freeArray);
  //   if(inputVal <= max)
  //   {
  //     if(nextCount == 0) {
  //     var maxValue = Math.max.apply(Math, freeArray);
  //      rectNumber = freeArray.indexOf(maxValue);


  //       linesArray[rectNumber].css({"stroke-width": 3});
  //       freeListArray[rectNumber].css({"fill": "yellow"});
      
  //       if (inputVal <= maxValue) {
  //         nextCount = 2;
  //       } else {
  //         jsav.umsg("Value entered is too large for the Memory Pool.");
  //         $('#next').attr("disabled", "disabled");
  //       }
  //     } else if(nextCount == 2) {
  //         insertIntoBlock(inputVal);
  //     }
  //   }
  //   else
  //   {

  //       var i;
        
  //       for(i = 0; i < 3; i++)
  //       {
  //          linesArray[i].css({"stroke-width": 1});
  //          freeListArray[i].css({"fill": "lightgrey"});
  //       }

  //          linesArray[current].css({"stroke-width": 3});
  //          freeListArray[current].css({"fill": "yellow"});
  //          current++;



  //       // for(i = 0; i < 3; i++)
  //       // {
  //       //   linesArray[i].css({"stroke-width": 1});
  //       //   freeListArray[i].css({"fill": "lightgrey"});
  //       // }
  //       // linesArray[rectNumber].css({"stroke-width": 3});
  //       // freeListArray[rectNumber].css({"fill": "yellow"});
  //       // //rectNumber++;
  //       if(current == 4)
  //       {
  //         //linesArray[rectNumber].css({"stroke-width": 3});
  //         freeListArray[i].css({"fill": "red"});
  //          jsav.umsg("The value you have entered can not be allocated")
  //         jsav.umsg("Please enter a smaller value")
  //         $('#next').attr("disabled", "disabled");
  //       }
      
  //   }

  // }

 
 
 
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
      // for(i = 0; i < 4; i++)
      // {
      // linesArray[i].css({"stroke-width": 1});
      // freeListArray[i].css({"fill": "lightgrey"});
      // }
      nextCount = 0;
      rectNumber = 0;
      var inputVal = $("#input").val();
      if (inputVal < 1 || inputVal > 201 || isNaN(inputVal)) {
        jsav.umsg("Please enter a number in the range of 1-200");
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
      jsav.umsg("ins = " + ins)

      switch ($("#fitAlgorithm").val()) {
        case '0':  // No function chosen
          reset();
          break;
        case '1':
          if(ins == 0)
          {  
           
            firstFit(inputValue);
            ins = 1;
          }
          else{
              stepsToInsert(finn, sizee);
          }
          break;
        case '2':
        if(ins == 0)
          {  
           
            circularFit(inputValue);
            ins = 1;
          }
          else{
            circleFitInsert(finn, sizee, index);
              
          }
         break;
          
        case '3':
        if(ins == 0)
          {  
           
            bestFit(inputValue);
            ins = 1;
          }
          else{
              stepsToInsert(finn, sizee);
          }
          break;
        case '4':
        if(ins == 0)
          {  
            jsav.umsg("here")
            worstFit(inputValue);
            ins = 1;
          }
          else{
              stepsToInsert(finn, sizee);
          }
          
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
