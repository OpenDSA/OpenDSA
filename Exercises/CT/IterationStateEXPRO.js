/*
    global JSAV, window
    Written by Jieun Chon and Cliff Shaffer
*/

(function() {
  "use strict";

  var av, // The JSAV object
    priceAnswerBox,
    totalAnswerBox,
    priceAnswer,
    totalAnswer,
    position,
    array = [],
    priceBoxLabel,
    totalBoxLabel,
    clickedLabel,
    priceBox,
    totalBox,
    labelLeft;

  var iterationStateEXPRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    clickbox: function() {
      var newLabelLeft = labelLeft;
      if (this == priceBox || (this !== totalBox && this.className.indexOf("priceTag") !== -1)) {
        var price = prompt("Please enter the current price.", "0");
        if (price !== "") {
          priceBoxLabel.value(price);
          while (price >= 10) {
            newLabelLeft -= 5.5;
            price /= 10;
          }
          priceBoxLabel.css({
            left: newLabelLeft
          });
        }
      } else {
        var total = prompt("Please enter the current total.", "0");
        if (total !== "") {
          totalBoxLabel.value(total);
          while (total >= 10) {
            newLabelLeft -= 5;
            total /= 10;
          }
          totalBoxLabel.css({
            left: newLabelLeft
          });
        }
      }
    },

    // Reinitialize the exercise.
    reset: function() {
      var arraySize = Math.floor(Math.random() * 4) + 3;
      position = Math.floor(Math.random() * (arraySize - 2));

      // Reset the value of global variables.
      iterationStateEXPRO.userInput = false;

      // Clear the old JSAV canvas.
      if ($("#IterationStateEXPRO")) {
        $("#IterationStateEXPRO").empty();
      }

      // Set up the display
      av = new JSAV("IterationStateEXPRO");


      // --------------- Create random array ----------------
      priceAnswer = 0;
      totalAnswer = 0;
      for (var i = 0; i < arraySize; i++) { // Give random numbers in range 1..2
        array[i] = Math.floor(Math.random() * 10) + 1;
      }

      var prevPrice = 0;
      var prevTotal = 0;

      // Previous Price and the price answer
      priceAnswer = array[position];
      prevPrice = array[position];

      // Calculate Previous total and the total answre
      for (var i = 0; i <= position; i++) {
        if (i != position) {
          prevTotal += array[i];
        }
        totalAnswer += array[i];
      }

      // console.log(totalAnswer + " " + priceAnswer);

      var leftMargin = 240,
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

      //floor 3 and the JSAV array contains array
      av.g.rect(rect_left, rect_top + 25, 30, 60, 10).addClass("box").css({
        opacity: 0.3
      });
      av.g.rect(rect_left + 73, rect_top + 25, 30, 60, 10).addClass("box").css({
        opacity: 0.9
      });
      var arr = av.ds.array(array, {
        indexed: false,
        left: leftMargin,
        top: topMargin,
        position: "absolute"
      });

      //floor 4, long purple
      av.g.rect(rect_left, rect_top + 76, 300, 30, 10).addClass("box");

      //floor 5, left big purple box
      av.g.rect(rect_left, rect_top + 80, 110, 170, 10).addClass("box");
      av.g.rect(rect_left, rect_top + 76, 50, 15).addClass("box");

      //mid blue/calculate boxes ( and "set total = ..." blue box )
      var midblue1 = av.g.rect(rect_left + 130, rect_top + 120, 205, 66, 10).addClass(
        "bluebox");
      // var midblue2 = av.g.rect(rect_left + 220, rect_top + 139, 20, 32, 15).addClass("calbox");
      // var midblue3 = av.g.rect(rect_left + 235, rect_top + 120, 100, 66, 10).addClass("calbox");
      var outline = av.g.rect(rect_left + 130, rect_top + 120, 205, 66, 10).addClass(
        "yellowout");

      // last purple floor
      av.g.rect(rect_left + 90, rect_top + 200, 240, 50, 10).addClass("box");

      // ------------------ labels ------------------------

      var initlabel = av.label("set total = 0", {
        left: rect_left + 5,
        top: rect_top - 60
      });
      initlabel.addClass("labels").addClass("midlabel");

      var label1 = av.label("for each item", {
        left: rect_left + 5,
        top: rect_top - 20
      });
      label1.addClass("labels");

      var label2 = av.label("price", {
        left: rect_left + 22,
        top: rect_top + 55
      });
      label2.addClass("labels");

      var label3 = av.label("do", {
        left: rect_left + 35,
        top: rect_top + 120
      });
      label3.addClass("labels");

      var pricelabel = av.label("set total = total + price", {left: rect_left + 145, top: rect_top + 123});
      pricelabel.addClass("labels");
      pricelabel.addClass("smalllabel");

      // <<--------------- STATE BOX ----------------->>

      //Total and Price boxes' label x position.
      var stateX = 500;
      var stateY = -20;
      var stateLabel = av.label("STATE", {
        left: stateX,
        top: stateY
      });

      labelLeft = stateX + 25;

      stateLabel.addClass("statelabel");

      var stateBox = av.g.rect(stateX - 25, stateY + 50, 110, 280).addClass("statebox");


      // price box and label
      av.label("price", {
        left: stateX + 5,
        top: stateY + 55
      }).addClass("statelabellarge");;

      // total box and label
      av.label("total", {
        left: stateX + 5,
        top: stateY + 173
      }).addClass("statelabellarge");



      priceBox = av.g.rect(stateX - 5, stateY + 105, 70, 70).addClass("bluebox");
      priceBoxLabel = av.label(prevPrice, {
        left: labelLeft,
        top: stateY + 105
      });
      priceBoxLabel.addClass("labels");
      priceBoxLabel.addClass("midlabel");


      totalBox = av.g.rect(stateX - 5, stateY + 220, 70, 70).addClass("bluebox");
      totalBoxLabel = av.label(prevTotal, {
        left: labelLeft,
        top: stateY + 220
      });
      totalBoxLabel.addClass("labels");
      totalBoxLabel.addClass("midlabel");




      priceBox.click(iterationStateEXPRO.clickbox);
      totalBox.click(iterationStateEXPRO.clickbox);

      priceBoxLabel.element.click(iterationStateEXPRO.clickbox);
      totalBoxLabel.element.click(iterationStateEXPRO.clickbox);

      priceBoxLabel.element.addClass("priceTag");
      totalBoxLabel.element.addClass("totalTag");


      // --------------- Move array to the right position
      var nextleft = leftMargin - 120;
      var nodegap = 40;

      for (var i = 0; i < position; i++) {
        nextleft -= nodegap;
      }
      arr.css({
        left: nextleft
      });

      av.displayInit();
      av.recorded();

    },

    // Initialise the exercise
    initJSAV: function() {
      priceAnswerBox = document.getElementById('priceAnswerBox');
      totalAnswerBox = document.getElementById('totalAnswerBox');

      iterationStateEXPRO.reset();

      // Set up handler for reset button
      $("#reset").click(function() {
        iterationStateEXPRO.reset();
      });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      return priceBoxLabel.value() == priceAnswer && totalBoxLabel.value() == totalAnswer;
    },
  };

  window.iterationStateEXPRO = window.iterationStateEXPRO || iterationStateEXPRO;
}());
