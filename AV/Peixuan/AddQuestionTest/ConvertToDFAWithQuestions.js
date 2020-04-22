/*
  modified from FA.js line 1650 convertToDFA (used by FiniteAutomaton.convertNFAtoDFA)
  original commit:
  NFA to DFA conversion
  Note: g.transitionFunction takes a single node and returns an array of node values
  Requires underscore.js
  new commit:
  Add one to one corresponding questions to the graph and let them control by PIFrames.js
  Note: Need to define one to one questions for each slide, such as
  "var questions = ["qa", "qb", "qc", "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7"]"
  and the av_name.
  Additional requirements PIFrames.js, FA.js and a json file including details of each question
*/
var convertToDFAWithQuestions = function (jsav, graph, av_name, questions, opts, visualizable = false) {
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var Frames = PIFRAMES.init(av_name);


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
  // Get the first converted state
  if (visualizable)
    jsav.umsg(Frames.addQuestion(questions[0]));
    //jsav.umsg("The first step is to find the lambda closure for the NFA start state. From the NFA's start state, find every other state that can be reached by a lambda transition.");
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
    jsav.step();
    //jsav.umsg("The resulting list of states becomes the name of the DFA's start state.");
    jsav.umsg(Frames.addQuestion(questions[1]));
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
    jsav.step();
    //jsav.umsg("Nest step is to identify the transitions out of the DFA start state. For each letter in the alphabet, consider all states reachable in the NFA from any state in the start state on that letter. This becomes the name of the target state on that transition.");
    jsav.umsg(Frames.addQuestion(questions[2]));
  }

  var count = 3;
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
      }
    }
    if (visualizable) {
      if (temp.length > 0) {
        jsav.step();

        //jsav.umsg("Repeat the process for each new node we find");
        jsav.umsg(Frames.addQuestion(questions[count++]));
      }
    }
  }
  // add the final markers
  if (visualizable)
    //jsav.umsg("Determine the final states");
    jsav.umsg(Frames.addQuestion(questions[count++]));

  addFinals(g, graph);
  g.layout();
  if (visualizable) {
    jsav.step();
    //jsav.umsg("The final (optional) step is to rename the states.")
    jsav.umsg(Frames.addQuestion(questions[count]));
  }
  var nodes = g.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      //Warning!!! I don't know why this changed the view//
      //next.stateLabel(next.value());
      next.stateLabelPositionUpdate();
    }
  g.updateNodes();
  g.layout();
  //g.disableDragging();
  return g;
};

// Function to add final markers to the resulting DFA
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
