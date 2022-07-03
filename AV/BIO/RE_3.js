"use strict";

$(document).ready(function () {
	var av_name = "RE_3";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("RE_3");
  var pseudo = jsav.code(code[0]);
  


  pseudo.setCurrentLine("import");
  jsav.umsg(interpret("sc1"));
  jsav.displayInit();

  
  jsav.umsg(interpret("sc2"));
  pseudo.unhighlight("import");
  pseudo.setCurrentLine("DNA_Seq");
  jsav.step();

  
  pseudo.unhighlight("DNA_Seq");
  pseudo.setCurrentLine("regex");
  jsav.umsg(interpret("sc3"));
  jsav.step();

  
  pseudo.unhighlight("regex");
  pseudo.setCurrentLine("print");
  jsav.umsg(interpret("sc4"));

  jsav.recorded();

});
