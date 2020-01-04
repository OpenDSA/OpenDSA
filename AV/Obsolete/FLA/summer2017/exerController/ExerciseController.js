var ExerciseController = function (jsav, fa, filePath, dataType, options) {
	this.init(jsav, fa, filePath, dataType, options);
};
var controllerProto = ExerciseController.prototype;

controllerProto.init = function (jsav, fa, filePath, dataType, options) {
	this.jsav = jsav;
	this.fa = fa;
	this.filePath = filePath;
	this.dataType = dataType;
	this.tests;
	this.currentExercise = 0;
	this.testCases;
	this.initGraph = options.initGraph;
}

controllerProto.load = function () {
	var filePath = this.filePath;
	var dataType = this.dataType;
	var tests;
	$.ajax({
		url: filePath,
		dataType: dataType,
		async: false,
		success: function(data) {
			tests = data;
		}
	});
	this.tests = tests;
	for (i = 0; i < this.tests.length; i++) {
		$("#exerciseLinks").append("<a href='#' id='" + i + "' class='links'>" + (i+1) + "</a>");
	}
	var proto = this;
	$('#begin').click(function() {
		proto.startTesting();
	});
	$('.links').click(function() {
		proto.toExercise(this);
	});
	$("#testResults").hide();
	this.updateExercise(this.currentExercise);
}

controllerProto.startTesting = function() {
	if (this.fa.initial == null) {
		window.alert("FA traversal requires an initial state.");
		return;
	}
	$("#testResults").empty();
	$("#testResults").append("<tr><td>Test Case</td><td>Standard Result</td><td>Your Result</td></tr>");
	var count = 0;
	for (i = 0; i < this.testCases.length; i++) {
		var testCase = this.testCases[i];
		var input = Object.keys(testCase)[0];
		var inputResult = willReject(this.fa, input);
		if (inputResult !== testCase[input]) {
			$("#testResults").append("<tr><td>" + input + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='correct'>" + (inputResult ? "Accept": "Reject") + "</td></tr>");
			count++;
		}
		else {
			$("#testResults").append("<tr><td>" + input + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='wrong'>" + (inputResult ? "Accept": "Reject") + "</td></tr>");
		}
	}
	$("#percentage").text("Correct cases: " + count + " / " + this.testCases.length);
	$("#percentage").show();
	$("#testResults").show();
	window.scrollTo(0,document.body.scrollHeight);
	$('#container').scrollTop($('#container').prop("scrollHeight"));
};

// binded with question links at the top of the page
// change the problem displayed
controllerProto.toExercise = function(button) {
	this.currentExercise = button.getAttribute('id');
	this.updateExercise(this.currentExercise);
};

// the function that really changes the problem displayed
// called by toExercise
controllerProto.updateExercise = function(id) {
	var exercise = this.tests[id];
	var type = exercise["type"];
	if (type == "expression") {
		$("#expression").html("<img src='" + latexit + exercise["expression"] + "' border='0'/>");
		$("#question").show();
		$("#description").hide();
	}
	else {
		$("#description").text(exercise["description"]);
		$("#description").show();
		$("#question").hide();
	}
	$(".links").removeClass("currentExercise");
	$("#" + this.currentExercise).addClass("currentExercise");
	this.testCases = exercise["testCases"];
	if (!exercise["graph"]) {
		this.fa = this.initGraph({graph: {"nodes":[], "edges":[]}, layout: "automatic"});
	} else {
		this.fa = this.initGraph({graph: exercise["graph"], layout: "automatic"});
	}
	$("#testResults").hide();
	$("#percentage").hide();
};
