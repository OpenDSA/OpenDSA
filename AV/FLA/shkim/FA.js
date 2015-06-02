//g.transitionFunction takes a single node and returns an array of node values
//assumes all nodes have unique values!
//uses underscore.js

//incompatible with current save/load system

//inefficient: should create a new state object to put in the arrays

//for now: the resulting graph should not be edited! (see: faproto.updateNodes)
  var convertToDFA = function(graph) {
    var g = jsav.ds.fa($.extend({width: '90%', height: 440}, {layout: 'automatic'}));
    var alphabet = Object.keys(graph.alphabet);
    var startState = graph.initial;
    var newStates = [];
    newStates.push(lambdaClosure([startState.value()]));
    var temp = newStates.slice(0);
    while (temp.length > 0) {
      var val = temp.pop();
      for (var i = 0; i < alphabet.length) {
        var letter = alphabet[i];
        var node = lambdaClosure(val.split(','), graph);

      }
    }
  };

  var lambdaClosure = function(input, graph) {
    //input as an array of values, returns a combined state value
    var l = "\&lambda;",
        arr = [];
    for (var i = 0; i < input.length; i++) {
      for (var j in )
      var next = graph.transitionFunction(graph.getNodeWithValue(input[i]), l);
      arr = _.union(arr, next);
    }
    var temp = arr.slice(0);
    while (temp.length > 0) {
      var val = temp.pop(),
          next = graph.transitionFunction(graph.getNodeWithValue(val), l);
      next = _.difference(next, arr);
      arr = _.union(arr, next);
      temp = _.union(temp, next);

    }
    return arr.sort().join();
  };