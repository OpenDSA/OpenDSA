"use strict";

$(document).ready(function () {
	var av_name = "forloop";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("forloop");
 
  jsav.umsg(interpret("sc1"));
  var pseudo = jsav.code(code[0]);
  pseudo.setCurrentLine("list");
  jsav.g.circle(200, 85, 60, {fill: "rgba(5, 170, 69, 0.232)"});
  jsav.label("Start",{left:160, top:34});
  jsav.label("numbers =[1,2,3,4,5]",{left:145, top:-15}).addClass("size");
  jsav.label("(num) become <br>the first number<br> in numbers",{left:10, top:25}).addClass("size");

  jsav.step();

  jsav.label("Assign the next number as (num)",{left:240, top:135}).addClass("size");
    //////<----
    var ar= jsav.g.line(478, 180, 210, 180,{"arrow-end": "classic-wide-long",
    opacity: 90, "stroke-width": 1});
  var y= jsav.g.line(200, 145, 200, 207,{"arrow-end": "classic-wide-long",
  opacity: 90, "stroke-width": 1});

  var sq=jsav.g.rect(152, 235, 95,95,{fill: "rgba(226, 174, 29, 0.232)"})
  sq.rotate(45)
  
  jsav.label("If num is <br> the last <br>number",{left:171, top:240}).addClass("size");
  var y= jsav.g.line(200, 349, 200, 425,{"arrow-end": "classic-wide-long",
  opacity: 90, "stroke-width": 1});



  //////>>>>>.

  jsav.label("NO",{left:310, top:277}).addClass("size");
  var y= jsav.g.line(268, 283, 400, 283,{"arrow-end": "classic-wide-long",
  opacity: 90, "stroke-width": 1});
  jsav.label("YES",{left:216, top:350}).addClass("size");

  
 var sq=jsav.g.rect(412, 241, 130,80,{fill:"rgba(108, 96, 216, 0.232)"})
 jsav.label("print(num)",{left:440, top:257}).addClass("size")
 /////^ 
  var y= jsav.g.line(475, 180, 475, 240)
  jsav.step();

  jsav.g.circle(200, 495, 60, {fill: "rgba(228, 18, 116, 0.232)"});
  jsav.label("End",{left:169, top:444});
  jsav.displayInit();
  jsav.umsg(interpret("sc2"));
  pseudo.setCurrentLine(0);      // Hack until we get multi-line method
  pseudo.unhighlight("list");
  pseudo.setCurrentLine("for");
  jsav.step();
  jsav.umsg(interpret("sc3"));
  pseudo.setCurrentLine(0);      // Hack until we get multi-line method
  pseudo.unhighlight("for");
  pseudo.setCurrentLine("print");
  jsav.step();
  
  jsav.recorded();



});