
$(document).ready(function () {

    var L = LAMBDA;
    var settings = new JSAV.utils.Settings($(".jsavsettings"));
    var av = new JSAV($('.avcontainer'), {settings: settings});
    av.recorded();
    var tell = function (msg, color) { av.umsg(msg, {color: color}); };
    var incrs = [];
    var $theExpression = $("#expression");
    var initialArray = [];
    var theExpression, position, ansArray, arraySize, strArr, ansArr;
    var correct;  // array of lamba expressions (each one as a string)
    var step;

    var setArrayCellsWidth = function () {
	arr.addClass(true, "defaultCellStyle");
	arr.addClass(oneChar, "oneCharWidth");
	arr.addClass(noChar,"emptyWidth");
	arr.addClass(lambdaChar,"lambdaWidth");
	arr.addClass(parenChar,"narrow");
	arr.addClass(0,"stepNumber");
    };
    var arr;
    var oneChar = function(x) { return ! parenChar(x) &&
				arr.value(x).length === 1; };
    var noChar = function(x) { return arr.value(x).length === 0; };
    var lambdaChar = function(x) { return arr.value(x).length === 3; };
    var parenChar = function(x) { 
	return arr.value(x) === '(' || arr.value(x) === ')' ||
	    arr.value(x) === ' '; 
    };
    function modelSolution(modeljsav)  {
/*
	var correct2D = [];
	var step;
	for(var i=0; i<correct.length; i++) {
	    step = LAMBDA.mySplit(correct[i]);
	    if (i==0) {
		step.unshift("Initial &lambda; exp: ");
	    } else{
		step.unshift("Step " + i + ":");
	    }
	    correct2D.push(step);
	}
	var matrix = [ modeljsav.ds.array(correct2D[0],{left: 20}) ];
	arr = matrix[0];
	setArrayCellsWidth();
	modeljsav.displayInit();

	for(var row=1; row<correct2D.length; row++) {
	    matrix.push(modeljsav.ds.array(correct2D[row],
			{ relativeTo: matrix[matrix.length-1], 
			  left: 0, top: 0,
			  anchor: "left bottom",
			  myAnchor: "left top"}));
	    arr = matrix[row];
	    setArrayCellsWidth();
	    modeljsav.gradeableStep();
	}

	modeljsav.recorded();

	return matrix;
*/

	var modelArray = modeljsav.ds.array(correct);
	modeljsav.displayInit();
	for(var i = 1; i < correct.length; i++) {
	    modelArray.highlight(i);
	    modelArray.unhighlight(i-1);
	    modeljsav.gradeableStep();
	}
	modelArray.highlight();
	modeljsav.gradeableStep();
	return modelArray;
    }
    
    function init() {
	var vars = "uvxyz";
	var numSteps = 4;  // average number of reductions in this exercise
	var e;
	correct = [];
	while (correct.length < numSteps-1 ||
	       correct.length > numSteps+1) {
	    e = L.getRndExp(1,2,4,vars,"");
	    correct = L.reduceToNormalForm(e,"applicative");
	}
	correct = correct.map(function(a) { return a[0]; });
	// jsavArray is used for grading each step
	jsavArray = av.ds.array( 
                correct.map(function (x) { return x.replace(/\s+/g,'');}), 
	    {visible: true});
	$theExpression.html(correct[0]);
	step = 1;
	return jsavArray;
    }
	
	function help() {
	    alert("At each step of the applicative-order reduction, you must" +
		  " pick the leftmost innermost \u03B2-redex and reduce it.");
	}

	function about() {
	    alert("This exercise was developed by David Furcy.\n\nIt is meant" +
		  " to help you demonstrate that you have mastered the" +
		  " process of applicative-order reduction in the" +
		  " \u03BB-calculus.");
	}

	function submit() {
	    var answer = $('#answer').val();	    
	    answer = answer.replace(/\s+/g, '');
	    $('#answer').val("");
	    if(step < correct.length) {
		if(answer === 
		   correct[step].replace(/\s+/g,'').replace(/\u03BB/g,'^')) {
		    jsavArray.highlight(step);
		    jsavArray.unhighlight(step-1);
		    exercise.gradeableStep();
		    $theExpression.html(correct[step]);
		    step++;
		} else{
		    exercise.gradeableStep();
		} 
	    } else {
		exercise.gradeableStep();
	    }
	}
		
	function done() {
	    if(step < correct.length) {
		alert("There are still more reductions to perform.");
		exercise.gradeableStep();
	    } else {
		exercise.gradeableStep();
		alert("There are no more reductions to perform.");
	    }
	}
	
	// Function to fix exercise if an incorrect submission is entered.
	function fixState(modeljsav) {
	    if(step< correct.length) {
		jsavArray.highlight(step);
		jsavArray.unhighlight(step-1);
		$theExpression.html(correct[step]);
		step++;
	    } else {
		alert("There are no more reductions to be done!");
	    }
	}
	
	var exercise = 	av.exercise(modelSolution, init, 
				    { compare: {class: "jsavhighlight"},
				      controls: $('.jsavexercisecontrols'), 
				      fix: fixState });
	exercise.reset();

	$('#help').click(help);
	$('#about').click(about);
	$('#submit').click(submit);
	$('#done').click(done);
});

