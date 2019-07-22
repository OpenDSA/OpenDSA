var GrammarExerciseController = function (jsav, m, filePath, dataType) {
	this.init(jsav, m, filePath, dataType);
};
var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var controllerProto = GrammarExerciseController.prototype;
var logRecord = new Object();
var tryC = 0;
controllerProto.init = function (jsav, m, filePath, dataType) {
	this.filePath = filePath;
	this.dataType = dataType;
	this.tests;
	this.currentExercise = 0;
    this.testCases;
    this.grammar = m;//an instance from grammar editor to control the matrix
	this.jsav = jsav;
	this.exerciseFA;
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
		$("#exerciseLinks").append("<a href='#' id='" + i + "' class='links'>" + (i+1) + "</a>");
	}
	var proto = this;
	$('#testSolution').click(function() {
        //we need to read the grammar from the grammarMatrix
        proto.grammar = [];
        for (var i = 0; i < arr.length; i++){
            if(arr[i][0] === "")
                break;
                proto.grammar.push(arr[i]);
        }
		proto.startTesting();
	});
	$('.links').click(function() {
		proto.toExercise(this);
	});
	$('#showResult').click(function () {
		alert(JSON.stringify(logRecord));
	});
	$("#testResults").hide();
	this.updateExercise(this.currentExercise);
}

controllerProto.startTesting = function() {
	tryC++;
	//we need to find an initial test to know if the student has something to test or not
	$("#testResults").empty();
	$("#testResults").append("<tr><td>Test Case</td><td>Standard Result</td><td>Your Result</td></tr>");
	var count = 0;
	var testRes = [];
	var pda, parser;
	var index = 0;
	var firstTestcase = Object.keys(this.testCases[index])[0];
	var correctGrammarType = false,
	grammarType;
	//Check if there is a specific tyoe of grammras is required in the first test case.
	if(firstTestcase.indexOf("regular") >= 0 || firstTestcase.indexOf("linear") >= 0)
	{
		grammarType = this.identifyGrammar();
		if(firstTestcase.indexOf("regular") >= 0){
			correctGrammarType = (grammarType === 'RLG' || grammarType === 'LLG') ;
		}
		else{
			if(firstTestcase.indexOf("right")>=0)
				correctGrammarType = (grammarType === 'RLG');
			else if(firstTestcase.indexOf("left")>=0)
			correctGrammarType = (grammarType === 'LLG');
		}
		if(correctGrammarType){
			$("#testResults").append("<tr><td>" + firstTestcase + "</td><td>" + "Satisfied" + "</td><td class='correct'>" + (correctGrammarType ? "Yes": "No") + "</td></tr>");
			count++;
			testRes.push('Test' + index +':' + 'Correct');
		}
		else{
			$("#testResults").append("<tr><td>" + firstTestcase + "</td><td>" + "Satisfied" + "</td><td class='wrong'>" + (correctGrammarType ? "Yes": "No") + "</td></tr>");
			testRes.push('Test' + index +':' + 'Correct');
		}
		index++;
	}
	//we need to convert the grammar to a PDA to test the grammar.
	if(grammarType !== "LLG")
		parser = new ParseTreeController(this.jsav, JSON.stringify(this.grammar),"", {visible: false});//pda = this.convertToPDA();
	else
		parser = this.buildDFAforLLG();
	for (i = index; i < this.testCases.length; i++) {
		var testNum = i + 1;
		var testCase = this.testCases[i];
        var input = Object.keys(testCase)[0];
		var inputResult;
		if(grammarType !== "LLG"){
			//inputResult = pda.traverseOneInput(input);
			parser.inputString = input;
			inputResult = parser.stringAccepted()[0];
		}
		else{
			
        	inputResult = !willReject(parser, input.split("").reverse().join(""));
		}
		if (inputResult === testCase[input]) {
			$("#testResults").append("<tr><td>" + input + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='correct'>" + (inputResult ? "Accept": "Reject") + "</td></tr>");
			count++;
			testRes.push('Test' + testNum +':' + 'Correct');
		}
		else {
			$("#testResults").append("<tr><td>" + input + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='wrong'>" + (inputResult ? "Accept": "Reject") + "</td></tr>");
			testRes.push('Test' + testNum + ':' + 'Wrong');
		}
	}
	var exer = {};
	exer['Attempt' + tryC.toString()] = testRes;
	exer['studentSolution'] = this.serializeGrammar();//this function is defined inside grammarEditor.js. It serializaes the current grammar
	var exNum = parseInt(this.currentExercise) + 1;
	if (count > logRecord['Exercise' + exNum +'_Highest']) {
	 	logRecord['Exercise' + exNum +'_Highest'] = count;
	}
	logRecord['Exercise' + exNum].push(exer);
	var end = new Date;
	logRecord['Exercise' + exNum + '_Time'].push(end);

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
	//FIXMEEEEEEEEEE we need to control the matrix inside this controller. The best obtion is to creat a prototype for grammar and use it.
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
		var text = exercise["description"];
		if(text.indexOf('___') >0)
		{
			var parts = text.split("___");
			text = parts[0] + " " + '<span id="expression2"></span>' + ' ' + parts[1];
			$("#description").html(text);
			$("#expression2").html("<img src='" + latexit + exercise["expression"] + "' border='0'/>");
		}
		else
			$("#description").text(text);
		$("#description").show();
		$("#question").hide();
	}
	//if the exercise contains a FA, then draw it and show the graph. Hide the graph otherwise
	if(exercise.graph && exercise.graph.nodes.length > 0){//there is a grapth and we need to draw it to the student
		if(!this.exerciseFA){
		this.exerciseFA = this.jsav.ds.FA($.extend({width: "45%", height: 440, layout: "manual", element: $("#graph")}));
		var ratio = 1;
		this.exerciseFA.initFromParsedJSONSource(exercise.graph, ratio);
		document.getElementById("graph").style.float = "left";
		}
		else
			document.getElementById("graph").style.display = "initial";	
			this.exerciseFA.layout();
	}
	else{
		document.getElementById("graph").style.display = "none";
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
controllerProto.convertToPDA = function () {
    var productions = this.grammar;
    this.builtPDA = this.jsav.ds.pda({visible: false});
    var a = this.builtPDA.addNode({visible: false}),
        b = this.builtPDA.addNode({visible: false}),
        c = this.builtPDA.addNode({visible: false});
    this.builtPDA.makeInitial(a);
    c.addClass('final');
    var startVar = productions[0][0];
    this.convertToPDAinLL(a, b, c, productions, startVar);
    return this.builtPDA;
};

controllerProto.convertToPDAinLL = function(a, b, c, productions, startVar) {
    this.builtPDA.addEdge(a, b, {weight: emptystring + ':Z:' + startVar + 'Z', visible: false});
    this.builtPDA.addEdge(b, c, {weight: emptystring + ':Z:' + emptystring, visible: false});
    // add a transition for each terminal
    for (var i = 0; i < productions.length; i++) {
      var t = productions[i][2].split("");
      for (var j = 0; j < t.length; j++) {
        if (variables.indexOf(t[j]) === -1 && t[j] !== emptystring) {
            this.builtPDA.addEdge(b, b, {weight: t[j] + ':' + t[j] + ':' + emptystring});
        }
      }
    }
    var bEdge = this.builtPDA.getEdge(b, b);
    this.pCount = 0;
    for(var i = 0; i< productions.length; i++){
        this.builtPDA.addEdge(b, b, {weight: emptystring + ':' + productions[i][0] + ':' + productions[i][2]});
    }
};
controllerProto.serializeGrammar = function () {
    var productions = this.grammar;
    var text = "";
    for (var i = 0; i < productions.length; i++) {
      text = text + "<production>";
      text = text + "<left>" + productions[i][0] + "</left>";
      text = text + "<right>" + productions[i][2] + "</right>";
      text = text + "</production>";
    }
    return text;
  };

  controllerProto.convertToPDAinLR = function (a, b, c, productions, startVar) {
    this.builtPDA.addEdge(a, b, {weight: emptystring + ':' + startVar + ':' + emptystring});
    this.builtPDA.addEdge(b, c, {weight: emptystring + ':Z:' + emptystring});
    // add a transition for each terminal
    for (var i = 0; i < productions.length; i++) {
      var t = productions[i][2].split("");
      for (var j = 0; j < t.length; j++) {
        if (variables.indexOf(t[j]) === -1 && t[j] !== emptystring) {
            this.builtPDA.addEdge(a, a, {weight: t[j] + ':' + emptystring + ':' + t[j]});
        }
      }
    }
  };

  controllerProto.isRegularGrammar = function(){
    return (this.checkRightLinear() || this.checkLeftLinear());
  };

  controllerProto.checkLeftLinear = function(){
    var productions = _.filter(arr, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      //r is the RHS
      var r = productions[i][2];
      for (var j = 0; j < r.length; j++) {
        if (variables.indexOf(r[j]) !== -1 && j !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  controllerProto.checkRightLinear = function () {
    var productions = _.filter(arr, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      var r = productions[i][2];
      for (var j = 0; j < r.length; j++) {
        if (variables.indexOf(r[j]) !== -1 && j !== r.length - 1) {
          return false;
        }
      }
    }
    return true;
  };

  controllerProto.isContextFreeGrammar = function(){
    var productions = _.filter(arr, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      var lhs = productions[i][0];
      if (lhs.length !== 1 || variables.indexOf(lhs) === -1) {
        return false;
      }
    }
    return true;
  };


  controllerProto.checkLHSVariables = function(){
    //check if there is more than one variable on the LHS
    var productions = _.filter(arr, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      var lhs = productions[i][0];
      if (lhs.length !== 1) {
        return true;
      } else if (variables.indexOf(lhs) === -1){
        return true;
      }
    }
    return false;
  };
  controllerProto.identifyGrammar = function() {

    //Check if there is more than one variable on the LHS, if so it is an unrestricted grammar.
    if(this.checkLHSVariables()){
		return 'unrestricted'; 
    }

    if(this.checkLeftLinear()) {
		return 'LLG';
    }

    if(this.checkRightLinear()) {
		return 'RLG';
    }

    if(this.isContextFreeGrammar()){
		return 'CFG';
    }
  };

  controllerProto.convertLLGtoRLG = function(){
	var productions = _.filter(arr, function(x) { return x[0]});
	for(var i =0; i< productions.length; i++){
		productions[i][2] = productions[i][2].split("").reverse().join("");
	}
	return productions;
  }
  controllerProto.buildDFAforLLG = function(){
	var productions = this.convertLLGtoRLG();
	return this.convertToFA(productions);
	
  }
  
  controllerProto.convertToFA = function (productions) {
    // keep a map of variables to FA states
    var nodeMap = {};
    var builtDFA = this.jsav.ds.FA({visible:false});
    var newStates = [];     // variables
    for (var i = 0; i < productions.length; i++) {
      newStates.push(productions[i][0]);
      newStates = newStates.concat(_.filter(productions[i][2], function(x) {return variables.indexOf(x) !== -1;}));
    }
    newStates = _.uniq(newStates);
    // create FA states
    for (var i = 0; i < newStates.length; i++) {
      var n = builtDFA.addNode();
      nodeMap[newStates[i]] = n;
      if (i === 0) {
        builtDFA.makeInitial(n);
      }
      n.stateLabel(newStates[i]);
    }
    // add final state
    var f = builtDFA.addNode();
    // nodeMap[emptystring] = f;
    f.addClass("final");
    builtDFA.layout();

    var completeConvertToFA = function() {
      for (var i = 0; i < productions.length; i++) {
        // if the current production is not finished yet
          var start = nodeMap[productions[i][0]];
          var rhs = productions[i][2];
          //if there is no capital letter, then go to final state
          if(variables.indexOf(rhs[rhs.length-1]) === -1){
            var end = f;
            var w = rhs;
          } else {
            var end = nodeMap[rhs[rhs.length-1]];
            var w = rhs.substring(0, rhs.length-1);
		  }
		  if(w.length > 1){//we need to add dummy nodes
			var previousNode = start;
			var nextNode = builtDFA.addNode();
			builtDFA.addEdge(previousNode, nextNode, {weight: w[0]});
			for(var l = 1; l< w.length; l++){
				previousNode = nextNode;
				if(l== w.length - 1)
					nextNode = end;
				else
					nextNode = builtDFA.addNode();
				builtDFA.addEdge(previousNode, nextNode, {weight: w[l]});
			}
		  }
		  else{
		  	builtDFA.addEdge(start, end, {weight: w});
		  }
        }
	}
	completeConvertToFA();
	return builtDFA;
  };