"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var rectHeight = 30;
  var rectWidth = 50;
  var leftAlign = 1;
  var topAlign = 50;
  var labelShift = 5;
  var set2; //To hold rectangles of i = 2
  var set1; //To hold rectangles of i = 1
  
  function runit() {
    av = new JSAV($(".avcontainer"));
    set2 = av.g.set();
    set1 = av.g.set();

    MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
	$(".avcontainer").on("jsav-message", function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    });
	
	//Slide 1
	av.umsg("Let's see how we can reach a closed form of the summation $\\displaystyle\\sum_{i=0}^{\\log{n}}2^i$");
	av.displayInit();

	//Slide 2
	av.umsg("As an example suppose we have $n = 16$");
	av.step();
	
	//Slide 3
	av.umsg("When $i = 0$, this adds $1$ to the overall summation. This is represented by a single rectangle.");
	av.umsg
	("<br> $\\displaystyle\\sum_{i=0}^{\\log{n}=4}2^i = 1 + \\displaystyle\\sum_{i=1}^{\\log{n}=4}2^i$", {"preserve": true});
	var rect0 = av.g.rect(leftAlign, topAlign, rectWidth, rectHeight);
	var label0 = av.label("$i = 0$",  {"top": topAlign - 0.5*rectHeight, "left": leftAlign + rectWidth + labelShift});
	av.step();

	//Slide 4
	av.umsg("When $i = 1$, this adds $2$ to the overall summation. This is represented by two rectangles.");
	av.umsg("<br> $\\displaystyle\\sum_{i=0}^{\\log{n}=4}2^i = 1 + 2 + \\displaystyle\\sum_{i=2}^{\\log{n}=4}2^i$", {"preserve": true});
	set1.push(av.g.rect(leftAlign, topAlign + rectHeight, rectWidth, rectHeight));
	set1.push(av.g.rect(leftAlign + rectWidth, topAlign + rectHeight, rectWidth, rectHeight));
	var label1 = av.label("$i = 1$",  {"top": topAlign -0.5*rectHeight + rectHeight, "left": leftAlign + 2 * rectWidth + labelShift});
	av.step();

	//Slide 5
	av.umsg("When $i = 2$, this adds $4$ to the overall summation. This is represented by Four rectangles.");
	av.umsg("<br> $\\displaystyle\\sum_{i=0}^{\\log{n}=4}2^i = 1 + 2 + 4 + \\displaystyle\\sum_{i=3}^{\\log{n}=4}2^i$", {"preserve": true});
	set2.push(av.g.rect(leftAlign, topAlign + 2 * rectHeight, rectWidth, rectHeight));
	set2.push(av.g.rect(leftAlign + rectWidth, topAlign + 2 * rectHeight, rectWidth, rectHeight));
	set2.push(av.g.rect(leftAlign + 2 * rectWidth, topAlign + 2 * rectHeight, rectWidth, rectHeight));
	set2.push(av.g.rect(leftAlign + 3 * rectWidth, topAlign + 2 * rectHeight, rectWidth, rectHeight));
	var label2 = av.label("$i = 2$",  {"top": topAlign -0.5*rectHeight + 2 * rectHeight, "left": leftAlign + 4 * rectWidth + labelShift});
	av.step();

	//Slide 6
	av.umsg("When $i = 3$, this adds $8$ to the overall summation. This is represented by Eight rectangles.");
	av.umsg("<br> $\\displaystyle\\sum_{i=0}^{\\log{n}=4}2^i = 1 + 2 + 4 + 8 +\\displaystyle\\sum_{i=4}^{\\log{n}=4}2^i$", {"preserve": true});
	av.g.rect(leftAlign, topAlign + 3 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 2 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 3 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 4 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 5 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 6 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 7 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight);
	var label3 = av.label("$i = 3$",  {"top": topAlign -0.5*rectHeight + 3 * rectHeight, "left": leftAlign + 8 * rectWidth + labelShift});
	av.step();

	//Slide 7
	av.umsg("When $i = 4$, this adds $16$ to the overall summation. This is represented by Sixteen rectangles.");
	av.umsg("<br> $\\displaystyle\\sum_{i=0}^{\\log{n}=4}2^i = 1 + 2 + 4 + 8 + 16$", {"preserve": true});
	av.g.rect(leftAlign, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 2 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 3 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 4 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 5 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 6 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 7 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 8 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 9 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 10 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 11 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 12 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 13 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 14 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	av.g.rect(leftAlign + 15 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight);
	var label4 = av.label("$i = 4$",  {"top": topAlign -0.5*rectHeight + 4 * rectHeight, "left": leftAlign + 16 * rectWidth + labelShift});
	av.step();

	//Slide 8
	av.umsg("The closed form solution of this summation can be found by calculating the total surface area of the resulted shape.");
	av.umsg("<br> Let's first make some reoderings ...", {"preserve": true});
	label0.hide();
	label1.hide();
	label2.hide();
	label3.hide();
	label4.hide();
    av.step();

    //Slide 9
	set2.translate(8 * rectWidth, rectHeight);
    av.step();

    //Slide 10
	set1.translate(12 * rectWidth, 2 * rectHeight);
    av.step();

    //Slide 11
	rect0.translate(14 * rectWidth, 3 * rectHeight);
    av.step();
    
    //Slide 12
	av.umsg("Now it is very easy to calculate the surface area of this shape which is $2n - 1$");
	av.g.rect(leftAlign + 15 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight).css({"fill":"black"});
	av.label("$-1$",  {"top": topAlign -0.5*rectHeight + 2 * rectHeight, "left": leftAlign + 15.2 * rectWidth});
	av.label("|-------------------------------------------------------------------- $n$ --------------------------------------------------------------------|",  
		{"top": topAlign + 4 *rectHeight + 25, "left": leftAlign + 0.5*rectWidth}).css
	({'font-size': '16px', "text-align": "center"});
	av.label("$|-2-|$",  {"top": topAlign + 3 * rectHeight + labelShift, "left": leftAlign + 16 * rectWidth - labelShift}).addClass("rotated");
    av.step();

    //Slide 13
    av.umsg("Finally, we have $\\displaystyle\\sum_{i=0}^{\\log{n}}2^i = 2n - 1$");
	av.recorded();
}
  function about() {
    var mystring = "Summation 2 To the Power of I\nWritten by Mohammed Fawzi and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
