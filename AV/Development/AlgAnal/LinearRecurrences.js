"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var tree;
  var leftAlign = 250;
  var topAlign = 0;
  var nodeGap = 25;
  var nodeHeight = 33;
  var nodeWidth = 45;
  var labelShift = 10;
  var labelSet;

  function runit() {
    av = new JSAV($(".avcontainer"));
	labelSet = new Array();
    MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
	$(".avcontainer").on("jsav-message", function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    });

	//Slide 1	
	av.umsg("Let's see how we can guess the closed form solution of the recurrence $T(n) = T(n-1) + 1$");
	av.displayInit();

	//Slide 2
	av.umsg("At the value of $n$, we have $1$ unit of work plus the amount of work required for $n-1$");
	av.umsg("<br> $T(n) = 1 + T(n-1)$", {"preserve": true});
	labelSet.push(av.label("<b><u>Amount of Work<b><u>", {"top": topAlign - 10 , "left": leftAlign + 200}));
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 0.5 * nodeHeight, "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("1", {"top": topAlign + 0.5 * nodeHeight , "left": leftAlign + nodeWidth + labelShift * 20}));
	tree = av.ds.tree({left: leftAlign, top: topAlign, nodegap: nodeGap});
	var root = tree.newNode("$n$");
    tree.root(root);
	av.step();

	//Slide 3
	av.umsg("At the value of $n-1$, we have $1$ unit of work plus the amount of work required for $n-2$");
	av.umsg("<br> $T(n) = 1 + (1 + T(n-2))$", {"preserve": true});
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("1", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
	var nMinusOne = tree.newNode("$n-1$");
	root.addChild(nMinusOne);
	tree.layout();
	av.step();

	//Slide 4
	av.umsg("At the value of $n-2$, we have $1$ unit of work plus the amount of work required for $n-3$");
	av.umsg("<br> $T(n) = 1 + (1 + (1 + T(n-3)))$", {"preserve": true});
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("1", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
	var nMinusTwo = tree.newNode("$n-2$");
	nMinusOne.addChild(nMinusTwo);
	tree.layout();
	av.step();

	//Slide 5
	av.umsg("At the value of $n-3$, we have $1$ unit of work plus the amount of work required for $n-4$");
	av.umsg("<br> $T(n) = 1 + (1 + (1 + (1 + T(n-4)))$", {"preserve": true});
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("1", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
	var nMinusThree = tree.newNode("$n-3$");
	nMinusTwo.addChild(nMinusThree);
	tree.layout();
	av.step();

	//Slide 6
	av.umsg("This pattern will continue till we reach the value of $1$");
	av.umsg("<br> $T(n) = 1 + (1 + (1 + (1 + (1 + (...))))$", {"preserve": true});
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("1", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
	var one = tree.newNode("$1$");
	nMinusThree.addChild(one);
	var edge = one.edgeToParent();
	edge.addClass("dashed");
	tree.layout();
	av.step();	

	//Slide 7
	av.umsg("Thus, the closed form solution of $T(n) = T(n-1) + 1$ can be modeled by the summation $\\displaystyle\\sum_{i=1}^{n}1$");
	av.step();

	//Slide 8
	av.umsg("Finally, we have the closed form solution of $T(n) = T(n-1) + 1$ evaluates to $n$");
	av.step();
	
	//Slide 9
	av.umsg("Similarily, we can guess the closed form solution of the recurrence $T(n) = T(n-1) + n$");
	$.each(labelSet, function(index, value){
	  value.hide();
	});
	tree.hide();
	av.step();
	
	//Slide 10
	labelSet = new Array();
	av.umsg("At the value of $n$, we have $n$ units of work plus the amount of work required for $n-1$");
	av.umsg("<br> $T(n) = n + T(n-1)$", {"preserve": true});
	labelSet.push(av.label("<b><u>Amount of Work<b><u>", {"top": topAlign - 10 , "left": leftAlign + 200}));
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 0.5 * nodeHeight, "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("$n$", {"top": topAlign + 0.5 * nodeHeight , "left": leftAlign + nodeWidth + labelShift * 20}));
	tree = av.ds.tree({left: leftAlign, top: topAlign, nodegap: nodeGap});
	var root = tree.newNode("$n$");
    tree.root(root);
	av.step();

	//Slide 11
	av.umsg("At the value of $n-1$, we have $n-1$ units of work plus the amount of work required for $n-2$");
	av.umsg("<br> $T(n) = n + (n-1 + T(n-2))$", {"preserve": true});
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("$n-1$", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
	var nMinusOne = tree.newNode("$n-1$");
	root.addChild(nMinusOne);
	tree.layout();
	av.step();

	//Slide 12
	av.umsg("At the value of $n-2$, we have $n-2$ units of work plus the amount of work required for $n-3$");
	av.umsg("<br> $T(n) = n + (n-1 + (n-2 + T(n-3)))$", {"preserve": true});
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("$n-2$", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
	var nMinusTwo = tree.newNode("$n-2$");
	nMinusOne.addChild(nMinusTwo);
	tree.layout();
	av.step();

	//Slide 13
	av.umsg("At the value of $n-3$, we have $n-3$ units of work plus the amount of work required for $n-4$");
	av.umsg("<br> $T(n) = n + (n-1 + (n-2 + (n-3 + T(n-4)))$", {"preserve": true});
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("$n-3$", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
	var nMinusThree = tree.newNode("$n-3$");
	nMinusTwo.addChild(nMinusThree);
	tree.layout();
	av.step();

	//Slide 14
	av.umsg("This pattern will continue till we reach the value of $1$");
	av.umsg("<br> $T(n) = n + (n-1 + (n-2 + (n-3 + (n-4 + (...))))$", {"preserve": true});
	labelSet.push(av.label("----------------------------------", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	labelSet.push(av.label("$1$", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
	var one = tree.newNode("$1$");
	nMinusThree.addChild(one);
	var edge = one.edgeToParent();
	edge.addClass("dashed");
	tree.layout();
	av.step();	

	//Slide 15
	av.umsg("Thus, the closed form solution of $T(n) = T(n-1) + 1$ can be modeled by the summation $\\displaystyle\\sum_{i=1}^{n}i$");
	av.step();

	//Slide 16
	av.umsg("Finally, we have the closed form solution of $T(n) = T(n-1) + n$ evaluates to $\\frac{n(n+1)}{2}$");
	av.step();
	
	av.recorded();
}
  function about() {
    var mystring = "Linear Recurrences\nWritten by Mohammed Fawzi and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
