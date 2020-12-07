var jsav,
		expression, // input by user
		controller, // REtoFA controller object
		controller2, // FAtoRG controller object
		exerciseController,
		pageType; //determine weather the page is an RE exercise or REtoFA

(function($) {
	var start = function() {
		if (localStorage["expression"] && localStorage["expression"] !== "null") {
			expression = localStorage["expression"];
			localStorage["expression"] = null;
		}
		else {
			expression = prompt("Regular Expression:");
		}
		while (!expression) {
			alert("put in something, don't try to trick the program!");
			expression = prompt("Regular Expression:");
		}
		controller = new REtoFAController(jsav, expression, {});	
	}
	var onLoad = function() {
		jsav = new JSAV($("#jsavcontainer"));
		pageType = $('h1').attr('id');
		if(pageType !== "Exercise"){
			start();
			if (!controller) console.log("error! no controller.");
		}
		else{
			$('#av').hide();
			var exerciseLocation = getExerciseLocation();
			exerciseController = new ExerciseController(jsav, exerciseLocation, 'json');
			exerciseController.load();
			var exercise = jsav.flexercise(modelSolution, initialize,
				{feedback: "atend", grader: "finalStep", controls: $(".jsavexercisecontrols"), checkSolutionFunction: testSolution});
				exercise.reset()
		}
		$('#nextStep').click(function() {
			controller.completeStep();
		});
		$('#allSteps').click(function() {
			controller.completeAll();
        });
        $('#toRG').click(function() {
			new_fa = controller.completeAll();
			//localStorage['convertNFA'] = true;
    		//localStorage['toConvert'] = serialize(new_fa);
			//var new_fa2 = new FiniteAutomaton(jsav);
			//new_fa3 = convertToDFA(jsav, new_fa, {width: '45%', height: 440, layout: 'automatic'});
			var variables = "SABCDEFGHIJKLMNOPQRTUVWXYZ";
			var s = new_fa3.initial;
			var newVariables = [s];
			var nodes = new_fa3.nodes();
			var arrow = String.fromCharCode(8594);
			var converted = [];
			// quit if the FA is too large for conversion
			if (new_fa3.nodeCount() > 26) {
			  window.alert('The FA must have at most 26 states to convert it into a grammar!');
			  return;
			}
			for (var next = nodes.next(); next; next = nodes.next()) {
			  if (!next.equals(s)) {
				newVariables.push(next);
			  }
			}
			var finals = [];
			for (var i = 0; i < newVariables.length; i++) {
			  var edges = newVariables[i].getOutgoing();
			  for (var j = 0; j < edges.length; j++) {
				var toVar = variables[newVariables.indexOf(edges[j].end())];
				var weight = edges[j].weight().split("<br>");
				for (var k = 0; k < weight.length; k++) {
				  var terminal = weight[k];
				  if (weight[k] === emptystring) {
					terminal = "";
				  }
				  converted.push([variables[i], arrow, terminal + toVar]);
				}
			  }
			  if (newVariables[i].hasClass('final')) {
				finals.push([variables[i], arrow, emptystring]);
			  }
			}
			converted = converted.concat(finals);
			// save resulting grammar as an array of arrays of strings
			// (same format as how the grammarEditor reads grammars)
			localStorage.clear();
			localStorage.setItem("grammar", JSON.stringify(converted));
			// open grammar
			window.open("./grammarEditor.html");
        });
		$('#layoutButton').click(function() {
			controller.fa.layout();
		});
		$('#export').click(function() {
			controller.exportToFA();
		});
        $('#export').hide();

		$('#testSolution').click(testSolution);
    
    
	}

  var testSolution = function(){
    //we need to write the code to test the entered RE
    expression = document.getElementById('tb1').value;
    if(controller)
      controller.clear();
    controller = new REtoFAController(jsav, expression, false, true, {});
    controller.completeAll();
    this.resultingFA = controller.fa;
    return exerciseController.startTesting(this.resultingFA, expression);
  }
	//Function sent to exercise constructor to initialize the exercise
	function initialize() {
    exerciseController.updateExercise(0);
    document.getElementById('tb1').value = "";
	}
	
	  //Function used by exercise object to show the model answer and to grade the solution by comparing the model answer with student answer.
	  //In our case, we will make this function show the test cases only.
	  function modelSolution(modeljsav) {
		var testCases = exerciseController.tests[0]["testCases"];
		var list = [["Test Number", "Test String", "Accept/Reject"]];
		for (i = 0; i < testCases.length; i++) {
		  var testNum = i + 1;
		  var testCase = testCases[i];
		  var input = Object.keys(testCase)[0];
		  //var inputResult = FiniteAutomaton.willReject(this.fa, input);
		  list.push([testNum, input, testCase[input]]);
		}
		var model = modeljsav.ds.matrix(list);
		//layoutTable(model);
		modeljsav.displayInit();
		return model;
	  } 

	$(document).ready(onLoad);
}(jQuery));
