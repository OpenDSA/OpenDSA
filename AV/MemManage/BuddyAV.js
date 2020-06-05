$(document).ready(function() {
  "use strict";
  var jsav,              // JSAV
      defCtrlState,   // Stores the default state of the controls
      submitRec = null,      //the rectangle that's created when the user hits submit
      requestedBlockLabel = null,
      recArraySize,
      freeOrNot,
      startArray,
      freeAmountLabel,
      freeNum,
      usedAmountLabel,
      usedNum,
      end = false,
      insert,
      finn,
      flag,
      prevClick,
      sizee,
      ins = 0,
      total,
      endOfBlock,
      rectX,
      rectY,
      rectHeight,
      insRec,
      freeList2,
      freeList4,
      freeList8,
      freeList16,
      freeList32,
      freeList64,
      freeList128,
      freeList256,
      arrows;


  function setDefaultControlState() {
    defCtrlState = {};
    defCtrlState.fitAlgorithm = 0;

    var params = JSAV.utils.getQueryParameter();

    if (params.fitAlgorithm) {
      if ((params.fitAlgorithm > 0) && (params.fitAlgorithm <= 5)) {
        defCtrlState.fitAlgorithm = params.fitAlgorithm;
        // Disable so user can't change the value set by parameter
        $("#fitAlgorithm").attr("disabled", "disabled");
      } else {
        //console.error("Invalid URL parameter for fit method: " + params.fitAlgorithm);
      }
    }
  }


  function about() {
    alert("Buddy Algorithm Visualization\nWritten by Cliff Shaffer, Mauricio De La Barra, and Irena Shaffer\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://opendsa.org.\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Reset the visualization
  function reset() {
    //console.log("In reset");
    // Clear any existing messages and hash table data
    jsav.clearumsg();

    // Reset controls to their default state
    $("#fitAlgorithm").val(defCtrlState.fitAlgorithm);

    jsav.umsg("To allocate a block, enter a size and click submit");
    jsav.umsg("To deallocate a used block click on an allocated block of memory(a red block) and free it");
    enableAllButtons();

    //enable the input box
    $("#input").val("");

    originalMemBlock();

    $("#next").attr("disabled", "disabled");
    //console.log("When resetting, fitAlgorithm is: " + $("#fitAlgorithm").val());
    if ($("#fitAlgorithm").val() == 0) { // Doesn't work with ===
      $("#submit").attr("disabled", "disabled");
    }
  }

  //function that declares the original memory blocks
  //also declares 2 arrays that refrence the memory blocks
  //also declare a jsav array for the free array
  function originalMemBlock() {
    ins = 0;

    total = 256;
    rectX = 280;
    rectY = 130;
    rectHeight = 30;
    endOfBlock = total * 2 + rectX;

    freeOrNot = new Array(30);
    freeOrNot[0] = 1;
    freeOrNot[1] = 1;
    freeOrNot[2] = 1;
    freeOrNot[3] = 1;
    startArray = new Array(30);
    startArray[0] = rectX;
    startArray[1] = rectX + 128;
    startArray[2] = rectX + 256;
    startArray[3] = rectX + 256 + 128;
    startArray[4] = endOfBlock;

    jsav.g.rect(rectX, rectY, 128, rectHeight).css({fill: "cornflowerblue"});
    jsav.g.rect(startArray[1], rectY, 128, rectHeight).css({fill: "cornflowerblue"});
    jsav.g.rect(startArray[2], rectY, 128, rectHeight).css({fill: "cornflowerblue"});
    jsav.g.rect(startArray[3], rectY, 128, rectHeight).css({fill: "cornflowerblue"});

    //initaial size of the rec array
    recArraySize = 4;
    usedNum = 0;
    freeNum = 256;

    var i = 0;
    var arrayPos = 0;
    for (i; i < 4; i++) {
      var newInput = Math.floor(Math.random() * 6);
      if (newInput === 0) {
        split(arrayPos);
        split(arrayPos);
        split(arrayPos);
        freeOrNot[arrayPos] = 0;
        jsav.g.rect(startArray[arrayPos], rectY, 8 * 2, rectHeight).css({fill: "coral"});
        arrayPos = arrayPos + 4;
        usedNum = usedNum + 8;
        freeNum = freeNum - 8;
      } else if (newInput === 1 || newInput === 2) {
        split(arrayPos);
        split(arrayPos);
        freeOrNot[arrayPos] = 0;
        jsav.g.rect(startArray[arrayPos], rectY, 16 * 2, rectHeight).css({fill: "coral"});
        arrayPos = arrayPos + 3;
        usedNum = usedNum + 16;
        freeNum = freeNum - 16;
      } else if (newInput === 3 || newInput === 4) {
        split(arrayPos);
        freeOrNot[arrayPos] = 0;
        jsav.g.rect(startArray[arrayPos], rectY, 32 * 2, rectHeight).css({fill: "coral"});
        arrayPos = arrayPos + 2;
        usedNum = usedNum + 32;
        freeNum = freeNum - 32;
      } else {
        freeOrNot[arrayPos] = 0;
        jsav.g.rect(startArray[arrayPos], rectY, 64 * 2, rectHeight).css({fill: "coral"});
        arrayPos++;
        usedNum = usedNum + 64;
        freeNum = freeNum - 64;
      }
    }


    //2 rectangles at top of screen that show how much memory is used/remains
    jsav.g.rect(615, 20, 40, 30).css({fill: "coral"});
    jsav.g.rect(715, 20, 40, 30).css({fill: "cornflowerblue"});
    //labels the blocks at the top of the screen
    jsav.label("Used Space", {left:  600, top:  45});
    jsav.label("Free Space", {left:  700, top:  45});


    //label declaring how much is initially used
    usedAmountLabel = jsav.label(usedNum, {left:  625, top:  10});
    usedAmountLabel.css({"z-index": 500});

    //label declaring how much is initially free
    freeAmountLabel = jsav.label(freeNum, {left:  720, top:  10});
    freeAmountLabel.css({"z-index": 500});

    jsav.label("Block Size", {left: 260, top: 170});
    jsav.ds.array([2, 4, 8, 16, 32, 64, 128, 256], {layout: "vertical", left: 280, top: 200});
    //labels the free lists
    var freeListTop = 203;

    var spacing = 34;

    freeList2 = jsav.ds.list({top: freeListTop, left: 350, nodegap: 30});
    freeList2.layout({center: false});
    freeList4 = jsav.ds.list({top: freeListTop + spacing, left: 350, nodegap: 30});
    freeList4.layout({center: false});
    freeList8 = jsav.ds.list({top: freeListTop + spacing * 2, left: 350, nodegap: 30});
    freeList8.layout({center: false});
    freeList16 = jsav.ds.list({top: freeListTop + spacing * 3, left: 350, nodegap: 30});
    freeList16.layout({center: false});
    freeList32 = jsav.ds.list({top: freeListTop + spacing * 4, left: 350, nodegap: 30});
    freeList32.layout({center: false});
    freeList64 = jsav.ds.list({top: freeListTop + spacing * 5, left: 350, nodegap: 30});
    freeList64.layout({center: false});
    freeList128 = jsav.ds.list({top: freeListTop + spacing * 6, left: 350, nodegap: 30});
    freeList128.layout({center: false});
    freeList256 = jsav.ds.list({top: freeListTop + spacing * 7, left: 350, nodegap: 30});
    freeList256.layout({center: false});

    arrows = new Array(8);
    var j;
    for (j = 0; j < 8; j++) {
      // create initially hidden arrows from array indices to lists
      arrows[j] = jsav.g.line(315, freeListTop + j * spacing + 30, 350, freeListTop + j * spacing + 30,
                              {"arrow-end": "classic-wide-long", opacity: 0, "stroke-width": 2});
    }

    updateFreeLists();

    //click handler for used blocks
    $("rect").on("click", changeUsed);

    //global var set to 0, used when inserting
    insert = 0;
  }

  //function that divides a free block into two smaller free blocks
  function split(pos) {
    var freeTemp = new Array(recArraySize + 1);
    var i;
    for (i = 0; i <= pos; i++) {
      freeTemp[i] = freeOrNot[i];
    }
    freeTemp[pos + 1] = 1;
    for (i = pos + 2; i < recArraySize + 1; i++) {
      freeTemp[i] = freeOrNot[i - 1];
    }
    freeOrNot = freeTemp;
    var startTemp = new Array(recArraySize + 2);
    for (i = 0; i <= pos; i++) {
      startTemp[i] = startArray[i];
    }
    startTemp[pos + 1] = startArray[pos] + Math.floor((startArray[pos + 1] - startArray[pos]) / 2);
    for (i = pos + 2; i < recArraySize + 2; i++) {
      startTemp[i] = startArray[i - 1];
    }
    startArray = startTemp;
    recArraySize++;
    jsav.g.rect(startArray[pos], rectY, startArray[pos + 1] - startArray[pos], rectHeight).css({fill: "cornflowerblue"});
  }

  //function makes the rec that appears on your screen right after hitting submit
  function newRec(sizeX) {
    var block = 0;
    if (sizeX > 256) {
      block = 0;
    } else if (sizeX > 128) {
      block = 256;
    } else if (sizeX > 64) {
      block = 128;
    } else if (sizeX > 32) {
      block = 64;
    } else if (sizeX > 16) {
      block = 32;
    } else if (sizeX > 8) {
      block = 16;
    } else if (sizeX > 4) {
      block = 8;
    } else if (sizeX > 2) {
      block = 4;
    } else {
      block = 2;
    }
    submitRec = jsav.g.rect(rectX, 90, block * 2, 30).css({fill: "cyan"});
    requestedBlockLabel = jsav.label("Requested Block", {left: 290, top: 40}).css({"font-weight": "bold"});
    return block;
  }

  //function that utilizes the click handler
  //use of flags because after multiple rectangles are added and merged
  //multiple click handlers can be on the same spot
  //flag system works by not allowing two back to back
  //clicks on the same spot unless a rec is inserted between
  function changeUsed(myEvent) {
    //console.log("this: " + this + ", event: " + myEvent);
    this.setAttribute("fill", "cornflowerblue");
    var click = myEvent.pageX;
    var i = 0;
    //subtract 23 because of html and jsav difference
    var clickSpot = click - 23;


    while (clickSpot > startArray[i]) {
      i++;
    }
    i--;

    if (flag === 1) {
      if (clickSpot !== prevClick) {
        merge(click);
      }
    } else {
      merge(click);

      flag = 1;
    }

    prevClick = clickSpot;
  }

  function enableAllButtons() {
    $("#input").removeAttr("disabled");
    $("#submit").removeAttr("disabled");
    $("#next").removeAttr("disabled");
  }

  //function merges rectangles when a used one is deallocated
  function merge(clickSpot) {
    //subtract 23 because of html and jsav difference
    var click = clickSpot - 15;

    var i = 0;
    //loop - 1 gets the clickspot
    while (click > startArray[i]) {
      i++;
    }
    i--;
    //calculating size of block
    var diff = startArray[i + 1] - startArray[i];
    var side = Math.floor((click - rectX) / diff) % 2;
    var newRect;
    if (side === 0) {
      //calculating size of block to right of clicked block
      var rightDiff = startArray[i + 2] - startArray[i + 1];
      if (diff === rightDiff && freeOrNot[i + 1] === 1) {
        newRect = jsav.g.rect(startArray[i], rectY, diff * 2, 30).css({fill: "cornflowerblue"});
        newRect.css({"z-index": 500});
        recArraySize = recArraySize - 1;
        //all elements after i shift
        for (i; i < recArraySize; i++) {
          startArray[i + 1] = startArray[i + 2];
          freeOrNot[i] = freeOrNot[i + 1];
        }
        startArray[recArraySize + 1] = null;
        freeOrNot[recArraySize] = null;
        //setting all unused spots in the array to null to prevent miscalculation
        var n = recArraySize + 1;
        for (n; n < 30; n++) {
          startArray[n] = null;
        }
        if (end === true) {
          //startArray[recArraySize] = 780;
          if (recArraySize === 1) {
            startArray[recArraySize - 1] = 280;
          }
        }
        merge(clickSpot);
      } else {
        newRect = jsav.g.rect(startArray[i], rectY, diff, 30).css({fill: "cornflowerblue"});
        newRect.css({"z-index": 500});
        freeOrNot[i] = 1;
      }
    } else {
      //calculating size of block to left of clicked block
      var leftDiff = startArray[i] - startArray[i - 1];
      if (diff === leftDiff && freeOrNot[i - 1] === 1) {
        newRect = jsav.g.rect(startArray[i - 1], rectY, diff * 2, 30).css({fill: "cornflowerblue"});
        newRect.css({"z-index": 500});
        recArraySize = recArraySize - 1;
        //all elements after i shift
        for (i; i < recArraySize + 1; i++) {
          startArray[i] = startArray[i + 1];
          freeOrNot[i] = freeOrNot[i + 1];
        }
        startArray[recArraySize + 1] = null;
        freeOrNot[recArraySize] = null;
        //setting all unused spots in the array to null to prevent miscalculation
        var j = recArraySize + 1;
        for (j; j < 30; j++) {
          startArray[j] = null;
        }
        if (end === true) {
          //startArray[recArraySize] = 780;
          if (recArraySize === 1) {
            startArray[recArraySize - 1] = 280;
          }
        }
        merge(clickSpot);
      } else {
        newRect = jsav.g.rect(startArray[i], rectY, diff, 30).css({fill: "cornflowerblue"});
        newRect.css({"z-index": 500});
        freeOrNot[i] = 1;
      }
    }
    //note new recs are not given click handlers because they are free


    startArray[recArraySize + 1] = null;
    freeOrNot[recArraySize] = null;
    //setting all unused spots in the array to null to prevent miscalculation
    var k = recArraySize;
    for (k; k < 30; k++) {
      startArray[k] = null;
    }
    if (end === true) {
      //startArray[recArraySize] = 780;
      if (recArraySize === 1) {
        startArray[recArraySize - 1] = 280;
      }
    }
    //last elemnt in the start array + 1 is always end of block
    startArray[recArraySize] = endOfBlock;
    updateFreeLists();
    updateLabels();
  }

  //gets the size of a block, not the actual jsav size (jsav/2.5)
  function getSize(rect) {
    //var rec = rect -1;
    var size = startArray[rect + 1] - startArray[rect];
    size = size / 2;
    return size;
  }
  //updates labels of free num and used num
  function updateLabels() {
    usedAmountLabel.clear();
    freeAmountLabel.clear();

    var usedCount = 0;
    var i = 0;
    for (i; i < recArraySize; i++) {
      if (freeOrNot[i] === 0) {
        usedCount = usedCount + getSize(i);
      }
    }

    usedNum = usedCount;
    freeNum = total - usedCount;

    usedAmountLabel = jsav.label(usedNum, {left: 625, top: 10});
    usedAmountLabel.css({"z-index": 500});

    freeAmountLabel = jsav.label(freeNum, {left: 720, top: 10});
    freeAmountLabel.css({"z-index": 500});
  }

  //updates the freelists
  function updateFreeLists() {
    var freeListTop = 204;

    var spacing = 34;

    freeList2.clear();
    freeList4.clear();
    freeList8.clear();
    freeList16.clear();
    freeList32.clear();
    freeList64.clear();
    freeList128.clear();
    freeList256.clear();

    var j;
    for (j = 0; j < 8; j++) {
      arrows[j].hide();
    }

    freeList2 = jsav.ds.list({top: freeListTop, left: 350, nodegap: 30});
    freeList2.layout({center: false});
    freeList4 = jsav.ds.list({top: freeListTop + spacing, left: 350, nodegap: 30});
    freeList4.layout({center: false});
    freeList8 = jsav.ds.list({top: freeListTop + spacing * 2, left: 350, nodegap: 30});
    freeList8.layout({center: false});
    freeList16 = jsav.ds.list({top: freeListTop + spacing * 3, left: 350, nodegap: 30});
    freeList16.layout({center: false});
    freeList32 = jsav.ds.list({top: freeListTop + spacing * 4, left: 350, nodegap: 30});
    freeList32.layout({center: false});
    freeList64 = jsav.ds.list({top: freeListTop + spacing * 5, left: 350, nodegap: 30});
    freeList64.layout({center: false});
    freeList128 = jsav.ds.list({top: freeListTop + spacing * 6, left: 350, nodegap: 30});
    freeList128.layout({center: false});
    freeList256 = jsav.ds.list({top: freeListTop + spacing * 7, left: 350, nodegap: 30});
    freeList256.layout({center: false});

    var i = 0;
    for (i; i < recArraySize; i++) {
      if (freeOrNot[i] === 1) {
        var size = getSize(i);
        if (size === 2) {
          freeList2.addLast(i);
          freeList2.layout({center: false});
          if (freeList2.size() === 1) {
            arrows[0].show();
          }
        } else if (size === 4) {
          freeList4.addLast(i);
          freeList4.layout({center: false});
          if (freeList4.size() === 1) {
            arrows[1].show();
          }
        } else if (size === 8) {
          freeList8.addLast(i);
          freeList8.layout({center: false});
          if (freeList8.size() === 1) {
            arrows[2].show();
          }
        } else if (size === 16) {
          freeList16.addLast(i);
          freeList16.layout({center: false});
          if (freeList16.size() === 1) {
            arrows[3].show();
          }
        } else if (size === 32) {
          freeList32.addLast(i);
          freeList32.layout({center: false});
          if (freeList32.size() === 1) {
            arrows[4].show();
          }
        } else if (size === 64) {
          freeList64.addLast(i);
          freeList64.layout({center: false});
          if (freeList64.size() === 1) {
            arrows[5].show();
          }
        } else if (size === 128) {
          freeList128.addLast(i);
          freeList128.layout({center: false});
          if (freeList128.size() === 1) {
            arrows[6].show();
          }
        } else {
          freeList256.addLast(i);
          freeList256.layout({center: false});
          if (freeList256.size() === 1) {
            arrows[7].show();
          }
        }
      }
    }
  }

  //method to show users how search for correct block works
  //the blocks new spot in the array and its size are passed in
  //used by all algos except circular fit
  function stepsToInsert(fin, size) {
    if (insert === 0) {
      if (fin > recArraySize) {
        jsav.umsg("No free space is large enough for your allocation. Submit a new size to allocate.");
        //next button disabled until next submit is pressed
        $("#next").attr("disabled", "disabled");
        //click handler for used blocks
        $("rect").on("click", changeUsed);
        ins = 0;
      } else {
        jsav.umsg("Find a free space that is the size of the requested block or larger.");
        insRec = jsav.g.rect(startArray[fin], rectY, getSize(fin) * 2, rectHeight, {"stroke-width": 3});
        insert++;
        ins = 1;
      }
    } else if (insert === 1) {
      if (getSize(fin) > size) {
        jsav.umsg("The free space is larger than the requested block so it is split in half until a block of the correct size is made.");
        insRec.hide();
        while (getSize(fin) > size) {
          split(fin);
        }
        insRec = jsav.g.rect(startArray[fin], rectY, getSize(fin) * 2, rectHeight, {"stroke-width": 3});
        updateFreeLists();
      }
      jsav.umsg("A free space of the correct size has been found. Click next to allocate.");
      insert++;
      ins = 1;
    } else if (insert === 2) {
      jsav.g.rect(startArray[fin], rectY, size * 2, rectHeight).css({fill: "coral"});
      freeOrNot[fin] = 0;
      updateFreeLists();
      updateLabels();
      insRec.hide();
      jsav.umsg("Enter another size to allocate and click submit.");
      insert = 0;
      $("#next").attr("disabled", "disabled");
      //click handler for used blocks
      $("rect").on("click", changeUsed);
      ins = 0;
    }
  }


  //algorithm for buddy method
  function buddy(inputVal) {
    var block = 0;
    if (inputVal > 256) {
      block = 0;
    } else if (inputVal > 128) {
      block = 256;
    } else if (inputVal > 64) {
      block = 128;
    } else if (inputVal > 32) {
      block = 64;
    } else if (inputVal > 16) {
      block = 32;
    } else if (inputVal > 8) {
      block = 16;
    } else if (inputVal > 4) {
      block = 8;
    } else if (inputVal > 2) {
      block = 4;
    } else {
      block = 2;
    }

    var fin;

    var blockSize = block * 2;
    var found = 0;
    while (found === 0) {
      var i = 0;
      while (found === 0 && i < recArraySize) {
        if ((freeOrNot[i] === 1) && (getSize(i) * 2 === blockSize)) {
          found = 1;
          fin = i;
        } else {
          i++;
        }
      }
      if (found === 0) {
        blockSize = blockSize * 2;
      }
      if (blockSize > 512) {
        fin = 50;
        found = 1;
      }
    }

    finn = fin;
    sizee = block;
    //calls method to insert block
    stepsToInsert(fin, block * 2);
  }



  $(document).ready(function() {
    jsav = new JSAV($(".avcontainer"));

    // If the user hits 'Enter' while the focus is on the textbox,
    // click 'Next' rather than refreshing the page
    $("#input").keypress(function(myEvent) {
      // Capture 'Enter' press
      if (myEvent.which === 13) {
        // Prevent 'Enter' from posting the form and refreshing the page
        myEvent.preventDefault();

        // If the user entered a value and inserting is allowed, trigger 'Next'
        if ($("#input").val() !== "" && !$("#next").attr("disabled")) {
          $("#next").click();
        }
      }
    });

    $("#submit").click(function() {
      var inputVal = $("#input").val();
      if (inputVal < 1 || inputVal > total || isNaN(inputVal)) {
        jsav.umsg("Please enter a number in the range of 1-" + total);
        $("#next").attr("disabled", "disabled");
      } else {
        jsav.umsg("The request has been scheduled.");
        jsav.umsg("Size Request: " + inputVal);

        var blockSize = newRec(inputVal);

        jsav.umsg("Block Size Request: " + blockSize);
        $("#submit").attr("disabled", "disabled");
        $("#next").removeAttr("disabled");
      }
    });

    $("#next").click(function() {
      submitRec.css({opacity: "0"});
      requestedBlockLabel.css({opacity: "0"});

      var inputValue = $("#input").val();

      //ins is used to force call to given function
      //then on remaining next calls steps to insert is called
      //console.log("Now fitalgorithm is: " + $("#fitAlgorithm").val());


      if (ins === 0) {
        buddy(inputValue);
      } else {
        stepsToInsert(finn, sizee);
      }


      $("#submit").removeAttr("disabled");
    });


    $("#reset").click(function() {
      freeAmountLabel.clear();
      usedAmountLabel.clear();
      freeList2.clear();
      freeList4.clear();
      freeList8.clear();
      freeList16.clear();
      freeList32.clear();
      freeList64.clear();
      freeList128.clear();
      freeList256.clear();
      var i = 0;
      for (i; i < 8; i++) {
        arrows[i].hide();
      }
      reset();


      if (submitRec !== null) {
        submitRec.css({opacity: "0"});
      }
      if (requestedBlockLabel !== null) {
        requestedBlockLabel.css({opacity: "0"});
      }
    });


    $("#about").click(about);

    $("#help").click(function() {
      window.open("hashAVHelp.html", "helpwindow");
    });

    var settings = new JSAV.utils.Settings($(".jsavsettings"));
    setDefaultControlState();
    reset();
  });
});
