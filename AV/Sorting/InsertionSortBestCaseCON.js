/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Insertion Sort Best Case
$(document).ready(function() {
  "use strict";
  var av_name = "InsertionSortBestCaseCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]).hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  av.ds.array([1, 2, 3, 4, 5, 6], {left: 10, top: 150, indexed: true});
  av.step();

  // Slide3
  pseudo.show();
  av.umsg(interpret("sc3"));
  pseudo.highlight("loop2");
  av.step();

  // Slide4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight("loop2");
  pseudo.highlight("loop1");
  av.g.rect(320, 230, 50, 20);
  av.label("i=1",  {top: "240px", left: 330});
  av.g.rect(370, 230, 50, 20);
  av.label("i=2",  {top: "240px", left: "380px"});
  av.g.rect(420, 230, 50, 20);
  av.label("i=3",  {top: "240px", left: "430px"});
  av.g.rect(470, 230, 50, 20);
  av.label("i=4",  {top: "240px", left: "480px"});
  av.g.rect(520, 230, 50, 20);
  av.label("i=5",  {top: "240px", left: "530px"});
  av.label("|--------- $n-1$ ---------|",  {top: "250px", left: "350px"}).addClass("largeLabel");
  av.step();

  //Slide 5
  av.umsg(interpret("sc5"));
  av.recorded();
});
