"use strict";

$(document).ready(function () {
	var av_name = "n_if";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("n_if");
  jsav.umsg(interpret("sc1"));
  var pseudo = jsav.code(code[0]);
  pseudo.setCurrentLine("p");

  jsav.displayInit();
  jsav.step();


  var sq=jsav.g.rect(80, 18, 80,80).addClass("pink")
  sq.rotate(45)

  jsav.label("Price > 100",{left:85, top:32});
////////////////re1
 var x= jsav.g.line(177, 57, 350, 57);
 var retrue=jsav.g.rect(350,20,175,70).addClass("pink")
 jsav.label("price is greater than 100",{left:358, top:30});
 jsav.umsg(interpret("sc2"));
 pseudo.setCurrentLine(0);      // Hack until we get multi-line method
 pseudo.unhighlight("p");
 pseudo.setCurrentLine("if");
 pseudo.setCurrentLine("pif");
 jsav.step();
 
///////////////////
 var y= jsav.g.line(120, 112, 120, 182)
 var sq=jsav.g.rect(80, 200, 80,80).addClass("pink")
 sq.rotate(45)
 jsav.label("Price == 100",{left:80, top:215});
 /////////////////re2

 /////////////
 var x= jsav.g.line(177, 240, 350, 240);
 var retrue=jsav.g.rect(350,205,132,70).addClass("pink")

  jsav.label("price is 100",{left:377, top:215});

 jsav.umsg(interpret("sc3"));
 pseudo.setCurrentLine(0);      // Hack until we get multi-line method
 pseudo.unhighlight("if");
 pseudo.unhighlight("pif");
 pseudo.setCurrentLine("elif");
 pseudo.setCurrentLine("pelif");
 jsav.step();
 var y= jsav.g.line(120, 295, 120, 370)
 var sq=jsav.g.rect(80, 384, 80,80).addClass("pink")
 sq.rotate(45)
 jsav.label("Price < 100",{left:80, top:400});
 //////re3


 var x= jsav.g.line(177, 423, 350, 423);
 var retrue=jsav.g.rect(350,390,175,70).addClass("pink")
 jsav.label("price is less than 100",{left:366, top:400});
 jsav.umsg(interpret("sc4"));
 pseudo.setCurrentLine(0);      // Hack until we get multi-line method
 pseudo.unhighlight("elif");
 pseudo.unhighlight("pelif");
 pseudo.setCurrentLine("elif2");
 pseudo.setCurrentLine("pelif2");
 jsav.step();
  jsav.recorded();

});