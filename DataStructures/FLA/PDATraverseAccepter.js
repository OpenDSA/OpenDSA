var willReject = function(graph, inputString, visualize = false){
  graph.initial.addClass('current');
  var configurations = $("<ul>");
  var currentStates = [new Configuration(graph.configurations, graph.initial, ['Z'], inputString, 0)];
  currentStates = graph.addLambdaClosure(currentStates);
  var configArray = null;
  if(!visualize){
    configArray = graph.jsav.ds.array(graph.configurations);
  // var configViews = [];
  graph.configViews.push(configArray.element);
  //var $configView = $('#configurations');
  //$configView.empty();
  //$configView.append(this.configViews[0]);

  //this.jsav.displayInit();
  }
  jsav = graph.jsav;
  configurations = $("<ul>");
  for (var j = 0; j < currentStates.length; j++) {
    currentStates[j].update();
  }
  if(!visualize)
    configArray = graph.jsav.ds.array(graph.configurations);
  //this.configViews.push(configArray.element);

  var cur;
  counter = 0;
  var stringAccepted = false;
  while (true) {
    if(visualize){
      jsav.umsg("We want to consume the input letter by asd" );
      jsav.step();
    }
    counter++;
    if (counter > 500) {
      break;
    }
    for (var j = 0; j < currentStates.length; j++) {
      currentStates[j].state.removeClass('current');
      currentStates[j].state.removeClass('accepted');
      currentStates[j].state.removeClass('rejected');
    }
    cur = graph.traverse(currentStates);
    if (cur.length === 0) {
      break;
    }
    currentStates = cur;

    tconfigurations = $("<ul>");
    for (var j = 0; j < currentStates.length; j++) {
      if (currentStates[j].curIndex === inputString.length) {
        if (currentStates[j].state.hasClass('final')) {
          currentStates[j].state.addClass('accepted');
          stringAccepted = true;
        }
      }
      currentStates[j].update();
    }
    if(!visualize)
      configArray = graph.jsav.ds.array(this.configurations);
    //this.configViews.push(configArray.element);
  }

  return !stringAccepted;
}

// Configuration object
var Configuration = function(configurations, state, stack, str, index) {
  this.state = state;
  this.inputString = str;
  this.curIndex = index;
  this.stack = stack.slice(0);
  this.element = $('.configuration').last().clone();
  this.update = function() {
    this.element.find('#currentState').text(this.state.value());
    this.element.find('#readInput').text(this.inputString.substring(0, this.curIndex));
    this.element.find('#unreadInput').text(this.inputString.substring(this.curIndex, this.inputString.length));
    this.element.find('#stack').text(this.stack.join());
    this.element.removeClass('configNormal').removeClass('configAccepted').removeClass('configRejected');
    if (this.state.hasClass('accepted')) {
      this.element.addClass('configAccepted');
    } else if (this.state.hasClass('rejected')) {
      this.element.addClass('configRejected');
    } else {
      this.element.addClass('configNormal');
    }
    var newL = $("<li>");
    newL.append(this.element);
    configurations.append(newL);
    this.element.show();
  }
  /*this.toString = function() {
    return this.state.value() + ' ' + this.inputString.substring(0, this.curIndex) + ' ' + this.stack.join();
  }*/
};
var statesViz = [],
jsav;
var run = function(g, inputString) {
  // Start with the closure of the initial state.
  
  var reducedInput = inputString
  jsav = g.jsav;
  g.initial.addClass('current');
  currentStates = [new Configuration(g.configurations, g.initial, ['Z'], inputString, 0)];

  var nextStates = currentStates;
  this.configurations = $("<ul>");

  // stackViz.update(['Z'])
  var textArray = [];
  for (var i = 0; i < inputString.length; i++) {
    textArray.push(inputString[i]);
  }
  // Use this array to initialize the JSAV array.
  arr = jsav.ds.array(textArray);
  
  var tempViz = jsav.ds.PDAState(30, 200, 150, 100, reducedInput, ['z'], 'q0')
  statesViz.push(tempViz)
  jsav.displayInit();

  while(true) {
    for (var j = 0; j < currentStates.length; j++) {
      currentStates[j].state.removeClass('current');
    }
    nextStates = traverse(g, currentStates.slice(0))
    if (nextStates.length == 0) {
      jsav.step();
      break
    }

    currentStates = nextStates
    showStatesViz()
    jsav.step();
  }

  clearStates()
  var rejected = true;
  for (var k = 0; k < currentStates.length; k++) {
    if(currentStates[k].state.hasClass('accepted')) {
      rejected = false
    }
  }

  if (rejected) {
    // If the input string was rejected, color every character in the JSAV array red.
    for (var l = 0; l < inputString.length; l++) {
      arr.css(l, {"background-color": "red"});
    }
    jsav.umsg("Rejected");
  } else {
    // If the input string was accepted, color every character in the JSAV array green.
    for (var l = 0; l < inputString.length; l++) {
      arr.css(l, {"background-color": "green"});
    }
    jsav.umsg("Accepted");
  }

  var nodes = g.nodes();
  for (var next = nodes.next(); next; next = nodes.next()) {
    if (next.hasClass('current') && rejected) {
      next.addClass('rejected');
    }
    next.removeClass('current');
  }
  // Add the last step to the slideshow, stop recording the slideshow, and add the click handler to the JSAV array.
  jsav.step();
  jsav.recorded();
  arr.click(arrayClickHandler);
}

var traverse = function(graph, currentStates) {
  var nextStates = []
  for (var i =0; i < currentStates.length; i++) {
    var successors = currentStates[i].state.neighbors();
    var letter = emptystring;
    var inputString = currentStates[i].inputString
    if(inputString.length === 0 && currentStates[i].stack.length === 0) {
      if(currentStates[i].state.hasClass('final')) {
        currentStates[i].state.addClass('accepted')
      }
      else {
        currentStates[i].state.addClass('rejected')
      }
      continue;
    }
    var letter = inputString[0]
    // var reducedInput = inputString.substring(1)
    var curStack = currentStates[i].stack;
    var topOfStack = emptystring
    if(curStack.length != 0) {
      topOfStack = curStack[curStack.length - 1];
      curStack = curStack.slice(0, -1);
    }
    for (var next = successors.next(); next; next = successors.next()) {
      var weight = graph.getEdge(currentStates[i].state, next).weight().split('<br>');
      //Iterate though transitions
      for(var j = 0; j < weight.length; j++){
        var a = weight[j]
        var b = a.split(',')
        var c = b[1].split(';')
        var expectedInput = b[0]
        var expectedStack = c[0]
        var pushOnTo = c[1]
        if ((expectedInput == emptystring || expectedInput == letter) && 
            (expectedStack == emptystring || expectedStack == topOfStack)) {
          next.addClass('current')
          var newStack = curStack
          for(var k = pushOnTo.length - 1; k >= 0; k--) {
            if( pushOnTo[k] != emptystring) {
              newStack = newStack + pushOnTo[k]
            }
          }
          var reducedInput = inputString.substring(1)
          if(expectedInput == emptystring) {
            reducedInput = inputString
          }
          var nextConfig = new Configuration(this.configurations, next, newStack, reducedInput, 0);
          nextStates.push(nextConfig);
        }
      }

    }
  }

  return nextStates
}

/*
  Display visualizations for all states that have a current designation
  If you wish to change how it displays you probably only have to change
  width, height, width_spacer, height_spacer, and num_in_row.
*/
var showStatesViz = function() {
  clearStates();
  var xBase = 30;
  var yBase = 200;
  var width = 150; // Width of the outline of the state vizualizations
  var height = 100; // Height of the outline of the state vizualitions
  var width_spacer = 40; // space between columns
  var height_spacer = 10; // space between rows
  var num_in_row = 5 // number of state vizualizations in a row

  for(var i = 0; i < currentStates.length; i++) {
    var config = currentStates[i];
    if( config.state.hasClass('current')) {
      var updatedStack = [''];
      if(config.stack.length > 0){
        updatedStack = config.stack.slice(0).split('')
        updatedStack = updatedStack.slice(0, updatedStack.length).reverse();
      }

      var width_shift = statesViz.length % num_in_row;
      var height_shift = Math.floor(statesViz.length / num_in_row);
      var x_coord = xBase + (width + width_spacer) * width_shift;
      var y_coord = yBase + (height + height_spacer) * height_shift
      var tempViz =  jsav.ds.PDAState(x_coord, y_coord, width, height, config.inputString, updatedStack, config.state.value())
      statesViz.push(tempViz)
    }
  }
}

var clearStates = function() {
  while(statesViz.length != 0) {
    var temp = statesViz.pop();
    temp.hide()
  }
}
