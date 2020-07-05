var ExerciseController = function (jsav, fa, filePath, dataType, options, check) {
	this.init(jsav, fa, filePath, dataType, options, check);
};
var controllerProto = ExerciseController.prototype;
var logRecord = new Object();
var tryC = 0;
controllerProto.init = function (jsav, fa, filePath, dataType, options) {
	this.filePath = filePath;
	this.dataType = dataType;
	this.tests;
	this.jsav = jsav;
	this.fa = fa;
	this.currentExercise = 0;
	this.testCases;
	this.initGraph = options.initGraph;
	this.jsav.recorded();
	this.options = options;
}

controllerProto.load = function () {
	var filePath = this.filePath;
	var dataType = this.dataType;
	var tests;

	$.ajax({
		url: filePath,
		crossDomain: true,
		dataType: dataType,
		async: false,
		success: function (data) {
			tests = data;
		}
	});
	this.tests = tests;
	// 0 flag represent regular graph test cases
	// 1 flag represent grammar test cases
	generateTestCase(tests, 0);
	var proto = this;
	$('#testSolution').click(function () {
		proto.startTesting();
	});
	$('#showResult').click(function () {
		alert(JSON.stringify(logRecord));
	});
	$("#testResults").hide();
	this.updateExercise(0);
}

controllerProto.startTesting = function () {
	tryC++;
	if (this.fa.initial == null) {
		window.alert("FA traversal requires an initial state.");
		return 0;
	}
	$("#testResults").empty();
	$("#testResults").append("<tr><td>Test Case</td><td>Standard Result</td><td>Your Result</td></tr>");
	var count = 0;
	var testRes = [];
	//For DFA exercises, we need to check if the machine is a DFA not an NFA.
	var exercise = this.tests[this.currentExercise];
	var type = exercise["type"];
	var numberOfTestCases = this.testCases.length;
	if (type == "description" || type == "both") {
		var t = $("#description").text();
		if (t.indexOf("DFA") > 0 && t.indexOf("NFA") < 0) {
			numberOfTestCases++;
			var isDFA = !this.testND();
			if (isDFA) {
				$("#testResults").append("<tr><td> The answer is a DFA </td><td> Yes </td><td class='correct'>" + (inputResult ? "Yes" : "No") + "</td></tr>");
				count++;
				testRes.push('Test' + testNum + ':' + 'Correct');
			} else {
				$("#testResults").append("<tr><td> The answer is a DFA </td><td> Yes </td><td class='wrong'>" + (inputResult ? "Yes" : "No") + "</td></tr>");
				testRes.push('Test' + testNum + ':' + 'Wrong');
				return 0;
			}
		}
	}
	for (i = 0; i < this.testCases.length; i++) {
		var testNum = i + 1;
		var testCase = this.testCases[i];
		var input = Object.keys(testCase)[0];
		var inputResult;
		if (this.options.type && this.options.type == "TM") {
			var res = this.fa.play(input);
			res = res.split('|')[1].split('|')[0];
			res = res.replace('<mark>', '').replace('</mark>', '');
			var letters = _.uniq(res, false);
			if (letters.length == 1 && letters[0] == square) {
				inputResult = "";
			} else {
				inputResult = res.split(square).filter(function (list) {
					if (list.length > 0)
						return list;
				})[0];
			}
		} else if (this.options.type && this.options.type == "PDA")
			inputResult = PDAwillReject(this.fa, input);
		else
			inputResult = FiniteAutomaton.willReject(this.fa, input);
		var inputOrLambda = input === "" ? lambda : input;
		if (this.options.type && this.options.type == "TM") {
			if (inputResult == testCase[input]) {
				$("#testResults").append("<tr><td>" + inputOrLambda + "</td><td>" + testCase[input] + "</td><td class='correct'>" + inputResult + "</td></tr>");
				count++;
				testRes.push('Test' + testNum + ':' + 'Correct');
			} else {
				$("#testResults").append("<tr><td>" + inputOrLambda + "</td><td>" + testCase[input] + "</td><td class='wrong'>" + inputResult + "</td></tr>");
				testRes.push('Test' + testNum + ':' + 'Wrong');
			}
		} else {
			if (inputResult !== testCase[input]) {
				$("#testResults").append("<tr><td>" + inputOrLambda + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='correct'>" + (inputResult ? "Reject" : "Accept") + "</td></tr>");
				count++;
				testRes.push('Test' + testNum + ':' + 'Correct');
			} else {
				$("#testResults").append("<tr><td>" + inputOrLambda + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='wrong'>" + (inputResult ? "Reject" : "Accept") + "</td></tr>");
				testRes.push('Test' + testNum + ':' + 'Wrong');
			}
		}
	}
	var exer = {};
	exer['Attempt' + tryC.toString()] = testRes;
	exer['studentSolution'] = serialize(this.fa);
	var exNum = parseInt(this.currentExercise) + 1;
	if (count > logRecord['Exercise' + exNum + '_Highest']) {
		logRecord['Exercise' + exNum + '_Highest'] = count;
	}
	logRecord['Exercise' + exNum].push(exer);
	var end = new Date;
	logRecord['Exercise' + exNum + '_Time'].push(end);

	$("#percentage").text("Correct cases: " + count + " / " + numberOfTestCases);
	$("#percentage").show();
	$("#testResults").show();
	window.scrollTo(0, document.body.scrollHeight);
	$('#container').scrollTop($('#container').prop("scrollHeight"));
	if (count === 0)
		return 0;
	return count / numberOfTestCases;
};

// binded with question links at the top of the page
// change the problem displayed
controllerProto.toExercise = function (button) {
	this.currentExercise = button.getAttribute('id');
	this.updateExercise(this.currentExercise);
};

// the function that really changes the problem displayed
// called by toExercise
controllerProto.updateExercise = function (id) {
	var exercise = this.tests[id];
	var type = exercise["type"];
	if (type == "expression") {
		$("#expression").html("<img src='" + latexit + exercise["expression"] + "' border='0'/>");
		$("#question").show();
		$("#description").hide();
	} else if (type == "both") {
		$("#description").html(exercise["description"] + 'L(<span id="expression2"></span>)');
		$("#expression2").html("<img src='" + latexit + exercise["expression"] + "' border='0'/>");
		$("#question").hide();
	} else {
		var text = exercise["description"];
		if (text.indexOf('___') > 0) {
			var parts = text.split("___");
			text = parts[0] + " " + '<span id="expression2"></span>' + ' ' + parts[1];
			$("#description").html(text);
			$("#expression2").html("<img src='" + latexit + exercise["expression"] + "' border='0'/>");
		} else {
			$("#description").text(exercise["description"]);
			$("#description").show();
		}
		$("#question").hide();

	}
	$(".links").removeClass("currentExercise");
	$("#" + this.currentExercise).addClass("currentExercise");
	this.testCases = exercise["testCases"];
	if (!exercise["graph"]) {
		this.fa = this.initGraph({
			graph: {
				"nodes": [],
				"edges": []
			},
			layout: "automatic"
		});
	} else {
		this.fa = this.initGraph({
			graph: exercise["graph"],
			layout: "automatic"
		});
	}
	$("#testResults").hide();
	$("#percentage").hide();
	var exNum = parseInt(this.currentExercise) + 1;
	logRecord['Exercise' + exNum] = [];
	var high = 0;
	// Object.defineProperty(high, 'Highest', {value: 0, writable:true});
	logRecord['Exercise' + exNum + '_Highest'] = [];
	logRecord['Exercise' + exNum + '_Highest'].push(high);
	var start = new Date();
	logRecord['Exercise' + exNum + '_Time'] = [];
	logRecord['Exercise' + exNum + '_Time'].push(start);

};

controllerProto.testND = function () {
	var g = this.fa;
	var nd = false;
	var nodes = g.nodes();
	for (var next = nodes.next(); next; next = nodes.next()) {
		var findLambda = false;
		var findMultiple = false;
		var transition = g.transitionFunction(next, emptystring);
		if (transition.length > 0) {
			findLambda = true;
		}
		for (var key in g.alphabet) {
			// If edges have sequences of input symbols on them, only the first one matters.
			// Reason why is because this is the outgoing edge input symbol for the node.
			transition = g.transitionFunctionMultiple(next, key);
			if (transition.length > 1) {
				findMultiple = true;
				break;
			}
		}
		if (findLambda || findMultiple) {
			nd = true;
		}
	}
	return nd;
};