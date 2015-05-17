"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var tree;
  var leftAlign = 0;
  var topAlign = 0;
  var nodeGap = 25;
  var nodeHeight = 33;
  var nodeWidth = 45;
  var labelShift = 50;
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
	av.umsg("Let's see how we can guess the closed form solution of the recurrence $T(n) = 2T(n/2) + 1$");
	av.displayInit();

	//Slide 2
	av.umsg("For a problem of size $n$, we have $1$ unit of work plus the amount of work required for two subproblems of size $n/2$ each");
	av.umsg("<br> $T(n) = 1 + 2T(n/2)$", {"preserve": true});
	var workLabel = av.label("<b><u>Amount of Work</u></b>", {"top": topAlign - 10 , "left": leftAlign + 250, "After": root});
	labelSet.push(workLabel);
	var dashLabel_n = av.label("----------------------------------", {"top": topAlign + 0.5 * nodeHeight, "left": leftAlign + nodeWidth + labelShift}); 
	labelSet.push(dashLabel_n);
	var valueLabel_1 = av.label("$1$", {"top": topAlign + 0.5 * nodeHeight , "left": leftAlign + nodeWidth + labelShift * 5});
	labelSet.push(valueLabel_1);
	tree = av.ds.binarytree({left: leftAlign, top: topAlign, nodegap: nodeGap});
	var root = tree.newNode("$n$");
    tree.root(root);
	var nOverTwo1 = tree.newNode("$n/2$");
	var nOverTwo2 = tree.newNode("$n/2$");
	root.addChild(nOverTwo1);
	root.addChild(nOverTwo2);
	tree.layout();
	av.step();

	//Slide 3
	av.umsg("For each problem of size $n/2$, we have $1$ unit of work plus the amount of work required for two subproblems of size $n/4$ each");
	av.umsg("<br> $T(n) = 1 + 2(1 + 2T(n/4))$", {"preserve": true});
	//workLabel.css({"left": leftAlign + 250 + 2 * nodeWidth});
	displaceLabels(2 * nodeWidth);
	var dashLabel_n2 = av.label("----------------------", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift * 4}); 
	labelSet.push(dashLabel_n2);
	var valueLabel_2 = av.label("$2$", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + 3 * nodeWidth + labelShift * 5}); 
	labelSet.push(valueLabel_2);
	var nOverFour1 = tree.newNode("$n/4$");
	var nOverFour2 = tree.newNode("$n/4$");
	var nOverFour3 = tree.newNode("$n/4$");
	var nOverFour4 = tree.newNode("$n/4$");
	nOverTwo1.addChild(nOverFour1);
	nOverTwo1.addChild(nOverFour2);
	nOverTwo2.addChild(nOverFour3);
	nOverTwo2.addChild(nOverFour4);
	tree.layout();
	av.step();
	
	//Slide 4
	av.umsg("For each problem of size $n/4$, we have $1$ unit of work plus the amount of work required for two subproblems of size $n/8$");
	av.umsg("<br> $T(n) = 1 + 2(1 + 2(1 + 2T(n/8)))$", {"preserve": true});
	displaceLabels(5 * nodeWidth);
	labelSet.push(av.label("--------", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + 7.5 * nodeWidth + labelShift * 4}));
	labelSet.push(av.label("$4$", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + 8 * nodeWidth + labelShift * 5}));
	var nOverEight1 = tree.newNode("$n/8$");
	var nOverEight2 = tree.newNode("$n/8$");
	var nOverEight3 = tree.newNode("$n/8$");
	var nOverEight4 = tree.newNode("$n/8$");
	var nOverEight5 = tree.newNode("$n/8$");
	var nOverEight6 = tree.newNode("$n/8$");
	var nOverEight7 = tree.newNode("$n/8$");
	var nOverEight8 = tree.newNode("$n/8$");
	nOverFour1.addChild(nOverEight1);
	nOverFour1.addChild(nOverEight2);
	nOverFour2.addChild(nOverEight3);
	nOverFour2.addChild(nOverEight4);
	nOverFour3.addChild(nOverEight5);
	nOverFour3.addChild(nOverEight6);
	nOverFour4.addChild(nOverEight7);
	nOverFour4.addChild(nOverEight8);
	tree.layout();
	av.step();

	//Slide 5
	av.umsg("This pattern will continue till we reach a problem of size $1$ in which we will have $n$ subproblems each of which requires $1$ unit of work");
	av.umsg("<br> $T(n) = 1 + 2(1 + 2(1 + 2(1 + 2((...))))$", {"preserve": true});
	displaceLabels(2 * nodeWidth);
	
	labelSet.push(av.label("----", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + 10 * nodeWidth + labelShift * 4}));
	labelSet.push(av.label("$n$", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + 10 * nodeWidth + labelShift * 5}));
	labelSet.push(av.label("-----------------------------------------------------------------------------------", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	var one1 = tree.newNode("$1$");
	var one2 = tree.newNode("$1$");
	nOverEight1.left(one1);
	nOverEight8.right(one2);
	var edge1 = one1.edgeToParent();
	var edge2 = one2.edgeToParent();
	edge1.addClass("dashed");
	edge2.addClass("dashed");
	tree.layout();
	av.step();	

	//Slide 6
	av.umsg("Since we have $\\log{n + 1}$ levels and the amount of work at each level is a base $2$ exponent, the closed form solution of $T(n) = 2T(n/2) + 1$ can be modeled by the summation $\\displaystyle\\sum_{i=0}^{\\log{n}}2^i$");
	labelSet.push(av.label("|------------------------- $\\log{n + 1}$ -----------------------|", {"top": 5 +topAlign + 4 *nodeHeight + nodeGap , "left": leftAlign + 10 * nodeWidth + labelShift * 4}).addClass("rotated"));
	av.step();

	//Slide 7
	av.umsg("Since we already know that $\\displaystyle\\sum_{i=0}^{\\log{n}}2^i = 2n - 1$. Then, we have the closed form solution of $T(n) = 2T(n/2) + 1$ evaluates to $2n - 1$");
	av.step();
	
	//Slide 8	
	av.umsg("Similarily, we can guess the closed form solution of the recurrence $T(n) = 2T(n/2) + n$");
	hideLabels();
	tree.hide();
	labelSet = new Array();
	av.step();

	//Slide 9
	av.umsg("For a problem of size $n$, we have $n$ units of work plus the amount of work required for two subproblems of size $n/2$ each");
	av.umsg("<br> $T(n) = n + 2T(n/2)$", {"preserve": true});
	var workLabel = av.label("<b><u>Amount of Work</u></b>", {"top": topAlign - 10 , "left": leftAlign + 250, "After": root});
	labelSet.push(workLabel);
	var dashLabel_n = av.label("----------------------------------", {"top": topAlign + 0.5 * nodeHeight, "left": leftAlign + nodeWidth + labelShift}); 
	labelSet.push(dashLabel_n);
	var valueLabel_1 = av.label("$n$", {"top": topAlign + 0.5 * nodeHeight , "left": leftAlign + nodeWidth + labelShift * 5});
	labelSet.push(valueLabel_1);
	tree = av.ds.binarytree({left: leftAlign, top: topAlign, nodegap: nodeGap});
	var root = tree.newNode("$n$");
    tree.root(root);
	var nOverTwo1 = tree.newNode("$n/2$");
	var nOverTwo2 = tree.newNode("$n/2$");
	root.addChild(nOverTwo1);
	root.addChild(nOverTwo2);
	tree.layout();
	av.step();

	//Slide 10
	av.umsg("For each problem of size $n/2$, we have $n/2$ units of work plus the amount of work required for two subproblems of size $n/4$ each");
	av.umsg("<br> $T(n) = n + 2(n/2 + 2T(n/4))$", {"preserve": true});
	displaceLabels(2 * nodeWidth);
	var dashLabel_n2 = av.label("----------------------", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift * 4}); 
	labelSet.push(dashLabel_n2);
	var valueLabel_2 = av.label("$n$", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + 3 * nodeWidth + labelShift * 5}); 
	labelSet.push(valueLabel_2);
	var nOverFour1 = tree.newNode("$n/4$");
	var nOverFour2 = tree.newNode("$n/4$");
	var nOverFour3 = tree.newNode("$n/4$");
	var nOverFour4 = tree.newNode("$n/4$");
	nOverTwo1.addChild(nOverFour1);
	nOverTwo1.addChild(nOverFour2);
	nOverTwo2.addChild(nOverFour3);
	nOverTwo2.addChild(nOverFour4);
	tree.layout();
	av.step();
	
	//Slide 11
	av.umsg("For each problem of size $n/4$, we have $n/4$ units of work plus the amount of work required for two subproblems of size $n/8$");
	av.umsg("<br> $T(n) = 1 + 2(n/2 + 2(n/4 + 2T(n/8)))$", {"preserve": true});
	displaceLabels(5 * nodeWidth);
	labelSet.push(av.label("--------", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + 7.5 * nodeWidth + labelShift * 4}));
	labelSet.push(av.label("$n$", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + 8 * nodeWidth + labelShift * 5}));
	var nOverEight1 = tree.newNode("$n/8$");
	var nOverEight2 = tree.newNode("$n/8$");
	var nOverEight3 = tree.newNode("$n/8$");
	var nOverEight4 = tree.newNode("$n/8$");
	var nOverEight5 = tree.newNode("$n/8$");
	var nOverEight6 = tree.newNode("$n/8$");
	var nOverEight7 = tree.newNode("$n/8$");
	var nOverEight8 = tree.newNode("$n/8$");
	nOverFour1.addChild(nOverEight1);
	nOverFour1.addChild(nOverEight2);
	nOverFour2.addChild(nOverEight3);
	nOverFour2.addChild(nOverEight4);
	nOverFour3.addChild(nOverEight5);
	nOverFour3.addChild(nOverEight6);
	nOverFour4.addChild(nOverEight7);
	nOverFour4.addChild(nOverEight8);
	tree.layout();
	av.step();

	//Slide 12
	av.umsg("This pattern will continue till we reach a problem of size $1$ in which we will have $n$ subproblems each of which requires $1$ unit of work");
	av.umsg("<br> $T(n) = n + 2(n/2 + 2(n/4 + 2(n/8 + 2((...))))$", {"preserve": true});
	displaceLabels(2 * nodeWidth);
	
	labelSet.push(av.label("----", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + 10 * nodeWidth + labelShift * 4}));
	labelSet.push(av.label("$n$", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + 10 * nodeWidth + labelShift * 5}));
	labelSet.push(av.label("-----------------------------------------------------------------------------------", {"top": topAlign + 6.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
	var one1 = tree.newNode("$1$");
	var one2 = tree.newNode("$1$");
	nOverEight1.left(one1);
	nOverEight8.right(one2);
	var edge1 = one1.edgeToParent();
	var edge2 = one2.edgeToParent();
	edge1.addClass("dashed");
	edge2.addClass("dashed");
	tree.layout();
	av.step();	

	//Slide 13
	av.umsg("Since we have $\\log{n + 1}$ levels and the amount of work at each level is $n$, the closed form solution of $T(n) = 2T(n/2) + n$ can be modeled by the summation $\\displaystyle\\sum_{i=0}^{\\log{n}}n$");
	labelSet.push(av.label("|------------------------- $\\log{n + 1}$ -----------------------|", {"top": 5 +topAlign + 4 *nodeHeight + nodeGap , "left": leftAlign + 10 * nodeWidth + labelShift * 4}).addClass("rotated"));
	av.step();

	//Slide 14
	av.umsg("Simply, $\\displaystyle\\sum_{i=0}^{\\log{n}}n = n(\\log{n} + 1)$. Then, we have the closed form solution of $T(n) = 2T(n/2) + n$ evaluates to $n + n\\log{n}$");
	av.step();
	
	av.recorded();
  }
  function hideLabels(){
    $.each(labelSet, function(index, value){
	  value.hide();
    });
  }
  function displaceLabels(offset){
    $.each(labelSet, function(index, value){
	  var current = value.css("left");
	  var currentPos = current.match(/\d+/);
	  value.css({"left": parseInt(currentPos) + offset});
	});
  }
  function about() {
    var mystring = "Divide And Conquer Recurrences\nWritten by Mohammed Fawzi and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
