/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "DivideAndConquerRecurrencesCON2";
  var av;
  var labelSet;
  var circRadius = 13;
  var xoffset = 50;
  var yoffset = 50;
    av = new JSAV(av_name);
	labelSet = new Array();
    MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
	$(".avcontainer").on("jsav-message", function() {
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    });

	//Slide 1		
	var workLabel = av.label("<b><u>Amount of Work</u></b>", {"top": yoffset - 60 , "left": xoffset + 450});
	var numberLabel = av.label("<b><u>Number of nodes</u></b>", {"top": yoffset - 60 , "left": xoffset + 600});
	var numberLabel2 = av.label("$1$", {"top": yoffset - 27 , "left": xoffset + 650});
	var dashLabel_n = av.label("---------------------------------------------", {"top": yoffset - 25, "left": xoffset + 260}); 
	var valueLabel_1 = av.label("$cn^k$", {"top": yoffset - 27 , "left": xoffset + 500});
	var labela = av.label("$a$", {"top": yoffset - 10 , "left": xoffset + 150});
	var dotLabel = av.label("....", {"top": yoffset + 40, "left": xoffset + 140});
	var dotLabel_1 = av.label("....", {"top": yoffset + 40, "left": xoffset + 240});	
	var c1 = av.g.circle(xoffset + 200, yoffset, circRadius, {"stroke-width": "2"});
	var c2 = av.g.circle(xoffset + 100, yoffset + 69, circRadius, {"stroke-width": "2"});
	var c3 = av.g.circle(xoffset + 200, yoffset + 69, circRadius, {"stroke-width": "2"});
	var c4 = av.g.circle(xoffset + 300, yoffset + 69, circRadius, {"stroke-width": "2"});
	var nlabel = av.label("$n$", {"top": yoffset - 27, "left": xoffset + 197});
	var nlabel_2 = av.label("$n/b$", {"top": yoffset + 42, "left": xoffset + 89});
	var nlabel_3 = av.label("$n/b$", {"top": yoffset + 42, "left": xoffset + 189});
	var nlabel_4 = av.label("$n/b$", {"top": yoffset + 42, "left": xoffset + 289});
	var l1 = av.g.line(xoffset + 200, yoffset + 14, xoffset + 100, yoffset + 55, {"stroke-width": "2"});
	var l2 = av.g.line(xoffset + 200, yoffset + 14, xoffset + 200, yoffset + 55, {"stroke-width": "2"});
	var l3 = av.g.line(xoffset + 200, yoffset + 14, xoffset + 300, yoffset + 55, {"stroke-width": "2"});
	av.displayInit();

	//Slide 2
	var l4 = av.g.line(xoffset + 100, yoffset + 83, xoffset + 100, yoffset + 125, {"stroke-width": "2"});
	var l5 = av.g.line(xoffset + 100, yoffset + 83, xoffset + 60, yoffset + 125, {"stroke-width": "2"});
	var l6 = av.g.line(xoffset + 100, yoffset + 83, xoffset + 140, yoffset + 125, {"stroke-width": "2"});
	var l7 = av.g.line(xoffset + 200, yoffset + 83, xoffset + 200, yoffset + 125, {"stroke-width": "2"});
	var l8 = av.g.line(xoffset + 200, yoffset + 83, xoffset + 160, yoffset + 125, {"stroke-width": "2"});
	var l8 = av.g.line(xoffset + 200, yoffset + 83, xoffset + 240, yoffset + 125, {"stroke-width": "2"});
	var l9 = av.g.line(xoffset + 300, yoffset + 83, xoffset + 300, yoffset + 125, {"stroke-width": "2"});
	var l10 = av.g.line(xoffset + 300, yoffset + 83, xoffset + 260, yoffset + 125, {"stroke-width": "2"});
	var l11 = av.g.line(xoffset + 300, yoffset + 83, xoffset + 340, yoffset + 125, {"stroke-width": "2"});
	var dashLabel_n1 = av.label("--------------------------", {"top": yoffset + 45, "left": xoffset + 350}); 
	var valueLabel_2 = av.label("$\\frac{acn^k}{b^k}$", {"top": yoffset + 45, "left": xoffset + 500}); 
	var numberLabel3 = av.label("$a$", {"top": yoffset + 45 , "left": xoffset + 650});
	var labela1 = av.label("$a$", {"top": yoffset + 70, "left": xoffset + 70});
	var labela2 = av.label("$a$", {"top": yoffset + 70, "left": xoffset + 170});
	var labela3 = av.label("$a$", {"top": yoffset + 70, "left": xoffset + 270});
	var dotLabel_2 = av.label(".............", {"top": yoffset + 140, "left": xoffset + 175}); 
	av.step();
	
	//Slide 3
	var c5 = av.g.circle(xoffset + 20, yoffset + 220, circRadius, {"stroke-width": "2"});
	var c6 = av.g.circle(xoffset + 110, yoffset + 220, circRadius, {"stroke-width": "2"});
	var c7 = av.g.circle(xoffset + 200, yoffset + 220, circRadius, {"stroke-width": "2"});
	var c8 = av.g.circle(xoffset + 290, yoffset + 220, circRadius, {"stroke-width": "2"});
	var c9 = av.g.circle(xoffset + 380, yoffset + 220, circRadius, {"stroke-width": "2"});
	var dashLabel_n2 = av.label("-----------------", {"top": yoffset + 190, "left": xoffset + 400}); 
	var valueLabel_3 = av.label("$\\frac{a^mcn^k}{b^{mk}}$", {"top": yoffset + 190, "left": xoffset + 500}); 
	var bLabel1 = av.label("$1$", {"top": yoffset + 195, "left": xoffset + 18});
	var bLabel2 = av.label("$1$", {"top": yoffset + 195, "left": xoffset + 108});
	var bLabel3 = av.label("$1$", {"top": yoffset + 195, "left": xoffset + 198});
	var bLabel4 = av.label("$1$", {"top": yoffset + 195, "left": xoffset + 288});
	var bLabel5 = av.label("$1$", {"top": yoffset + 195, "left": xoffset + 378});
	var numberLabel4 = av.label("$a^{m}$", {"top": yoffset + 190 , "left": xoffset + 650});
	av.step();
	
	//Slide 4
	av.label("|---------------- $\\log_{b}{n + 1}$ --------------|", {"top": yoffset + 80, "left": xoffset - 120}).addClass("rotated");
	av.step();	
	av.recorded();
  
});
