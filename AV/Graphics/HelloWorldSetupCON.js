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
  pseudoJS.unhighlight("vertices");
  pseudoJS.highlight("clear_color");
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  pseudoJS.unhighlight("clear_color");
  pseudoJS.highlight("init_shaders");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  pseudoJS.unhighlight("init_shaders");
  pseudoJS.highlight("load_buffer");
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  pseudoJS.unhighlight("load_buffer");
  pseudoJS.highlight("connect_buffer_to_attribute");
  pseudoHTML.highlight("attribute");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  pseudoJS.unhighlight("connect_buffer_to_attribute");
  pseudoHTML.unhighlight("attribute");
  pseudoJS.highlight("call_render");
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  pseudoJS.unhighlight("call_render");
  pseudoJS.highlight("clear_canvas");
  av.step();

    
  // Last slide
  av.umsg(interpret("sc15"));
  pseudoJS.unhighlight("clear_canvas");
  pseudoJS.highlight("draw_square");
  av.recorded();
});

/*
	  "vertices": [9,10],
	  "clear_color": [12],
	  "init_shaders": [13,14,15],
	  "load_buffer": [16,17,18,19],
	  "connect_buffer_to_attribute": [20,21,22,23],
	  "call_render"; [25],
	  "clear_canvas": [29],
	  "draw_square": [30],
*/