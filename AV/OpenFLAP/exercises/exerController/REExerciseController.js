var ExerciseController = function (jsav, fa, filePath, dataType, options, check) {
	this.init(jsav, fa, filePath, dataType, options, check);
};
var controllerProto = ExerciseController.prototype;
var logRecord = new Object();
var tryC = 0;
controllerProto.init = function (jsav, filePath, dataType) {
	this.filePath = filePath;
	this.dataType = dataType;
	this.tests;
	this.jsav = jsav;
	this.fa = null;
	this.currentExercise = 0;
	this.testCases;
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

	for (i = 0; i < this.tests.length; i++) {
		$("#exerciseLinks").append("<a href='#' id='" + i + "' class='links'>" + (i + 1) + "</a>");
	}
	var proto = this;
	/*$('#testSolution').click(function() {Implemented in the REtoFA.js
		proto.startTesting();
	});*/
	$('.links').click(function () {
		proto.toExercise(this);
	});
	$('#showResult').click(function () {
		alert(JSON.stringify(logRecord));
	});
	$("#testResults").hide();
	this.updateExercise(this.currentExercise);
}

controllerProto.startTesting = function (fa, solution) {
	tryC++;
	this.fa = fa;
	$("#testResults").empty();
	$("#testResults").append("<tr><td>Test Case</td><td>Standard Result</td><td>Your Result</td></tr>");
	var count = 0;
	var testRes = [];
	if (solution.indexOf('*') < 0) {
		alert("Your Regular Expression is not generic");
		return 0;
	}
	//For DFA exercises, we need to check if the machine is a DFA not an NFA.
	var exercise = this.tests[this.currentExercise];
	this.fa = FiniteAutomaton.convertNFAtoDFA(this.jsav, this.fa);
	var type = exercise["type"];
	var numberOfTestCases = this.testCases.length;
	for (i = 0; i < this.testCases.length; i++) {
		var testNum = i + 1;
		var testCase = this.testCases[i];
		var input = Object.keys(testCase)[0];
		var inputOrLambda = input === "" ? lambda : input;
		var inputResult = FiniteAutomaton.willReject(this.fa, input);
		if (inputResult !== testCase[input]) {
			$("#testResults").append("<tr><td>" + inputOrLambda + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='correct'>" + (inputResult ? "Reject" : "Accept") + "</td></tr>");
			count++;
			testRes.push('Test' + testNum + ':' + 'Correct');
		} else {
			$("#testResults").append("<tr><td>" + inputOrLambda + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='wrong'>" + (inputResult ? "Reject" : "Accept") + "</td></tr>");
			testRes.push('Test' + testNum + ':' + 'Wrong');
		}
	}
	var exer = {};
	exer['Attempt' + tryC.toString()] = testRes;
	exer['studentSolution'] = solution;
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
	return count / numberOfTestCases;
};

// binded with question links at the top of the page6
// change the problem displayed
controllerProto.toExercise = function (button) {
	this.currentExercise = button.getAttribute('id');
	this.updateExercise(this.currentExercise);
	document.getElementById('tb1').value = "";
};

// the function that really changes the problem displayed
// called by toExercise
controllerProto.updateExercise = function (id) {
	var exercise = this.tests[id];
	var type = exercise["type"];
	this.testCases = exercise["testCases"];
	generateTestCase(exercise, 1);
	if (type == "expression") {
		$("#expression").html("<img src='" + latexit + exercise["expression"] + "' border='0'/>");
		$("#question").show();
		$("#description").hide();
	} else {
		$("#description").text(exercise["description"]);
		$("#description").show();
		$("#question").hide();
	}
	$(".links").removeClass("currentExercise");
	$("#" + this.currentExercise).addClass("currentExercise");
	this.testCases = exercise["testCases"];
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