/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Exchange Sort Lower Bound
$(document).ready(function() {
  "use strict";
  var av_name = "ExchangeSortCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var arr1, arr3, arr4;
  var leftAlign = 100;
  var topAlign = 0;
  var labelSet = [];

  // Slide 1
  av.umsg(interpret("Slide 1"));
  av.displayInit();

  //Slide 2
  av.umsg(interpret("Slide 2"));
  arr1 = av.ds.array(["$x_1$", "$x_2$", "$x_3$", "...", "$x_{n-1}$", "$x_n$"], {left: leftAlign, top: topAlign, indexed: false});
  labelSet.push(av.label("$L$", {left: leftAlign + 75, top: topAlign + 40}).addClass("largeLabel"));
  av.step();

  //Slide 3
  av.umsg(interpret("Slide 3"));
  av.ds.array(["$x_n$", "$x_{n-1}$", "...", "$x_3$", "$x_2$", "$x_1$"], {left: leftAlign + 250, top: topAlign, indexed: false});
  labelSet.push(av.label("$L_R$", {left: leftAlign + 325, top: topAlign + 40}).addClass("largeLabel"));
  av.step();

  //Slide 4
  av.umsg(interpret("Slide 4"));
  arr3 = av.ds.array([3, 4, 1, 2], {left: leftAlign + 25, top: topAlign + 100, indexed: false});
  arr4 = av.ds.array([2, 1, 4, 3], {left: leftAlign + 275, top: topAlign + 100, indexed: false});
  av.step();

  //Slide 5
  av.umsg(interpret("Slide 5"));
  arr1.highlight();
  av.step();

  //Slide 6
  av.umsg(interpret("Slide 6"), {preserve: true});
  arr1.unhighlight();
  arr3.highlight([0, 1]);
  av.step();

  //Slide 7
  arr3.highlight(2);
  arr3.unhighlight(1);
  av.step();

  //Slide 8
  arr3.highlight(3);
  arr3.unhighlight(2);
  av.step();

  //Slide 9
  arr3.highlight([1, 2]);
  arr3.unhighlight([0, 3]);
  av.step();

  //Slide 10
  arr3.highlight(3);
  arr3.unhighlight(2);
  av.step();

  //Slide 11
  arr3.highlight(2);
  arr3.unhighlight(1);
  av.step();

  //Slide 12
  av.umsg(interpret("Slide 12"));
  arr3.unhighlight();
  av.step();

  //Slide 13
  av.umsg(interpret("Slide 13"), {preserve: true});
  arr3.highlight([0, 1]);
  arr4.highlight([2, 3]);
  av.step();

  //Slide 14
  av.umsg(interpret("Slide 14"));
  arr3.unhighlight();
  arr4.unhighlight();
  av.step();

  //Slide 15
  av.umsg(interpret("Slide 15"));
  av.step();

  //Slide 16
  av.umsg(interpret("Slide 16"));
  av.step();

  av.recorded();
});
