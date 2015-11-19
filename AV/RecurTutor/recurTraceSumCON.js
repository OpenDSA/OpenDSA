/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
$(document).ready(function () {
  "use strict";
  var theArray = [2, 4, 6];
  function setGreen(arr, index) {
    arr.css(index, {"background-color": "#00FF00" });
  };

  function setWhite(arr, index) {
    arr.css(index, {"background-color": "#fff" });
  };

  var av_name = "recurTraceSumCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;           
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg(interpret("av_c1"));

  var pseudo = av.code(code);
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c2"));
  var arr = av.ds.array(theArray, {indexed: true});
  av.step();

  // Slide 3
  av.umsg(interpret("av_c3"));
  pseudo.highlight(2);
  av.step();

  // Slide 4
  av.umsg(interpret("av_c4"));
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  av.step();

  // Slide 5
  av.umsg(interpret("av_c5"));
  pseudo.unhighlight(5);
  pseudo.highlight(1);
  av.step();

  // Slide 6
  av.umsg(interpret("av_c6"));
  av.step();

  // Slide 7
  av.umsg(interpret("av_c7"));
  pseudo.unhighlight(1);
  pseudo.highlight(5);
  av.step();

  // Slide 8
  av.umsg(interpret("av_c8"));
  pseudo.unhighlight(5);
  pseudo.highlight(1);
  av.step();

  // Slide 9
  av.umsg(interpret("av_c9"));
  pseudo.unhighlight(1);
  pseudo.highlight(5);
  av.step();

  // Slide 10
  av.umsg(interpret("av_c10"));
  pseudo.unhighlight(5);
  pseudo.highlight(3);
  av.step();

  // Slide 11
  av.umsg(interpret("av_c11"));
  pseudo.unhighlight(3);
  pseudo.highlight(5);
  setGreen(arr, 0);
  av.step();

  // Slide 12
  av.umsg(interpret("av_c12"));
  av.step();

  // Slide 13
  av.umsg(interpret("av_c13"));
  setWhite(arr,0);
  setGreen(arr, 1);
  av.step();

  // Slide 14
  av.umsg(interpret("av_c14"));
  setWhite(arr,1);
  setGreen(arr, 2);
  av.recorded();
});
