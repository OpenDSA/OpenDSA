"use strict";

$(document).ready(function () {
    var av_name = "dic2";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("dic2");
  jsav.umsg(interpret("sc1"));
  var pseudo = jsav.code(code[0]);
  pseudo.highlight("ch1");
  pseudo.highlight("ch11");
  pseudo.highlight("ch111");
  pseudo.highlight("ch1111");

  jsav.displayInit();

  jsav.umsg(interpret("sc2")); 
  pseudo.setCurrentLine(0)   // Hack until we get multi-line method
  pseudo.unhighlight("ch1");
  pseudo.unhighlight("ch11");
  pseudo.unhighlight("ch111");
  pseudo.unhighlight("ch1111");
  pseudo.highlight("ch2");
  pseudo.highlight("ch21"); 
  pseudo.highlight("ch211");
  pseudo.highlight("ch2111"); 
  jsav.step();

  jsav.umsg(interpret("sc3")); 
  pseudo.setCurrentLine(0)   // Hack until we get multi-line method
  pseudo.unhighlight("ch2");
  pseudo.unhighlight("ch21");
  pseudo.unhighlight("ch211");
  pseudo.unhighlight("ch2111");
  pseudo.highlight("ch3");
  pseudo.highlight("ch31"); 
  pseudo.highlight("ch311");
  pseudo.highlight("ch3111"); 
  jsav.step();


  jsav.umsg(interpret("sc4")); 
  pseudo.setCurrentLine(0)   // Hack until we get multi-line method
  pseudo.unhighlight("ch3");
  pseudo.unhighlight("ch31");
  pseudo.unhighlight("ch311");
  pseudo.unhighlight("ch3111");
  pseudo.highlight("ch4");
  pseudo.highlight("ch41"); 
  pseudo.highlight("ch411");
  pseudo.highlight("ch4111"); 
  jsav.step();
	jsav.recorded();
});