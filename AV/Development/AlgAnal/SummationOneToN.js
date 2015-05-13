"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var rectHeight = 25;
  var rectWidth = 50;
  var leftAlign = 250;
  var topAlign = 150;
  var set;
  
  function runit() {
    av = new JSAV($(".avcontainer"));
    set = av.g.set();

    MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
	$(".avcontainer").on("jsav-message", function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    });
	
	//Slide 1
	av.umsg("Let's see how we can reach a closed form of the summation $\\displaystyle\\sum_{i=1}^{n}i$");
	av.displayInit();
	
    //Slide 2
	av.umsg("As an example suppose we have $n = 5$");
	av.step();
	
	//Slide 3
	av.umsg("When $i=1$, this adds $1$ to the overall summation. This is represented by a single rectangle.");
	av.umsg("<br> $\\displaystyle\\sum_{i=1}^{n=5}i = 1 + \\displaystyle\\sum_{i=2}^{n=5}i$", {"preserve": true});
	set.push(av.g.rect(leftAlign, topAlign, rectWidth, rectHeight));
	av.label("$i = 1$",  {"top": topAlign + 12, "left": leftAlign + 10});
	av.step();
	
	//Slide 4
	av.umsg("When $i = 2$, this adds $2$ to the overall summation. This is represented by two rectangles.");
	av.umsg("<br> $\\displaystyle\\sum_{i=1}^{n=5}i = 1 + 2 + \\displaystyle\\sum_{i=3}^{n=5}i$", {"preserve": true});
	set.push(av.g.rect(leftAlign + rectWidth, topAlign, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + rectWidth, topAlign - rectHeight, rectWidth, rectHeight));
	av.label("$i = 2$",  {"top": topAlign + 12, "left": leftAlign + rectWidth + 10});
	av.step();
	
	//Slide 5
	av.umsg("When $i = 3$, this adds $3$ to the overall summation. This is represented by three rectangles.");
	av.umsg("<br> $\\displaystyle\\sum_{i=1}^{n=5}i = 1 + 2 + 3 + \\displaystyle\\sum_{i=4}^{n=5}i$", {"preserve": true});
	set.push(av.g.rect(leftAlign + 2 * rectWidth, topAlign, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + 2 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight));
    av.label("$i = 3$",  {"top": topAlign + 12, "left": leftAlign + 2 * rectWidth + 10});
	av.step();


	//Slide 6
	av.umsg("When $i = 4$, this adds $4$ to the overall summation. This is represented by four rectangles.");
	av.umsg("<br> $\\displaystyle\\sum_{i=1}^{n=5}i = 1 + 2 + 3 + 4 + \\displaystyle\\sum_{i=5}^{n=5}i$", {"preserve": true});
	set.push(av.g.rect(leftAlign + 3 * rectWidth, topAlign, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + 3 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + 3 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + 3 * rectWidth, topAlign - 3 * rectHeight, rectWidth, rectHeight));
    av.label("$i = 4$",  {"top": topAlign + 12, "left": leftAlign + 3 * rectWidth + 10});
	av.step();

	//Slide 7
	av.umsg("When $i = 5$, this adds $4$ to the overall summation. This is represented by four rectangles.");
	av.umsg("<br> $\\displaystyle\\sum_{i=1}^{n=5}i = 1 + 2 + 3 + 4 + 5$", {"preserve": true});
	set.push(av.g.rect(leftAlign + 4 * rectWidth, topAlign, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + 4 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + 4 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + 4 * rectWidth, topAlign - 3 * rectHeight, rectWidth, rectHeight));
	set.push(av.g.rect(leftAlign + 4 * rectWidth, topAlign - 4 * rectHeight, rectWidth, rectHeight));
    av.label("$i = 5$",  {"top": topAlign + 12, "left": leftAlign + 4 * rectWidth + 10});
	av.step();

	//Slide 8
	av.umsg("The closed form solution of this summation can be found by calculating the total surface area of the resulted shape");
    //set.css({"fill": "green", "opacity":"0.5"});
    av.step();

	//Slide 9
	av.umsg
	("The total area will be the sum of the areas of the big traingle and the series of $n$ small traingles");
	av.label("|---------------- $n$ ------------------|",  {"top": topAlign + 25, "left": leftAlign + 20}).css
	({'font-size': '16px', "text-align": "center"});
	av.label("|------- $n$ -------|",  {"top": topAlign - 60, "left": leftAlign + 5 * rectWidth - 35}).css
	({'font-size': '16px', "text-align": "center"}).addClass("rotated");
	av.g.line(leftAlign, topAlign + rectHeight, leftAlign + 5 * rectWidth, topAlign - 4 * rectHeight);
	av.step();

	//Slide 10
	av.umsg("So, the total area is $\\frac{n^2}{2} + \\frac{n}{2}$ which gives $\\frac{n(n + 1)}{2}$");
	av.step();

	//Slide 11
	av.umsg("Finally, we have $\\displaystyle\\sum_{i=1}^{n} i = \\frac{n(n + 1)}{2}$");
	av.recorded();
}
  function about() {
    var mystring = "Summation 1 To n\nWritten by Mohammed Fawzi and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
