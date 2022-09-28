"use strict";

$(document).ready(function () {
  var av_name = "Try";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;  
  var jsav = new JSAV(av_name);

  var pseudo = jsav.code(code[0]);

  jsav.displayInit();

  jsav.umsg("Firsr Enter the Try block and execute inside")
  pseudo.setCurrentLine(1);
  jsav.step();

  jsav.umsg("Error X is not defined and it will go to Except block to handle error")
  pseudo.unhighlight(1);
  pseudo.setCurrentLine(2);
  jsav.step();

  jsav.umsg("Entered Except block and execute block ")
  pseudo.unhighlight(2);
  pseudo.setCurrentLine(3);
  jsav.step();
  jsav.umsg("print the statement in this block ")
  pseudo.unhighlight(3);
  pseudo.setCurrentLine(4);

  jsav.recorded();
});
