/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Radix Sort Analysis
$(document).ready(function() {
  "use strict";
  var av_name = "RadixSortAnalysisCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]).hide();
  var arr;
  var count, out;
  var arr_values = [];
  var i;

  // Slide 1
  av.umsg(interpret("Slide 1"));
  for (i = 0; i < 12; i++) {
    arr_values[i] = parseInt(Math.random() * 100 + 1, 10);
  }
  arr = av.ds.array(arr_values, {left: 10, top: 10, indexed: true});
  av.g.line(20, 10, 175, 10,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(20, -20, 20, 20);
  av.label("$n$", {top: "-20px", left: "183px"}).addClass("mediumLabel");
  av.g.line(200, 10, 355, 10,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(355, -20, 355, 20);
  av.displayInit();

  // Slide 2
  pseudo.show();
  av.umsg(interpret("Slide 2"));
  pseudo.highlight("loop1");
  av.step();

  // Slide 3
  av.umsg(interpret("Slide 3"));
  pseudo.unhighlight("loop1");
  pseudo.highlight("loop2");
  arr_values = [];
  for (i = 0; i < 10; i++) {
    arr_values[i] = 0;
  }
  count = av.ds.array(arr_values, {left: 10, top: 120, indexed: true});
  av.g.line(20, 120, 145, 120,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(20, 110, 20, 130);
  av.label("$r$", {top: "90px", left: "155px"}).addClass("mediumLabel");
  av.g.line(170, 120, 300, 120,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(300, 110, 300, 130);
  av.step();

  // Slide 4
  av.umsg(interpret("Slide 4"));
  pseudo.unhighlight("loop2");
  pseudo.highlight("loop3");
  for (i = 0; i < 12; i++) {
    count.value(arr.value(i) % 10, count.value(arr.value(i) % 10) + 1);
  }
  arr.highlight();
  av.step();

  // Slide 5
  av.umsg(interpret("Slide 5"));
  arr.unhighlight();
  count.highlight();
  pseudo.unhighlight("loop3");
  pseudo.highlight("loop4");
  count.value(0, count.value(0) - 1);
  for (i = 1; i < 10; i++) {
    count.value(i, count.value(i) + count.value(i - 1));
  }
  av.step();

  // Slide 6
  av.umsg(interpret("Slide 6"));
  count.unhighlight();
  pseudo.unhighlight("loop4");
  pseudo.highlight("loop5");
  arr_values = [];
  for (i = arr.size() - 1; i >= 0; i--) {
    arr_values[count.value(arr.value(i) % 10)] = arr.value(i);
    count.value(arr.value(i) % 10, count.value(arr.value(i) % 10) - 1);
  }
  out = av.ds.array(arr_values, {left: 10, top: 240, indexed: true});
  av.g.line(20, 240, 175, 240,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(20, 230, 20, 250);
  av.label("$n$", {top: "210px", left: "183px"}).addClass("mediumLabel");
  av.g.line(200, 240, 355, 240,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(355, 230, 355, 250);
  av.step();

  // Slide 7
  av.umsg(interpret("Slide 7"));
  pseudo.unhighlight("loop5");
  pseudo.highlight("loop6");
  for (i = 0; i < out.size(); i++) {
    arr.value(i, out.value(i));
    out.value(i, " ");
  }
  av.step();

  // Slide 8
  av.umsg(interpret("Slide 8"));
  pseudo.unhighlight("loop6");
  pseudo.highlight("loop1");

  //Repeat the steps again in a single slide
  for (i = 0; i < 10; i++) {
    count.value(i, 0);
  }
  for (i = 0; i < arr.size(); i++) {
    count.value(parseInt(arr.value(i) / 10, 10) % 10, count.value(parseInt(arr.value(i) / 10, 10) % 10) + 1);
    //console.log(count.value(arr.value(i) / 10 % 10));
  }
  count.value(0, count.value(0) - 1);
  for (i = 1; i < count.size(); i++) {
    count.value(i, count.value(i) + count.value(i - 1));
  }
  for (i = arr.size() - 1; i >= 0; i--) {
    out.value(count.value(parseInt(arr.value(i) / 10, 10) % 10), arr.value(i));
    count.value(parseInt(arr.value(i) / 10, 10) % 10, count.value(parseInt(arr.value(i) / 10, 10) % 10) - 1);
  }
  for (i = 0; i < out.size(); i++) {
    arr.value(i, out.value(i));
  }
  av.step();

  // Slide 9
  av.umsg(interpret("Slide 9"));
  pseudo.unhighlight("loop1");
  pseudo.highlight("loops");
  av.step();

  // Slide 10
  av.umsg(interpret("Slide 10"));
  av.step();

  // Slide 11
  av.umsg(interpret("Slide 11"));
  av.recorded();
});
