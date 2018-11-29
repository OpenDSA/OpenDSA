(function ($) {
  var jsav = new JSAV("av"), // variable to store the JSAV algorithm animation
    arr, // variable to store the JSAV array
    g, // variable to store the JSAV graph
    lambda = String.fromCharCode(955), // lambda empty string representation
    epsilon = String.fromCharCode(949), // epsilon empty string representation
    configurations,
    currentStates;
  var statesViz = [];

  // Initializes a new graph and runs a traversal input. Called whenever the page is loaded.
  var initialize = function() {
    g = localStorage['graph']; // The graph was saved to local storage by the FAEditor.
    if (!g) {
      jsav.umsg("Error!");
      return;
    }
    var traversal = localStorage['traversal']; // The input string was saved to local storage by the FAEditor.
    var runFunction = initGraph({layout: "automatic"}); // Run function may or may not have shorthand enabled.
    $('.jsavcontrols').show();
    if (traversal != lambda && traversal != epsilon) {
      runFunction(traversal); // Traverse.
    }
    else {
      runFunction(""); // If the input string is lambda or epsilon, traverse on the empty string.
    }
  };
  
  // Function to create a graph out of a serialized representation.
  var initGraph = function(opts) {
    var gg = jQuery.parseJSON(g);
    var graph = jsav.ds.pda($.extend({width: '90%', height: 440}, opts));
    // For each node in the JSON, initialize it on the graph.
    for (var i = 0; i < gg.nodes.length; i++) {
      var node = graph.addNode('q' + i),
        offset = $('.jsavgraph').offset(),
        offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
      $(node.element).offset({top : parseInt(gg.nodes[i].top) + offset.top + offset2, left: parseInt(gg.nodes[i].left) + offset.left + offset2});
      if (gg.nodes[i].i) {
        graph.makeInitial(node);
      }
      if (gg.nodes[i].f) {
        node.addClass("final");
      }
      // If the node has a state label, it needs to be positioned correctly.
      node.stateLabel(gg.nodes[i].stateLabel);
      node.stateLabelPositionUpdate();
    }
    // For each edge in the JSON, initialize it on the graph.
    for (var i = 0; i < gg.edges.length; i++) {
      if (gg.edges[i].weight !== undefined) {
        // Transitions on the empty string are saved differently in JSON than they are on the graph.
        var w = delambdafy(gg.edges[i].weight);
        var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end], {weight: w});
        }
      else {
        var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end]);
      }
      // The layout of the edge needs to be explicitly handled.
      edge.layout();
    }
    g = graph;
    // If shorthand is noted as enabled in the JSON, make a note to run the shorthand version of the traversal algorithm.
    if (gg.shorthand) {
      return runShorthand;
    }
    return run;
  };

    // Creates the slideshow for the input string traversal on the graph. Called at the end of the initialize function.
  /*var run = function(inputString) {
    //this.setupControls();

    // var configArray = this.jsav.ds.array();
    // this.configViews.push(configArray.element);
    g.stackViz.update(['Z'])
    // var inputViz = this.jsav.ds.tape(inputString.split(''), 40, 5, 'right')

    g.initial.addClass('current');
    g.configurations = $("<ul>");
    var currentStates = [new Configuration(g.configurations, g.initial, ['Z'], inputString, 0)];
    currentStates = g.addLambdaClosure(currentStates);
    var configArray = g.jsav.ds.array(this.configurations);
    g.configViews.push(configArray.element);
    // var $configView = $('#configurations');
    // $configView.empty();
    // $configView.append(this.configViews[0]);
    // Create an array of characters in the input string.
    var textArray = [];
    for (var i = 0; i < inputString.length; i++) {
      textArray.push(inputString[i]);
    }
    // Use this array to initialize the JSAV array.
    arr = jsav.ds.array(textArray, {element: $('.arrayPlace')});
    jsav.displayInit();

    //g.jsav.displayInit();

    g.configurations = $("<ul>");
    for (var j = 0; j < currentStates.length; j++) {
      currentStates[j].update();
    }

    configArray = g.jsav.ds.array(this.configurations);
    g.configViews.push(configArray.element);

    var cur;
    counter = 0;
    var stringAccepted = false;
    while (true) {
      g.jsav.step();
      counter++;
      if (counter > 100) {
        break;
      }
      // console.log(counter)
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.removeClass('current');
        currentStates[j].state.removeClass('accepted');
        currentStates[j].state.removeClass('rejected');
      }
      cur = g.traverse(currentStates);
      if (cur.length === 0) {
        break;
      }
      currentStates = cur;

      g.configurations = $("<ul>");
      for (var j = 0; j < currentStates.length; j++) {
        if (currentStates[j].curIndex === inputString.length) {
          if (currentStates[j].state.hasClass('final')) {
            currentStates[j].state.addClass('accepted');
            arr.css(i, {"background-color": "green"});
            stringAccepted = true;
          }
        }
        currentStates[j].update();
      }
      var updatedStack = currentStates[currentStates.length - 1].stack
      updatedStack = updatedStack.slice(0, updatedStack.length).reverse();
      g.stackViz.update(updatedStack)
      configArray = g.jsav.ds.array(g.configurations);
      g.configViews.push(configArray.element);
    }

    if (stringAccepted) {
      g.jsav.umsg("Accepted");
      arr.css(i, {"background-color": "green"});
    } else {
      g.jsav.umsg("Rejected");
      arr.css(i, {"background-color": "red"});
    }
    g.jsav.recorded();
  };*/

  var run = function(inputString) {
    // Start with the closure of the initial state.
    var reducedInput = inputString
    g.initial.addClass('current');
    currentStates = [new Configuration(g.configurations, g.initial, ['Z'], inputString, 0)];
    currentStates = g.addLambdaClosure(currentStates);
    var nextStates = currentStates;
    this.configurations = $("<ul>");

    // stackViz.update(['Z'])
    var textArray = [];
    for (var i = 0; i < inputString.length; i++) {
      textArray.push(inputString[i]);
    }
    // Use this array to initialize the JSAV array.
    arr = jsav.ds.array(textArray, {element: $('.arrayPlace')});
    var tempViz = jsav.ds.PDAState(30, 470, 150, 100, 'abbb', ['z'], 'q0')
    statesViz.push(tempViz)
    jsav.displayInit();

    for (var i = 0; i < inputString.length; i++) {
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.removeClass('current');
      }
      reducedInput = reducedInput.substring(1)
      nextStates = traverse(g, currentStates, inputString[i], reducedInput);
      if (nextStates.length == 0) {
        for (var k = 0; k < currentStates.length; k++) {
          currentStates[k].state.addClass('rejected')
        }
        arr.css(i, {"background-color": "red"});
        jsav.step();
        break
      }
      
      currentStates = nextStates
      showStatesViz()
      arr.css(i, {"background-color": "yellow"});
      jsav.step();
    }

    clearStates()
    var rejected = true;
    for (var k = 0; k < currentStates.length; k++) {
      if(currentStates[k].state.hasClass('final') && nextStates.length > 0) {
        currentStates[k].state.addClass('accepted')
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

  var traverse = function(graph, currentStates, letter, reducedInput) {
    var nextStates = []
    for (var i =0; i < currentStates.length; i++) {
      var successors = currentStates[i].state.neighbors();
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
          if ((expectedInput === emptystring || expectedInput === letter) && 
              (expectedStack === emptystring || expectedStack === topOfStack)) {
            next.addClass('current')
            var newStack = curStack
            for(var k = pushOnTo.length - 1; k >= 0; k--) {
              if( pushOnTo[k] !== emptystring) {
                newStack = newStack + pushOnTo[k]
              }
            }

            var nextConfig = new Configuration(this.configurations, next, newStack, reducedInput, 0);
            nextStates.push(nextConfig);
          }
        }

      }
    }
    nextStates = g.addLambdaClosure(nextStates)
    return nextStates
  }

  var showStatesViz = function() {
    clearStates();
    var xBase = 30;
    var yBase = 470;
    var width = 150;
    var height = 100;
    var width_spacer = 40;
    var height_spacer = 10;

    for(var i = 0; i < currentStates.length; i++) {
      var config = currentStates[i];
      if( config.state.hasClass('current')) {
        var updatedStack = [''];
        if(config.stack.length > 0){
          updatedStack = config.stack.slice(0).split('')
          updatedStack = updatedStack.slice(0, updatedStack.length).reverse();
        }

        var width_shift = statesViz.length % 5;
        var height_shift = Math.floor(statesViz.length / 5);
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
  };

  // Function to handle click events on the JSAV array (take you to the corresponding step in the traversal).
  function arrayClickHandler(index) {
    // Temporarily turn off animation (if it was on).
    var oldFx = $.fx.off || false;
      $.fx.off = true;
      // If the step clicked on comes after the current step, increment until you reach that step.
      if (index > jsav.currentStep() - 1) {
        while (index > jsav.currentStep() - 1 && jsav._redo.length) {
        jsav.forward();
      }
      }
      // If the step clicked on comes before the current step, decrement until you reach that step.
      if (index < jsav.currentStep() - 1) {
        while (index < jsav.currentStep() - 1 && jsav._undo.length) {
        jsav.backward();
      }
      }
      // If animation was originally on, turn it back on again now.
    $.fx.off = oldFx;
  };

  initialize();
}(jQuery));