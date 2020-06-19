;(function ($) {
  var elements = new Array()
  var jsav = new JSAV('av'), // variable to store the JSAV algorithm animation
    arr, // variable to store the JSAV array
    g, // variable to store the JSAV graph
    lambda = String.fromCharCode(955), // lambda empty string representation
    epsilon = String.fromCharCode(949) // epsilon empty string representation

  // Initializes a new graph and runs a traversal input. Called whenever the page is loaded.
  var initialize = function () {
    var url = window.location.search
    var Request = new Object()
    var inputString = new String()
    if (url.indexOf('?') != -1) {
      var a = ''
      var str = url.substr(1)
      strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        a = strs[i].split('=')[0]
        inputString = decodeURI(strs[i].split('=')[1])
        if (inputString == '') {
          elements.push(Array.from('λ'))
        } else {
          elements.push(Array.from(inputString))
        }
      }
    }

    var runFunction = initGraph({
      layout: 'automatic',
    }) // Run function may or may not have shorthand enabled.
    $('.jsavcontrols').show()
    runFunction()
  }

  // Function to create a graph out of a serialized representation.
  var initGraph = function (opts) {
    var graph = jsav.ds.FA(
      $.extend(
        {
          left: 20,
          width: '40%',
          height: 150,
        },
        opts
      )
    )
    // For each node in the JSON, initialize it on the graph.
    var node = graph.addNode('q0'),
      offset = $('.jsavgraph').offset(),
      offset2 = parseInt($('.jsavgraph').css('border-width'), 10)
    $(node.element).offset({
      top: 225,
      left: 110,
    })
    graph.makeInitial(node)
    var node = graph.addNode('q1'),
      offset = $('.jsavgraph').offset(),
      offset2 = parseInt($('.jsavgraph').css('border-width'), 10)
    $(node.element).offset({
      top: 225,
      left: 270,
    })
    node.addClass('final')

    //add edge to graph
    var w = '1'
    var edge = graph.addEdge(graph.nodes()['0'], graph.nodes()['0'], {
      weight: w,
    })
    edge.layout()
    var w = '0'
    var edge = graph.addEdge(graph.nodes()['1'], graph.nodes()['1'], {
      weight: w,
    })
    edge.layout()
    var w = '0'
    var edge = graph.addEdge(graph.nodes()['0'], graph.nodes()['1'], {
      weight: w,
    })
    edge.layout()
    var w = '1'
    var edge = graph.addEdge(graph.nodes()['1'], graph.nodes()['0'], {
      weight: w,
    })
    edge.layout()
    g = graph
    return run
  }

  // Creates the slideshow for the input string traversal on the graph. Called at the end of the initialize function.
  var run = function () {
    g.initial.addClass('current')
    var currentStates = [g.initial]
    currentStates = FiniteAutomaton.addLambdaClosure(g, currentStates)
    var nextStates = currentStates
    var traverse = function (graph, currentStates, letter) {
      var nextStates = []
      // Iterate over current states.
      for (var i = 0; i < currentStates.length; i++) {
        var successors = currentStates[i].neighbors()
        // Iterate over every reachable state from the current state.
        for (var next = successors.next(); next; next = successors.next()) {
          var weight = graph
            .getEdge(currentStates[i], next)
            .weight()
            .split('<br>')
          // Iterate over every edge weight between the current state and the next state.
          for (var j = 0; j < weight.length; j++) {
            // If the edge weight matches the input symbol and the next state is not already accounted for (possible, if we already reached it from another current state), mark it as a next state.
            if (letter == weight[j] && !next.hasClass('current')) {
              next.addClass('current')
              nextStates.push(next)
            }
          }
        }
      }
      return nextStates
    }

    var arrayFunctionWrapper = function (funcname) {
      return function () {
        var arrIndex = arguments[0]
        if (typeof arrIndex !== 'number') {
          return
        }
        var array = this._arrays[arrIndex]
        return array[funcname].apply(array, [].slice.call(arguments, 1))
      }
    }

    jsav.step()

    // Use this array to initialize the JSAV array.
    matrix = jsav.ds.matrix(elements, {
      element: $('.arrayPlace'),
      top: 80,
      left: 500,
    })
    jsav.displayInit()

    // Record originally start position
    var record = currentStates
    for (var c = 0; c < elements.length; c++) {
      jsav.umsg('')

      currentStates = record
      // Iterate over each character in the input string.
      for (var i = 0; i < elements[c].length; i++) {
        var currentString = elements[c]
        currentInputString = currentString.join('')

        if (currentInputString[i] == 'λ') {
          for (var j = 0; j < currentStates.length; j++) {
            currentStates[j].addClass('current')
          }
          nextStates = traverse(g, currentStates, '')
        } else if (
          currentInputString.charAt(i) != '1' &&
          currentInputString.charAt(i) != '0'
        ) {
          for (var rr = 0; rr < currentStates.length; rr++) {
            currentStates[rr].addClass('current')
          }
          nextStates = traverse(g, currentStates, currentInputString[i])
          currentStates = nextStates
        } else {
          for (var j = 0; j < currentStates.length; j++) {
            currentStates[j].removeClass('current')
          }
          nextStates = traverse(g, currentStates, currentInputString[i])
          currentStates = nextStates
        }
        matrix.css(c, i, {
          'background-color': 'yellow',
        })
        jsav.step()
      }

      var rejected = true
      for (var k = 0; k < currentStates.length; k++) {
        // If we finished on a final state, the input string was accepted (unless we didn't make it to the end of the input string).
        if (currentStates[k].hasClass('final') && nextStates.length > 0) {
          // If there are no next states, it means the break statement in line 128 was triggered. Otherwise, we know we made it to the end of the input string.
          currentStates[k].addClass('accepted')
          rejected = false
        }
      }

      if (rejected) {
        for (var l = 0; l < currentInputString.length; l++) {
          matrix.css(c, l, {
            'background-color': 'red',
          })
        }

        jsav.umsg('Rejected')
      } else {
        for (var l = 0; l < currentInputString.length; l++) {
          matrix.css(c, l, {
            'background-color': 'green',
          })
        }
        jsav.umsg('Accepted')
      }

      // If the input string was rejected, label every current node as rejected.
      var nodes = g.nodes()
      for (var next = nodes.next(); next; next = nodes.next()) {
        if (next.hasClass('current') && rejected) {
          next.addClass('rejected')
        }
        next.removeClass('current')
      }
      jsav.step()
      var nodes = g.nodes()
      for (var next = nodes.next(); next; next = nodes.next()) {
        if (next.hasClass('rejected')) {
          next.removeClass('rejected')
        }
        if (next.hasClass('accepted')) {
          next.removeClass('accepted')
        }
      }
    }

    // If the input string was rejected, label every current node as rejected.
    var nodes = g.nodes()
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.hasClass('current') && rejected) {
        next.addClass('rejected')
      }
      next.removeClass('current')
    }

    // Add the last step to the slideshow, stop recording the slideshow, and add the click handler to the JSAV array.
    jsav.step()
    jsav.recorded()
    matrix.click(arrayClickHandler)
  }

  // Creates the slideshow for the input string traversal on the graph. Called at the end of the initialize function.
  // Used instead of "run" if shorthand mode is enabled for the graph we are traversing on.
  var runShorthand = function (inputString) {
    // Start with the closure of the initial state and an empty array of edges.
    g.initial.addClass('current')
    var currentStates = [g.initial]
    currentStates = FiniteAutomaton.addLambdaClosure(g, currentStates)
    var currentEdges = []
    var edgeWeight = []
    var edgeProgress = []
    var nextStates = currentStates
    var nextEdges = currentEdges

    // Create an array of characters in the input string.
    var textArray = []
    for (var i = 0; i < inputString.length; i++) {
      textArray.push(inputString[i])
    }
    // Use this array to initialize the JSAV array.
    arr = jsav.ds.array(textArray, {
      element: $('.arrayPlace'),
    })
    jsav.displayInit()

    // Iterate over each character in the input string.
    for (var i = 0; i < inputString.length; i++) {
      // "Current" is used to mark states as visited, so start by removing "Current" from every node.
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].removeClass('current')
      }
      // Run traversal step to find next states and next edges.
      var traverseStep = traverseShorthand(
        g,
        currentStates,
        currentEdges,
        edgeWeight,
        edgeProgress,
        inputString[i]
      )
      nextStates = traverseStep[0]
      nextEdges = traverseStep[1]
      if (nextStates.length == 0 && nextEdges.length == 0) {
        // If there are no next states or next edges, the input string was rejected. Update CSS of JSAV graph and array.
        for (var k = 0; k < currentStates.length; k++) {
          currentStates[k].addClass('rejected')
        }
        arr.css(i, {
          'background-color': 'red',
        })
        // Add a step to the slideshow and break out of the loop.
        jsav.step()
        break
      }
      // Prepare for the next iteration of the loop. Update the current character in the JSAV array and add a step to the slideshow.
      currentStates = nextStates
      currentEdges = nextEdges
      edgeWeight = traverseStep[2]
      edgeProgress = traverseStep[3]
      arr.css(i, {
        'background-color': 'yellow',
      })
      jsav.step()
    }

    var rejected = true
    for (var k = 0; k < currentStates.length; k++) {
      // If we finished on a final state, the input string was accepted (unless we didn't make it to the end of the input string).
      if (currentStates[k].hasClass('final') && nextStates.length > 0) {
        // If there are no next states, either we finished in the middle of edges, or the break statement in line 217 was triggered.
        currentStates[k].addClass('accepted')
        rejected = false
      }
    }

    if (rejected) {
      // If the input string was rejected, color every character in the JSAV array red.
      for (var l = 0; l < inputString.length; l++) {
        arr.css(l, {
          'background-color': 'red',
        })
      }
      jsav.umsg('Rejected')
    } else {
      // If the input string was accepted, color every character in the JSAV array green.
      for (var l = 0; l < inputString.length; l++) {
        arr.css(l, {
          'background-color': 'green',
        })
      }
      jsav.umsg('Accepted')
    }

    // If the input string was rejected, label every current node as rejected.
    var nodes = g.nodes()
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.hasClass('current') && rejected) {
        next.addClass('rejected')
      }
      next.removeClass('current')
    }

    // Un-bold all of the edges and edge transitions.
    var edges = g.edges()
    for (var next = edges.next(); next; next = edges.next()) {
      next.removeClass('edgeSelect')
      var w = next.weight().split('<b>')
      var unbold = w.join('')
      w = unbold.split('</b>')
      unbold = w.join('')
      next.weight(unbold)
    }

    // Add the last step to the slideshow, stop recording the slideshow, and add the click handler to the JSAV array.
    jsav.step()
    jsav.recorded()
    arr.click(arrayClickHandler)
  }

  // Function to handle click events on the JSAV array (take you to the corresponding step in the traversal).
  function arrayClickHandler(index) {
    // Temporarily turn off animation (if it was on).
    var oldFx = $.fx.off || false
    $.fx.off = true
    // If the step clicked on comes after the current step, increment until you reach that step.
    if (index > jsav.currentStep() - 1) {
      while (index > jsav.currentStep() - 1 && jsav._redo.length) {
        jsav.forward()
      }
    }
    // If the step clicked on comes before the current step, decrement until you reach that step.
    if (index < jsav.currentStep() - 1) {
      while (index < jsav.currentStep() - 1 && jsav._undo.length) {
        jsav.backward()
      }
    }
    // If animation was originally on, turn it back on again now.
    $.fx.off = oldFx
  }

  initialize()
})(jQuery)
