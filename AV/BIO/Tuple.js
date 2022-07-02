"use strict";

$(document).ready(function () {
    var av_name = "Tuple";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("Tuple");
  var t = jsav.ds.matrix([['a',1,'e',7.5,'i','o',9]],{ top: 10, left: 120})
  
  jsav.umsg(interpret("sc1"));
  var pseudo = jsav.code(code[0]);
  pseudo.setCurrentLine("t1");
  jsav.displayInit();
  
  jsav.umsg(interpret("sc2"));
  pseudo.unhighlight("t1");
  pseudo.setCurrentLine("p1");
  jsav.step();

  
  pseudo.unhighlight("p1");
  pseudo.setCurrentLine("p2");
  jsav.umsg(interpret("sc3"));
  jsav.step();

  
  pseudo.unhighlight("p2");
  pseudo.setCurrentLine("t2");
  jsav.umsg(interpret("sc4"));

  pseudo.unhighlight("t2");
  pseudo.setCurrentLine("p3");
  jsav.umsg(interpret("sc5"));

  pseudo.unhighlight("p3");
  pseudo.setCurrentLine("p4");
  jsav.umsg(interpret("sc6"));

  pseudo.unhighlight("p4");
  pseudo.setCurrentLine("p5");
  jsav.umsg(interpret("sc7"));
    
  
    
    jsav.label("index",{top:50 ,left:70}).addClass("label_one");
    jsav.label("0",{top: 50, left: 124}).addClass("label_one");
    jsav.label("1",{top: 50, left: 154}).addClass("label_one");
    jsav.label("2",{top: 50, left: 183}).addClass("label_one");
    jsav.label("3",{top: 50, left: 213}).addClass("label_one");
    jsav.label("4",{top: 50, left: 243}).addClass("label_one");
    jsav.label("5",{top: 50, left: 273}).addClass("label_one");
    jsav.label("6",{top: 50, left: 301}).addClass("label_one");


    jsav.label("tuple[0]",{top: 80,  left: 100});
    jsav.label("tuple[1]",{top: 110, left: 130});
    jsav.label("tuple[2]",{top: 142, left: 163});
    jsav.label("tuple[3]",{top: 170, left: 190});
    jsav.label("tuple[4]",{top: 195, left: 220});
    jsav.label("tuple[5]",{top: 230, left: 243});
    jsav.label("tuple[6]",{top: 258, left: 270});


    var y= jsav.g.line(137, 55, 137, 100,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(165, 55, 165, 130,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(195, 55, 195, 160,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(225, 55, 225, 190,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(255, 55, 255, 220,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(285, 55, 285, 250,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(315, 55, 315, 280,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});


	jsav.recorded();
});