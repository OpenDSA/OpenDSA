
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
    var correct;

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
	var correct2D = [];
	var step;
	for(var i=0; i<correct.length; i++) {
	    step = LAMBDA.mySplit(correct[i]);
	    if (i==0) {
		step.unshift("Initial &lambda; exp: ");
	    } else{
		step.unshift("Step " + i + ": ");
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
    }
    
    function init() {
	var vars = "uvxyz";
	var numSteps = 4;  // average number of reductions in this exercise
	var e;
	correct = [];
	while (correct.length < numSteps-1 ||
	       correct.length > numSteps+1) {
	    e = L.getRndExp(1,2,5,vars,"");
	    correct = L.reduceToNormalForm(e,"applicative");
	}
	correct = correct.map(function(a) { return a[0]; });
	jsavArray = av.ds.array( correct, {visible: false});
	$theExpression.html(correct[0]);
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
	    var temp = document.getElementById('answer').value;
	    temp = temp.replace(/\s+/g, '');
	    document.getElementById('answer').value = "";
	    if(position < ansArray.length) {
		if(temp == ansArray[position]) {
		    jsavArray.highlight(position);
		    jsavArray.unhighlight(position-1);
		    exercise.gradeableStep();
		    $theExpression.html(initialArray[position]);
		    position++;
		} else{
		    exercise.gradeableStep();
		} 
	    } else {
		exercise.gradeableStep();
	    }
	}
		
	function done() {
	    if(position < ansArray.length) {
		alert("There are still more reductions to be done!");
		exercise.gradeableStep();
	    } else {
		jsavArray.highlight();
		exercise.gradeableStep();
		alert("Congratulations! You've finished!");
	    }
	}
	
	// Function to fix exercise if an incorrect submission is entered.
	function fixState(modeljsav) {
	    if(position < ansArray.length) {
		jsavArray.highlight(position);
		jsavArray.unhighlight(position-1);
		$theExpression.html(initialArray[position]);
		position++;
	    } else {
		jsavArray.highlight();
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

