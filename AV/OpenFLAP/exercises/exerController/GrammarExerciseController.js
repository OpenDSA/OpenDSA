var GrammarExerciseController = function (jsav, m, filePath, dataType) {
  this.init(jsav, m, filePath, dataType);
};
var exerciseLog = {
  errorsCount: 0,
  errorMessages: [],
  numberOfSteps: 0
};
var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var arrow = String.fromCharCode(8594);
var controllerProto = GrammarExerciseController.prototype;
var logRecord = new Object();
var tryC = 0;
var exerciseController;
controllerProto.init = function (jsav, m, filePath, dataType) {
  this.filePath = filePath;
  this.dataType = dataType;
  this.tests;
  this.currentExercise = 0;
  this.testCases;
  this.grammar = m; //an instance from grammar editor to control the matrix
  this.jsav = jsav;
  this.exerciseFA;
  this.testChomskey = false; //Not all transformation exercises will ask for Chomsky
  exerciseController = this;
  this.NoLambda = false;
  this.NoUnit = false;
  this.NoUseless = false;
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
  $("#testTransformation").click(function () {
    proto.testTransformation();
  });

  $("#nextStep").click(function () {
    transformGrammar(proto.jsav, proto.grammar);
    document.getElementById("nextStep").disabled = true;
  });

  $('#testSolution').click(function () {
    //we need to read the grammar from the grammarMatrix
    proto.grammar = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] === "")
        break;
      proto.grammar.push(arr[i]);
    }
    proto.startTesting();
  });
  $('.links').click(function () {
    proto.toExercise(this);
  });
  $('#showResult').click(function () {
    alert(JSON.stringify(logRecord));
  });
  $("#testResults").hide();
  this.updateExercise(this.currentExercise);
}

controllerProto.startTesting = function () {
  if ($('h1').attr('id') === "transformation") { //Grammar transformation exercise
    tryC++;
    if (!this.NoLambda && !this.NoUnit && !this.NoUseless) {
      alert("You did not start the exercise to grade it. Click on Start Grammar Transformation button to start.")
      return 0;
    } else if (!this.NoLambda) {
      alert("Your grammar contains Lambda production(s).");
      exerciseLog.errorMessages.push("You are not Done yet. Your grammar contains Lambda production(s).");
      exerciseLog.errorsCount++;
      return 0;
    } else if (!this.NoUnit) {
      alert("Your grammar contains Unit production(s).");
      exerciseLog.errorMessages.push("You are not Done yet. Your grammar contains Unit production(s).");
      exerciseLog.errorsCount++;
      return 0;
    } else if (!this.NoUseless) {
      alert("Your grammar contains Useless production(s).");
      exerciseLog.errorMessages.push("You are not Done yet. Your grammar contains Useless production(s).");
      exerciseLog.errorsCount++;
      return 0;
    } else if (this.testChomskey && !this.grammerInChomskey) {
      alert("Your grammar is not in CNF.");
      exerciseLog.errorMessages.push("You are not Done yet. Your grammar is not in CNF.");
      exerciseLog.errorsCount++;
      return 0;
    } else {
      $("#testResults").empty();
      $("#testResults").append("<tr><td>Number of incorrect steps</td><td>Error Messages</td></tr>");
      var count = 0;
      var testRes = [];
      if (exerciseLog.errorsCount != 0) {
        $("#testResults").append("<tr><td>" + exerciseLog.errorsCount + "</td><td>" + exerciseLog.errorMessages[0]);
        for (i = 1; i < exerciseLog.errorMessages.length; i++) {
          $("#testResults").append("<tr><td>" + "</td><td>" + exerciseLog.errorMessages[i]);
        }
      }
      var exer = {};
      exer['Attempt' + tryC.toString()] = testRes;
      var exNum = parseInt(this.currentExercise) + 1;
      if (count > logRecord['Exercise' + exNum + '_Highest']) {
        logRecord['Exercise' + exNum + '_Highest'] = count;
      }
      logRecord['Exercise' + exNum].push(exer);
      var end = new Date;
      logRecord['Exercise' + exNum + '_Time'].push(end);

      $("#percentage").text("Correctness: " + exerciseLog.numberOfSteps + " / " + (exerciseLog.numberOfSteps + exerciseLog.errorsCount));
      $("#percentage").show();
      $("#testResults").show();
      window.scrollTo(0, document.body.scrollHeight);
      $('#container').scrollTop($('#container').prop("scrollHeight"));
      if (exerciseLog.numberOfSteps > 0)
        return exerciseLog.numberOfSteps / (exerciseLog.numberOfSteps + exerciseLog.errorsCount);
      else
        return 0;
    }
  } else { //Writing grammar exercise
    tryC++;
    var productions = _.filter(arr, function (x) {
      return x[0]
    });
    if (productions.length == 0) {
      alert("No Grammar to grade");
      return 0;
    }
    //we need to find an initial test to know if the student has something to test or not
    $("#testResults").empty();
    $("#testResults").append("<tr><td>Test Case</td><td>Standard Result</td><td>Your Result</td></tr>");
    var count = 0;
    var testRes = [];
    var pda, parser;
    var index = 0;
    var firstTestcase = Object.keys(this.testCases[index])[0];
    var correctGrammarType = false,
      grammarType = this.identifyGrammar();
    var numberOfTestCases = this.testCases.length;
    if (grammarType == 'unrestricted') {
      alert("Incorrect Grammar.");
      return 0;
    }
    //Check if there is a specific tyoe of grammras is required in the first test case.
    if (firstTestcase.indexOf("regular") >= 0 || firstTestcase.indexOf("linear") >= 0) {
      grammarType = this.identifyGrammar();
      if (firstTestcase.indexOf("regular") >= 0) {
        correctGrammarType = (grammarType === 'RLG' || grammarType === 'LLG');
      } else {
        if (firstTestcase.indexOf("right") >= 0)
          correctGrammarType = (grammarType === 'RLG');
        else if (firstTestcase.indexOf("left") >= 0)
          correctGrammarType = (grammarType === 'LLG');
      }
      if (correctGrammarType) {
        $("#testResults").append("<tr><td>" + firstTestcase + "</td><td>" + "Satisfied" + "</td><td class='correct'>" + (correctGrammarType ? "Yes" : "No") + "</td></tr>");
        count++;
        testRes.push('Test' + index + ':' + 'Correct');
      } else {
        $("#testResults").append("<tr><td>" + firstTestcase + "</td><td>" + "Satisfied" + "</td><td class='wrong'>" + (correctGrammarType ? "Yes" : "No") + "</td></tr>");
        testRes.push('Test' + index + ':' + 'Correct');
        $("#testResults").show();
        return 0;
      }
      index++;
    }
    //we need to convert the grammar to a PDA to test the gramm a PDA to test the grammar.
    if (grammarType !== "LLG")
      parser = new ParseTreeController(this.jsav, JSON.stringify(arr), "", {
        visible: false
      }); //pda = this.convertToPDA();
    else
      parser = this.buildDFAforLLG();
    for (i = index; i < this.testCases.length; i++) {
      var testNum = i + 1;
      var testCase = this.testCases[i];
      var input = Object.keys(testCase)[0];
      var inputResult;
      if (grammarType !== "LLG") {
        //inputResult = pda.traverseOneInput(input);
        parser.inputString = input;
        inputResult = parser.stringAccepted()[0];
      } else {

        inputResult = !FiniteAutomaton.willReject(parser, input.split("").reverse().join(""));
      }
      var inputOrLambda = input === "" ? lambda : input;
      if (inputResult === testCase[input]) {
        $("#testResults").append("<tr><td>" + inputOrLambda + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='correct'>" + (inputResult ? "Accept" : "Reject") + "</td></tr>");
        count++;
        testRes.push('Test' + testNum + ':' + 'Correct');
      } else {
        $("#testResults").append("<tr><td>" + inputOrLambda + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='wrong'>" + (inputResult ? "Accept" : "Reject") + "</td></tr>");
        testRes.push('Test' + testNum + ':' + 'Wrong');
      }
    }
    var exer = {};
    exer['Attempt' + tryC.toString()] = testRes;
    exer['studentSolution'] = this.serializeGrammar(); //this function is defined inside grammarEditor.js. It serializaes the current grammar
    var exNum = parseInt(this.currentExercise) + 1;
    if (count > logRecord['Exercise' + exNum + '_Highest']) {
      logRecord['Exercise' + exNum + '_Highest'] = count;
    }
    logRecord['Exercise' + exNum].push(exer);
    var end = new Date;
    logRecord['Exercise' + exNum + '_Time'].push(end);

    $("#percentage").text("Correct cases: " + count + " / " + this.testCases.length);
    $("#percentage").show();
    $("#testResults").show();
    window.scrollTo(0, document.body.scrollHeight);
    $('#container').scrollTop($('#container').prop("scrollHeight"));
    if (count === 0)
      return 0;
    return count / numberOfTestCases;
  }
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
  this.testCases = exercise["testCases"];
  generateTestCase(exercise, 1);
  this.testChomskey = Object.keys(this.testCases[this.testCases.length - 1])[0] === 'CNF'; //identify weather studetns shoud transform the grammar to CNF or Not
  var type = exercise["type"];
  if (type == "expression") {
    $("#expression").html("<img src='" + latexit + exercise["expression"] + "' border='0'/>");
    $("#question").show();
    $("#description").hide();
  } else {
    var text = exercise["description"];
    if (text.indexOf('___') > 0) {
      var parts = text.split("___");
      text = parts[0] + " " + '<span id="expression2"></span>' + ' ' + parts[1];
      $("#description").html(text);
      $("#expression2").html("<img src='" + latexit + exercise["expression"] + "' border='0'/>");
    } else
      $("#description").text(text);
    $("#description").show();
    $("#question").hide();
  }
  //if the exercise contains a FA, then draw it and show the graph. Hide the graph otherwise
  if (exercise.graph && exercise.graph.nodes.length > 0) { //there is a grapth and we need to draw it to the student
    if (!this.exerciseFA) {
      this.exerciseFA = this.jsav.ds.FA($.extend({
        width: "45%",
        height: 440,
        layout: "manual",
        element: $("#graph")
      }));
      var ratio = 1;
      this.exerciseFA.initFromParsedJSONSource(exercise.graph, ratio);
      document.getElementById("graph").style.float = "left";
    } else
      document.getElementById("graph").style.display = "initial";
    this.exerciseFA.layout();
  } else
    document.getElementById("graph").style.display = "none";

  if (exercise.grammar && exercise.grammar.length > 0) { //the json file include a grammar. Load it and show it
    //if(!exercise.exerciseGrammarObject || (exercise.exerciseGrammarObject&& exercise.exerciseGrammarObject.productions.length === 0)){
    clearView(this.jsav);
    exercise["exerciseGrammarObject"] = new GrammarMatrix(this.jsav, null, {
      style: "table"
    });
    for (var index = 0; index < exercise.grammar.length; index++) {
      var prodctionRule = exercise.grammar[index];
      exercise["exerciseGrammarObject"].addNewProductionRule([prodctionRule.left, arrow, prodctionRule.right]);
    }

    for (var i = 0; i < this.tests.length; i++)
      if (i != id && this.tests[i].exerciseGrammarObject)
        this.tests[i].exerciseGrammarObject.hide();
    /*}
    else{
      for(var i = 0; i < this.tests.length; i++)
        if(i != id && this.tests[i].exerciseGrammarObject)
          this.tests[i].exerciseGrammarObject.hide();
    }*/
    this.grammar = exercise.exerciseGrammarObject;
    this.grammar.show();
    arr = this.grammar.getProductions();
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
var clearView = function (jsav) {
  document.getElementById("nextStep").disabled = false;
  //If there are other matrices we need to remove them
  jsav.umsg("");
  var others = document.getElementsByClassName("jsavmatrix");
  while (others[0])
    others[0].remove();
  others = document.getElementsByClassName("jsavgraph");
  while (others[0])
    others[0].remove();
  ///////////////////
}
controllerProto.convertToPDA = function () {
  var productions = this.grammar;
  this.builtPDA = this.jsav.ds.pda({
    visible: false
  });
  var a = this.builtPDA.addNode({
      visible: false
    }),
    b = this.builtPDA.addNode({
      visible: false
    }),
    c = this.builtPDA.addNode({
      visible: false
    });
  this.builtPDA.makeInitial(a);
  c.addClass('final');
  var startVar = productions[0][0];
  this.convertToPDAinLL(a, b, c, productions, startVar);
  return this.builtPDA;
};

controllerProto.convertToPDAinLL = function (a, b, c, productions, startVar) {
  this.builtPDA.addEdge(a, b, {
    weight: emptystring + ':Z:' + startVar + 'Z',
    visible: false
  });
  this.builtPDA.addEdge(b, c, {
    weight: emptystring + ':Z:' + emptystring,
    visible: false
  });
  // add a transition for each terminal
  for (var i = 0; i < productions.length; i++) {
    var t = productions[i][2].split("");
    for (var j = 0; j < t.length; j++) {
      if (variables.indexOf(t[j]) === -1 && t[j] !== emptystring) {
        this.builtPDA.addEdge(b, b, {
          weight: t[j] + ':' + t[j] + ':' + emptystring
        });
      }
    }
  }
  var bEdge = this.builtPDA.getEdge(b, b);
  this.pCount = 0;
  for (var i = 0; i < productions.length; i++) {
    this.builtPDA.addEdge(b, b, {
      weight: emptystring + ':' + productions[i][0] + ':' + productions[i][2]
    });
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
  this.builtPDA.addEdge(a, b, {
    weight: emptystring + ':' + startVar + ':' + emptystring
  });
  this.builtPDA.addEdge(b, c, {
    weight: emptystring + ':Z:' + emptystring
  });
  // add a transition for each terminal
  for (var i = 0; i < productions.length; i++) {
    var t = productions[i][2].split("");
    for (var j = 0; j < t.length; j++) {
      if (variables.indexOf(t[j]) === -1 && t[j] !== emptystring) {
        this.builtPDA.addEdge(a, a, {
          weight: t[j] + ':' + emptystring + ':' + t[j]
        });
      }
    }
  }
};

controllerProto.isRegularGrammar = function () {
  return (this.checkRightLinear() || this.checkLeftLinear());
};

controllerProto.checkLeftLinear = function () {
  var productions = _.filter(arr, function (x) {
    return x[0]
  });
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
  var productions = _.filter(arr, function (x) {
    return x[0]
  });
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

controllerProto.isContextFreeGrammar = function () {
  var productions = _.filter(arr, function (x) {
    return x[0]
  });
  for (var i = 0; i < productions.length; i++) {
    var lhs = productions[i][0];
    if (lhs.length !== 1 || variables.indexOf(lhs) === -1) {
      return false;
    }
  }
  return true;
};


controllerProto.checkLHSVariables = function () {
  //check if there is more than one variable on the LHS
  var productions = _.filter(arr, function (x) {
    return x[0]
  });
  for (var i = 0; i < productions.length; i++) {
    var lhs = productions[i][0];
    if (lhs.length !== 1) {
      return true;
    } else if (variables.indexOf(lhs) === -1) {
      return true;
    }
  }
  return false;
};
controllerProto.identifyGrammar = function () {

  //Check if there is more than one variable on the LHS, if so it is an unrestricted grammar.
  if (this.checkLHSVariables()) {
    return 'unrestricted';
  }

  if (this.checkLeftLinear()) {
    return 'LLG';
  }

  if (this.checkRightLinear()) {
    return 'RLG';
  }

  if (this.isContextFreeGrammar()) {
    return 'CFG';
  }
};

controllerProto.convertLLGtoRLG = function () {
  var productions = _.filter(arr, function (x) {
    return x[0]
  });
  var newProductions = [];
  for (var i = 0; i < productions.length; i++) {
    newProductions.push([productions[i][0], arrow, productions[i][2]])
  }
  for (var i = 0; i < newProductions.length; i++) {
    newProductions[i][2] = newProductions[i][2].split("").reverse().join("");
  }
  return newProductions;
}
controllerProto.buildDFAforLLG = function () {
  var productions = this.convertLLGtoRLG();
  return this.convertToFA(productions);

}

controllerProto.convertToFA = function (productions) {
  // keep a map of variables to FA states
  var nodeMap = {};
  var builtDFA = this.jsav.ds.FA({
    visible: false
  });
  var newStates = []; // variables
  for (var i = 0; i < productions.length; i++) {
    newStates.push(productions[i][0]);
    newStates = newStates.concat(_.filter(productions[i][2], function (x) {
      return variables.indexOf(x) !== -1;
    }));
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

  var completeConvertToFA = function () {
    for (var i = 0; i < productions.length; i++) {
      // if the current production is not finished yet
      var start = nodeMap[productions[i][0]];
      var rhs = productions[i][2];
      //if there is no capital letter, then go to final state
      if (variables.indexOf(rhs[rhs.length - 1]) === -1) {
        var end = f;
        var w = rhs;
      } else {
        var end = nodeMap[rhs[rhs.length - 1]];
        var w = rhs.substring(0, rhs.length - 1);
      }
      if (w.length > 1) { //we need to add dummy nodes
        var previousNode = start;
        var nextNode = builtDFA.addNode();
        builtDFA.addEdge(previousNode, nextNode, {
          weight: w[0]
        });
        for (var l = 1; l < w.length; l++) {
          previousNode = nextNode;
          if (l == w.length - 1)
            nextNode = end;
          else
            nextNode = builtDFA.addNode();
          builtDFA.addEdge(previousNode, nextNode, {
            weight: w[l]
          });
        }
      } else {
        builtDFA.addEdge(start, end, {
          weight: w
        });
      }
    }
  }
  completeConvertToFA();
  return builtDFA;
};

controllerProto.testTransformation = function () {
  tryC++;
  $("#testResults").empty();
  $("#testResults").append("<tr><td>Number of incorrect steps</td><td>Error Messages</td></tr>");
  var count = 0;
  var testRes = [];
  if (exerciseLog.errorsCount != 0) {
    $("#testResults").append("<tr><td>" + exerciseLog.errorsCount + "</td><td>" + exerciseLog.errorMessages[0]);
    for (i = 1; i < exerciseLog.errorMessages.length; i++) {
      $("#testResults").append("<tr><td>" + "</td><td>" + exerciseLog.errorMessages[i]);
    }
  }
  var exer = {};
  exer['Attempt' + tryC.toString()] = testRes;
  exer['studentSolution'] = serialize(studentSolution);
  var exNum = parseInt(this.currentExercise) + 1;
  if (count > logRecord['Exercise' + exNum + '_Highest']) {
    logRecord['Exercise' + exNum + '_Highest'] = count;
  }
  logRecord['Exercise' + exNum].push(exer);
  var end = new Date;
  logRecord['Exercise' + exNum + '_Time'].push(end);

  $("#percentage").text("Correctness: " + exerciseLog.numberOfSteps + " / " + (exerciseLog.numberOfSteps + exerciseLog.errorsCount));
  $("#percentage").show();
  $("#testResults").show();
  window.scrollTo(0, document.body.scrollHeight);
  $('#container').scrollTop($('#container').prop("scrollHeight"));
}
var transformGrammar = function (jsav, grammar) {
  if (typeof getCombinations === "undefined") {
    console.error("No generator support.");
    return;
  }
  var productions = grammar.getProductions();
  if (productions.length === 0) {
    alert('No grammar.');
    return;
  }
  // apply each transformation to the original grammar to find which step to start with
  var noLambda = removeLambda(productions);
  var noUnit = removeUnit(productions);
  var noUseless = removeUseless(productions);
  var fullChomsky = convertToChomsky(grammar.getProductions());
  var strP = _.map(productions, function (x) {
    return x.join('');
  });
  // store original grammar for reloading later
  backup = "" + strP;

  if (!checkTransform(strP, noLambda)) {
    interactableLambdaTransform(jsav, grammar, noLambda);
  } else if (!checkTransform(strP, noUnit)) {
    exerciseController.NoLambda = true; //calling unit means that no need to remove lambda productions
    interactableUnitTransform(jsav, grammar, noUnit);
  } else if (!checkTransform(strP, noUseless)) {
    exerciseController.NoLambda = true; //calling useless means that no need to remove lambda productions
    exerciseController.NoUnit = true; //calling useless means that no need to remove Unit productions
    interactableUselessTransform(jsav, grammar, noUseless);
  } else if (exerciseController.testChomskey && !checkTransform(strP, fullChomsky)) {
    exerciseController.NoLambda = true; //calling chomskey means that no need to remove lambda productions
    exerciseController.NoUnit = true; //calling chomskey means that no need to remove Unit productions
    exerciseController.NoUseless = true;
    interactableChomsky(jsav, grammar, fullChomsky);
  } else {
    backup = null;
    jsav.umsg('Grammar already in Chomsky Normal Form.');
    exerciseController.grammerInChomskey = true;
    return true;
  }
  /*noUseless = removeUseless(noUnit.map(function(x){return [x.split(arrow)[0], arrow, x.split(arrow)[1]]}));
  fullChomsky = convertToChomsky(noUseless.map(function(x){return [x.split(arrow)[0], arrow, x.split(arrow)[1]]}));
  grammar = new GrammarMatrix(jsav, noUseless.map(function(x){return [x.split(arrow)[0], arrow, x.split(arrow)[1]]}));
  interactableChomsky(jsav, grammar, fullChomsky.map(function(x){return [x.split(arrow)[0], arrow, x.split(arrow)[1]]}))*/
};

var interactableLambdaTransform = function (jsav, grammar, noLambda) {
  var productions = grammar.getProductions();
  startParse(grammar);
  $('.jsavcontrols').hide();
  $(grammar.element).css("margin-left", "auto");
  var derivers = {}; // variables that derive lambda
  var counter = 0;
  // find lambda-deriving variables
  while (removeLambdaHelper(derivers, productions)) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
  };
  var transformed = noLambda; // the finished transformation, as a reference
  var tArr = [].concat(productions); // the transformed grammar, for the user to finish
  tArr.push(["", arrow, ""]);
  var builtLambdaSet = []; // the set of lambda-deriving variables, for the user to create
  // handler for the table for finding the lambda-deriving variables
  var findLambdaHandler = function (index) {
    for (var i = 0; i < this._arrays.length; i++) {
      this.unhighlight(i);
    }
    this.highlight(index);
    var vv = this.value(index, 0);
    var found = builtLambdaSet.indexOf(vv);
    if ((vv in derivers) && found === -1) {
      builtLambdaSet.push(vv);
      jsav.umsg(vv + ' added! Set that derives ' + emptystring + ': [' + builtLambdaSet + ']');
      if (builtLambdaSet.length === Object.keys(derivers).length) {
        for (var i = 0; i < m._arrays.length; i++) {
          m.unhighlight(i);
        }
        m.element.off();
        continueLambda();
      }
    } else if (!(vv in derivers)) {
      jsav.umsg(vv + ' does not derive ' + emptystring + '. Set that derives ' + emptystring + ': [' + builtLambdaSet + ']');
    } else if (found !== -1) {
      jsav.umsg(vv + ' already selected! Set that derives ' + emptystring + ': [' + builtLambdaSet + ']');
    }
  };
  // handler for the table for removing lambda-productions and adding equivalent productions
  var removeLambdaHandler = function (index, index2) {
    if (this.value(index, 0)) {
      if (this.value(index, 2) === emptystring) {
        tArr.splice(index, 1);
        // creating the new table before deleting the previous one keeps the window in the same position
        var tempG = jsav.ds.matrix(tArr);
        tGrammar.clear();
        tGrammar = tempG;
        layoutTable(tGrammar, 2);
        //tGrammar = jsav.ds.matrix(tArr, {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
        tGrammar.click(removeLambdaHandler);
      } else {
        alert('This production should not be deleted.');
        exerciseLog.errorMessages.push("Removing a production that is not a lambda production");
        exerciseLog.errorsCount++;
        return;
      }
    } else {
      var input1 = prompt('Left side?');
      if (!input1) {
        return;
      }
      var input2 = prompt('Right side?');
      if (!input2) {
        return;
      }
      var toAdd = input1 + arrow + input2;
      if (transformed.indexOf(toAdd) === -1) {
        alert('This production is not part of the reformed grammar.');
        exerciseLog.errorMessages.push(toAdd + " is not part of the reformed grammar.");
        exerciseLog.errorsCount++;
        return;
      }
      if (_.map(tArr, function (x) {
          return x.join('');
        }).indexOf(toAdd) !== -1) {
        alert('This production is already in the grammar.');
        exerciseLog.errorMessages.push(toAdd + " is already in the grammar.");
        exerciseLog.errorsCount++;
        return;
      }
      tArr[index] = [input1, arrow, input2];
      tArr.push(["", arrow, ""]);
      exerciseLog.numberOfSteps++;
      var tempG = jsav.ds.matrix(tArr);
      tGrammar.clear();
      tGrammar = tempG;
      layoutTable(tGrammar, 2);
      //tGrammar = jsav.ds.matrix(tArr, {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      tGrammar.click(removeLambdaHandler);
    }
    if (tArr.length - 1 === transformed.length && !_.find(tArr, function (x) {
        return x[2] === emptystring
      })) {
      var confirmed = confirm('Grammar completed; export?');
      exerciseController.NoLambda = true;
      exerciseLog.numberOfSteps++;
      // if export, open the completed grammar in a new tab
      if (confirmed) {
        localStorage['grammar'] = transformed;
        window.open('grammarTest.html', '');
      }
      arr = tArr;
      lastRow = arr.length - 1;
      // check which step to proceed to
      if (!tArr[0][0]) {
        jsav.umsg("Null start variable; transformation finished.");
        return;
      }
      var strT = _.map(tArr, function (x) {
        return x.join('')
      });
      var noUnit = removeUnit(strT);
      if (!checkTransform(strT, noUnit)) {
        interactableUnitTransform(grammar, noUnit);
        return;
      }
      var noUseless = removeUseless(tArr);
      if (!checkTransform(strT, noUseless)) {
        exerciseController.NoUnit = true;
        interactableUselessTransform(grammar, noUseless);
        return;
      }
      var fullChomsky = convertToChomsky(tArr);
      if (exerciseController.testChomskey && !checkTransform(strT, fullChomsky)) {
        exerciseController.NoLambda = true;
        exerciseController.NoUnit = true;
        exerciseController.NoUseless = true;
        interactableChomsky(grammar, fullChomsky);
        return;
      } else {
        jsav.umsg("Grammar transformation finished.");
        exerciseLog.numberOfSteps++;
      }
    }
  };
  // transition from finding lambda-deriving variables to modifying the grammar
  var continueLambda = function () {
    jsav.umsg("Modify the grammar to remove " + emptystring + ". Set that derives " + emptystring + ": [" + builtLambdaSet + ']');
    //$(m.element).css("margin-left", "50px");
    tGrammar = jsav.ds.matrix(tArr);
    layoutTable(tGrammar, 2);
    //tGrammar = jsav.ds.matrix(tArr, {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
    tGrammar.click(removeLambdaHandler);
  };
  m.click(findLambdaHandler);
  jsav.umsg("Removing " + emptystring + "-productions: Select variables that derive " + emptystring + ".");
};

var interactableUnitTransform = function (jsav, grammar, noUnit) {
  var productions = grammar.getProductions();
  //startParse(grammar);
  $('.jsavcontrols').hide();
  var v = grammar.getGrammarVariables();
  //$(grammar.element).css("margin-left", "auto");
  var OStype = window.navigator.platform.toLowerCase();

  var modelDFA = jsav.ds.graph({
    position: "relative",
    layout: "layered",
    directed: true
  }); //VDG
  if (OStype.indexOf('mac') > -1) {
    modelDFA.getSvg().canvas.style.position = "relative";
  } else
    modelDFA.getSvg().canvas.style.position = "absolute";
  for (var i = 0; i < v.length; i++) {
    modelDFA.addNode(v[i]);
  }
  modelDFA.layout();
  var unitProductions = grammar.getUnitProductions();
  var selectedNode = null;
  // handler for the VDG for adding transitions
  var unitVdgHandler = function () {
    this.highlight();
    if (selectedNode) {
      var self = this;
      if (selectedNode.value() === this.value()) {
        selectedNode.unhighlight();
        self.unhighlight();
        selectedNode = null;
        return;
      }
      if (_.find(unitProductions, function (x) {
          return x[0] === selectedNode.value() && x[2] === self.value();
        })) {
        var newEdge = modelDFA.addEdge(selectedNode, self);
        if (newEdge) {
          modelDFA.layout();
        }
        jsav.umsg('Transition added.');
        exerciseLog.numberOfSteps++;
        if (modelDFA.edgeCount() === unitProductions.length) {
          modelDFA.element.off();
          selectedNode.unhighlight();
          self.unhighlight();
          selectedNode = null;
          continueUnit();
          return;
        }
      } else {
        jsav.umsg('Transition is not part of VDG.');
        exerciseLog.errorMessages.push('Transition ' + selectedNode.value() + arrow + self.value() + ' is not part of Directed Graph.');
        exerciseLog.errorsCount++;
      }
      selectedNode.unhighlight();
      self.unhighlight();
      selectedNode = null;
    } else {
      selectedNode = this;
    }
  };
  grammar.addEmptyRow();

  // handler for the table for removing unit productions and adding equivalent productions
  var removeUnitHandler = function (index, index2, e) {
    if (this.value(index, 0)) {
      // delete production
      if (this.value(index, 2).length === 1 && variables.indexOf(this.value(index, 2)) !== -1) {
        this.removeProduction(index);
      } else {
        alert('This production should not be deleted.');
        exerciseLog.errorMessages.push("Attepmt to remove " + this.value(index, 0) + arrow + this.value(index, 2) + " which is not a unit production");
        exerciseLog.errorsCount++;
        return;
      }
    } else {
      var input1 = prompt('Left side?');
      if (!input1) {
        return;
      }
      var input2 = prompt('Right side?');
      if (!input2) {
        return;
      }
      /*
      var toAdd = input1 + arrow + input2;
      if (noUnit.indexOf(toAdd) === -1) {
        alert('This production is not part of the reformed grammar.');
        return;
      } if (this.findProduction(toAdd)) {
        alert('This production is already in the grammar.');
        return;
      }
      this.addNewProductionRule([input1, arrow, input2]);
      this.layout();
      */
      addProductionsToGrammar(input1, input2, this, noUnit);
    }
    this.layout();
    var tArr = this.getProductions();
    if (tArr.length === noUnit.length && !_.find(tArr, function (x) {
        return x[2].length === 1 && variables.indexOf(x[2]) !== -1
      })) {
      alert("All Unit productions are removed.")
      exerciseController.NoUnit = true;
      if (!grammar.value(0, 0)) { //check to see if there is a start variable
        jsav.umsg("Null start variable; transformation finished.");
        return;
      }
      var strT = _.map(tArr, function (x) {
        return x.join('')
      });
      var noUseless = removeUseless(tArr);
      modelDFA.clear();
      grammar.clear();
      if (!checkTransform(strT, noUseless)) {
        interactableUselessTransform(jsav, this, noUseless);
        return;
      }
      var fullChomsky = convertToChomsky(tArr);
      if (exerciseController.testChomskey && !checkTransform(strT, fullChomsky)) {
        this.element.remove(); //clear the existing matrix
        exerciseController.NoLambda = true;
        exerciseController.NoUnit = true;
        exerciseController.NoUseless = true;
        interactableChomsky(jsav, this, fullChomsky);
        return;
      } else {
        jsav.umsg("Grammar transformation finished.");
      }
    }
  };
  // transition from creating VDG to modifying the grammar
  var continueUnit = function () {
    jsav.umsg('Modify the grammar to remove unit productions. Click on unit productions to remove them and click on the empty row to add new productions.');
    var tGrammar = new GrammarMatrix(jsav, grammar.getProductions());
    tGrammar.layout();
    //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, anchor: "left bottom", myAnchor: "left top"});
    tGrammar.click(removeUnitHandler);
    //$('.jsavcanvas').height(modelDFA.element.height() + 150 + tGrammar.element.height());
  };
  jsav.umsg('Removing unit productions: Complete unit production visualization by adding edges to indicate rules between variables.');
  modelDFA.click(unitVdgHandler);
};

var interactableUselessTransform = function (jsav, grammar, noUseless) {
  var productions = grammar.getProductions();
  startParse(grammar);
  //$('.jsavcontrols').hide();
  //$(m.element).css("margin-left", "auto");

  var derivers = {}; // variables that derive a string of terminals
  var counter = 0;
  while (findDerivable(derivers, productions)) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
  };
  var builtDeriveSet = []; // set of terminal-deriving variables, for the user to create
  // handler for the table for finding terminal-deriving variables
  var findDeriveHandler = function (index) {
    this.unhighlight();
    this.highlight(index);
    var vv = this.value(index, 0);
    var found = builtDeriveSet.indexOf(vv);
    if ((vv in derivers) && found === -1) {
      builtDeriveSet.push(vv);
      jsav.umsg(vv + ' added! Variables that predicate terminals: [' + builtDeriveSet + ']');
      exerciseLog.numberOfSteps++;
      if (builtDeriveSet.length === Object.keys(derivers).length) {
        this.unhighlight();
        this.element.off();
        continueUseless();
      }
    } else if (!(vv in derivers)) {
      jsav.umsg(vv + ' does not predicate terminals. Variables that predicate terminals: [' + builtDeriveSet + ']');
      exerciseLog.errorMessages.push("Mistakebly consider " + vv + " as variable that predicts a terminal.")
      exerciseLog.errorsCount++;
    } else if (found !== -1) {
      jsav.umsg(vv + ' already selected! Variables that predicate terminals: [' + builtDeriveSet + ']');
      exerciseLog.errorMessages.push("Mistakebly select " + vv + " more than once as a variable that predict a terminal.")
      exerciseLog.errorsCount++;
    }
  };
  // handler for the table for removing unreachable productions
  var removeUselessHandler = function (index, index2, e) {
    if (this.value(index, 0)) {
      if (noUseless.indexOf(this.value(index, 0) + arrow + this.value(index, 2)) === -1) {
        tArr.splice(index, 1);
        this.removeProduction(index);
      } else {
        alert('This production should not be deleted.');
        exerciseLog.errorMessages.push("Attempt to remove " + this.value(index, 0) + arrow + this.value(index, 2) + ". But it is not a useless production.");
        exerciseLog.errorsCount++;
        return;
      }
    }
    if (tArr.length - 1 === noUseless.length && !_.find(tArr, function (x) {
        return x[2].length === 1 && variables.indexOf(x[2]) !== -1
      })) {
      alert('Grammar has no more useless productions.');
      exerciseController.NoUseless = true;
      exerciseLog.numberOfSteps++;
      if (!tArr[0][0]) {
        jsav.umsg("Null start variable; transformation finished.");
        return;
      }
      var strT = _.map(tArr, function (x) {
        return x.join('')
      });
      var fullChomsky = convertToChomsky(tArr);
      this.element.remove();
      if (exerciseController.testChomskey && !checkTransform(strT, fullChomsky)) {
        exerciseController.NoLambda = true;
        exerciseController.NoUnit = true;
        exerciseController.NoUseless = true;
        interactableChomsky(jsav, this, fullChomsky);
        return;
      } else {
        jsav.umsg("Grammar transformation finished.");
      }
    }
  };

  var tArr = grammar.getProductions();
  tArr = _.filter(tArr, function (x) {
    return x[0] in derivers && _.every(x[2], function (y) {
      return variables.indexOf(y) === -1 || y in derivers
    });
  });
  tArr.push(["", arrow, ""]);
  // find transitions of the VDG
  var tProductions = {};
  for (var i = 0; i < productions.length; i++) {
    var vv = productions[i][0];
    var r = productions[i][2];
    if (vv in derivers) {
      if (!(vv in tProductions)) {
        tProductions[vv] = [];
      }
      for (var j = 0; j < r.length; j++) {
        if (variables.indexOf(r[j]) !== -1 && tProductions[vv].indexOf(r[j]) === -1) {
          if (r[j] !== vv && r[j] in derivers) {
            tProductions[vv].push(r[j]);
          }
        }
      }
    }
  }
  var tCount = 0;
  for (var i in tProductions) {
    tCount = tCount + tProductions[i].length;
  }
  selectedNode = null;
  // handler for the VDG for adding transitions
  var uselessVdgHandler = function () {
    this.highlight();
    if (selectedNode) {
      var self = this;
      if (selectedNode.value() === this.value()) {
        selectedNode.unhighlight();
        self.unhighlight();
        selectedNode = null;
        return;
      }
      if (_.find(productions, function (x) {
          return x[0] === selectedNode.value() && x[2].indexOf(self.value()) !== -1;
        })) {
        var newEdge = modelDFA.addEdge(selectedNode, self);
        if (newEdge) {
          modelDFA.layout();
        }
        jsav.umsg('Transition added.');
        exerciseLog.numberOfSteps++;
        if (modelDFA.edgeCount() === tCount) {
          modelDFA.element.off();
          selectedNode.unhighlight();
          self.unhighlight();
          selectedNode = null;
          continueUselessSecond();
          return;
        }
      } else {
        jsav.umsg('Transition is not part of VDG.');
        exerciseLog.errorMessages.push("Attempt to add an edge " + selectedNode.value() + arrow + self.value() + " to the useless productions dependency graph.");
        exerciseLog.errorsCount++;
      }
      selectedNode.unhighlight();
      self.unhighlight();
      selectedNode = null;
    } else {
      selectedNode = this;
    }
  };
  // transition from finding terminal-deriving variables to creating the VDG
  var continueUseless = function () {
    var da = Object.keys(derivers);
    /*
    What if the grammar has no DG. All nodes are go to terminals only. (Special case)
    */
    for (var variableIndex = 0; variableIndex < da.length; variableIndex++) {
      var variable = da[variableIndex];
      var onlyTerminalsExist = true;
      var variableProductions = grammar.getProductionsForSpecificVariable(variable);
      for (var ruleIndex = 0; ruleIndex < variableProductions.length; ruleIndex++) {
        var rule = variableProductions[ruleIndex];
        if (_.filter(rule[2], function (x) {
            return variables.indexOf(x) >= 0
          }).length !== 0) {
          onlyTerminalsExist = false;
          break;
        }
      }
    }
    if (!onlyTerminalsExist) { //The graph will be used as there will be some links. Work as normal(No special case)
      modelDFA = jsav.ds.graph({
        layout: "layered",
        directed: true
      });
      for (var i = 0; i < da.length; i++) {
        modelDFA.addNode(da[i]);
      }
      modelDFA.layout();
      modelDFA.click(uselessVdgHandler);
      jsav.umsg('Complete dependency graph by adding edges between variables. Variables that predicate terminals: [' + builtDeriveSet + ']')
    } else //No need for the graph. Skip this step and continue (this is the special case)
      continueUselessSecond();
  };
  // transition from VDG to removing useless productions
  var continueUselessSecond = function () {
    jsav.umsg('Modify the grammar to remove useless productions. Click on unreachable productions to remove them.');
    //tGrammar = jsav.ds.matrix(tArr);
    //layoutTable(tGrammar, 2);
    //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, anchor: "left bottom", myAnchor: "left top"});
    grammar.element.off();
    grammar.click(removeUselessHandler);
  };
  jsav.umsg('Removing useless productions: Select variables that derive terminals.');
  grammar.element.off();
  grammar.click(findDeriveHandler);
};

var interactableChomsky = function (jsav, grammar, fullChomsky) {
  var productions = grammar.getProductions();
  startParse(grammar);
  // array holding the productions
  var tArr = productions;
  // Right sides are arrays (unlike the matrix, where RHS is a string)
  _.each(tArr, function (x) {
    x[2] = x[2].split('');
  });
  var varCounter = 1;

  // handler for the table for converting productions
  var chomskyHandler = function (index) {
    this.unhighlight(i);
    this.highlight(index);
    var r = tArr[index][2];
    if (r.length === 1 && variables.indexOf(r[0]) === -1) {
      jsav.umsg('Conversion unneeded, the production has a single terminal.');
      exerciseLog.errorMessages.push("Attempt to convert the prodution " + tArr[index][0] + arrow + tArr[index][2].join('') + " to Chomksy. But the production is in the correct form.");
      exerciseLog.errorsCount++;
      return;
    }
    if (r.length === 2 && variables.indexOf(r[0][0]) !== -1 && variables.indexOf(r[1][0]) !== -1) {
      jsav.umsg('Conversion unneeded, the production has only 2 variables.');
      exerciseLog.errorMessages.push("Attempt to convert the prodution " + tArr[index][0] + arrow + tArr[index][2].join('') + " to Chomksy. But the production is in the correct form.");
      exerciseLog.errorsCount++;
      return;
    }
    var sliceIn = [];
    // replace terminals
    for (var i = 0; i < r.length; i++) {
      if (r[i].length === 1 && variables.indexOf(r[i]) === -1) {
        var tempB = "B(" + r[i] + ")";
        if (!_.find(tArr.concat(sliceIn), function (x) {
            return x[0] === tempB;
          })) {
          sliceIn.push([tempB, arrow, [r[i]]]);
        }
        r[i] = tempB;
      }
    }
    if (sliceIn.length > 0) {
      tArr = tArr.slice(0, index + 1).concat(sliceIn).concat(tArr.slice(index + 1));
      var tempG = new GrammarMatrix(jsav, _.map(tArr, function (x) {
        return [x[0], x[1], x[2].join('')];
      }));
      tGrammar.clear();
      tGrammar = tempG;
      tGrammar.layout();
      tGrammar.click(chomskyHandler);
      for (var i = 0; i < sliceIn.length + 1; i++) {
        tGrammar.highlight(index + i);
      }
    } else if (_.find(tArr.concat(sliceIn), function (x) {
        return x[0] === tempB;
      })) { //the rule already added before
      var tempG = new GrammarMatrix(jsav, _.map(tArr, function (x) {
        return [x[0], x[1], x[2].join('')];
      }));
      tGrammar.clear();
      tGrammar = tempG;
      tGrammar.layout();
      tGrammar.click(chomskyHandler);
      tGrammar.highlight(index);
    } else {
      // replace variables
      var tempD = "D(" + varCounter + ")";
      var temp2 = r.splice(1, r.length - 1, tempD);
      var present = _.find(tArr, function (x) {
        return x[0].length > 1 && x[2].join('') === temp2.join('');
      });
      if (present) {
        r[1] = present[0];
      } else {
        tArr.splice(index + 1, 0, [tempD, arrow, temp2]);
        varCounter++;
        var tempG = new GrammarMatrix(jsav, _.map(tArr, function (x) {
          return [x[0], x[1], x[2].join('')];
        }));
        tGrammar.clear();
        tGrammar = tempG;
        tGrammar.layout();
        tGrammar.click(chomskyHandler);
        tGrammar.highlight(index);
        tGrammar.highlight(index + 1);
      }
    }
    jsav.umsg('Converted.');
    exerciseController.grammerInChomskey = true;
    exerciseLog.numberOfSteps++;
    if (checkTransform(tArr.map(function (x) {
        return "" + x[0] + arrow + x[2].join('')
      }), fullChomsky)) {
      tGrammar.jsav.umsg('All productions completed.');
      tGrammar.element.off();
      confirm('All productions completed.');
      tGrammar.unhighlight(i);
    }
  };
  tGrammar = new GrammarMatrix(jsav, grammar.getProductions());
  tGrammar.layout();
  //tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}), {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
  tGrammar.click(chomskyHandler);

  jsav.umsg('Converting to Chomsky Normal Form: convert productions of the grammar on the right by clicking on them.');
};

var removeLambda = function () {
  var derivers = {}; // variables that derive lambda
  var productions = _.map(_.filter(arr, function (x) {
    return x[0];
  }), function (x) {
    return x.slice();
  });
  var counter = 0;
  // find lambda-deriving variables
  while (removeLambdaHelper(derivers, productions)) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
  };
  if (productions[0][0] in derivers) {
    alert('The start variable derives ' + emptystring + '.');
  }
  var transformed = [];
  // remove lambda productions
  productions = _.filter(productions, function (x) {
    return x[2] !== emptystring;
  });
  transformed = transformed.concat(productions);
  for (var i = 0; i < productions.length; i++) {
    var p = productions[i];
    // find lambda deriving variables in right hand side
    var v = _.filter(p[2], function (x) {
      return x in derivers;
    });
    if (v.length > 0) {
      v = v.join('');
      for (var j = v.length - 1; j >= 0; j--) {
        // remove all combinations of lambda-deriving variables
        var n = getCombinations(v, j + 1);
        for (var next = n.next(); next.value; next = n.next()) {
          var replaced = p[2];
          for (var k = 0; k < next.value.length; k++) {
            replaced = replaced.replace(next.value[k], "");
          }
          // if not a lambda production
          if (replaced && !_.find(transformed, function (x) {
              return x[0] === p[0] && x[2] === replaced
            })) {
            transformed.push([p[0], arrow, replaced]);
          }
        }
      }
    }
  }
  var ret = _.map(transformed, function (x) {
    return x.join('');
  });
  return ret;
};

/*
Function to find lambda-deriving variables.
A variable derives lambda if it directly produces lambda or if its right side is
composed only of lambda-deriving variables.
Used during parsing as well.
*/
function removeLambdaHelper(set, productions) {
  for (var i = 0; i < productions.length; i++) {
    if (productions[i][2] === emptystring || _.every(productions[i][2], function (x) {
        return x in set;
      })) {
      if (!(productions[i][0] in set)) {
        set[productions[i][0]] = true;
        return true;
      }
    }
  }
  return false;
};
// check if browser supports generators
var isGeneratorSupported = function () {
  try {
    eval("(function*(){})()");
    return true;
  } catch (err) {
    console.log(err);
    console.log("No generator support.");
    return false;
  }
}
// creates a generator for the combinations of variables to remove
if (isGeneratorSupported()) {
  /*
  Generator function.
  Getting combinations should be reimplemented since generators do no have universal browser support.
  */
  var getCombinations = function* (str, l) {
    for (var i = 0; i < str.length; i++) {
      if (l === 1) {
        yield [str[i]];
      } else {
        var n = getCombinations(str.substring(i + 1), l - 1);
        for (var next = n.next(); next.value; next = n.next()) {
          yield [str[i]].concat(next.value);
        }
      }
    }
  };
}

// remove unit productions
var removeUnit = function () {
  var productions = _.map(_.filter(arr, function (x) {
    return x[0];
  }), function (x) {
    return x.slice();
  });
  var pDict = {};
  // a dictionary mapping left sides to right sides
  for (var i = 0; i < productions.length; i++) {
    if (!(productions[i][0] in pDict)) {
      pDict[productions[i][0]] = [];
    }
    pDict[productions[i][0]].push(productions[i][2]);
  }
  var counter = 0;
  while (removeUnitHelper(productions, pDict)) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
  };
  // remove original unit productions
  productions = _.filter(productions, function (x) {
    return !(x[2].length === 1 && variables.indexOf(x[2]) !== -1);
  });
  var ret = _.map(productions, function (x) {
    return x.join('');
  });
  return ret;
};

// Function to find a unit production and add one of the replacement productions
var removeUnitHelper = function (productions, pDict) {
  for (var i = 0; i < productions.length; i++) {
    if (productions[i][2].length === 1 && variables.indexOf(productions[i][2]) !== -1) {
      var p = pDict[productions[i][2]];
      var n;
      for (var j = 0; j < p.length; j++) {
        if (p[j].length === 1 && variables.indexOf(p[j]) !== -1) {
          continue;
        } else if (!_.find(productions, function (x) {
            return x[0] === productions[i][0] && x[2] === p[j];
          })) {
          n = p[j];
          break;
        }
      }
      if (n) {
        productions.push([productions[i][0], arrow, n]);
        pDict[productions[i][0]].push(n);
        return true;
      }
    }
  }
  return false;
};

// remove useless productions
var removeUseless = function (productions) {
  var derivers = {}; // variables that derive a string of terminals
  //var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
  var counter = 0;
  while (findDerivable(derivers, productions)) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
  };
  var transformed = [];
  // remove productions which do not derive a string of terminals
  for (var i = 0; i < productions.length; i++) {
    if (_.every(productions[i][2], function (x) {
        return x in derivers || variables.indexOf(x) === -1;
      })) {
      transformed.push(productions[i]);
    }
  }
  var pDict = {}; // dictionary to hold reachable variables
  var start = "S"; //transformed[0][0];
  for (var i = 0; i < transformed.length; i++) {
    if (!(transformed[i][0] in pDict)) {
      pDict[transformed[i][0]] = [];
    }
    // map left hand side to the variables in the right hand side
    var r = _.uniq(_.filter(transformed[i][2], function (x) {
      return variables.indexOf(x) !== -1;
    }));
    pDict[transformed[i][0]] = _.union(pDict[transformed[i][0]], r);
  }
  var visited = {};
  visited[start] = true;
  // find reachable variables and map them in pDict
  findReachable(start, pDict, visited);
  // remove unreachable productions
  transformed = _.filter(transformed, function (x) {
    return x[0] === start || pDict[start].indexOf(x[0]) !== -1;
  });
  var ret = _.map(transformed, function (x) {
    return x.join('');
  });
  return ret;
};
// Function to get variables which can derive a string of terminals
var findDerivable = function (set, productions) {
  for (var i = 0; i < productions.length; i++) {
    if (_.every(productions[i][2], function (x) {
        return x in set || variables.indexOf(x) === -1;
      })) {
      if (!(productions[i][0] in set)) {
        set[productions[i][0]] = true;
        return true;
      }
    }
  }
  return false;
};
// FADepthFirstSearch on the dictionary
var findReachable = function (start, pDict, visited) {
  for (var i = 0; i < pDict[start].length; i++) {
    if (!(pDict[start][i] in visited)) {
      visited[pDict[start][i]] = true;
      findReachable(pDict[start][i], pDict, visited);
      pDict[start] = _.union(pDict[start], pDict[pDict[start][i]]);
    }
  }
};

// convert to Chomsky Normal Form
var convertToChomsky = function (productions) {
  var v = {};
  // find all the variables in the grammar
  //var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
  for (var i = 0; i < productions.length; i++) {
    var x = productions[i];
    // change RHS to an array
    x[2] = x[2].split("");
    v[x[0]] = true;
    for (var j = 0; j < x[2].length; j++) {
      if (variables.indexOf(x[2][j]) !== -1) {
        v[x[2][j]] = true;
      }
    }
  }
  // an array of all the temporary variables
  var tempVars = [];
  // counter for D(n) variables
  var varCounter = 1;
  // replace terminals with equivalent variables where necessary
  for (var i = 0; i < productions.length; i++) {
    if (productions[i][2].length === 1 && variables.indexOf(productions[i][2][0]) === -1) {
      continue;
    } else {
      var r = productions[i][2];
      for (var j = 0; j < r.length; j++) {
        if (r[j].length === 1 && variables.indexOf(r[j]) === -1) {
          var temp = "B(" + r[j] + ")";
          if (!_.find(productions, function (x) {
              return x[0] === temp;
            })) {
            productions.push([temp, arrow, [r[j]]]);
            tempVars.push(temp);
          }
          r[j] = temp;
        }
      }
    }
  }
  // Function to break productions down into pairs of variables
  var chomskyHelper = function () {
    for (var i = 0; i < productions.length; i++) {
      var r = productions[i][2];
      if (r.length === 1 && variables.indexOf(r[0]) === -1) {
        continue;
      } else if (r.length > 2) {
        var temp = "D(" + varCounter + ")";
        var temp2 = r.splice(1, r.length - 1, temp);
        var present = _.find(productions, function (x) {
          return x[0].length > 1 && x[2].join('') === temp2.join('');
        });
        if (present) {
          r[1] = present[0];
        } else {
          productions.push([temp, arrow, temp2]);
          tempVars.push(temp);
          varCounter++;
        }
        return true;
      }
    }
    return false;
  };
  var counter = 0;
  while (chomskyHelper()) {
    counter++;
    if (counter > 500) {
      console.log(counter);
      break;
    }
  }
  for (var i = 0; i < productions.length; i++) {
    var x = productions[i];
    x[2] = x[2].join("");
  }
  var ret = _.map(productions, function (x) {
    return x.join('');
  });
  return ret;
};
var startParse = function (grammar) {

  $(".jsavmatrix").removeClass('editMode');
  $(".jsavmatrix").removeClass('deleteMode');
};

var checkTransform = function (strP, g) {
  var inter = _.intersection(strP, g);
  if (inter.length === strP.length && inter.length === g.length) {
    return true;
  }
  return false;
};

var addProductionsToGrammar = function (lhs, rhs, grammar, compareToGrammar) {
  var toAdd;
  if (rhs.indexOf('|') > 0) {
    var correct = true;
    var listOfRHS = rhs.split('|');
    var listOfRules = listOfRHS.map(function (singleRHS) {
      return lhs + arrow + singleRHS
    })
    for (var i = 0; i < listOfRules.length; i++) {
      var rule = listOfRules[i];
      if (compareToGrammar.indexOf(rule) === -1) {
        alert(rule + ': is not part of the reformed grammar.');
        exerciseLog.errorMessages.push(rule + ': is not part of the reformed grammar.');
        exerciseLog.errorsCount++;
        correct = false;
        break;
      }
      if (grammar.findProduction(rule)) {
        alert(rule + ': is already in the grammar.');
        exerciseLog.errorMessages.push(rule + ': is already in the grammar.');
        exerciseLog.errorsCount++;
        correct = false;
        break;
      }
    }
    if (correct) {
      grammar.addNewProductionRule([lhs, arrow, rhs]);
      exerciseLog.numberOfSteps = exerciseLog.numberOfSteps + listOfRules.length;
    }
  } else {
    toAdd = lhs + arrow + rhs;
    if (compareToGrammar.indexOf(toAdd) === -1) {
      alert(toAdd + ': is not part of the reformed grammar.');
      exerciseLog.errorMessages.push(rule + ': is not part of the reformed grammar.');
      exerciseLog.errorsCount++;
      return;
    }
    if (grammar.findProduction(toAdd)) {
      alert(toAdd + ': is already in the grammar.');
      exerciseLog.errorMessages.push(toAdd + ': is already in the grammar.');
      exerciseLog.errorsCount++;
      return;
    }
    grammar.addNewProductionRule([lhs, arrow, rhs]);
    exerciseLog.numberOfSteps++;
    //this.layout();
  }
}