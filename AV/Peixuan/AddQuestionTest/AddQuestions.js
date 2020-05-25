//initialize PI frame with generated questions
var piInit = function(av_name, questions, piframesLocations = {top: 10, left: 5}) {
  console.log(av_name + " init with questions")
  var container = $(`#${av_name}`);

  var qButton = $("<div />", {
    class: "SHOWQUESTION"
  });

  var question = $("<div />", {
    class: "PIFRAMES"
  });

  $("#" + av_name + " .picanvas").css({
    width: "0px",
    overflow: "inherit"
  });

  $(question).css({
    position: "absolute",
    top: 69,
    left: 590,
    width: "34%",
    overflow: "hidden"
  });

  $("#" + av_name + " .jsavoutput.jsavline").css({
    display: "inline-block",
    width: "60%"
  });

  $("#" + av_name + " .jsavcanvas").css({
    //"min-width": "0px",
    width: "60%",
    overflow: "hidden",
    "margin-left": 0,
    //"min-height": "500px"
  });


  // $(".jsavcanvas").append(qButton);
  // $(".jsavcanvas").append(question);

  $(container).append(qButton);
  $(container).append(question);

  $("#" + av_name + " > .SHOWQUESTION, #" + av_name + " > .PIFRAMES").wrapAll('<div class="picanvas"></div>');
  //$(".SHOWQUESTION,.PIFRAMES").wrapAll('<div class="picanvas"></div>');
  $("#" + av_name + " > .picanvas").insertAfter($("#" + av_name + " > .jsavcanvas"));
  //$(".picanvas").insertAfter($(".jsavcanvas"));

  $("#" + av_name + " > .jsavcanvas, #" + av_name + " > .picanvas").wrapAll('<div class="canvaswrapper"></div>');
  //$(".jsavcanvas,.picanvas").wrapAll('<div class="canvaswrapper"></div>');
  $("#" + av_name + " > .canvaswrapper").css({
    display: "flex"
  });

  //disable jsavend, as it allows student to jump to last slide
  //automatically enabled by injector once all questions for slideshow have been answered
  // $(".jsavend").css("pointer-events", "none");
  $("#" + av_name + " > .jsavcontrols > .jsavend").css("visibility", "hidden");

  //edge case: what if first slide has question?
  //1 signifies a forward click; used by injector to increment queue if necessary
  $("#" + av_name + " > .jsavcontrols > .jsavforward").click(function() {
    var buttonGroup = $(this).parent();
    var parentAV = $(buttonGroup)
      .parent()
      .attr("id");
    //console.log(parentAV);
    PIFRAMES.callInjector(parentAV, 1);
  }),
    //0 signifies a backward click; used by injector to decrement queue if necessary
  $("#" + av_name + " > .jsavcontrols > .jsavbackward").click(function() {
      var buttonGroup = $(this).parent();
      var parentAV = $(buttonGroup)
        .parent()
        .attr("id");
      PIFRAMES.callInjector(parentAV, 0);
    }),
  $("#" + av_name + " > .jsavcontrols > .jsavbegin").click(function() {
      var buttonGroup = $(this).parent();
      var parentAV = $(buttonGroup)
        .parent()
        .attr("id");
      PIFRAMES.callInjector(parentAV, -1);
    }),
  $("#" + av_name + " > .jsavcontrols > .jsavend").click(function() {
      var buttonGroup = $(this).parent();
      var parentAV = $(buttonGroup)
        .parent()
        .attr("id");
      PIFRAMES.callInjector(parentAV);
  });

  let data = {
    "frame_name": av_name,
  };

  var skip_to;
  // get user checkout
  $.ajax({
    url: "/pi_attempts/get_checkpoint",
    type: "POST",
    async: false,
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    datatype: "json",
    xhrFields: {
      withCredentials: true
    },
    success: function(data) {
      skip_to = parseInt(data.result)
    },
    error: function(err) {
      skip_to = 0
    }
  });

  // point the injector to generated questions
  var injector = PIFRAMES.Injector(questions, av_name, skip_to, piframesLocations);
  PIFRAMES.table[av_name] = injector;
  return injector;
}
//helper functions
// *copied from FA.js
var highlightAllNodes = function (listOfNodes, graph) {
  for (var i = 0; i < listOfNodes.length; i++) {
    graph.getNodeWithValue(listOfNodes[i]).highlight("green");
  }
}
var getTreeNode = function (nodeValue, node) {
  if (node.childnodes == false && node.value() === nodeValue) { //leaf
    return node;
  } else {
    var result = null;
    for (var i = 0; i < node.childnodes.length; i++) {
      result = result || getTreeNode(nodeValue, node.child(i));
    }
    return result;
  }
}
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

//store all the nodes of original graph for question generation
var allNodes = [];

//shuffle array
var shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

//generate questions in json format by the graph
//so it can be used by PI frame
var generateQuestions = function (steps, graph = null, configure) {
  //Example:
  /*{
    "translations": {
      "en": {
        "q0": {
          "type": "multiple",
          "question":"What is transition from start state $\\{q0, q1, q2\\}$ with the alphabet a. Select the appropriate state:",
          "description": "Let's begin with the start state. Closure($q0$) in $M_N$ is $\\{q0,q1,q2\\}$. So minimizer is the start state.",
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
  if(graph != null){
    graph.nodes().forEach(node => {
      allNodes.push(node.options["value"]);
    });
  }

  var questionsIndex = 0;
  var specialQuestionInedx = 0;
  var i, j;
  for (i = 0; i < steps.length; i++) {
    for (j = 0; j < steps[i].length; j++){
      if(questionsIndex === configure["specialQuestionInedx"][specialQuestionInedx]){
        questions["translations"]["en"][String("q" + questionsIndex)] = configure["specialQuestion"][specialQuestionInedx];
        specialQuestionInedx++;
        questionsIndex++;
      }
      else{
        var qsForAState = configure["questionPattern"](steps[i][j]);
        if(qsForAState.length != 1){
          qsForAState.forEach(item => {
            questions["translations"]["en"][String("q" + questionsIndex)] = item;
            questionsIndex++;
          });
        }
        else{
          questions["translations"]["en"][String("q" + questionsIndex)] = qsForAState[0];
          questionsIndex++;
        }
      }
    }
  }

  //must delete this part when use otherwise student can see the answer
  //console.log(questions["translations"]["en"]);

  return questions;
}

var toStrChoice = function (array){
  var res = "";
  array.forEach((item, i) => {
    res+=("State (" + item + ") ");
  });
  return res.trim();
}

var containsChoice = function(choice, set){
  var choiceCopy = choice.concat();
  var setCopy = JSON.parse(JSON.stringify(set));

  var sortedChoice = [];
  choiceCopy.forEach(item => {
    sortedChoice.push(item.split(",").sort());
  });
  sortedChoice.sort();

  for(var i = 0 ; i < setCopy.length ; i++){
    var item = setCopy[i];
    var temp = []
    item.forEach(choiceObj => {
      temp.push(choiceObj.split(",").sort());
    });
    temp.sort();
    //console.log(sortedChoice, temp);

    var innerCompare = true;
    if(temp.length === sortedChoice.length){
      temp.forEach((tempItem, i) => {
        if(tempItem.toString() !== sortedChoice[i].toString()){
          innerCompare = false;
        }
      });
    }

    if(innerCompare){
      //console.log("true");
      return true;
    }
  }
  return false;
}

var minimizeDFAWithQuestions = function(minimizer, av_name, jsav, referenceGraph, tree, newGraphDimensions, piframesLocations) {
  var steps = getAllStepsForMinimizeDFA(minimizer, jsav, referenceGraph, tree);

  var generateRandomChoicesForMinimize = function (state) {

    var allChoices = shuffle(state.node.split(','));
    var maxChoices = allChoices.length - 1;
    var divider = state.relatedTo.length - 1;
    if (maxChoices <= 1 || divider < 1){
      console.error("can't generate choices for a node that can't be divided");
      return allNodes;
    }


    var answer = [];
    state.relatedTo.forEach(item => {
      answer.push(item.split(','));
    });
    var res = [state.relatedTo];

    var choicesNum = Math.min(maxChoices, 4);

    var i, j;
    for (i = 0 ; i < choicesNum; i++){
      var choicesDup = true;
      var aChoice = [];

      while(choicesDup){
        aChoice = [];

        var dividerLocations = [];

        //find a random place to put dividers
        for (j = 0 ;  j < divider ; j++){
          var dup = true;
          var num;
          while (dup){
             num = Math.floor(Math.random() * (maxChoices - 2)) + 1;
             dup = dividerLocations.includes(num);
          }
          dividerLocations.push(num);
        }

        dividerLocations.sort();

        var startIndex = 0;
        //arrange answers
        dividerLocations.forEach(loc => {
          var choicePart = allChoices.slice(startIndex, loc).toString();
          startIndex = loc;
          aChoice.push(choicePart);
        });
        aChoice.push(allChoices.slice(startIndex).toString());

        allChoices = shuffle(allChoices);
        choicesDup = containsChoice(aChoice, res);

        /*if(choicesDup){
          console.log("dup generated choice ->", aChoice);
          //break;
        }*/
      }
      res.push(aChoice);
    }

    res = shuffle(res);
    var strRes = [];
    res.forEach(choice => {
      strRes.push(toStrChoice(choice));
    });
    return strRes;
  }

  var generateMinimizeDFAQuestions = function (state) {
      if(state.type === "dividedInto"){
          return [
            {
               "type": "multiple",
               "question": "",
               "description": "Will state " +state.node+ " can be divided by reading the letter \"" + state.weight + "\" ?",
               "answer": "yes", //String if type is multiple, array of string if select
               "choices": ["yes", "no"]
            },
            {
               "type": "multiple",
               "question": "",
               "description": "State "+state.node+" will be divided into which groups?",
               "answer": toStrChoice(state.relatedTo),
               "choices": generateRandomChoicesForMinimize(state)
            }];
      }
      else{ //notBeDivided
        return [{
           "type": "multiple",
           "question": "",
           "description": "Will state " +state.node+ " can be divided by reading the letter \"" + state.weight + "\" ?",
           "answer": "no", //String if type is multiple, array of string if select
           "choices": ["yes", "no"]
        }]
      }
  }

  var configureForMinimizeDFA = {
    "specialQuestionInedx" : [0, 1],
    "specialQuestion" : [
        {
         "type": "multiple",
         "question": "Select nonfinal states to continue",
         "description": "Initially, the tree will consist of 2 nodes. A node for nonfinal states, and another state for final states.",
         "answer": steps[0][0]["node"].split(','), //String if type is multiple, array of string if select
         "choices": [steps[0][0]["node"].split(','), steps[1][0]["node"].split(',')]
        },
        {
          "type": "multiple",
          "question": "Select final states to continue",
          "description": "These are the nonfinal states.",
          "answer":  steps[1][0]["node"].split(','),//String if type is multiple, array of string if select
          "choices": [steps[0][0]["node"].split(','), steps[1][0]["node"].split(',')]
        }
      ],
    "questionPattern" : generateMinimizeDFAQuestions
  };

  var questions = generateQuestions(steps, referenceGraph, configureForMinimizeDFA);
  // initialize PI frame
  var Frames = piInit(av_name, questions, piframesLocations);


  //change old functions to add questions
  minimizer.selectedNode = null;
  minimizer.jsav = jsav;
  minimizer.referenceGraph = referenceGraph;
  minimizer.alphabet = Object.keys(minimizer.referenceGraph.alphabet);
  minimizer.tree = tree;
  minimizer.finals = [];
  minimizer.nonfinals = [];
  minimizer.reachable = [];
  minimizer.minimizedEdges = {};

  minimizer.addTrapState();
  var val = minimizer.getReachable();
  minimizer.initTree(val);

  jsav.umsg(Frames.addQuestion(String("q" + 0)));

  //minimizer.jsav.umsg("Initially, the tree will consist of 2 nodes. A node for nonfinal states, and another state for final states.")
  minimizer.jsav.step();

  //minimizer.jsav.umsg("These are the nonfinal states.")
  jsav.umsg(Frames.addQuestion(String("q" + 1)));
  highlightAllNodes(minimizer.nonfinals, minimizer.referenceGraph);
  getTreeNode(minimizer.nonfinals.sort().join(), minimizer.tree.root()).highlight();
  minimizer.jsav.step();
  minimizer.unhighlightAllTreeNodes(minimizer.tree);
  minimizer.unhighlightAll(minimizer.referenceGraph);
  minimizer.jsav.umsg("These are the final states.")
  highlightAllNodes(minimizer.finals, minimizer.referenceGraph);
  getTreeNode(minimizer.finals.sort().join(), minimizer.tree.root()).highlight();
  minimizer.jsav.step();
  minimizer.unhighlightAllTreeNodes(minimizer.tree);
  minimizer.unhighlightAll(minimizer.referenceGraph);

  var listOfVisitedLeaves = [];
  var listOfLeaves = minimizer.getLeaves(minimizer.tree.root());
  var leaf;
  var moreToSplit = true;
  minimizer.jsav.umsg("Now we will test the terminals against the states in that subset to see if they all go to the same subset. Split them up when they do not go to the same place.");
  jsav.step();
  var questionsIndex = 2;

  var autoPartitionWithQuestions = function (treeNode) {
    var leaves = minimizer.getLeaves(minimizer.tree.root());
    var val = treeNode.split(','); //minimizer.selectedNode.value().split(',');
    var nObj = {},
      sets = {},
      letter;
    // check all terminals (even if one was inputted by the user)
    for (var k = 0; k < minimizer.alphabet.length; k++) {
      nObj = {};
      letter = minimizer.alphabet[k];
      for (var j = 0; j < val.length; j++) {
        var node = minimizer.referenceGraph.getNodeWithValue(val[j]);
        var next = minimizer.referenceGraph.transitionFunction(node, letter);
        if (!nObj.hasOwnProperty(next[0])) {
          nObj[next[0]] = [];
        }
        nObj[next[0]].push(node.value());
      }
      var nArr = Object.keys(nObj);
      if (!_.find(leaves, function (v) { return _.difference(nArr, v.split(',')).length === 0 })) {
        break;
      } else if (k === minimizer.alphabet.length - 1) {
        //minimizer.selectedNode.unhighlight();
        minimizer.unhighlightAll(minimizer.referenceGraph);
        //minimizer.selectedNode = null;
        //minimizer.jsav.umsg("Node " + latixifyNodeName(treeNode) + " will not be divided.");
        if(questionsIndex < Object.keys(questions["translations"]["en"]).length){
          //console.log(questions["translations"]["en"][String("q" + questionsIndex)]);
          jsav.umsg(Frames.addQuestion(String("q" + questionsIndex)));
          questionsIndex++;
          jsav.step();
        }

        highlightAllNodes(treeNode.split(','), minimizer.referenceGraph);
        return false;
      }
    }
    //console.log(questions["translations"]["en"][String("q" + questionsIndex)]);
    jsav.umsg(Frames.addQuestion(String("q" + questionsIndex)));
    jsav.step();
    questionsIndex++;
    //console.log(questions["translations"]["en"][String("q" + questionsIndex)]);
    jsav.umsg(Frames.addQuestion(String("q" + questionsIndex)));
    jsav.step();
    questionsIndex++;

    var nArr = Object.keys(nObj);
    for (var i = 0; i < leaves.length; i++) {
      var leaf = leaves[i].split(',');
      for (var j = 0; j < nArr.length; j++) {
        if (!sets.hasOwnProperty(leaves[i])) {
          sets[leaves[i]] = [];
        }
        if (_.contains(leaf, nArr[j])) {
          sets[leaves[i]] = _.union(sets[leaves[i]], nObj[nArr[j]]);
        }
      }
    }
    var sArr = Object.keys(sets);
    var node = getTreeNode(treeNode, minimizer.tree.root())

    //var nodeListAsString = "";
    for (var i = 0; i < sArr.length; i++) {
      var nVal = sets[sArr[i]].sort().join();
      if (nVal) {
        //if (nodeListAsString !== "")
          //nodeListAsString += "-";
        node.addChild(nVal, { edgeLabel: letter });
        //nodeListAsString += "Node " + nVal;
      }
    }
    //nodeListAsString = listOFNodesToString(nodeListAsString);
    //nodeListAsString += " by using the transition label " + letter;
    //minimizer.jsav.umsg("Node " + latixifyNodeName(treeNode) + " will be divided into " + nodeListAsString + ".");
    highlightAllNodes(treeNode.split(','), minimizer.referenceGraph);
    //minimizer.unhighlightAll(minimizer.referenceGraph);
    minimizer.tree.layout();

    return true;
  };

  while (moreToSplit) {
    moreToSplit = null;
    for (var i = 0; i < listOfLeaves.length; i++) {
      listOfVisitedLeaves = listOfVisitedLeaves.concat(listOfLeaves);
      minimizer.unhighlightAllTreeNodes(minimizer.tree);
      minimizer.unhighlightAll(minimizer.referenceGraph);
      leaf = listOfLeaves[i];
      var leafTreeNode = getTreeNode(leaf, minimizer.tree.root());
      leafTreeNode.highlight();
      var split = autoPartitionWithQuestions(leaf);
      if (moreToSplit !== null) { moreToSplit = split || moreToSplit; } else { moreToSplit = split; }
    }
    listOfLeaves = _.difference(minimizer.getLeaves(minimizer.tree.root()), listOfVisitedLeaves);
  }
  minimizer.unhighlightAllTreeNodes(minimizer.tree);
  minimizer.unhighlightAll(minimizer.referenceGraph);
  minimizer.jsav.umsg("Since we do not have any more splits, the resulting tree represents the nodes in the minimized DFA.");
  minimizer.jsav.step();
  return minimizer.done(newGraphDimensions);
};

/*
require the initial state and the graph
store each step in the following format:
var res = [
  [{node: "q0,q1,q2", relatedTo: "", type: "initial", weight: ""}],
  [{node: "q3,q4", relatedTo: "q0,q1,q2", type: "new", weight: "a"},
  {node: "q3,q4", relatedTo: "q0,q1,q2", type: "new", weight: "a"}],
  ...,
  [{node: "q6", relatedTo: "q4", type: "new", weight: "b"}]
}];
*/
var getAllStepsForMinimizeDFA = function(minimizer, jsav, referenceGraph, tree) {
  var res = [];

  minimizer.selectedNode = null;
  minimizer.jsav = jsav;
  minimizer.referenceGraph = referenceGraph;
  minimizer.alphabet = Object.keys(minimizer.referenceGraph.alphabet);
  minimizer.tree = tree;
  minimizer.finals = [];
  minimizer.nonfinals = [];
  minimizer.reachable = [];
  minimizer.minimizedEdges = {};

  minimizer.addTrapState();
  var val = minimizer.getReachable();
  res.push([{
    "node" : minimizer.nonfinals.toString(),
    "relatedTo" : "",
    "type" : "nonfinals",
    "weight" : ""
  }]);
  res.push([{
    "node" : minimizer.finals.toString(),
    "relatedTo" : "",
    "type" : "finals",
    "weight" : ""
  }]);

  minimizer.initTree(val);

  var listOfVisitedLeaves = [];
  var listOfLeaves = minimizer.getLeaves(minimizer.tree.root());
  var leaf;
  var moreToSplit = true;

  var minimizerAutoPartition = function (minimizer, treeNode) {
    var leaves = minimizer.getLeaves(minimizer.tree.root());
    var val = treeNode.split(',');
    var nObj = {},
      sets = {},
      letter;
    // check all terminals (even if one was inputted by the user)
    for (var k = 0; k < minimizer.alphabet.length; k++) {
      nObj = {};
      letter = minimizer.alphabet[k];
      for (var j = 0; j < val.length; j++) {
        var node = minimizer.referenceGraph.getNodeWithValue(val[j]);
        var next = minimizer.referenceGraph.transitionFunction(node, letter);
        if (!nObj.hasOwnProperty(next[0])) {
          nObj[next[0]] = [];
        }
        nObj[next[0]].push(node.value());
      }
      var nArr = Object.keys(nObj);
      if (!_.find(leaves, function (v) { return _.difference(nArr, v.split(',')).length === 0 })) {
        break;
      } else if (k === minimizer.alphabet.length - 1) {
        res.push([{
          "node" : treeNode,
          "relatedTo" : "",
          "type" : "notBeDivided",
          "weight" : letter
        }]);
        return false;
      }
    }
    var nArr = Object.keys(nObj);
    for (var i = 0; i < leaves.length; i++) {
      var leaf = leaves[i].split(',');
      for (var j = 0; j < nArr.length; j++) {
        if (!sets.hasOwnProperty(leaves[i])) {
          sets[leaves[i]] = [];
        }
        if (_.contains(leaf, nArr[j])) {
          sets[leaves[i]] = _.union(sets[leaves[i]], nObj[nArr[j]]);
        }
      }
    }
    var sArr = Object.keys(sets);
    var node = getTreeNode(treeNode, minimizer.tree.root());
    var nodeListAsArray = [];
    for (var i = 0; i < sArr.length; i++) {
      var nVal = sets[sArr[i]].sort().join();
      if (nVal) {
        node.addChild(nVal, { edgeLabel: letter });
        nodeListAsArray.push(nVal);
      }
    }

    res.push([{
      "node" : treeNode,
      "relatedTo" : nodeListAsArray,
      "type" : "dividedInto",
      "weight" : letter
    }]);
    return true;
  };

  while (moreToSplit) {
    moreToSplit = null;
    for (var i = 0; i < listOfLeaves.length; i++) {
      listOfVisitedLeaves = listOfVisitedLeaves.concat(listOfLeaves);
      leaf = listOfLeaves[i];
      var leafTreeNode = getTreeNode(leaf, minimizer.tree.root());
      var split = minimizerAutoPartition(minimizer, leaf);
      if (moreToSplit !== null) { moreToSplit = split || moreToSplit; } else { moreToSplit = split; }
    }
    listOfLeaves = _.difference(minimizer.getLeaves(minimizer.tree.root()), listOfVisitedLeaves);
  }

  //minimizer.done(newGraphDimensions);

  //must delete this part when use otherwise student can see the answer
  //console.log(res);
  return res;
};

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

  //minimizer part loops the entire graph then generate questions based on them
  //it can be reused by other visualization functions
  //may need to change parameters of those functions to let them work for other slides
  var steps = getAllStepsForConvertToDFA(startState, graph);

  var generateDFAQuestionsForAState = function (state) {
      var answer = state["node"].split(',');
      if(answer.length == 1){
        return [{
          "type": "multiple",
          "question": "What is transition from state $\\{"+state["relatedTo"]+"\\}$ with the alphabet "+ state["weight"] +". Select the appropriate state",
          "description": "Repeat the process for each new node we find",
          "answer": answer[0], //String if type is multiple, array of string if select
          "choices": allNodes
        }]
      }
      return [{
        "type": "select",
        "question": "What is transition from state $\\{"+state["relatedTo"]+"\\}$ with the alphabet "+ state["weight"] +". Select the appropriate state",
        "description": "Repeat the process for each new node we find",
        "answer": answer, //String if type is multiple, array of string if select
        "choices": allNodes
      }]
  }

  var configureForDFA = {
    "specialQuestionInedx" : [0],
    "specialQuestion" : [
        {
          "type": steps[0][0]["node"].split(',').length == 1 ? "multiple" : "select",
          "question": "Select the initial lambda closure to continue",
          "description": "The first step is to find the lambda closure for the NFA start state. From the NFA's start state, find every other state that can be reached by a lambda transition.",
          "answer": steps[0][0]["node"].split(',').length == 1 ?  steps[0][0]["node"] : steps[0][0]["node"].split(','), //String if type is multiple, array of string if select
          "choices": allNodes
        }
      ],
    "questionPattern" : generateDFAQuestionsForAState
  };

  var questions = generateQuestions(steps, graph, configureForDFA);
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

    jsav.umsg("Nest step is to identify the transitions out of the DFA start state. For each letter in the alphabet, consider all states reachable in the NFA from any state in the start state on that letter. minimizer becomes the name of the target state on that transition.");
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
          if (count < Object.keys(questions["translations"]["en"]).length) {
            jsav.umsg(Frames.addQuestion(String("q" + count)));
            g.layout();
            jsav.step();
            count++;
          }
        }
      }
    }
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
        //next.stateLabel(next.value());
        next.stateLabelPositionUpdate();
      }
    g.updateNodes();
    g.layout();
    //g.disableDragging();
    return g;
};

/*get every state of the graph and assgin them into array of each step
modified from the body of convertToDFA
***********************************************************
change minimizer function to generalize for other kind of slides
***********************************************************
require the initial state and the graph
store each step in the following format:
var res = [
  [{node: "q0,q1,q2", relatedTo: "", type: "initial", weight: ""}],
  [{node: "q3,q4", relatedTo: "q0,q1,q2", type: "new", weight: "a"},
  {node: "q3,q4", relatedTo: "q0,q1,q2", type: "new", weight: "a"}],
  ...,
  [{node: "q6", relatedTo: "q4", type: "new", weight: "b"}]
}];
*/
var getAllStepsForConvertToDFA = function (startState, graph) {
  var res = [];

  var states = [];
  var first = {
    "node" : lambdaClosure([startState.value()], graph).sort().join(),
    "relatedTo" : "",
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
        "relatedTo" : "",
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
        node["relatedTo"] = prev;
        node["weight"] = letter;
        aStep.push(node);
      }
    }

    if (temp.length > 0) {
      res.push(aStep);
    }
  }

  //must delete this part when use otherwise student can see the answer
  //console.log(res);
  return res;
}

var gToFAConverterWithQuestion = function (av_name, converter, nFAoptions, piframesLocations){
  var weights = [];
  for (var i = 0; i < converter.grammerArray.length - 1; i++) {
    var r = converter.grammerMatrix.value(i, 2);
    if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(r[r.length - 1]) === -1) {
      weights.push(r);
    }
    else{
      weights.push(r.substring(0, r.length - 1));
    }
  }
  weights = _.uniq(weights);

  var steps = getStepsForGToFAConverterWithQuestion(converter, nFAoptions);
  var generatingFunction = function (state) {
    if (state["weight"] === "λ") {
      return [{
        "type": "multiple",
        "question": "What is the appropriate transition for production of " + state["node"] + " and the final state?",
        "description": "For each production, we need to draw the appropriate transition.",
        "answer": state["weight"], //String if type is multiple, array of string if select
        "choices": weights
      }]
    } else {
      return [{
        "type": "multiple",
        "question": "What is the appropriate transition for production of " + state["node"] + " and " + state["relatedTo"] + "?",
        "description": "For each production, we need to draw the appropriate transition.",
        "answer": state["weight"], //String if type is multiple, array of string if select
        "choices": weights
      }]
    }
  }
  var configure = {
    "specialQuestionInedx" : [0],
    "specialQuestion" : [
        {
         "type": "select",
         "question": "What are states for variables?",
         "description": "We need a state for each Variable and a final state.",
         "answer": steps[0][0]["node"], //String if type is multiple, array of string if select
         "choices": shuffle(steps[0][0]["node"].concat(["λ"]))
        }
      ],
    "questionPattern" : generatingFunction
  };

  var questions = generateQuestions(steps, null, configure);
  // initialize PI frame
  var Frames = piInit(av_name, questions, piframesLocations);
  var questionsIndex = 0;


  var productions = _.filter(converter.grammerArray, function (x) { return x[0]; });

  // keep a map of variables to FA states
  converter.nodeMap = {};
  converter.builtDFA = converter.jsav.ds.FA({ width: nFAoptions.width, height: nFAoptions.height, left: nFAoptions.left, top: nFAoptions.top, layout: "automatic" });
  converter.builtDFA.disableDragging();
  var newStates = []; // variables
  for (var i = 0; i < productions.length; i++) {
    newStates.push(productions[i][0]);
    newStates = newStates.concat(_.filter(productions[i][2], function (x) { return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(x) !== -1; }));
  }
  newStates = _.uniq(newStates);

  converter.jsav.umsg(Frames.addQuestion(String("q" + questionsIndex)));
  questionsIndex++;
  converter.jsav.step();

  // create FA states
  for (var i = 0; i < newStates.length; i++) {
    var n = converter.builtDFA.addNode({ value: newStates[i] });
    converter.nodeMap[newStates[i]] = n;
    if (i === 0) {
      converter.builtDFA.makeInitial(n);
    }
  }
  // add final state
  converter.finalNode = converter.builtDFA.addNode({ value: "F" });
  converter.finalNode.addClass("final");
  converter.builtDFA.layout();
  selectedNode = null;

  //converter.loopOverEachRow();
  for (var i = 0; i < converter.grammerArray.length - 1; i++) {
    converter.jsav.umsg(Frames.addQuestion(String("q" + questionsIndex)));
    questionsIndex++;
    converter.jsav.step();
    converter.convertGrammarHandler(i);

  }
  converter.jsav.umsg("This is the equivalent NFA for this Regular Grammer.");
  converter.jsav.step();
}

var getStepsForGToFAConverterWithQuestion = function (converter, nFAoptions){
  var res= [];

  var productions = _.filter(converter.grammerArray, function (x) { return x[0]; });
  // keep a map of variables to FA states
  converter.nodeMap = {};
  var newStates = []; // variables
  for (var i = 0; i < productions.length; i++) {
    newStates.push(productions[i][0]);
    newStates = newStates.concat(_.filter(productions[i][2], function (x) { return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(x) !== -1; }));
  }
  newStates = _.uniq(newStates);

  res.push([{
    "node" : newStates,
    "relatedTo" : "",
    "type" : "newStates",
    "weight" : ""
  }]);

  for (var i = 0; i < converter.grammerArray.length - 1; i++) {
    var l = converter.grammerMatrix.value(i, 0);
    var r = converter.grammerMatrix.value(i, 2);
    if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(r[r.length - 1]) === -1) {
      res.push([{
        "node" : l,
        "relatedTo" : r,
        "type" : "regularGrammar",
        "weight" : r
      }]);
    } else {
      res.push([{
        "node" : l,
        "relatedTo" : r[r.length - 1],
        "type" : "regularGrammar",
        "weight" : r.substring(0, r.length - 1)
      }]);
    }
  }
  //console.log(res);
  return res;
}
