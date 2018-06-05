/*global JSAV, document */
// Written by Liling Yuan

$(document).ready(function() {
  "use strict";
  var av = new JSAV("ptrSwapCON");
  var av_name = "ptrSwapCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var ytop = 50;

  //first slide
  //av.label("A series of four records. The record with key value 42 comes before the record with key value 5.", {bottom: 183});
  av.umsg(interpret("description1"));
  for (var pos = ytop; pos < 145; pos += 30) {
    av.g.rect(250, pos, 30, 30);
    av.g.rect(315, pos + 5, 80, 20);
    av.g.line(265, pos + 15, 315, pos + 15,
              {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  }
  av.label("Key = 42", {left: 325, top: ytop - 10});
  av.label("Key = 5", {left: 325, top: ytop + 20});
  av.label("Key = 23", {left: 325, top: ytop + 50});
  av.label("Key = 10", {left: 325, top: ytop + 80});
  av.displayInit();

  //second slide
  av.umsg(interpret("description2"));
  av.step();


  //third slide
  av.umsg(interpret("description3"));
  for (var pos = ytop; pos < 145; pos += 30) {
    av.g.rect(470, pos, 30, 30);
    av.g.rect(535, pos + 5, 80, 20);
  }
  av.g.line(485, ytop + 15, 535, ytop + 45, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(485, ytop + 45, 535, ytop + 15, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(485, ytop + 75, 535, ytop + 75, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(485, ytop + 105, 535, ytop + 105, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.label("Key = 42", {left: 545, top: ytop - 10});
  av.label("Key = 5", {left: 545, top: ytop + 20});
  av.label("Key = 23", {left: 545, top: ytop + 50});
  av.label("Key = 10", {left: 545, top: ytop + 80});
  av.step();

  av.recorded();

});

