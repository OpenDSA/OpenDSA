"use strict";

$(document).ready(function () {
	var av_name = "if_stat";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("if_stat");
  jsav.umsg(interpret("sc1"));
  var pseudo = jsav.code(code[0]);
  pseudo.setCurrentLine("a");
  pseudo.setCurrentLine("b");
  
  
  jsav.displayInit();
  jsav.step();

  jsav.umsg(interpret("sc2"));
  pseudo.setCurrentLine(0);      // Hack until we get multi-line method
  pseudo.unhighlight("a");
  pseudo.unhighlight("b");
  pseudo.setCurrentLine("if");
  var sq=jsav.g.rect(80, 18, 80,80).addClass("pink")
  sq.rotate(45)
  jsav.label("b > a",{left:99, top:32});

 var x= jsav.g.line(177, 57, 350, 57);
 var y= jsav.g.line(120, 112, 120, 280)


 var retrue=jsav.g.rect(350,20,132,70).addClass("pink");
 jsav.label("True",{left:230, top:20});


retrue.hide();
 var retrue=jsav.g.rect(350,20,132,70).addClass("green")

 var refalse=jsav.g.rect(45,280,155,70).addClass("red")
 jsav.label("False",{left:140, top:170});
 jsav.step();
 jsav.umsg(interpret("sc3"));
 pseudo.setCurrentLine(0);      // Hack until we get multi-line method
 pseudo.unhighlight("if");
 pseudo.setCurrentLine("t");

 jsav.label("b is greater than a",{left:357, top:30}) 
 jsav.step();
 jsav.umsg(interpret("sc4"));
 pseudo.setCurrentLine(0);      // Hack until we get multi-line method
 pseudo.unhighlight("t");
 pseudo.setCurrentLine("e");
 pseudo.setCurrentLine("f");
 jsav.label("b is not greater than a",{left:51, top:289}) 
 jsav.step();

  
  jsav.recorded();

});