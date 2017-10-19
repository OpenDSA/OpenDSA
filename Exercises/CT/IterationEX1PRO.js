/*
    global JSAV, window
    Written by Jieun Chon and Cliff Shaffer
*/

(function() {
  "use strict";

  var av, // The JSAV object
      nullNode1, // Used to trace the node pointed by a pointer pointing null.
      nullNode2,
      nullNode3,
      selected_pointer;

  var iterationEX1PRO = {
    userInput: null, // Boolean: Tells us if user ever did anything


      // Reinitialize the exercise.
    reset: function() {
      // Reset the value of global variables.
      iterationEX1PRO.userInput = false;
      selected_pointer = null;

      // Clear the old JSAV canvas.
      if ($("#IterationEX1PRO")) { $("#IterationEX1PRO").empty(); }

      // Set up the display
      av = new JSAV("IterationEX1PRO");

      // // Given code
      // var codes = [];
      // codes[0] = "int[] array = {1, 2, 3, 4, 5};";
      // codes[1] = "int total = 0;"
      // codes[2] = "for(int i = 0; i < array.length; i+=){";
      // codes[3] = "  int price = array[i];"
      // codes[4] = "  total = total + price;"
      // codes[5] = "};"
      // av.code(codes);


      var arrValues = [4, 13, 6, 9, 11];
      // var av_name = "iteration3CON";
      // var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
      // var av = new JSAV(av_name);
      var leftMargin = 200,
          topMargin = 0,
          rect_left = leftMargin - 150,
          rect0_top = topMargin + 0,
          rect_top = topMargin + 40,
          topMargin = rect_top + 20;

      var nodegap = 40;


      // blue boxes, floor 1
      var topblue = av.g.rect(rect_left, rect0_top, 280, 35, 10).addClass("bluebox");
      var botblue = av.g.rect(rect_left, rect0_top + 295, 280, 35, 10).addClass("bluebox");

      // floor 2
      av.g.rect(rect_left, rect_top, 250, 35, 10).addClass("box");
      av.g.rect(rect_left, rect_top + 20, 50, 15).addClass("box"); // for no-roung on the corner

      //floor 3 and the JSAV array contains arrValues
      av.g.rect(rect_left, rect_top + 25, 30, 60, 10).addClass("box").css({opacity: 0.9});
      av.g.rect(rect_left + 73, rect_top + 25, 30, 60, 10).addClass("box").css({opacity: 0.9});
      var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});

      //floor 4, long purple
      av.g.rect(rect_left, rect_top + 76, 300, 30, 10).addClass("box");

      //floor 5, left big purple box
      av.g.rect(rect_left, rect_top + 80, 110, 170, 10).addClass("box");
      av.g.rect(rect_left, rect_top + 76, 50, 15).addClass("box");

      //mid blue/calculate boxes ( and "set total = ..." blue box )
      var midblue1 = av.g.rect(rect_left + 130, rect_top + 120, 130, 66, 10).addClass("bluebox");
      var midblue2 = av.g.rect(rect_left + 220, rect_top + 139, 20, 32, 15).addClass("calbox");
      var midblue3 = av.g.rect(rect_left + 240, rect_top + 120, 120, 66, 10).addClass("calbox");

      // last purple floor
      av.g.rect(rect_left + 90, rect_top + 200, 240, 50, 10).addClass("box");

      // ------------------ labels ------------------------

        var initlabel = av.label("set total = 0", {left: rect_left + 5, top: rect_top - 65});
        initlabel.addClass("labels").addClass("midlabel");

        var label1 = av.label("for each item", {left: rect_left + 5, top: rect_top - 30});
        label1.addClass("labels");

        var label2 = av.label("price", {left: rect_left + 19, top: rect_top + 45});
        label2.addClass("labels");

        var label3 = av.label("do", {left: rect_left + 35, top: rect_top + 100});
        label3.addClass("labels");

        var pricelabel = av.label("set total = total + price", {left: rect_left + 140, top: rect_top + 117});
        pricelabel.addClass("labels");
        pricelabel.addClass("smalllabel");

        var valuelabel = av.label("", {left: rect_left + 390, top: rect_top + 111});
        valuelabel.addClass("labels");
        valuelabel.addClass("valuelabel");


        // <<--------------- STATE BOX ----------------->>

        var stateX = 500;
        var stateY = - 20;
        var stateLabel = av.label("STATE", {left: stateX, top: stateY});
        stateLabel.addClass("statelabel");

        var stateBox = av.g.rect(stateX - 25, stateY + 50, 110, 280).addClass("statebox");

        // price box and label
        av.label("PRICE", {left: stateX + 5, top: stateY + 65});
        stateLabel.addClass("statelabel");

        var priceBox = av.g.rect(stateX - 5, stateY + 105, 70, 70).addClass("bluebox");

        var priceBoxLabel = av.label("", {left: stateX + 23, top: stateY + 100});
        priceBoxLabel.addClass("labels");
        priceBoxLabel.addClass("midlabel");

        // total box and label
        av.label("TOTAL", {left: stateX + 5, top: stateY + 180});
        stateLabel.addClass("statelabel");

        var totalBox = av.g.rect(stateX - 5, stateY + 220, 70, 70).addClass("bluebox");
        var totalBoxLabel = av.label("", {left: stateX + 23, top: stateY + 215});

        totalBoxLabel.addClass("labels");
        totalBoxLabel.addClass("midlabel");


      av.displayInit();
      av.recorded();

    },

    // Initialise the exercise
    initJSAV: function(array_size, pos) {
      iterationEX1PRO.reset();

      // Set up handler for reset button
      $("#reset").click(function() {
        iterationEX1PRO.reset();
      });


    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      return true;
    },
  };

  window.iterationEX1PRO = window.iterationEX1PRO || iterationEX1PRO;
}());
