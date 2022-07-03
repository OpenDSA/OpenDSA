"use strict";

$(document).ready(function () {
    var av_name = "Dictionary";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("Dictionary");
  jsav.umsg(interpret("sc1"));
  var pseudo = jsav.code(code[0]);
  pseudo.highlight("car1");
  pseudo.highlight("car2");
  pseudo.highlight("car3");
  pseudo.highlight("car4");
  pseudo.highlight("car5");
  var m = jsav.ds.matrix([['brand'], ['model'],['year']],{ top: 60, left: 200})
  var v = jsav.ds.matrix([['Ford'], ['Mustang'],['1964']],{style: "table", top: 60, left: 450})

    
   
 
    jsav.label("Car = {brand:'Ford',model:'Mustang',year:'1964'}",{top: 0, left: 20}).addClass("Size");
    jsav.label("Key",{top: 36, left: 220}).addClass("Size");
    jsav.label("Value",{top: 36, left: 466}).addClass("Size");
    var x= jsav.g.line(310, 90, 410, 90,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5}).addClass("x");
    var y= jsav.g.line(310, 125, 410, 125,{"arrow-end": "classic-wide-long",opacity: 10, "stroke-width": 1.5,}).addClass("y");
    var z= jsav.g.line(310, 159, 410, 159,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5}).addClass("z");
    var a= jsav.g.line(310, 125, 410, 125,{"arrow-end": "classic-wide-long",opacity: 10, "stroke-width": 1.5,"stroke":"rgb(58, 218, 19)"}).addClass("a");
    var b= jsav.g.line(310, 159, 410, 159,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5,"stroke":"rgb(58, 218, 19)"}).addClass("b");
    a.hide();
    b.hide();
    jsav.displayInit();
    
    jsav.umsg(interpret("sc2")); 
    pseudo.setCurrentLine(0)   // Hack until we get multi-line method
    pseudo.unhighlight("car1");
    pseudo.unhighlight("car2");
    pseudo.unhighlight("car3");
    pseudo.unhighlight("car4");
    pseudo.unhighlight("car5");
    pseudo.setCurrentLine("keys");
    jsav.step();


    jsav.umsg(interpret("sc3")); 
    pseudo.setCurrentLine(0)   // Hack until we get multi-line method
    pseudo.unhighlight("keys");
    pseudo.setCurrentLine("print be");
    jsav.step();

    jsav.umsg(interpret("sc4")); 
    pseudo.setCurrentLine(0)   // Hack until we get multi-line method
    pseudo.unhighlight("print be");
    pseudo.setCurrentLine("brand");
    y.hide();
    a.show();
    v.value(1,0,"Alfa Romeo");
    jsav.step();

    jsav.umsg(interpret("sc5")); 
    pseudo.setCurrentLine(0)   // Hack until we get multi-line method
    pseudo.unhighlight("brand");
    pseudo.setCurrentLine("year");
    z.hide();
    b.show();
    v.value(2,0,2020);
    jsav.step();

    jsav.umsg(interpret("sc6")); 
    pseudo.setCurrentLine(0)   // Hack until we get multi-line method
    pseudo.unhighlight("year");
    pseudo.setCurrentLine("print af");
    jsav.step();
	jsav.recorded();
});