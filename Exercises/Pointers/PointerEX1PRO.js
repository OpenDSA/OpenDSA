/*global window, katex */
(function() {
  "use strict";
  var av,               // The JSAV object
      employee = [],
      selected_pointer;

  // These are things that need to be accessed from the HTML file
  var pointerEX1PRO = {
    userInput: null,      // Boolean: Tells us if user ever did anything

    // Initialise the exercise
    initJSAV: function() {
      reset();

      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
    },

    // Check student's answer for correctness: User's array must match answer
    checkAnswer: function() {
      return true;
    }
  };

  // reset function definition
  function reset() {
    // Clear the old JSAV canvas.
    if ($("#PointerEX1PRO")) { $("#PointerEX1PRO").empty(); }

    // Set up the display
    av = new JSAV("PointerEX1PRO");
    var width = 75;
    var height = 100;
    var xStart1 = 50;
    var xStart2 = xStart1 + 50 + width;
    var xStart3 = xStart2 + 50 + width;
    var yStart = 20;

    //create boxes
    var nullBox = av.ds.array([""], {top: yStart, left:xStart1});
    av.label("NULL", {top: yStart + 30, left: xStart1 + 5 }).addClass("boxlabels");

    var johnBox = av.ds.array([""], {top: yStart, left:xStart2});
    av.label("John", {top: yStart + 10, left: xStart2 + 10 }).addClass("boxlabels");
    av.label("1000", {top: yStart + 50, left: xStart2+ 10 }).addClass("boxlabels");

    var samBox = av.ds.array([""], {top: yStart, left:xStart3});
    av.label("Sam", {top: yStart + 10, left: xStart3 + 10 }).addClass("boxlabels");
    av.label("2000", {top: yStart + 50, left: xStart3 + 10 }).addClass("boxlabels");


    //create pointers
    var empP = av.pointer("", nullBox.index(0), {top: 30, anchor: "center bottom", myAnchor: "center top",
                    arrowAnchor: "center bottom"}).addClass("boxpointers");
    av.label("empRef", {top: yStart + height + 40, left: xStart1 + 5 }).addClass("boxlabels");

    var johnP = av.pointer("", johnBox.index(0), {top: 30, anchor: "center bottom", myAnchor: "center top",
                    arrowAnchor: "center bottom"}).addClass("boxpointers");
    av.label("johnRef", {top: yStart + height + 40, left: xStart2 + 5 }).addClass("boxlabels");

    var samP = av.pointer("", samBox.index(0), {top: 30, anchor: "center bottom", myAnchor: "center top",
                    arrowAnchor: "center bottom"}).addClass("boxpointers");
    av.label("samRef", {top: yStart + height + 40, left: xStart3 + 10 }).addClass("boxlabels");


    av.displayInit();
    av.recorded();

  }

  window.pointerEX1PRO = window.pointerEX1PRO || pointerEX1PRO;
}());
