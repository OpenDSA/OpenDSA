(function ($) {
  var jsav = new JSAV("av"), // variable to store the JSAV algorithm animation
    arr, // variable to store the JSAV array
    g, // variable to store the JSAV graph
    lambda = String.fromCharCode(955), // lambda empty string representation
    epsilon = String.fromCharCode(949), // epsilon empty string representation
    configurations,
    currentStates,
    stepBy;
  var statesViz = [];
  var endflag = 0
  // Initializes a new graph and runs a traversal input. Called whenever the page is loaded.
  var initialize = function () {
    g = localStorage['graph']; // The graph was saved to local storage by the FAEditor.
    if (!g) {
      jsav.umsg("Error!");
      return;
    }
    var traversal = localStorage['traversal']; // The input string was saved to local storage by the FAEditor.
    stepBy = localStorage['stepBy']
    var runFunction = initGraph({
      layout: "automatic"
    }); // Run function may or may not have shorthand enabled.
    $('.jsavcontrols').show();
    if (traversal != lambda && traversal != epsilon) {
      runFunction(traversal); // Traverse.
    } else {
      runFunction(""); // If the input string is lambda or epsilon, traverse on the empty string.
    }
  };

  // Function to create a graph out of a serialized representation.
  var initGraph = function (opts) {
    var gg = jQuery.parseJSON(g);
    var graph = jsav.ds.PDA($.extend({
      width: '90%',
      height: 440
    }, opts));
    // For each node in the JSON, initialize it on the graph.
    for (var i = 0; i < gg.nodes.length; i++) {
      var node = graph.addNode('q' + i),
        offset = $('.jsavgraph').offset(),
        offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
      $(node.element).offset({
        top: parseInt(gg.nodes[i].top) + offset.top + offset2,
        left: parseInt(gg.nodes[i].left) + offset.left + offset2
      });
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
        var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end], {
          weight: w
        });
      } else {
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

  var first_stack = 0;
  var run = function (inputString) {
    // Start with the closure of the initial state.
    var reducedInput = inputString
    g.initial.addClass('current');
    currentStates = [new Configuration(g.configurations, g.initial, ['Z'], inputString, 0)];

    if (stepBy == 'closure') {
      currentStates = g.addLambdaClosure(currentStates);
    }
    var nextStates = currentStates;
    this.configurations = $("<ul>");

    // stackViz.update(['Z'])
    var textArray = [];
    for (var i = 0; i < inputString.length; i++) {
      textArray.push(inputString[i]);
    }
    // Use this array to initialize the JSAV array.
    arr = jsav.ds.array(textArray, {
      element: $('.arrayPlace')
    });

    var tempViz = jsav.ds.PDAState(30, 470, 150, 100, reducedInput, ['z'], 'q0')
    statesViz.push(tempViz)
    jsav.displayInit();
    inputStringLength = inputString.length
    while (true) {
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.removeClass('current');
      }

      nextStates = traverse(g, currentStates.slice(0))
      if (nextStates.length == 0) {
        jsav.step();
        break
      }
      first_stack = first_stack + 1
      currentStates = nextStates
      showStatesViz()
      jsav.step();
    }

    first_stack = 0;
    clearStates()
    var rejected = true;
    for (var k = 0; k < currentStates.length; k++) {
      if (currentStates[k].state.hasClass('accepted')) {
        rejected = false
      }
    }

    if (rejected) {
      // If the input string was rejected, color every character in the JSAV array red.
      for (var l = 0; l < inputString.length; l++) {
        arr.css(l, {
          "background-color": "red"
        });
      }
      jsav.umsg("Rejected");
    } else {
      // If the input string was accepted, color every character in the JSAV array green.
      for (var l = 0; l < inputString.length; l++) {
        arr.css(l, {
          "background-color": "green"
        });
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

  var inputStringLength = 0;
  var lastEdgeCheck = "";
  var traverse = function (graph, currentStates) {
    var nextStates = []
    for (var i = 0; i < currentStates.length; i++) {
      var successors = currentStates[i].state.neighbors();
      var letter = emptystring;
      var inputString = currentStates[i].inputString
      if (inputString.length === 0 && endflag == 1) {
         var last = currentStates[i].stack[currentStates[i].stack.length - 1];

          if (currentStates[i].state.hasClass('final')) {
            currentStates[i].state.addClass('accepted')
          } else {
            currentStates[i].state.addClass('rejected')
          }
          continue;
        
      }
      var letter = inputString[0]
      // var reducedInput = inputString.substring(1)
      var curStack = currentStates[i].stack;
      var topOfStack = emptystring
      if (curStack.length != 0) {
        topOfStack = curStack[curStack.length - 1];
        curStack = curStack.slice(0, -1);
      }
      for (var next = successors.next(); next; next = successors.next()) {
        var weight = graph.getEdge(currentStates[i].state, next).weight().split('<br>');
        //Iterate though transitions
        for (var j = 0; j < weight.length; j++) {
          var a = weight[j]
          var b = a.split(',')
          var c = b[1].split(';')
          var expectedInput = b[0]
          var expectedStack = c[0]
          var pushOnTo = c[1]
          if (first_stack == 0 && (expectedStack == "z" || expectedStack == "Z")) {
            expectedStack = "Z"
            if (pushOnTo.charAt(pushOnTo.length - 1) == "z" || pushOnTo.charAt(pushOnTo.length - 1) == "Z") {
              lastEdgeCheck = pushOnTo.charAt(pushOnTo.length - 1)
            }
          }
          if (first_stack == inputStringLength && (expectedStack == "z" || expectedStack == "Z") && (topOfStack == "z" || topOfStack == "Z")) {
            topOfStack = expectedStack
            if (lastEdgeCheck != "") {
              topOfStack = lastEdgeCheck
            }
          }
          if ((expectedInput == emptystring || expectedInput == letter) &&
            (expectedStack == emptystring || expectedStack == topOfStack)) {
            next.addClass('current')
            var newStack = curStack

            if (expectedStack == emptystring) {
              newStack = newStack + topOfStack
            }

            for (var k = pushOnTo.length - 1; k >= 0; k--) {
              if (pushOnTo[k] != emptystring) {
                newStack = newStack + pushOnTo[k]
              }
            }
            if(expectedInput != emptystring ){
              var reducedInput = inputString.substring(1)
            }
            else{
               var reducedInput = inputString
               }
//             if (reducedInput == "") {
// //               reducedInput = curStack
//               endflag++
//             }
            var nextConfig = new Configuration(this.configurations, next, newStack, reducedInput, 0);
            nextStates.push(nextConfig);
          }
        }

      }
    }
    if(inputString.length === 0){
        endflag++
      }
    if (stepBy == 'closure') {
      nextStates = g.addLambdaClosure(nextStates)
    }
    return nextStates
  }

  /*
    Display visualizations for all states that have a current designation
    If you wish to change how it displays you probably only have to change
    width, height, width_spacer, height_spacer, and num_in_row.
  */
  var showStatesViz = function () {
    clearStates();
    var xBase = 30;
    var yBase = 470;
    var width = 150; // Width of the outline of the state vizualizations
    var height = 100; // Height of the outline of the state vizualitions
    var width_spacer = 40; // space between columns
    var height_spacer = 10; // space between rows
    var num_in_row = 5 // number of state vizualizations in a row

    for (var i = 0; i < currentStates.length; i++) {
      var config = currentStates[i];
      if (config.state.hasClass('current')) {
        var updatedStack = [''];
        if (config.stack.length > 0) {
          updatedStack = config.stack.slice(0).split('')
          updatedStack = updatedStack.slice(0, updatedStack.length).reverse();
        }

        var width_shift = statesViz.length % num_in_row;
        var height_shift = Math.floor(statesViz.length / num_in_row);
        var x_coord = xBase + (width + width_spacer) * width_shift;
        var y_coord = yBase + (height + height_spacer) * height_shift
        var tempViz = jsav.ds.PDAState(x_coord, y_coord, width, height, config.inputString, updatedStack, config.state.value())
        statesViz.push(tempViz)
      }
    }
  }

  var clearStates = function () {
    while (statesViz.length != 0) {
      var temp = statesViz.pop();
      temp.hide()
    }
  }

  // Configuration object
  var Configuration = function (configurations, state, stack, input, index) {
    this.state = state;
    this.inputString = input;
    this.curIndex = index;
    this.stack = stack.slice(0);
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