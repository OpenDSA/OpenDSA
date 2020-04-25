/*
  modified from FA.js line 1650 convertToDFA (used by FiniteAutomaton.convertNFAtoDFA)
  original commit:
  NFA to DFA conversion
  Note: g.transitionFunction takes a single node and returns an array of node values
  Requires underscore.js
  new commit:
  generate questions by each step of the graph and let them control by PIFrames.js
  Note: Need to define the av_name
  Additional requirements PIFrames.js, FA.js
*/
var convertToDFAWithQuestions = function (jsav, graph, av_name, opts, visualizable = false) {
  var left = 10;
  var g;
  if (!visualizable)
    g = jsav.ds.FA($.extend({ layout: 'automatic' }, opts)),
      alphabet = Object.keys(graph.alphabet),
      startState = graph.initial,
      newStates = [];
  else {
    var options = $.extend(true, { layout: 'automatic' }, opts);
    g = jsav.ds.FA(options),
      alphabet = Object.keys(graph.alphabet),
      startState = graph.initial,
      newStates = [];
  }

  //this part loops the entire graph then generate questions based on them
  //it can be reused by other visualization functions
  //may need to change parameters of those functions to let them work for other slides
  var steps = getAllSteps(startState, graph);
  var questions = generateQuestions(steps, graph);
  // initialize PI frame
  var Frames = piInit(av_name, questions);
  //PIFRAMES.init(av_name);


  // The following part is the visualization and the part to add questions and texts
  // Those are various for each kind of slide

  // each question will automatically change the umsg for that step if there was one
  // to change the umsg for a question or a set of questions
  // you need to modifiy them at the generation function

  // to add a generated question, call
  // "jsav.umsg(Frames.addQuestion(String("q" + NUMBER OF THE QUESTION YOU WANT TO ADD)));"
  // may use "g.laylout"to reformat the graph
  // to add a silde without question, call
  // "jsav.umsg(THE TEXT YOU WANT TO ADD);
  // jsav.step();"

  // Get the first converted state
  if (visualizable)
    jsav.umsg(Frames.addQuestion(String("q" + 0)));
    jsav.step();

  var first = lambdaClosure([startState.value()], graph).sort().join();
  if (visualizable) {
    var listOfFirstNodes = first.split(',');
    var highlightedNodes = [];
    for (var i = 0; i < listOfFirstNodes.length; i++) {
      var node = graph.getNodeWithValue(listOfFirstNodes[i])
      node.highlight();
      highlightedNodes.push(node);
    }
  }
  newStates.push(first);

  if (visualizable) {
    jsav.umsg("The resulting list of states becomes the name of the DFA's start state.");
    jsav.step();
  }

  var temp = newStates.slice(0);
  first = g.addNode({ value: first });
  g.makeInitial(first);
  g.layout();
  if (visualizable) {
    left += 50;
    for (var state in highlightedNodes) {
      highlightedNodes[state].unhighlight();
    }

    jsav.umsg("Nest step is to identify the transitions out of the DFA start state. For each letter in the alphabet, consider all states reachable in the NFA from any state in the start state on that letter. This becomes the name of the target state on that transition.");
    jsav.step();
    jsav.umsg(Frames.addQuestion(String("q" + 1)));
    g.layout();
    jsav.step();
  }

  var count = 2;
  // Repeatedly get next states and apply lambda closure
  while (temp.length > 0) {
    var val = temp.pop(),
      valArr = val.split(',');
    var prev = g.getNodeWithValue(val);
    for (var i = 0; i < alphabet.length; i++) {
      var letter = alphabet[i];
      var next = [];
      for (var j = 0; j < valArr.length; j++) {
        next = _.union(next, lambdaClosure(graph.transitionFunction(graph.getNodeWithValue(valArr[j]), letter), graph));
      }
      var nodeName = next.sort().join();
      var node;

      if (nodeName) {
        if (!_.contains(newStates, nodeName)) {
          temp.push(nodeName);
          newStates.push(nodeName);
          node = g.addNode({ value: nodeName });
          if (visualizable) {
            if (left + 50 < opts.width)
              left += 50;
            g.layout();
          }
        } else {
          node = g.getNodeWithValue(nodeName);
        }
        var edge = g.addEdge(prev, node, { weight: letter });

        //put it here to let questions correspond to each state
        if (visualizable) {
          if (temp.length > 0) {
            jsav.umsg(Frames.addQuestion(String("q" + count)));
            g.layout();
            jsav.step();
            count++;
          }
        }
      }
    }
      //this part can let questions correspond to each step
      /*if (visualizable) {
          if (temp.length > 0) {
            jsav.umsg(Frames.addQuestion(String("q" + count)));
            jsav.step();
            g.layout();
            //jsav.umsg("Repeat the process for each new node we find");
          }
        }*/
    }
    // add the final markers
    if (visualizable)
      jsav.umsg("Determine the final states");
    addFinals(g, graph);
    g.layout();
    if (visualizable) {
      jsav.step();
      jsav.umsg("The final (optional) step is to rename the states.")
    }
    var nodes = g.nodes();
      for (var next = nodes.next(); next; next = nodes.next()) {
        //Warning!!!
        //I don't know why this made the view different than the original function
        //next.stateLabel(next.value());
        next.stateLabelPositionUpdate();
      }
    g.updateNodes();
    g.layout();
    //g.disableDragging();
    return g;
};

// Function to add final markers to the resulting DFA
// *copied from FA.js
var addFinals = function (g1, g2) {
  var nodes = g1.nodes();
  for (var next = nodes.next(); next; next = nodes.next()) {
    var values = next.value().split(',');
    for (var i = 0; i < values.length; i++) {
      if (g2.getNodeWithValue(values[i]).hasClass('final')) {
        next.addClass('final');
        break;
      }
    }
  }
};


/*get every state of the graph and assgin them into array of each step
modified from the body of convertToDFA
***********************************************************
change this function to generalize for other kind of slides
***********************************************************
require the initial state and the graph
store each step in the following format:
var res = [
  [{node: "q0,q1,q2", connectFrom: "", type: "initial", weight: ""}],
  [{node: "q3,q4", connectFrom: "q0,q1,q2", type: "new", weight: "a"},
  {node: "q3,q4", connectFrom: "q0,q1,q2", type: "new", weight: "a"}],
  ...,
  [{node: "q6", connectFrom: "q4", type: "new", weight: "b"}]
}];
*/
var getAllSteps = function (startState, graph) {
  var res = [];

  var states = [];
  var first = {
    "node" : lambdaClosure([startState.value()], graph).sort().join(),
    "connectFrom" : "",
    "type" : "initial",
    "weight" : ""
  }
  states.push(first["node"]);

  res.push([first]);

  var temp = states.slice(0);
  while (temp.length > 0) {
    var val = temp.pop(),
      valArr = val.split(',');
    var prev = val;

    var aStep = [];
    for (var i = 0; i < alphabet.length; i++) {
      var letter = alphabet[i];
      var next = [];
      for (var j = 0; j < valArr.length; j++) {
        next = _.union(next, lambdaClosure(graph.transitionFunction(graph.getNodeWithValue(valArr[j]), letter), graph));
      }
      var nodeName = next.sort().join();
      var node = {
        "node" : nodeName,
        "connectFrom" : "",
        "type" : "",
        "weight" : ""
      }

      if (nodeName) {
        if (!_.contains(states, nodeName)) {
          temp.push(nodeName);
          states.push(nodeName);
          node["type"] = "new";

        } else {
          node["type"] = "old";
        }
        node["connectFrom"] = prev;
        node["weight"] = letter;
        aStep.push(node);
      }
    }

    if (temp.length > 0) {
      res.push(aStep);
    }
  }

  //must delete this part when use otherwise student can see the answer
  console.log(res);
  return res;
}
//initialize PI frame with generated questions
var piInit = function(av_name, questions) {
  var container = $(`#${av_name}`);

  var qButton = $("<div />", {
    class: "SHOWQUESTION"
  });

  var question = $("<div />", {
    class: "PIFRAMES"
  });

  $(".picanvas").css({
    width: "0px",
    overflow: "hidden"
  });

  $(question).css({
    position: "absolute",
    top: 69,
    left: 590,
    width: "34%",
    overflow: "hidden"
  });

  $(".jsavoutput.jsavline").css({
    display: "inline-block",
    width: "60%"
  });

  $(".jsavcanvas").css({
    "min-width": "0px",
    width: "60%",
    overflow: "hidden",
    "margin-left": 0,
    "min-height": "500px"
  });

  // $(".jsavcanvas").append(qButton);
  // $(".jsavcanvas").append(question);
  $(container).append(qButton);
  $(container).append(question);

  $(".SHOWQUESTION,.PIFRAMES").wrapAll('<div class="picanvas"></div>');
  $(".picanvas").insertAfter($(".jsavcanvas"));

  $(".jsavcanvas,.picanvas").wrapAll('<div class="canvaswrapper"></div>');
  $(".canvaswrapper").css({
    display: "flex"
  });

  // point the injector to generated questions
  var injector = PIFRAMES.Injector(questions, av_name);
  PIFRAMES.table[av_name] = injector;
  return injector;
}

//store all the nodes of original graph for question generation
var allNodes = [];
//generate questions in json format by the graph
//so it can be used by PI frame
var generateQuestions = function (steps, graph) {
  //Example:
  /*{
    "translations": {
      "en": {
        "q0": {
          "type": "multiple",
          "question":"What is transition from start state $\\{q0, q1, q2\\}$ with the alphabet a. Select the appropriate state:",
          "description": "Let's begin with the start state. Closure($q0$) in $M_N$ is $\\{q0,q1,q2\\}$. So this is the start state.",
          "answer": "q3, q4",
          "choices": ["q0, q1, q2", "q3, q4","q3" ,"q4"]
        },
        ...,
        "q13": {
          "type": "select",
          "question":"What are the final state? Note that, any state that include states $q5$ or $q6$ should be a final state",
          "answer": ["q5, q1", "q1, q5, q6", "q6"],
          "choices": ["q0, q1, q2", "q3, q4","q4", "q1, q5, q6", "q3", "q6", "q5, q1"]
        }
      }
    }
  }*/
  var questions = {
    "translations": {
      "en": {}
    }
  }

  //get the nodes of original graph
  graph.nodes().forEach(node => {
    allNodes.push(node.options["value"]);
  });

  var questionsIndex = 0;
  //cases to generate a single question
  questions["translations"]["en"][String("q" + questionsIndex)] = generateSingleQuestion("select", "Select the initial lambda closure to continue", "The first step is to find the lambda closure for the NFA start state. From the NFA's start state, find every other state that can be reached by a lambda transition.", steps[0][0]["node"].split(','))
  questionsIndex++;

  var i, j;
  for (i = 1; i < steps.length; i++) {
    var questionsForAStep = generateQuestionsForAStep(steps[i]);
    for (j = 0; j < questionsForAStep.length; j++){
      questions["translations"]["en"][String("q" + questionsIndex)] = questionsForAStep[j];
      questionsIndex++;
    }
  }

  //must delete this part when use otherwise student can see the answer
  console.log(questions);
  return questions;
}

//generate question(s) for a single step (each step may contain multiple states)
var generateQuestionsForAStep = function (step) {
  var questions = [];
  var i;
  for (i = 0; i < step.length; i++){
    questions.push(generateQuestionsForAState(step[i]));
  }
  return questions;
}

//generate question(s) for a single state (may ask multiple questions for a state)
var generateQuestionsForAState = function (state) {
    var answer = state["node"].split(',');
    if(answer.length == 1){
      return generateSingleQuestion("multiple", "What is transition from state $\\{"+state["connectFrom"]+"\\}$ with the alphabet "+ state["weight"] +". Select the appropriate state", "Repeat the process for each new node we find", answer[0]);
    }
    return generateSingleQuestion("select", "What is transition from state $\\{"+state["connectFrom"]+"\\}$ with the alphabet "+ state["weight"] +". Select the appropriate state", "Repeat the process for each new node we find", answer);
}

//generate a question
var generateSingleQuestion = function (type, question, description, answer) {
  return {
    "type": type,
    "question":question,
    "description": description,
    "answer": answer, //String if type is multiple, array of string if select
    "choices": generateChoices(type, answer)
  };
}

//generate choices by type
//can add more later
var generateChoices = function(type, answer){
  switch(type) {
    case "select":
      return allNodes;
    default: //"multiple"
      return allNodes;
  }
}
