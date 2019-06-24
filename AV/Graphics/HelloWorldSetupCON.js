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
  pseudoHTML.unhighlight("fragment_shader");
  pseudoHTML.highlight("support_libs");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudoHTML.unhighlight("support_libs");
  pseudoHTML.highlight("JS_code_ref");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  pseudoHTML.unhighlight("JS_code_ref");
  pseudoHTML.highlight("gl_canvas");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  pseudoHTML.highlight("gl_canvas");
  pseudoJS.highlight("handle_to_canvas");
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudoHTML.unhighlight("gl_canvas");
  pseudoJS.unhighlight("handle_to_canvas");
  pseudoJS.highlight("vertices");
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
