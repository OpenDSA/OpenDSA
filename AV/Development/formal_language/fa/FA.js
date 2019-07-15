/*
  Finite Automaton module.
  An extension to the JFLAP library.
*/
var FiniteAutomaton = function(jsav, options) {
  Automaton.apply(this, arguments);
  this.configurations = $("<ul>"); // configurations jQuery object used to setup view at a step
  this.configViews = []; // configurations view for a step
  this.step = 0; // current step the user is at, used for changing configuration display          
}

JSAV.ext.ds.FA = function (options) {
  var opts = $.extend(true, {visible: true, autoresize: true}, options);
  return new FiniteAutomaton(this, opts);
};

JSAV.utils.extend(FiniteAutomaton, JSAV._types.ds.Graph);

FiniteAutomaton.prototype = Object.create(Automaton.prototype, {});
var faproto = FiniteAutomaton.prototype;

faproto.loadFAFromJFLAPFile = function (url) {
  var parser,
      xmlDoc,
      text,
      jsav = this.jsav;
  $.ajax( {
    url: url,
    async: false, // we need it now, so not asynchronous request
    success: function(data) {
      text = data;
    }
  });
  if (window.DOMParser) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
  }
  else {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.loadXML(txt);
  }
  if (!xmlDoc.getElementsByTagName("type")[0]) {
    // This file is not a file that can be parsed.
    window.alert('File does not contain an automaton.');
    return;
  }
  if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'fa') {
    // This file was created by a different automaton editor.
    window.alert('File does not contain a finite automaton.');
    return;
  }
  else {
    var maxYvalue = 0;
    var nodeMap = {};                   // map node IDs to nodes
    var xmlStates = xmlDoc.getElementsByTagName("state");
    //xmlStates = sortBy(xmlStates, function(x) { return x.id; })
    
    var xmlTrans = xmlDoc.getElementsByTagName("transition");
    // Iterate over the nodes and initialize them.
    for (var i = 0; i < xmlStates.length; i++) {
      var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
      var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
      maxYvalue = (y>maxYvalue)? x:maxYvalue;
      var newNode = this.addNode({left: x, top: y, value: xmlStates[i].attributes[1].nodeValue});
      // Add the various details, including initial/final states and state labels.
      var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
      var isFinal = xmlStates[i].getElementsByTagName("final")[0];
      var isLabel = xmlStates[i].getElementsByTagName("label")[0];
      if (isInitial) {
        this.makeInitial(newNode);
      }
      if (isFinal) {
        newNode.addClass('final');
      }
      if (isLabel) {
        label_val = '<p class = "label_css">' + isLabel.childNodes[0].nodeValue + '</p>';
        newNode.stateLabel(label_val);
      }
      nodeMap[xmlStates[i].id] = newNode;
      newNode.stateLabelPositionUpdate();
    }
    // Iterate over the edges and initialize them.
    for (var i = 0; i < xmlTrans.length; i++) {
      var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
      var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
      var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
      // Empty string always needs to be checked for.
      if (!read) {
        read = emptystring;
      }
      else {
        read = read.nodeValue;
      }
      var edge = this.addEdge(nodeMap[from], nodeMap[to], {weight: read});
      edge.layout();
    }
    var currentFAHeight = this.element.height();
    this.element.height(Math.max(currentFAHeight, maxYvalue));
    jsav.displayInit();
  }
  /*if (auto === 'auto'){
    layoutGraph();
    }*/
};

/*
  NFA to DFA conversion
  Note: g.transitionFunction takes a single node and returns an array of node values
  Requires underscore.js
*/
var convertToDFA = function(jsav, graph, opts, visualizable = false) {
  var left = 10;
  var g;
  if(!visualizable)
    g = jsav.ds.FA($.extend({layout: 'automatic'}, opts)),
  alphabet = Object.keys(graph.alphabet),
  startState = graph.initial,
  newStates = [];
  else{
    var options = $.extend(true, {layout: 'automatic'}, opts);
    g = jsav.ds.FA(options),
    alphabet = Object.keys(graph.alphabet),
    startState = graph.initial,
    newStates = [];
  }
  // Get the first converted state
  if(visualizable)
    jsav.umsg("The first step is to find the lambda closure for the NFA start state. From the NFA's start state, find every other state that can be reached by a lambda transition.");
  var first = lambdaClosure([startState.value()], graph).sort().join();
  if(visualizable){
    var listOfFirstNodes = first.split(',');
    var highlightedNodes = [];
    for(var i = 0; i< listOfFirstNodes.length; i++ ){
      var node = graph.getNodeWithValue(listOfFirstNodes[i])
      node.highlight();
      highlightedNodes.push(node);
    }
  }
  newStates.push(first);
  if(visualizable){
    jsav.step();
    jsav.umsg("The resulting list of states becomes the name of the DFA's start state.");
  }
  var temp = newStates.slice(0);
  first = g.addNode({value: first}); 
  g.makeInitial(first);
  g.layout();
  if(visualizable){
    left += 50;
    for(var state in highlightedNodes){
      highlightedNodes[state].unhighlight();
    }
    jsav.step();
    jsav.umsg("Nest step is to identify the transitions out of the DFA start state. For each letter in the alphabet, consider all states reachable in the NFA from any state in the start state on that letter. This becomes the name of the target state on that transition.");

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
          node = g.addNode({value: nodeName});
          if(visualizable){
            if(left + 50 < opts.width)
              left+=50;
            g.layout();
          }
        } else {
          node = g.getNodeWithValue(nodeName);
        }
        var edge = g.addEdge(prev, node, {weight: letter});
      }
    }
    if(visualizable){
      if(temp.length > 0)
      {
        jsav.step();
        jsav.umsg("Repeat the process for each new node we find");
      }
    }
  }
  // add the final markers
  if(visualizable)
    jsav.umsg("Determine the final states");
  addFinals(g, graph);
  g.layout();
  if(visualizable){
    jsav.step();
    jsav.umsg("The final (optional) step is to rename the states.")
  }
  /*var nodes = g.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
    next.stateLabel(next.value());
    next.stateLabelPositionUpdate();
    }*/
  g.updateNodes();
  g.layout();
  return g;
};

// Function to add final markers to the resulting DFA
var addFinals = function(g1, g2) {
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
/*
  Function to apply lambda closure.
  Takes in an array of values (state names), returns an array of values
  Only used in NFA to DFA conversion.
  There's a different lambda closure function used for nondeterministic traversal in certain tests.
*/
var lambdaClosure = function(input, graph) {
  var arr = [];
  for (var i = 0; i < input.length; i++) {
    arr.push(input[i]);
    var next = graph.transitionFunction(graph.getNodeWithValue(input[i]), lambda);
    arr = _.union(arr, next);
  }
  var temp = arr.slice(0);
  while (temp.length > 0) {
    var val = temp.pop(),
        next = graph.transitionFunction(graph.getNodeWithValue(val), lambda);
    next = _.difference(next, arr);
    arr = _.union(arr, next);
    temp = _.union(temp, next);

  }
  return arr;
};

// helper depth-first search to find connected component
var dfs = function (visited, node, options) {
  var successors = node.neighbors();
  for (var next = successors.next(); next; next = successors.next()) {
    if (!_.contains(visited, next)) {
      visited.push(next);
      dfs(visited, next);
    }
  }
};



// function to toggle the intitial state of a node
// appears as a button in the right click menu
var toggleInitial = function(g, node) {
  $("#rmenu").hide();
  node.unhighlight();
  if (node.equals(g.initial)) {
    g.removeInitial(node);
  }
  else {
    if (g.initial) {
      alert("There can only be one intial state!");
    } else {
      g.makeInitial(node);
    }
  }
};

// function to toggle the final state of a node
// appears as a button in the right click menu
var toggleFinal = function(g, node) {
  if (node.hasClass("final")) {
    node.removeClass("final");
  }
  else {
    node.addClass("final");
  }
  $("#rmenu").hide();
  node.unhighlight();
};

// function to change the customized label of a node
// an option in right click menu
var changeLabel = function(node) {
  $("#rmenu").hide();
  var nodeLabel = prompt("How do you want to label it?");
  if (!nodeLabel || nodeLabel == "null") {
    nodeLabel = "";
  }
  node.stateLabel(nodeLabel);
  node.stateLabelPositionUpdate();
  node.unhighlight();
}

// function to clear the customized label
// an option in the right click menu
var clearLabel = function(node) {
  $("#rmenu").hide();
  node.unhighlight();
  node.stateLabel("");
}

// Function to switch which empty string is being used (lambda or epsilon) if a loaded graph uses the opposite representation to what the editor is currently using.
var checkEmptyString = function(w) {
  var wArray = w.split("<br>");
  // It is necessary to check every transition on the edge.
  for (var i = 0; i < wArray.length; i++) {
    if ((wArray[i] == lambda || wArray[i] == epsilon) && wArray[i] != emptystring) {
      emptyString();
    }
  }
  return wArray.join("<br>");
};

// Function to add final markers to the resulting DFA
var addFinals = function(g1, g2) {
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


var visualizeConvertToDFA = function(jsav, graph, opts) {
  // jsav.label("Converted:");
  var left = 10;
  var options = $.extend(true, {layout: 'automatic'}, opts);
  var g = jsav.ds.FA(options),
      alphabet = Object.keys(graph.alphabet),
      startState = graph.initial,
      newStates = [];
  // Get the first converted state
  jsav.umsg("The first step is to find the lambda closure for the NFA start state.");
  var first = lambdaClosure([startState.value()], graph).sort().join();
  var listOfFirstNodes = first.split(',');
  var highlightedNodes = [];
  for(var i = 0; i< listOfFirstNodes.length; i++ ){
    var node = graph.getNodeWithValue(listOfFirstNodes[i])
    node.highlight();
    highlightedNodes.push(node);
  }
  newStates.push(first);
  jsav.step();
  jsav.umsg("The result we got is the start state for the DFA.");
  var temp = newStates.slice(0);
  
  first = g.addNode({value: first}); 
  left += 50;
  g.makeInitial(first);
  g.layout();
  for(var state in highlightedNodes){
    highlightedNodes[state].unhighlight();
  }
  jsav.step();
  jsav.umsg("Nest step is to identify the transitons for the DFA start state.");

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
          node = g.addNode({value: nodeName});
          if(left + 50 < opts.width)
            left+=50;
          g.layout();
        } else {
          node = g.getNodeWithValue(nodeName);
        }
        var edge = g.addEdge(prev, node, {weight: letter});
      }
    }
    if(temp.length > 0)
    {
      jsav.step();
      jsav.umsg("repeat the same process for each new node we find");
    }
  }
  // add the final markers
  jsav.umsg("Determine the final states");
  addFinals(g, graph);
  g.layout();
  jsav.step();
  jsav.umsg("Final step is to rename the states names.")
  var nodes = g.nodes();
  for (var next = nodes.next(); next; next = nodes.next()) {
    next.stateLabel(next.value());
    next.stateLabelPositionUpdate();
  }
  g.updateNodes();
  return g;
};
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
