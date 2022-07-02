"use strict";

$(document).ready(function () {
    var av_name = "Nested_Tuple";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("Nested_Tuple");
  var t = jsav.ds.matrix([['a', ,'g', ,'j']],{ top: 10, left: 120})
  var t2 = jsav.ds.matrix([['bb', ,'ee','ff']],{ top: 115, left: 87})
  var t3 = jsav.ds.matrix([['hh','ii']],{ top: 115, left: 250})
  var t4 = jsav.ds.matrix([['ccc','ddd']],{ top: 200, left: 120})
  
  jsav.umsg(interpret("sc1"))
  var pseudo = jsav.code(code[0]);
  pseudo.setCurrentLine("t1");

  jsav.label("index",{top:40 ,left:70}).addClass("label_one");
  jsav.label("0",{top: 40, left: 130}).addClass("label_one");
  jsav.label("1",{top: 40, left: 154}).addClass("label_one");
  jsav.label("2",{top: 40, left: 188}).addClass("label_one");
  jsav.label("3",{top: 40, left: 219}).addClass("label_one");
  jsav.label("4",{top: 40, left: 250}).addClass("label_one");

  jsav.label("index",{top:145 ,left:45}).addClass("label_one");
  jsav.label("0",{top: 145, left: 100}).addClass("label_one");
  jsav.label("1",{top: 145, left: 130}).addClass("label_one");
  jsav.label("2",{top: 145, left: 160}).addClass("label_one");
  jsav.label("3",{top: 145, left: 190}).addClass("label_one");

  jsav.label("index",{top:145 ,left:217}).addClass("label_one");
  jsav.label("0",{top: 145, left: 263}).addClass("label_one");
  jsav.label("1",{top: 145, left: 290}).addClass("label_one");

  jsav.label("index",{top:230 ,left:75}).addClass("label_one");
  jsav.label("0",{top: 230, left: 130}).addClass("label_one");
  jsav.label("1",{top: 230, left: 160}).addClass("label_one");
  
  jsav.label("(x[1])",{top:115 ,left:45});
  jsav.label("(x[3])",{top: 115, left: 320});
  jsav.label("(x[1][1])",{top: 200, left: 60});


  
  
    var y= jsav.g.line(140, 162, 140, 215,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(165,55, 165, 130,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(225, 55, 250, 130,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    
    jsav.displayInit();
  
  jsav.umsg(interpret("sc2"));
  pseudo.unhighlight("t1");
  pseudo.setCurrentLine("p1");
  jsav.step();

  
  pseudo.unhighlight("p1");
  pseudo.setCurrentLine("p2");
  jsav.umsg(interpret("sc3"));
  jsav.step();


    

	jsav.recorded();
});