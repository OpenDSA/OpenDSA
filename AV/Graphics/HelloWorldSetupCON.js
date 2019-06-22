/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "HelloWorldSetupCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudoHTML = av.code(code[0]);
  var pseudoJS = av.code(code[1]);
//   var arr;
//   var arr_values = [];
//   var topAlign = 60;
//   var leftAlign = 10;
//   var rectWidth = 230;
//   var rectHeight = 200;
//   var arraySize = 7;
//   var i;

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudoHTML.highlight("vertex_shader");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudoHTML.unhighlight("vertex_shader");
  pseudoHTML.highlight("fragment_shader");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"), {preserve: true});
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"), {preserve: true});
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
//   pseudoHTML.unhighlight("return");
//   pseudoJS.unhighlight("return");
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"), {preserve: true});
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  av.recorded();
});
