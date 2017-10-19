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
      // JSAV-List position.
      var leftMargin = 70,
          topMargin = 150;
      // Reset the value of global variables.
      iterationEX1PRO.userInput = false;
      selected_pointer = null;

      // Clear the old JSAV canvas.
      if ($("#IterationEX1PRO")) { $("#IterationEX1PRO").empty(); }

      // Set up the display
      av = new JSAV("IterationEX1PRO");

      // Given code
      var codes = [];
      codes[0] = "int[] array = {1, 2, 3, 4, 5};";
      codes[1] = "int total = 0;"
      codes[2] = "for(int i = 0; i < array.length; i+=){";
      codes[3] = "  int price = array[i];"
      codes[4] = "  total = total + price;"
      codes[5] = "};"
      av.code(codes);

      av.displayInit();
      av.recorded();

    },

    // Initialise the exercise
    initJSAV: function() {
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
