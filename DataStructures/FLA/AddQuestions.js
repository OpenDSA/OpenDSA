//initialize PI frame with generated questions
var piInit = function(av_name, questions, piframesLocations = {top: 10, left: 5}) {
  console.log(av_name + " init with questions");
  var injector = PIFRAMES.appendQuestionData(av_name, piframesLocations, questions);
  return injector;
}

//helper functions
//some of them are copied from FA.js
//----------------------------------------------------------------
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
var getAllNonStartNorFinalStates = function (graph) {
  var listOfNodes = graph.nodes();
  var results = [];
  listOfNodes.map(function (node) {
    if (!node.hasClass("final") && !node.hasClass("start"))
      results.push(node);
  });
  return results;
}
var drawTheFinalGraph = function (jsav, options, expression) {
  var fa = jsav.ds.FA($.extend(options));
  var start = fa.addNode({ left: '15px' });
  var height = options.height || 440;
  var width = options.width || 750;
  var end = fa.addNode({ left: width - 10, top: height - 40 });
  fa.makeInitial(start);
  fa.makeFinal(end);
  var t = fa.addEdge(start, end, { weight: expression });
  return fa;
}

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

    var innerCompare = true;
    if(temp.length === sortedChoice.length){
      temp.forEach((tempItem, i) => {
        if(tempItem.toString() !== sortedChoice[i].toString()){
          innerCompare = false;
        }
      });
    }

    if(innerCompare){
      return true;
    }
  }
  return false;
}

var arrow = String.fromCharCode(8594);

//extract all the unique characters in a string and put them into an array
//used to create options for question
var uniqueChar = function (string){
  var res = [];
  for (var i = 0 ; i < string.length ; i++){
    if(!res.includes(string[i])){
      res.push(string[i])
    }
  };
  return res;
}

//get node values from a graph
var toStrNodes = function (graph){
  var res = [];
  graph.nodes().forEach((item) => {
    res.push(item.value());
  });
  return res;
}
//----------------------------------------------------------------
//helper functions end

//trace how many auto functions have been used
//the field is used to create keys for questions object
var currentAutoStack = {};

var updateAutoQuestionStack = function (av_name){
  if(!currentAutoStack.hasOwnProperty(av_name)){
    currentAutoStack[av_name] = 0;
    return 0;
  }
  else{
    currentAutoStack[av_name] = currentAutoStack[av_name] + 1;
    return currentAutoStack[av_name];
  }
}

//store what left on the canvas after a function finished
var graphStack = {};
//hide every stored graph for a jsav
var cleanRemaingGraph = function (av_name){
  if(!graphStack.hasOwnProperty(av_name)){
    return false;
  }
  graphStack[av_name].forEach((item) => {
    item.hide();
  });
}

//generate questions in json format by the graph
//so it can be used by PIframe
var generateQuestions = function (steps, graph = null, configure, av_name) {
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

  var questionsIndex = 0;
  var specialQuestionIndex = 0;
  var i, j;
  for (i = 0; i < steps.length; i++) {
    for (j = 0; j < steps[i].length; j++){
      if(questionsIndex === configure["specialQuestionIndex"][specialQuestionIndex]){
        questions["translations"]["en"][String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)] = configure["specialQuestion"][specialQuestionIndex];
        specialQuestionIndex++;
        questionsIndex++;
      }
      else{
        var qsForAState = configure["questionPattern"](steps[i][j]);
        //if the generation function skiped a state
        if(!Array.isArray(qsForAState)){
          continue;
        }
        if(qsForAState.length != 1){
          qsForAState.forEach(item => {
            questions["translations"]["en"][String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)] = item;
            questionsIndex++;
          });
        }
        else{
          questions["translations"]["en"][String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)] = qsForAState[0];
          questionsIndex++;
        }
      }
    }
  }

  //must delete this part when use otherwise student can see the answer
  //console.log(questions["translations"]["en"]);

  return questions;
}

//following are auto generation functions based on the corresponding one in FA.js
var minimizeDFAWithQuestions = function(minimizer, av_name, jsav, referenceGraph, tree, newGraphDimensions, piframesLocations) {
  var steps = getAllStepsForMinimizeDFA(minimizer, jsav, referenceGraph, tree);

  var generateRandomChoicesForMinimize = function (state) {

    var allChoices = shuffle(state.node.split(','));
    var maxChoices = allChoices.length - 1;
    var divider = state.relatedTo.length - 1;
    if (maxChoices <= 1 || divider < 1){
      console.error("can't generate choices for a node that can't be divided");
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
               "description": "Can state " +state.node+ " be divided by reading the symbol '" + state.weight + "'? That is, does following '" + state.weight + "' out of some states in the set lead to a different node in the tree than does following it out of other states?",
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
      else if (state.type === "notBeDivided"){ //notBeDivided
        return [{
           "type": "multiple",
           "question": "",
           "description": "Can state " +state.node+ " be divided by reading the symbol '" + state.weight + "'?",
           "answer": "no", //String if type is multiple, array of string if select
           "choices": ["yes", "no"]
        }]
      }
      else{//edge
        return [{
           "type": "multiple",
           "question": "",
           "description": "Which symbol should we use to label the transition from node " +state.node+ " to node " + state.relatedTo + "?",
           "answer": state.weight, //String if type is multiple, array of string if select
           "choices": ["a", "b"]
        }]
      }
  }

  var configureForMinimizeDFA = {
    "specialQuestionIndex" : [0, 1],
    "specialQuestion" : [
        {
         "type": "multiple",
         "question": "Select nonfinal states to continue",
         "description": "Initially, the tree will consist of 3 nodes: The root (representing all the states), a leaf node for nonfinal states, and another leaf node for final states.",
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

  var currentStack = updateAutoQuestionStack(av_name);
  var questions = generateQuestions(steps, referenceGraph, configureForMinimizeDFA, av_name);
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
  var questionsIndex = 0;
  jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
  questionsIndex++;

  //minimizer.jsav.umsg("Initially, the tree will consist of 2 nodes. A node for nonfinal states, and another state for final states.")
  minimizer.jsav.step();

  //minimizer.jsav.umsg("These are the nonfinal states.")
  jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
  questionsIndex++;
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
  minimizer.jsav.umsg("Now we will test the terminals against the states in each subset to see if they all go to the same subset. Split them up when they do not go to the same place.");
  jsav.step();


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
          jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
          questionsIndex++;
          jsav.step();
        }

        highlightAllNodes(treeNode.split(','), minimizer.referenceGraph);
        return false;
      }
    }
    jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
    jsav.step();
    questionsIndex++;
    jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
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

    for (var i = 0; i < sArr.length; i++) {
      var nVal = sets[sArr[i]].sort().join();
      if (nVal) {
        node.addChild(nVal, { edgeLabel: letter });
      }
    }
    highlightAllNodes(treeNode.split(','), minimizer.referenceGraph);
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

  var minimizerDone = function (newGraphDimensions) {
    var leaves = minimizer.getLeaves(minimizer.tree.root());
    for (var i = 0; i < leaves.length; i++) {
      var leaf = leaves[i].split(',');
      for (var k = 0; k < minimizer.alphabet.length; k++) {
        var dArr = [],
          letter = minimizer.alphabet[k];
        for (var j = 0; j < leaf.length; j++) {
          var node = minimizer.referenceGraph.getNodeWithValue(leaf[j]);
          var next = minimizer.referenceGraph.transitionFunction(node, letter);
          if (next[0]) {
            dArr.push(next[0]);
          }
        }
        if (!_.find(leaves, function (v) { return _.difference(dArr, v.split(',')).length === 0 }) && dArr.length !== 0) {
          minimizer.jsav.umsg("There are distinguishable states remaining");
          return;
        }
      }
    }
    // if complete create minimized DFA

    var graph = minimizer.jsav.ds.FA({
      width: newGraphDimensions.width,
      height: newGraphDimensions.height,
      layout: 'automatic',
      left: newGraphDimensions.left,
      top: newGraphDimensions.top
    });
    for (var i = 0; i < leaves.length; i++) {
      var node = graph.addNode({ value: leaves[i] });
      //node.stateLabel(leaves[i]);
      var leaf = leaves[i].split(',');
      for (var j = 0; j < leaf.length; j++) {
        var n = minimizer.referenceGraph.getNodeWithValue(leaf[j]);
        if (n.equals(minimizer.referenceGraph.initial)) {
          graph.makeInitial(node);
          break;
        } else if (n.hasClass('final')) {
          node.addClass('final');
          break;
        }
      }
    }
    var edges = minimizer.referenceGraph.edges();
    // "create" edges, store as a reference
    for (var next = edges.next(); next; next = edges.next()) {
      // get nodes make edges
      var ns = next.start().value(),
        ne = next.end().value(),
        nodes = graph.nodes(),
        node1,
        node2;
      for (var next2 = nodes.next(); next2; next2 = nodes.next()) {
        if (next2.value().split(',').indexOf(ns) !== -1) {
          node1 = next2;
        }
        if (next2.value().split(',').indexOf(ne) !== -1) {
          node2 = next2;
        }
      }
      // graph.addEdge(node1, node2, {weight: next.weight()});
      if (!minimizer.minimizedEdges.hasOwnProperty(node1.value())) {
        minimizer.minimizedEdges[node1.value()] = [];
      }
      var edgesFrom1 = minimizer.minimizedEdges[node1.value()];
      if (!edgesFrom1.hasOwnProperty(node2.value())) {
        edgesFrom1[node2.value()] = [];
      }
      edgesFrom1[node2.value()] = _.union(edgesFrom1[node2.value()],
        next.weight().split("<br>"));
    }
    graph.layout();
    minimizer.jsav.step();
    //graph.click(nodeClickHandlers);
    minimizer.jsav.umsg("Finish the DFA by finding the transisitons between nodes.");
    studentGraph = graph;

    var minimizerComplete = function (studentGraph) {
      for (var i in minimizer.minimizedEdges) {
        for (var j in minimizer.minimizedEdges[i]) {
          var n1 = studentGraph.getNodeWithValue(i),
            n2 = studentGraph.getNodeWithValue(j),
            w = minimizer.minimizedEdges[i][j].join('<br>');
          jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
          jsav.step();
          questionsIndex++;
          var newEdge = studentGraph.addEdge(n1, n2, { weight: w });
          if (newEdge) {
            newEdge.layout();
          }
        }
      }
//      studentGraph.disableDragging();
      minimizer.jsav.umsg("The resulting DFA is finished.");
      return studentGraph;
    };
    return minimizerComplete(graph);
  };

  var res = minimizerDone(newGraphDimensions);
  graphStack[av_name] = [];
  graphStack[av_name].push(minimizer.referenceGraph);
  graphStack[av_name].push(minimizer.tree);
  graphStack[av_name].push(res);
  return res;
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

  var minimizerDone = function () {
    var leaves = minimizer.getLeaves(minimizer.tree.root());
    for (var i = 0; i < leaves.length; i++) {
      var leaf = leaves[i].split(',');
      for (var k = 0; k < minimizer.alphabet.length; k++) {
        var dArr = [],
          letter = minimizer.alphabet[k];
        for (var j = 0; j < leaf.length; j++) {
          var node = minimizer.referenceGraph.getNodeWithValue(leaf[j]);
          var next = minimizer.referenceGraph.transitionFunction(node, letter);
          if (next[0]) {
            dArr.push(next[0]);
          }
        }
        if (!_.find(leaves, function (v) { return _.difference(dArr, v.split(',')).length === 0 }) && dArr.length !== 0) {
          //minimizer.jsav.umsg("There are distinguishable states remaining");
          return;
        }
      }
    }
    // if complete create minimized DFA

    var graph = minimizer.jsav.ds.FA({
      layout: 'automatic'
    });
    for (var i = 0; i < leaves.length; i++) {
      var node = graph.addNode({ value: leaves[i] });
      //node.stateLabel(leaves[i]);
      var leaf = leaves[i].split(',');
      for (var j = 0; j < leaf.length; j++) {
        var n = minimizer.referenceGraph.getNodeWithValue(leaf[j]);
        if (n.equals(minimizer.referenceGraph.initial)) {
          graph.makeInitial(node);
          break;
        } else if (n.hasClass('final')) {
          node.addClass('final');
          break;
        }
      }
    }
    var edges = minimizer.referenceGraph.edges();
    // "create" edges, store as a reference
    for (var next = edges.next(); next; next = edges.next()) {
      // get nodes make edges
      var ns = next.start().value(),
        ne = next.end().value(),
        nodes = graph.nodes(),
        node1,
        node2;
      for (var next2 = nodes.next(); next2; next2 = nodes.next()) {
        if (next2.value().split(',').indexOf(ns) !== -1) {
          node1 = next2;
        }
        if (next2.value().split(',').indexOf(ne) !== -1) {
          node2 = next2;
        }
      }

      if (!minimizer.minimizedEdges.hasOwnProperty(node1.value())) {
        minimizer.minimizedEdges[node1.value()] = [];
      }
      var edgesFrom1 = minimizer.minimizedEdges[node1.value()];
      if (!edgesFrom1.hasOwnProperty(node2.value())) {
        edgesFrom1[node2.value()] = [];
      }
      edgesFrom1[node2.value()] = _.union(edgesFrom1[node2.value()],
        next.weight().split("<br>"));
    }

    studentGraph = graph;
    var minimizerComplete = function (studentGraph) {
      for (var i in minimizer.minimizedEdges) {
        for (var j in minimizer.minimizedEdges[i]) {
          var n1 = studentGraph.getNodeWithValue(i),
            n2 = studentGraph.getNodeWithValue(j),
            w = minimizer.minimizedEdges[i][j].join('<br>');
          var newEdge = studentGraph.addEdge(n1, n2, { weight: w });
          if (newEdge) {
            res.push([{
              "node" : n1.value(),
              "relatedTo" : n2.value(),
              "type" : "edge",
              "weight" : w
            }]);
            newEdge.layout();
          }
        }
      }
    };

    minimizerComplete(studentGraph);
    graph.hide();
  };
  minimizerDone();
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
  //store all the nodes of original graph for question generation
  var allNodes = [];
  //get the nodes of original graph
  graph.nodes().forEach(node => {
    allNodes.push(node.options["value"]);
  });
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
    "specialQuestionIndex" : [0],
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

  var currentStack = updateAutoQuestionStack(av_name);
  var questions = generateQuestions(steps, graph, configureForDFA, av_name);
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
  var questionsIndex = 0;
  if (visualizable)
    jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
    questionsIndex++;
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
    jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
    questionsIndex++;
    g.layout();
    jsav.step();
  }

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
          if (questionsIndex < Object.keys(questions["translations"]["en"]).length) {
            jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
            questionsIndex++;
            g.layout();
            jsav.step();
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
    graphStack[av_name] = [];
    graphStack[av_name].push(g);
    graphStack[av_name].push(graph);
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

  var steps = getStepsForGToFAConverter(converter, nFAoptions);
  var generatingFunction = function (state) {
    if (state["type"] === "final") {
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
    "specialQuestionIndex" : [0],
    "specialQuestion" : [
        {
         "type": "select",
         "question": "What are states for variables?",
         "description": "We need a state for each Variable and a final state.",
         "answer": steps[0][0]["node"], //String if type is multiple, array of string if select
         "choices": steps[0][0]["node"].concat(["λ"])
        }
      ],
    "questionPattern" : generatingFunction
  };

  var currentStack = updateAutoQuestionStack(av_name);
  var questions = generateQuestions(steps, null, configure, av_name);
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

  converter.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
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
    converter.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
    questionsIndex++;
    converter.jsav.step();
    converter.convertGrammarHandler(i);
  }

  converter.jsav.umsg("This is the equivalent NFA for this Regular Grammer.");

  graphStack[av_name] = [];
  graphStack[av_name].push(converter.builtDFA);
  graphStack[av_name].push(converter.grammerMatrix);
  return converter;
}

var getStepsForGToFAConverter = function (converter, nFAoptions){
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
        "type" : "final",
        "weight" : r
      }]);
    } else {
      res.push([{
        "node" : l,
        "relatedTo" : r[r.length - 1],
        "type" : "regularGrammarToNFA",
        "weight" : r.substring(0, r.length - 1)
      }]);
    }
  }
  return res;
}

var convertToGrammarWithQuestions = function (av_name, av, FAtoGrammar, grammarMatrix, piframesLocations) {
  // by default sets S to be the start variable
  var variables = "SABCDEFGHIJKLMNOPQRTUVWXYZ";
  var s = FAtoGrammar.FA.initial;
  var newVariables = [s];
  var nodes = FAtoGrammar.FA.nodes();
  var converted = [];
  var matrixIndex = 0;

  for (var next = nodes.next(); next; next = nodes.next()) {
    if (!next.equals(s)) {
      newVariables.push(next);
    }
  }
  var finals = [];

  var states = [];
  for(var i = 0 ; i < newVariables.length ; i++){
    states.push(newVariables[i].value());
  }
  var steps = getStepsForConvertToGrammar(FAtoGrammar, grammarMatrix);
  //console.log(steps);

  var weights = [];
  for (var i = 0; i < steps.length; i++) {
    for (var j = 0; j < steps[i].length; j++){
      if(steps[i][j].weight !== ""){
        weights.push(steps[i][j].weight);
      }
    }
  }
  weights = _.uniq(weights);

  var generatingFunction = function (state) {
    if (state["type"] === "final") {
      return [{
        "type": "multiple",
        "question": "Which one represents the final state?",
        "description": "We need to add a new transition with " + emptystring + ".",
        "answer": state["node"], //String if type is multiple, array of string if select
        "choices": states
      }]
    } else if(state["type"] === "first"){
      return [{
        "type": "textBoxStrict",
        "question": "",
        "description": "There are how many transitions for state: " + state["node"] + " ?",
        "answer": state["relatedTo"], //String if type is multiple, array of string if select
        "choices": ""
      }]
    } else {
      return [
        {
          "type": "multiple",
          "question": "",
          "description": "What is the appropriate transition? Suppose the production is about " + state["node"] + " and " + state.relatedTo + ".",
          "answer": state["weight"], //String if type is multiple, array of string if select
          "choices": weights
        }
      ]
    }
  }
  var configure = {
    "specialQuestionIndex" : [],
    "specialQuestion" : [],
    "questionPattern" : generatingFunction
  };

  var currentStack = updateAutoQuestionStack(av_name);
  var questions = generateQuestions(steps, null, configure, av_name);
  // initialize PI frame
  var Frames = piInit(av_name, questions, piframesLocations);
  var questionsIndex = 0;

  FAtoGrammar.jsav.umsg("Now we need to check every state and transition to determine grammar productions.");
  FAtoGrammar.jsav.step();

  for (var i = 0; i < newVariables.length; i++) {
    var edges = newVariables[i].getOutgoing();
    FAtoGrammar.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
    questionsIndex++;
    FAtoGrammar.jsav.step();

    if (i > 0) {
      newVariables[i - 1].unhighlight();
      newVariables[i - 1].getOutgoing().map(function (edge) {
        edge.removeClass("testingLambda");
        edge._label.removeClass("testingLambda");
      });
    }

    newVariables[i].highlight();
    newVariables[i].getOutgoing().map(function (edge) {
      edge.addClass("testingLambda");
      edge._label.addClass("testingLambda");
    });
    FAtoGrammar.jsav.umsg("For state: " + newVariables[i].value() + ", there " + ((edges.length > 1) ? "are " : "is ") + edges.length + " transition" + ((edges.length > 1) ? "s" : ""));
    FAtoGrammar.jsav.step();

    for (var j = 0; j < edges.length; j++) {
      var toVar = variables[newVariables.indexOf(edges[j].end())];
      var weight = edges[j].weight().split("<br>");

      for (var k = 0; k < weight.length; k++) {
        FAtoGrammar.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
        questionsIndex++;
        FAtoGrammar.jsav.step();
        var terminal = weight[k];
        if (weight[k] === emptystring) {
          terminal = "";
        }
        converted.push([variables[i], arrow, terminal + toVar]);
        grammarMatrix.value(matrixIndex, 0, variables[i]);
        grammarMatrix.value(matrixIndex, 2, terminal + toVar);
        grammarMatrix._arrays[matrixIndex++].show();
      }
    }

    if (newVariables[i].hasClass('final')) {
      FAtoGrammar.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
      questionsIndex++;
      FAtoGrammar.jsav.step();
      finals.push([variables[i], arrow, emptystring]);
      grammarMatrix.value(matrixIndex, 0, variables[i]);
      grammarMatrix.value(matrixIndex, 2, emptystring);
      FAtoGrammar.jsav.umsg("Since " + variables[i] + " is the final state, we need to add a new transition with " + emptystring + ".");
      FAtoGrammar.jsav.step();
      grammarMatrix._arrays[matrixIndex].show();
    }
  }
  newVariables[newVariables.length - 1].unhighlight();
  newVariables[newVariables.length - 1].getOutgoing().map(function (edge) {
    edge.removeClass("testingLambda");
    edge._label.removeClass("testingLambda");
  });
  converted = converted.concat(finals);

  graphStack[av_name] = [];
  graphStack[av_name].push(grammarMatrix);
  graphStack[av_name].push(FAtoGrammar.FA);
  // save resulting grammar as an array of arrays of strings
  // (same format as how the grammarEditor reads grammars)

  return JSON.stringify(converted);
};

var getStepsForConvertToGrammar = function(FAtoGrammar, grammarMatrix) {
  // by default sets S to be the start variable
  var variables = "SABCDEFGHIJKLMNOPQRTUVWXYZ";
  var s = FAtoGrammar.FA.initial;
  var newVariables = [s];
  var nodes = FAtoGrammar.FA.nodes();
  var arrow = String.fromCharCode(8594);
  var converted = [];
  var matrixIndex = 0;

  for (var next = nodes.next(); next; next = nodes.next()) {
    if (!next.equals(s)) {
      newVariables.push(next);
    }
  }
  var finals = [];
  for (var i = 0; i < newVariables.length; i++) {
    var edges = newVariables[i].getOutgoing();
    if (i > 0) {
      newVariables[i - 1].getOutgoing().map(function (edge) {
        edge.removeClass("testingLambda");
        edge._label.removeClass("testingLambda");
      });
    }
    converted.push([{
      "node" : newVariables[i].value(),
      "relatedTo" : edges.length,
      "type" : "first",
      "weight" : ""
    }]);

    var temp = [];
    for (var j = 0; j < edges.length; j++) {
      var toVar = edges[j].end().value();
      var weight = edges[j].weight().split("<br>");
      newVariables[i].getOutgoing().map(function (edge) {
        edge.addClass("testingLambda");
        edge._label.addClass("testingLambda");
      });
      for (var k = 0; k < weight.length; k++) {
        var terminal = weight[k];
        if (weight[k] === emptystring) {
          terminal = "";
        }
        temp.push({
          "node" : newVariables[i].value(),
          "relatedTo" : toVar,
          "type" : "otherState",
          "weight" : terminal
        });
      }
    }
    converted.push(temp);

    if (newVariables[i].hasClass('final')) {
      converted.push([{
        "node" : newVariables[i].value(),
        "relatedTo" : emptystring,
        "type" : "final",
        "weight" : "λ"
      }]);
    }
  }
  newVariables[newVariables.length - 1].getOutgoing().map(function (edge) {
    edge.removeClass("testingLambda");
    edge._label.removeClass("testingLambda");
  });
  return converted;
}

var acceptorVisualizeWithQuestions = function (av_name, av, acceptor, listOfStrings, arrayOptions, piframesLocations) {
  var special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
  acceptor.matrix = acceptor.jsav.ds.matrix(listOfStrings, { style: "table", top: arrayOptions.top, left: arrayOptions.left });

  var steps = getStepsForAcceptorVisualize(acceptor, listOfStrings, arrayOptions);
  var generatingFunction = function (state) {
      if(state["type"] === "ACCEPTED"){
        return [{
          "type": "multiple",
          "question": "Are we in a final state?",
          "description": "We are at the end of the string.",
          "answer": "Yes", //String if type is multiple, array of string if select
          "choices": ["Yes", "No"]
        },{
          "type": "multiple",
          "question": "Should this string be ACCEPTED or REJECTED?",
          "description": "",
          "answer": "ACCEPTED", //String if type is multiple, array of string if select
          "choices": ["ACCEPTED", "REJECTED"]
        }]
      }
      else{//"REJECTED"
        return [{
          "type": "multiple",
          "question": "Are we in a final state?",
          "description": "We are at the end of the string.",
          "answer": "No", //String if type is multiple, array of string if select
          "choices": ["Yes", "No"]
        },{
          "type": "multiple",
          "question": "Should this string be ACCEPTED or REJECTED?",
          "description": "",
          "answer": "REJECTED", //String if type is multiple, array of string if select
          "choices": ["ACCEPTED", "REJECTED"]
        }]
      }
  }
  var configure = {
    "specialQuestionIndex" : [],
    "specialQuestion" : [],
    "questionPattern" : generatingFunction
  };

  var currentStack = updateAutoQuestionStack(av_name);
  var questions = generateQuestions(steps, av, configure, av_name);
  // initialize PI frame
  var Frames = piInit(av_name, questions, piframesLocations);
  var questionsIndex = 0;

  var run = function (acceptor, inputString, matrixRow) {
    // Start with the closure of the initial state.
    acceptor.FA.initial.addClass('current');
    var currentStates = [acceptor.FA.initial];
    currentStates = window.FiniteAutomaton.addLambdaClosure(acceptor.FA, currentStates);
    var nextStates = currentStates;

    // Create an array of characters in the input string.
    var textArray = [];
    for (var i = 0; i < inputString.length; i++) {
      textArray.push(inputString[i]);
    }
    // Use acceptor array to initialize the JSAV array.
    // Iterate over each character in the input string.
    for (var i = 0; i < inputString.length; i++) {
      // "Current" is used to mark states as visited, so start by removing "Current" from every node.
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].removeClass('current');
      }
      // Run traversal step to find next states.
      nextStates = window.FiniteAutomaton.traverse(acceptor.FA, currentStates, inputString[i]);
      if (nextStates.length == 0) {
        // If there are no next states, the input string was rejected. Update CSS of JSAV graph and array.
        for (var k = 0; k < currentStates.length; k++) {
          currentStates[k].addClass('rejected');
        }
        acceptor.matrix.css(matrixRow, i, { "background-color": "red" });
        // Add a step to the slideshow and break out of the loop.
        acceptor.jsav.step();
        break;
      }
      // Prepare for the next iteration of the loop. Update the current character in the JSAV array and add a step to the slideshow.
      currentStates = nextStates;
      acceptor.jsav.umsg("Read a lettter and follow its transition out of the current state.");
      acceptor.matrix.css(matrixRow, i, { "background-color": "yellow" });
      acceptor.jsav.step();
    }

    var rejected = true;
    acceptor.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
    questionsIndex++;
    acceptor.jsav.step();
    acceptor.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
    questionsIndex++;
    acceptor.jsav.step();

    for (var k = 0; k < currentStates.length; k++) {
      // If we finished on a final state, the input string was accepted (unless we didn't make it to the end of the input string).
      if (currentStates[k].hasClass('final') && nextStates.length > 0) {
        // If there are no next states, it means the break statement in line 128 was triggered. Otherwise, we know we made it to the end of the input string.
        currentStates[k].addClass('accepted');
        rejected = false;
      }
    }

    if (rejected) {
      // If the input string was rejected, color every character in the JSAV array red.
      for (var l = 0; l < inputString.length; l++) {
        //arr.css(l, {"background-color": "red"});
        acceptor.matrix.css(matrixRow, l, { "background-color": "red" });
      }
      acceptor.jsav.umsg("We are at the end of the string, but we are not in a final state. So the string is REJECTED.");

    } else {
      // If the input string was accepted, color every character in the JSAV array green.
      for (var l = 0; l < inputString.length; l++) {
        //arr.css(l, {"background-color": "green"});
        acceptor.matrix.css(matrixRow, l, { "background-color": "green" });
      }
      acceptor.jsav.umsg("We are at the end of the string, and we are in a final state. So the string is ACCEPTED.");
    }

    // If the input string was rejected, label every current node as rejected.
    var nodes = acceptor.FA.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.hasClass('current') && rejected) {
        next.addClass('rejected');
      }
      next.removeClass('current');
    }

    // Add the last step to the slideshow, stop recording the slideshow, and add the click handler to the JSAV array.
    acceptor.jsav.step();
  };
  acceptor.resetFA();
  for (var i = 0; i < listOfStrings.length; i++) {
    acceptor.jsav.umsg("The " + special[i + 1] + " string is " + listOfStrings[i].join(''));
    acceptor.jsav.step();
    acceptor.resetFA();
    run(acceptor, listOfStrings[i], i);
  }

  graphStack[av_name] = [];
  graphStack[av_name].push(acceptor.FA);
  graphStack[av_name].push(acceptor.matrix);
}

var getStepsForAcceptorVisualize = function (acceptor, listOfStrings, arrayOptions) {
  var res = [];
  var run = function (acceptor, inputString, matrixRow) {
    // Start with the closure of the initial state.
    acceptor.FA.initial.addClass('current');
    var currentStates = [acceptor.FA.initial];
    currentStates = window.FiniteAutomaton.addLambdaClosure(acceptor.FA, currentStates);
    var nextStates = currentStates;

    // Create an array of characters in the input string.
    var textArray = [];
    for (var i = 0; i < inputString.length; i++) {
      textArray.push(inputString[i]);
    }
    // Iterate over each character in the input string.
    for (var i = 0; i < inputString.length; i++) {
      // "Current" is used to mark states as visited, so start by removing "Current" from every node.
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].removeClass('current');
      }
      // Run traversal step to find next states.
      nextStates = window.FiniteAutomaton.traverse(acceptor.FA, currentStates, inputString[i]);
      if (nextStates.length == 0) {
        // If there are no next states, the input string was rejected. Update CSS of JSAV graph and array.
        for (var k = 0; k < currentStates.length; k++) {
          currentStates[k].addClass('rejected');
        }
        break;
      }
      // Prepare for the next iteration of the loop. Update the current character in the JSAV array and add a step to the slideshow.
      currentStates = nextStates;
    }

    var rejected = true;
    for (var k = 0; k < currentStates.length; k++) {
      // If we finished on a final state, the input string was accepted (unless we didn't make it to the end of the input string).
      if (currentStates[k].hasClass('final') && nextStates.length > 0) {
        // If there are no next states, it means the break statement in line 128 was triggered. Otherwise, we know we made it to the end of the input string.
        currentStates[k].addClass('accepted');
        rejected = false;
      }
    }

    if (rejected) {
      res.push([{
        "node" : "",
        "relatedTo" : "",
        "type" : "REJECTED",
        "weight" : ""
      }]);
    } else {
      res.push([{
        "node" : "",
        "relatedTo" : "",
        "type" : "ACCEPTED",
        "weight" : ""
      }]);
    }

    // If the input string was rejected, label every current node as rejected.
    var nodes = acceptor.FA.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.hasClass('current') && rejected) {
        next.addClass('rejected');
      }
      next.removeClass('current');
    }

  };
  for (var i = 0; i < listOfStrings.length; i++) {
    acceptor.resetFA();
    run(acceptor, listOfStrings[i], i);
  }
  return res;
};

var visualizeConversionWithQuestions = function (fatoreController, url, av_name, transitionOptions = {}, finaGraphOptions = {}, piframesLocations){
  var oldNFA = fatoreController.fa;
  var tempNFA = new fatoreController.jsav.ds.FA({url: url});
  fatoreController.fa = tempNFA;
  var steps = getStepsForvisualizeConversion(fatoreController, transitionOptions, finaGraphOptions);

  fatoreController.fa = oldNFA;
  var split = 0;
  for(var i = 0 ; i < steps.length ; i++){
    if(steps[i][0]["type"] !== "missingTransition"){
       split = i;
       break;
    }
  }
  var missingTransitions = steps.splice(0, split);
  var nodes = getAllNonStartNorFinalStates(fatoreController.fa);
  var strNodes = [];
  nodes.forEach((item, i) => {
    strNodes.push(item.value());
  });
  var allNodes = [];
  fatoreController.fa.nodes().forEach((item, i) => {
    allNodes.push(item.value());
  });
  var expCount = [];
  var currentNode = "";
  var generatingFunction = function (state) {
      if(state["type"] === "affectedTransition"){
        return [{
          "type": "textBoxStrict",
          "question": "Example: a+a*b. Input 'none' without quotes if there is no regular expression can be infered.",
          "description": "Removing node $"+ currentNode +"$, what will be the new transition from $" + state["node"] + "$ to $"+state["relatedTo"]+"$?",
          "answer": state["weight"] === String.fromCharCode(248) ? "none" : state["weight"], //String if type is multiple, array of string if select
          "choices": ""
        }];
      }
      else if(state["type"] === "expCount"){
        expCount.push(state["weight"]);
        return "skip";
      }
      else if(state["type"] === "currentNode"){
        currentNode = state["node"];
        return "skip";
      }
      else{
        return "skip";
      }
  }
  var configure = {
    "specialQuestionIndex" : [0],
    "specialQuestion" : [{
      "type":  strNodes.length == 1 ? "multiple" : "select",
      "question": "",
      "description": strNodes.length == 1 ? "Which of the following nodes may we collapse?" : "Select all the nodes we may collapse.",
      "answer": strNodes.length == 1 ?  strNodes[0] : strNodes, //String if type is multiple, array of string if select
      "choices": allNodes
    }],
    "questionPattern" : generatingFunction
  };

  var currentStack = updateAutoQuestionStack(av_name);
  var questions = generateQuestions(steps, fatoreController.jsav, configure, av_name);
  // initialize PI frame
  var Frames = piInit(av_name, questions, piframesLocations);
  var questionsIndex = 0;

  fatoreController.visualize = true;
  fatoreController.jsav.umsg("We need to complete all the missing tansitions for this Machine");
  fatoreController.jsav.step();

  fatoreController.completeTransitions();
  fatoreController.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
  questionsIndex++;

  for (var i = 0; i < nodes.length; i++) {
    fatoreController.jsav.step();
    fatoreController.jsav.umsg("We should collapse the node " + nodes[i].value());

    nodes[i].highlight();
    for (var j = 0 ; j < expCount[i] ; j++) {
      fatoreController.jsav.step();
      fatoreController.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
      questionsIndex++;
    }
    fatoreController.jsav.step();
    localStorage.trans = 'false';
    fatoreController.fa.selected = nodes[i];
    fatoreController.collapseState(nodes[i], transitionOptions);
    $("#" + av_name + " .jsavmatrixtable").css({
      top: transitionOptions.top
    });

    fatoreController.jsav.umsg("You can click on each table row to heighlight the affected transitions.");
    fatoreController.jsav.step();
    nodes[i].unhighlight();
    fatoreController.jsav.umsg("Removing the node " + nodes[i].value() + " will create an new but equivalent graph");
    fatoreController.finalizeRE();
  }
  fatoreController.jsav.step();
  fatoreController.jsav.umsg("After removing all nodes that are not final and not start, the resulting Regular Exepression is");
  fatoreController.transitions.hide();
  var final = drawTheFinalGraph(fatoreController.jsav, finaGraphOptions, fatoreController.generateExpression());

  //TODO
  graphStack[av_name] = [];
  graphStack[av_name].push(fatoreController.fa);
  graphStack[av_name].push(final);
}

var getStepsForvisualizeConversion = function (fatoreController, transitionOptions = {}, finaGraphOptions = {}){
  var res = [];
  fatoreController.visualize = true;
  var nodes1 = fatoreController.fa.nodes();
  var nodes2 = fatoreController.fa.nodes();
  for (var from = nodes1.next(); from; from = nodes1.next()) {
    for (var to = nodes2.next(); to; to = nodes2.next()) {
      if (!fatoreController.fa.hasEdge(from, to)) {
        res.push([{
          "node" : from.value(),
          "relatedTo" : to.value(),
          "type" : "missingTransition",
          "weight" : "none"
        }]);
        none = String.fromCharCode(248);
        fatoreController.fa.addEdge(from, to, { weight: none });
      }
    }
    nodes2.reset();
  }
  fatoreController.checkForTransitions();
  var nodes = getAllNonStartNorFinalStates(fatoreController.fa);
  res.push([{
    "node" : nodes,
    "relatedTo" : "",
    "type" : "NorFinalStates",
    "weight" : "none"
  }]);
  var finalExpression = "";
  for (var i = 0; i < nodes.length; i++) {
    res.push([{
      "node" : nodes[i].value(),
      "relatedTo" : "",
      "type" : "currentNode",
      "weight" : ""
    }]);
    localStorage.trans = 'false';
    nodes[i].highlight();
    fatoreController.fa.selected = nodes[i];

    var table = [];
    var collapseState = function (node, transitionOptions) {
      function addStar(transition) {
        if (transition.length == 1) return transition + "*";
        var count = 0;
        if (transition.charAt(0) !== "(") return "(" + transition + ")*";
        for (var i = 0; i < transition.length; i++) {
          if (transition.charAt(i) == "(") count++;
          else if (transition.charAt(i) == ")") count--;
          if (count == 0 && i < transition.length - 1) return "(" + transition + ")*";
        }
        return transition + "*";
      }

      if (localStorage.trans === "true") {
        return;
      }

      var nodes1 = fatoreController.fa.nodes();
      var nodes2 = fatoreController.fa.nodes();
      var count = 0;
      for (var from = nodes1.next(); from; from = nodes1.next()) {
        nodes2.reset();
        for (var to = nodes2.next(); to; to = nodes2.next()) {
          if (from == fatoreController.fa.selected || to == fatoreController.fa.selected) continue;
          var straight = fatoreController.fa.getEdge(from, to).weight();
          var begin = fatoreController.fa.getEdge(from, node).weight();
          var pause = fatoreController.fa.getEdge(node, node).weight();
          var end = fatoreController.fa.getEdge(node, to).weight();
          var indirect = "";
          var direct = straight;
          if (begin == none || end == none) {
            res.push([{
              "node" : from.value(),
              "relatedTo" : to.value(),
              "type" : "affectedTransition",
              "weight" : direct
            }]);
            table.push([from.value(), to.value(), direct]);
          } else {
            var step1 = begin;
            var step2 = pause;
            var step3 = end;
            if (step2 == none || step2 == lambda) {
              if (step1 == lambda) {
                indirect = step3;
              } else if (step3 == lambda) {
                indirect = step1;
              } else {
                indirect = step1 + step3;
              }
            } else if (step1 == lambda && step3 == lambda) {
              indirect = addStar(step2);
            } else if (step1 == lambda) {
              indirect = addStar(step2) + step3;
            } else if (step3 == lambda) {
              indirect = step1 + addStar(step2);
            } else {
              indirect = step1 + addStar(step2) + step3;
            }
            if (direct == none) {
              res.push([{
                "node" : from.value(),
                "relatedTo" : to.value(),
                "type" : "affectedTransition",
                "weight" : indirect
              }]);
              table.push([from.value(), to.value(), indirect]);
            } else {
              res.push([{
                "node" : from.value(),
                "relatedTo" : to.value(),
                "type" : "affectedTransition",
                "weight" : direct + "+" + indirect
              }]);
              table.push([from.value(), to.value(), direct + "+" + indirect]);
            }
          }
          count++;
        }
      }
      return count;
    }

    var expNum = collapseState(nodes[i], transitionOptions);
    res.push([{
      "node" : "",
      "relatedTo" : "",
      "type" : "expCount",
      "weight" : expNum
    }]);
    for (var i = 0; i < table.length; i++) {
      var row = table[i];
      var from = fatoreController.fa.getNodeWithValue(row[0]);
      var to = fatoreController.fa.getNodeWithValue(row[1]);
      var newTransition = row[2];
      fatoreController.fa.removeEdge(from, to);
      fatoreController.fa.addEdge(from, to, { weight: newTransition });
    }
    fatoreController.fa.removeNode(fatoreController.fa.selected);
    if (fatoreController.fa.nodes().length == 2) {
      finalExpression = fatoreController.generateExpression();
    }
  }
  var nodes = fatoreController.fa.nodes();
  for (var node = nodes.next(); node; node = nodes.next()) {
    fatoreController.fa.removeNode(node);
  }
  fatoreController.fa.hide();
  res.push([{
    "node" : "",
    "relatedTo" : "",
    "type" : "finalExpression",
    "weight" : finalExpression
  }]);
  return res;
}

var displayTreeWithQuestions = function (pt, av, av_name, piframesLocations){

  var productions = [];
  var grammarVariables = [];
  var start = pt.productions[0][0];
  pt.productions.forEach((item) => {
    productions.push(item.join(''));
    grammarVariables.push(item[0]);
  });
  grammarVariables = Array.from(new Set(grammarVariables));
  var steps = getStepsForDisplayTree(pt);
  steps.unshift([{
    "node" : "",
    "relatedTo" : "",
    "type" : "empty",
    "weight" : ""
  }]);
  var generatingFunction = function (state) {
    if(state["type"] === "empty"){
      return null;
    }
    else {
      return [{
        "type": "multiple",
        "question": "",
        "description": "Which of the following productions should we next substitute in to build the tree?",
        "answer": state["weight"], //String if type is multiple, array of string if select
        "choices": productions
      }]
    }
  }
  var configure = {
    "specialQuestionIndex" : [0],
    "specialQuestion" : [{
      "type": "multiple",
      "question": "",
      "description": "Which of the following is the grammar start variable?",
      "answer": start, //String if type is multiple, array of string if select
      "choices": grammarVariables
    }],
    "questionPattern" : generatingFunction
  };

  var currentStack = updateAutoQuestionStack(av_name);
  var questions = generateQuestions(steps, av, configure, av_name);
  // initialize PI frame
  var Frames = piInit(av_name, questions, piframesLocations);
  var questionsIndex = 0;

  pt.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
  questionsIndex++;
  pt.jsav.step();

  var inputString = pt.inputString;
  var productions = pt.productions;

  var table = {};   // maps each sentential form to the rule that produces it
  var next;
  var accepted = pt.stringAccepted(inputString);
  if (accepted[0]) {

    table = pt.derivationTree;
    var temp = accepted[1];
    var results = [];   // derivation table
    counter = 0;
    // go through the map of sentential forms to productions in order to get the trace
    do {                // handles the case where inputstring is the emptystring
      counter++;
      if (counter > 500) {
        console.warn(counter);
        break;
      }
      var rp = table[temp][0].join("");
      results.push([rp, temp]);
      temp = table[temp][1];
    } while (table[temp] && temp);


    results.reverse();
    // set up display

    //var displayOrder = [];  // order in which to display the nodes of the parse tree
    // create the parse tree using the derivation table
    pt.jsav.umsg("The root of the parse tree is the grammar start variable");
    pt.parseTree.root(results[0][0].split(arrow)[0]);
    var root = pt.parseTree.root();
    var sentential = [root]; //order of sentential form nodes

    pt.jsav.step();
    for (var i = 0; i < results.length; i++) {
      pt.jsav.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
      questionsIndex++;
      pt.jsav.step();

      var lhsProd = results[i][0].split(arrow)[0];
      var rhsProd = results[i][0].split(arrow)[1];
      //find correct lhs in sentential
      var sententialString = "";
      for(var j = 0; j < sentential.length; j++){
        //join all nodes to make a sentential string
        sententialString += sentential[j].value();
      }
      //make the production compatible to pt.replaceLHS function
      var pro = results[i][0].split(arrow);
      pro.push(pro[1]);
      pro[1] = "" ;
      var lhsOccur;
      //compare pt.replaceLHS to results[i][1]
      for(var j = 0; j < pt.replaceLHS([pro],sententialString).length; j++){
        if(pt.replaceLHS([pro], sententialString)[j] === results[i][1]){
          //record the jth occurrence of lhs
          lhsOccur = j;
        }
      }

      //convert lhsOccur to actual index number of the sententialString
      var count = 0;
      var realIndex = 0;
      while(true){
        var index = sententialString.indexOf(results[i][0].split(arrow)[0]);
        realIndex += index;
        if(count === lhsOccur){
          break;
        }else{
          sententialString = sententialString.substring(index+1);
          realIndex++;
        }
        count++;
      }

      //addEdgesFromLHStoRHS();
      var children = [];
      for(var l = 0; l < rhsProd.length; l++){
        var newNode = pt.parseTree.newNode(rhsProd[l]);
        children.push(newNode);
        for(var r = 0; r < lhsProd.length; r++){
          sentential[realIndex + r].addChild(newNode);

        }
        pt.parseTree.layout();
      }
      var temp1 = sentential.slice(0, realIndex);
      var temp2 = sentential.slice(realIndex + lhsProd.length);
      sentential = temp1.concat(children);
      sentential = sentential.concat(temp2);
    }

    pt.parseTree.layout();
    pt.jsav.umsg("The resulting tree is finished.");
    pt.jsav.recorded();
  }
}

var getStepsForDisplayTree = function (pt){
  var res = [];
  var inputString = pt.inputString;
  var productions = pt.productions;

  var table = {};   // maps each sentential form to the rule that produces it
  var next;
  var accepted = pt.stringAccepted(inputString);
  if (accepted[0]) {
    table = pt.derivationTree;
    var temp = accepted[1];
    var results = [];   // derivation table
    counter = 0;
    // go through the map of sentential forms to productions in order to get the trace
    do {                // handles the case where inputstring is the emptystring
      counter++;
      if (counter > 500) {
        console.warn(counter);
        break;
      }
      var rp = table[temp][0].join("");
      results.push([rp, temp]);
      temp = table[temp][1];
    } while (table[temp] && temp);

    results.reverse();

    for (var i = 0; i < results.length; i++) {
      res.push([{
        "node" : results[i][0].split(arrow)[0],
        "relatedTo" : results[i][0].split(arrow)[1],
        "type" : "parseTree",
        "weight" : results[i][0]
      }]);
    }
  }
  return res;
}


var onClickTraverseWithQuestions = function(av_name, trav, inputStrings, piframesLocations) {
  var steps = getOnClickTraverseData(trav, inputStrings);
  var av = trav.jsavs;
  var strNodes = toStrNodes(trav.TM);

  var generateNodesChoices = function (answer){
    var numGenerated = Math.min(2, strNodes.length - 1);
    var res = [answer]
    for(var i = 0 ; i < numGenerated ; i++){
      var index = Math.floor(Math.random() * strNodes.length);
      if(res.includes(strNodes[index])){
        i--;
      }
      else{
        res.push(strNodes[index])
      }
    }
    return res;
  }
  var generatingFunction = function (state) {
    if (state === "empty"){
      return null;
    }
    else if (state["relatedTo"] === ""){
      var tapeVals = uniqueChar(state["weight"][1]);
      tapeVals.push("#");
      return [{
        "type": "select",
        "question": "Based on the current cell value and transition, what will be the current input letter and what is the target state? (Please select all the correct answers)",
        "description": "The current cell value will become " + state["node"] + ".",
        "answer": [state["weight"][2], state["weight"][3]], //String if type is multiple, array of string if select
        "choices": tapeVals.concat(generateNodesChoices(state["weight"][3]))
      }];
    }
    else if (state["type"] === "sameCellWithTapDefined" || state["type"] === "cellRemainsWithTapNotDefined" || state["type"] === "cellRemainsWithTapValueElse"){
      var tapeVals = uniqueChar(state["weight"][1]);
      tapeVals.push("#");
      return [
          {
            "type": "select",
            "question": "Based on the current cell value and transition, which direction the tape head is moving, what will be the current input letter and what is the target state? (Please select all the correct answers)",
            "description": "The current cell remains the same",
            "answer": [state["weight"][2], state["weight"][3], state["node"].includes("right") ? "Right" : "Left"], //String if type is multiple, array of string if select
            "choices": tapeVals.concat(generateNodesChoices(state["weight"][3])).concat(["Right" , "Left"])
          }];
    }
    else if (state["type"] === "cellChangedWithTapDefined" || state["type"] === "cellChangedWithTapNotDefined" || state["type"] === "cellChangedWithTapValueElse"){
      var tapeVals = uniqueChar(state["weight"][1]);
      tapeVals.push("#");
      return [
        {
          "type": "select",
          "question": "Based on the current cell value and transition, which direction the tape head is moving, what will be the current input letter and what is the target state? (Please select all the correct answers)",
          "description": "The current cell value will become " + state["node"] + ".",
          "answer": [state["weight"][2], state["weight"][3], state["relatedTo"].includes("right") ? "Right" : "Left"], //String if type is multiple, array of string if select
          "choices": tapeVals.concat(generateNodesChoices(state["weight"][3])).concat(["Right" , "Left"])
        }];
    }
  }
  var configure = {
    "specialQuestionIndex" : [],
    "specialQuestion" : [],
    "questionPattern" : generatingFunction
  };

  var currentStack = updateAutoQuestionStack(av_name);
  var questions = generateQuestions(steps, av, configure, av_name);
  // initialize PI frame
  var Frames = piInit(av_name, questions, piframesLocations);
  var questionsIndex = 0;

  var tape;
  for(var strCnt = 0; strCnt < inputStrings.length; strCnt++){
    var first = "true";
    var jsav = trav.jsavs;
    var inputString = inputStrings[strCnt];
    var phraseChanged = "";
    var direction = "";
    var letChanged = "";
    var letScanned = "";
    var currState = "";
    var prevLet = "";
    var g = trav.TM;

    var arr = new Array(15);    // arbitrary size
    for (var i = 0; i < 15; i++) {
      arr[i] = "#";
    }
    var indexx = 7 - Math.round(inputString.length/2);
    for(var x = 0; x < inputString.length; x++){
      arr[7-Math.round(inputString.length/2) + x] = inputString.charAt(x);
    }

    var nodess = g.nodes();
    var topos = 0;
    for(var y = 0; y<nodess.length; y++){
      if(topos<nodess[y].position().top){
        topos = nodess[y].position().top;
      }

    }

    jsav.umsg("We will see how the machine processes input string '" + inputString + "'.");
    if(tape){//tape is defined so we will reset the tape and add new string to it.
      tape.clearTapeContent();
      tape.setTapeArray(arr, 7-Math.round(inputString.length/2));
    }
    else //create the tape
      tape = jsav.ds.tape(arr, 150, topos + 140, "both", indexx);
    /*var p3 = jsav.g.line(165+30*(7-Math.round(inputString.length/2)), 180 + topos, 165 + 30*(7-Math.round(inputString.length/2)), 125 + topos, {"arrow-end": "classic-wide-long"});
    var rects = jsav.g.rect(150+30*(7-Math.round(inputString.length/2)), 180 + topos, 30, 30);*/
    nodess[0].highlight();
    var currentStates = [new Configuration(g.initial, inputString, jsav)],
        cur,
        counter = 0,
        configView = [];              // configurations to display in the message box
    // for (var j = 0; j < currentStates.length; j++) {
    //     configView.push(currentStates[j].toString());
    // }
    // this.jsav.umsg(configView.join(' | '));
    g.initial.highlight();
    //jsav.displayInit();

    while (true) {
      if (counter === 500) {
        console.log(counter);
        break;
      }
      counter++;
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.unhighlight();
        g.removeAccept(currentStates[j].state);
        currentStates[j].state.unhighlight();
        g.removeAccept(currentStates[j].state);
      }
      // get next states
      //cur = g.traverse(currentStates);

      if(first == "true"){
        first = "false";
        nodess[0].highlight();
        jsav.step();
        if(Object.keys(questions["translations"]["en"]).length !== questionsIndex){
          trav.jsavs.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
          questionsIndex++;
        }
        jsav.step();
      }
      else{
        var nextStates = [];
        for (var j = 0; j < currentStates.length; j++) {
          var currentState = currentStates[j];
          var tapeValue = currentState.tape.currentValue();
          // var tapeValue = currentState.tape.value();
          var successors = currentState.state.neighbors();
          for (var next = successors.next(); next; next = successors.next()) {
            var edge = g.getEdge(currentState.state, next),
                weight = edge.weight().split('<br>');
            for (var i = 0; i < weight.length; i++) {
              weight[i] = toColonForm(weight[i]);
              var w = weight[i].split(':');
              if (tapeValue === w[0]) {
                var nextConfig = new Configuration(next, currentState.tape, jsav);
                prevLet = w[0];
                letChanged = w[1];
                if(prevLet == letChanged){
                  phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
                }
                else{
                  phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
                  tape.setCurrentValue(letChanged);
                }
                if (w[1] !== square){
                  nextConfig.tape.value(w[1]);
                  arr[indexx] = w[1]
                }
                nextConfig.tape.move(w[2]);
                if(w[2] == "R"){
                  indexx = indexx + 1;
                  /*p3.translateX(30);
                  rects.translateX(30);*/
                  direction = "right one cell, ";
                  tape.moveRight();
                }
                else if(w[2] == "L"){
                  indexx = indexx -1;
                  /*p3.translateX(-30);
                  rects.translateX(-30);*/
                  direction = "left one cell, ";
                  tape.moveLeft();
                }


                nextStates.push(nextConfig);
                break;
              }
              else if ((tapeValue === undefined) && w[0] === "#"){
                var nextConfig = new Configuration(next, currentState.tape, jsav);
                prevLet = w[0];
                  letChanged = w[1];
                  if(prevLet == letChanged){
                    phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
                  }
                  else{
                    phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
                    tape.setCurrentValue(letChanged);
                  }
                if (w[1] !== "#"){
                  nextConfig.tape.value(w[1]);
                  arr[indexx] = w[1]
                  if(w[2] == "R"){
                    indexx = indexx + 1;
                    /*p3.translateX(30);
                    rects.translateX(30);*/
                    direction = "right one cell, ";
                    tape.moveRight();
                  }
                  else if(w[2] == "L"){
                    indexx = indexx -1;
                    /*p3.translateX(-30);
                    rects.translateX(-30);*/
                    direction = "left one cell, ";
                    tape.moveLeft();
                  }

                }
                else{
                  prevLet = w[0];
                  letChanged = w[1];
                  if(prevLet == letChanged){
                    phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
                  }
                  else{
                    phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
                    tape.setCurrentValue(letChanged);
                  }
                  if(w[2] == "R"){
                    indexx = indexx + 1;
                    /*p3.translateX(30);
                    rects.translateX(30);*/
                    direction = "right one cell, ";
                    tape.moveRight();
                  }
                  else if(w[2] == "L"){
                    indexx = indexx -1;
                    /*p3.translateX(-30);
                    rects.translateX(-30);*/
                    direction = "left one cell, ";
                    tape.moveLeft();
                  }

                }
                nextConfig.tape.move(w[2]);
                nextStates.push(nextConfig);
                break;
              }
            }
          }
        }
        nextStates = _.uniq(nextStates, function(x) {return x.toID();});
        cur = nextStates;
        if (!cur || cur.length === 0) {
          break;
        }
        currentStates = cur;
        configView = [];
        // add highlighting and display


        var previous = 0;
        for (var j = 0; j < currentStates.length; j++) {
          currentStates[j].state.highlight();
          currState = "The current state is " + currentStates[j].state.value();

          jsav.umsg("Step " + counter + ": " + phraseChanged + currState);
          //jsav.ds.tape([arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8],arr[9], arr[10], arr[11], arr[12], arr[13], arr[14]], 150, topos + 90, "both");
          if (g.isFinal(currentStates[j].state)) {
            g.showAccept(currentStates[j].state);
          }
          //configView.push(currentStates[j].toString());
        }
        jsav.step();
        if(Object.keys(questions["translations"]["en"]).length !== questionsIndex){
          trav.jsavs.umsg(Frames.addQuestion(String(av_name + currentAutoStack[av_name] + "q" + questionsIndex)));
          questionsIndex++;
          trav.jsavs.step();
        }
      }
    }
    for (var k = 0; k < currentStates.length; k++) {
      if (g.isFinal(currentStates[k].state)) {
        g.showAccept(currentStates[k].state);
        jsav.umsg("Final State is accepted");
        /*p3.hide();
        rects.hide();*/
      } else {
        jsav.umsg("Final State is rejected");
        g.showReject(currentStates[k].state);
        /*p3.hide();
        rects.hide();*/
      }

    }
    jsav.step();
    for (var j = 0; j < currentStates.length; j++) {
      currentStates[j].state.unhighlight();
      g.removeAccept(currentStates[j].state);
      g.removeReject(currentStates[j].state);
    }
  }
  jsav.step();
  jsav.recorded();
  //g.play(inputString);
};

var getOnClickTraverseData = function(trav, inputStrings) {
  var res = [];
  var tape;
  for (var strCnt = 0; strCnt < inputStrings.length; strCnt++){
    var first = "true";
    var jsav = trav.jsavs;
    var inputString = inputStrings[strCnt];
    var phraseChanged = "";
    var direction = "";
    var letChanged = "";
    var letScanned = "";
    var currState = "";
    var prevLet = "";
    var g = trav.TM;

    var arr = new Array(15);    // arbitrary size
    for (var i = 0; i < 15; i++) {
      arr[i] = "#";
    }
    var indexx = 7 - Math.round(inputString.length/2);
    for(var x = 0; x < inputString.length; x++){
      arr[7-Math.round(inputString.length/2) + x] = inputString.charAt(x);
    }

    var nodess = g.nodes();
    var topos = 0;
    for(var y = 0; y<nodess.length; y++){
      if(topos<nodess[y].position().top){
        topos = nodess[y].position().top;
      }

    }

    if(tape){//tape is defined so we will reset the tape and add new string to it.
      tape.clearTapeContent();
      tape.setTapeArray(arr, 7-Math.round(inputString.length/2));
    }
    else //create the tape
      tape = jsav.ds.tape(arr, 150, topos + 140, "both", indexx);
      tape.hide();

    nodess[0].highlight();
    var currentStates = [new Configuration(g.initial, inputString, jsav)],
        cur,
        counter = 0,
        configView = [];              // configurations to display in the message box
    g.initial.highlight();

    while (true) {
      if (counter === 500) {
        console.log(counter);
        break;
      }
      counter++;
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.unhighlight();
        g.removeAccept(currentStates[j].state);
        currentStates[j].state.unhighlight();
        g.removeAccept(currentStates[j].state);
      }
      // get next states
      if(first == "true"){
        first = "false";
      }
      else{
        var nextStates = [];
        for (var j = 0; j < currentStates.length; j++) {
          var currentState = currentStates[j];
          var tapeValue = currentState.tape.currentValue();
          // var tapeValue = currentState.tape.value();
          var successors = currentState.state.neighbors();
          for (var next = successors.next(); next; next = successors.next()) {
            var edge = g.getEdge(currentState.state, next),
                weight = edge.weight().split('<br>');
            for (var i = 0; i < weight.length; i++) {
              weight[i] = toColonForm(weight[i]);
              var w = weight[i].split(':');
              if (tapeValue === w[0]) {
                var nextConfig = new Configuration(next, currentState.tape, jsav);
                prevLet = w[0];
                letChanged = w[1];
                if(prevLet == letChanged){
                  phraseChanged = [{
                    "node" : direction,
                    "relatedTo" :arr[indexx],
                    "type" : "sameCellWithTapDefined",
                    "weight" : ["", inputString, tapeValue]
                  }];
                }
                else{
                  phraseChanged = [{
                    "node" : letChanged,
                    "relatedTo" :direction,
                    "type" : "cellChangedWithTapDefined",
                    "weight" : [arr[indexx], inputString, tapeValue]
                  }];
                  tape.setCurrentValue(letChanged);
                }
                if (w[1] !== square){
                  nextConfig.tape.value(w[1]);
                  arr[indexx] = w[1]
                }
                nextConfig.tape.move(w[2]);
                if(w[2] == "R"){
                  indexx = indexx + 1;
                  /*p3.translateX(30);
                  rects.translateX(30);*/
                  direction = "right one cell, ";
                  tape.moveRight();
                }
                else if(w[2] == "L"){
                  indexx = indexx -1;
                  /*p3.translateX(-30);
                  rects.translateX(-30);*/
                  direction = "left one cell, ";
                  tape.moveLeft();
                }


                nextStates.push(nextConfig);
                break;
              }
              else if ((tapeValue === undefined) && w[0] === "#"){
                var nextConfig = new Configuration(next, currentState.tape, jsav);
                prevLet = w[0];
                  letChanged = w[1];
                  if(prevLet == letChanged){
                    phraseChanged = [{
                      "node" : letChanged,
                      "relatedTo" :direction,
                      "type" : "cellRemainsWithTapNotDefined",
                      "weight" : ["", inputString, tapeValue]
                    }]
                  }
                  else{
                    phraseChanged = [{
                      "node" : letChanged,
                      "relatedTo" :direction,
                      "type" : "cellChangedcellChangedWithTapNotDefined",
                      "weight" : [arr[indexx], inputString, tapeValue]
                    }]
                    tape.setCurrentValue(letChanged);
                  }
                if (w[1] !== "#"){
                  nextConfig.tape.value(w[1]);
                  arr[indexx] = w[1]
                  if(w[2] == "R"){
                    indexx = indexx + 1;
                    /*p3.translateX(30);
                    rects.translateX(30);*/
                    direction = "right one cell, ";
                    tape.moveRight();
                  }
                  else if(w[2] == "L"){
                    indexx = indexx -1;
                    /*p3.translateX(-30);
                    rects.translateX(-30);*/
                    direction = "left one cell, ";
                    tape.moveLeft();
                  }

                }
                else{
                  prevLet = w[0];
                  letChanged = w[1];
                  if(prevLet == letChanged){
                    phraseChanged = [{
                      "node" : "",
                      "relatedTo" :direction,
                      "type" : "cellRemainsWithTapValueElse",
                      "weight" : [arr[indexx], inputString, tapeValue]
                    }]
                  }
                  else{
                    phraseChanged = [{
                      "node" : letChanged,
                      "relatedTo" :direction,
                      "type" : "cellChangedWithTapValueElse",
                      "weight" : [arr[indexx], inputString, tapeValue]
                    }]
                    tape.setCurrentValue(letChanged);
                  }
                  if(w[2] == "R"){
                    indexx = indexx + 1;
                    direction = "right one cell, ";
                    tape.moveRight();
                  }
                  else if(w[2] == "L"){
                    indexx = indexx -1;
                    direction = "left one cell, ";
                    tape.moveLeft();
                  }

                }
                nextConfig.tape.move(w[2]);
                nextStates.push(nextConfig);
                break;
              }
            }
          }
        }
        nextStates = _.uniq(nextStates, function(x) {return x.toID();});
        cur = nextStates;
        if (!cur || cur.length === 0) {
          break;
        }
        currentStates = cur;
        configView = [];
        var previous = 0;
        for (var j = 0; j < currentStates.length; j++) {
          currentStates[j].state.highlight();
          currState = "The current state is " + currentStates[j].state.value();
          phraseChanged[0]["weight"].push(currentStates[j].state.value())
          res.push(phraseChanged);
          if (g.isFinal(currentStates[j].state)) {
            g.showAccept(currentStates[j].state);
          }
        }
      }
    }
    for (var k = 0; k < currentStates.length; k++) {
      if (g.isFinal(currentStates[k].state)) {
        g.showAccept(currentStates[k].state);
      } else {
        g.showReject(currentStates[k].state);
      }

    }
    for (var j = 0; j < currentStates.length; j++) {
      currentStates[j].state.unhighlight();
      g.removeAccept(currentStates[j].state);
      g.removeReject(currentStates[j].state);
    }
  }

  return(res);
};
