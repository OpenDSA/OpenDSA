/*var lambda = String.fromCharCode(955),
    epsilon = String.fromCharCode(949),
    arrow = String.fromCharCode(8594),
    emptystring,
    parenthesis = "(",
    variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";*/
    var latexit = "http://latex.codecogs.com/svg.latex?";
  (function($) {
    var jsav,
    g,
    lambda = String.fromCharCode(955), // Instance variable to store the JavaScript representation of lambda.
    epsilon = String.fromCharCode(949), // Instance variable to store the JavaScript representation of epsilon.
    none = String.fromCharCode(248), // empty set symbol used for converting to RE
    arrow = String.fromCharCode(8594),
    emptystring,
    parenthesis = "(",
    variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    emptystring = lambda, // Instance variable to store which empty string notation is being used.
    willRejectFunction = PDAwillReject, // Instance variable to indicate which traversal function to run (shorthand or no).
    exerciseIndex,//for creating exercises
    type,//type of editor: fixer, tester or editor
    fatoreController,
    exerController;
    var stepBy = '';

  
    // Add This function to allow creating automated exercises and solving exercises. Copied from FA.JS file associated with FA.HTML
    function onLoadHandler() {
      // initialize right click menu and hide it for future use
      type = $('h1').attr('id');
      //$('#begin').click(displayTraversals);
      if (type == 'exercise') {
        jsav = new JSAV($("#jsavcontainer"));
        exerciseLocation = getExerciseLocation();//;oad the exercise name from the Tester/Fixer html file.
        exerController = new ExerciseController(jsav, g, exerciseLocation, "json", {initGraph: initGraph, type: "PDA"});
        exerController.load();
        
        var exercise = jsav.flexercise(modelSolution, initializeExercise,
          {feedback: "atend", grader: "finalStep", controls: $(".jsavexercisecontrols"), exerciseController: exerController});
        exercise.reset();

      }
      else {
        jsav = new JSAV("av");
        //$('#begin').click(displayTraversals);
        var data;
        //this editor is opened from exercise generator
        if (localStorage['createExercise'] == 'true') {
          jsav.umsg("When you're done, click 'finish'.");
          // exercise generator does not need the functionality buttons
          //$(".functionality").hide();
          $(".createExercise").show();
          exerciseIndex = localStorage['exerciseIndex'];
          data = localStorage['problem' + exerciseIndex];
          localStorage['createExercise'] = false;
        }
        else {
          $(".functionality").show();
          $(".createExercise").hide();
          if (localStorage['toConvert'] === "true") {
            data = localStorage['converted'];
            $('#clearLabelButton').show();				
          }
          else if (localStorage['toMinimize'] === "true") {
            data = localStorage['minimized'];
            $('#clearLabelButton').show();
          }
          else if (localStorage['REtoFA'] == "true") {
            data = localStorage['FAfromRE'];
          }
          else {
            data = '{"nodes":[],"edges":[]}';
          }
        }
        initialize(data);
      }
		$('#undoButton').click(function(){
			highlight_select_button();
			//$('#undoButton').addClass("active");
			g.undo();
			$('.jsavgraph').click(graphClickHandler);
			$('.jsavedgelabel').click(labelClickHandler);
		});
		$('#redoButton').click(function(){
			highlight_select_button()
			//$('#redoButton').addClass("active");
			g.redo();
			$('.jsavgraph').click(graphClickHandler);
			$('.jsavedgelabel').click(labelClickHandler);
		});
		resetUndoButtons();
	};


  //Function sent to exercise constructor to initialize the exercise
	function initializeExercise() {
    $('.jsavgraph').remove();
		exerController.updateExercise(0);
  }
  
  //Function used by exercise object to show the model answer and to grade the solution by comparing the model answer with student answer.
  //In our case, we will make this function show the test cases only.
  function modelSolution(modeljsav) {
    var testCases = exerController.tests[0]["testCases"];
    var list = [["Test Number", "Test String", "Accept/Reject"]];
    for (i = 0; i < testCases.length; i++) {
      var testNum = i + 1;
      var testCase = testCases[i];
      var input = Object.keys(testCase)[0];
      list.push([testNum, input, testCase[input]]);
    }
    var model = modeljsav.ds.matrix(list);
    //layoutTable(model);
    modeljsav.displayInit();
    return model;
  } 
  //add this funcion to allow the editor from reading the stored graph from the local storage. Copied as OnLoadHandler
  var initialize = function(graph) {
    g = graph;
    initGraph({layout: "automatic"});
  };
  // initialize graph. Modified to allow the editor from reading the stored graph
  var initGraph = function(opts) {
    var source = opts.graph ? opts.graph : jQuery.parseJSON(g);
    g =  jsav.ds.PDA($.extend({width: '750px', height: 440, emptystring: lambda, editable: true}, opts))
    var ratio = 1;
    g.initFromParsedJSONSource(source, ratio);

    // Clear anything in local storage as we do not need it anymore.
    // (Local storage is used to transfer graph information between different windows. It is used by conversionExercise.html and minimizationTest.html.)
    localStorage['toConvert'] = false;
    localStorage['toMinimize'] = false;
    localStorage['REtoFA'] = false;
    finalize();
    return g;
    //This is the original code for initGraph
    /*
    g = jsav.ds.pda($.extend({width: '750px', height: 440, emptystring: lambda, editable: true}, opts));
    emptystring = g.emptystring;
    finalize();

    return g;
    */
  };

  var finalize = function() {
    jsav.displayInit();
    g.click(nodeClickHandler);
    g.click(edgeClickHandler, {edge: true});
    $('.jsavgraph').click(graphClickHandler);
    $('.jsavedgelabel').click(labelClickHandler);
  };

  // handler for editing edges/transitions
  var labelClickHandler = function(e) {
    initEditEdgeInput(this);  
  };

  // show table for the label clicked
  var initEditEdgeInput = function(label) {
    var weights = $(label).html().split("<br>");
    // delete edge if there is only one transition and in delete mode
    if (weights.length == 1 && g.hasClass("delete")) {
      g.saveFAState();
      $(label).html("");
      g.layout({layout: 'manual'});
      return;
    }
    var tbody = $('#editEdge > table > tbody');
    var rows = tbody.find('tr');
    for (var i = rows.length - 1; i > 0; i--) {
      rows[i].remove();
    }
    var row = $(rows[0]);
    for (var i = 0; i < weights.length; i++) {
      weights[i] = toColonForm(weights[i]);
      var letters = weights[i].split(":");
      rows = tbody.find('tr');
      if (i >= rows.length) {
        var newRow = row.clone();
        tbody.append(newRow);
      }
      var lastRow = tbody.find('tr').last();
      lastRow.find('#input').val(letters[0]);
      lastRow.find('#pop').val(letters[1]);
      lastRow.find('#push').val(letters[2]);
      lastRow.find('#deleteEdge').text("Delete");
      lastRow.find('#deleteEdge').click(deleteRowInEditEdge);
      //lastRow.find('#deleteEdge').on("click", label, deleteRowInEditEdge);
    }
    var editEdgeInput = $('#editEdge');
    tbody.attr({remove: false});
    $('#deleteEdge').text("Delete");
    editEdgeInput.css({left: $(label).offset().left, top: $(label).offset().top});
    editEdgeInput.show();
    $('#input').focus();
    //completeEditEdge(label);
    $(document).off('keyup').keyup(function(e) {
      if (e.keyCode == 13) {
        // console.log("Wut up")
        completeEditEdge(label);
      } else if (e.keyCode == 27) {
        cancel();
      }
    });
  };

  var deleteRowInEditEdge = function() {
    var tbody = $(this).parent().parent().parent();
    if (tbody.children().length == 1) {
      tbody.attr({remove: 'true'});
      $(document).trigger(
        jQuery.Event( 'keyup', { keyCode: 13, which: 13 } )
      );

      return;
    }
    $(this).parent().parent().remove();
  };

  var completeEditEdge = function(label) {
    var editEdgeInput = $('#editEdge');
    var tbody = editEdgeInput.find('tbody');
    var newWeight = "";
    if (tbody.attr('remove') == 'true') {
      newWeight = "";
    }
    else {
      var rows = tbody.find('tr');
      var weights = [];
      for (var i = 0; i < rows.length; i++) {
        var row = $(rows[i]);
        var input = row.find('#input').val();
        var pop = row.find('#pop').val();
        var push = row.find('#push').val();
        if (input == "") input = lambda;
        if (pop == "") pop = lambda;
        if (push == "") push = lambda;
        weights.push(input + "," + pop + ";" + push);
      }
      newWeight = weights.join("<br>");
    }
    $(label).html(newWeight);
    g.saveFAState();
    g.layout({layout: 'manual'});
    g.updateEdgePositions();
    editEdgeInput.hide();
    g.updateAlphabet();
  };

  // handler for the graph window
  var graphClickHandler = function(e) {
    if ($(".jsavgraph").hasClass("addNodes")) {
      g.saveFAState();
      var newNode = g.addNode(),
          nodeX = newNode.element.width()/2.0,
        nodeY = newNode.element.height()/2.0;
      $(newNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
    } 
  };

  function updateNode(wasInitialState, initial_state, wasFinalState, final_state, node_label) {
		g.saveFAState();
    executeEditNode(g, g.selected, wasInitialState, initial_state, wasFinalState, final_state, node_label);
  };
  
  // handler for the nodes of the graph
  var nodeClickHandler = function(e) {  
    // editing nodes should be changed to match the interface in multitapeTest.js
    if ($(".jsavgraph").hasClass("edit")) {
      g.saveFAState();
      g.selected = this;
      g.selected.highlight();
      var Prompt = new FANodePrompt(updateNode, g.selected.hasClass('start'), g.selected.hasClass('final'), g.selected.stateLabel());
      Prompt.render(g.selected.value());
      g.selected.unhighlight();
    }
    else if ($('.jsavgraph').hasClass('moveNodes')) {
      /*highlight_select_button();
      removeModeClasses();
      removeND();
      g.enableDragging();
      jsav.umsg('Drag to Move.');
        $('#moveButton').addClass("active");*/
    }
    else if ($('.jsavgraph').hasClass('delete')) {
      g.removeNode(this);
    }
  };

  // handler for the edges of the graph
  var edgeClickHandler = function(e) {
    if ($('.jsavgraph').hasClass('edit')) {
      this.highlight();
      var input = confirm("Delete edge?");
      if (input === null) {
        this.unhighlight();
        return;
      }
      if (input) {
        g.saveFAState();
        g.removeEdge(this);
      }
      this.unhighlight();
    }else if ($(".jsavgraph").hasClass("convert")) {
      this.highlight();
      convertTransition(this);
    }
  };


  var toggleND = function() {
    $('#changeButton').toggleClass("highlightingND");
    if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
      $('#changeButton').hide();
    } else{
      $('#changeButton').show();
    }
    g.toggleND();
  };

  var toggleLambda = function() {
    $('#changeButton').toggleClass("highlightingL");
    if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
      $('#changeButton').hide();
    } else{
      $('#changeButton').show();
    }
    g.toggleLambda();
  };

  //===============================
  //editing modes

  var convertMode = function() {
    cancel();
    var jg = $(".jsavgraph");
    jg.addClass("convert");
    $("#mode").html('Convert to grammar');
    addEdgeSelect();
    jsav.umsg("Click on the transitions to convert to grammar");
  };
  var addNodesMode = function() {
    highlight_select_button();
    removeModeClasses();
    removeND();
    cancel();
    var jg = $(".jsavgraph");
    jg.addClass("addNodes");
    $("#mode").html('Adding nodes');
    jsav.umsg("Click to add nodes");
    $('#nodeButton').addClass("active");
  };
  var addEdgesMode = function() {
    //cancel();
    highlight_select_button();
    removeModeClasses();
    removeND();
    var jg = $(".jsavgraph");
    jg.addClass("addEdges");
    g.disableDragging();
    $(".jsavgraph").addClass("addEdges");
    $('.jsavgraph').off('mousedown').mousedown(mouseDown);
    $('.jsavgraph').off('mousemove').mousemove(mouseMove);
    $('.jsavgraph').off('mouseup').mouseup(mouseUp);
    $("#mode").html('Adding edges');
    jsav.umsg("Drag from one edge to another.");
    $('#edgeButton').addClass("active");
    /*highlight_select_button();
    removeModeClasses();
    removeND();
    g.disableDragging();
    $(".jsavgraph").addClass("addEdges");
    $('.jsavgraph').off('mousedown').mousedown(mouseDown);
    $('.jsavgraph').off('mousemove').mousemove(mouseMove);
    $('.jsavgraph').off('mouseup').mouseup(mouseUp);
    jsav.umsg('Drag from one node to another.');
    $('#edgeButton').addClass("active")*/
  };
  var moveNodesMode = function() {
    cancel();
    g.enableDragging();
    var jg = $(".jsavgraph");
    jg.addClass("moveNodes");
    $("#mode").html('');
    jsav.umsg("Drag to move.");
    /*highlight_select_button();
    removeModeClasses();
    removeND();
    g.enableDragging();
    jsav.umsg('Drag to Move.');
        $('#moveButton').addClass("active");*/
  };
  var editMode = function() {
    highlight_select_button();
    removeModeClasses();
    removeND();
    cancel();
    moveNodesMode();
    var jg = $(".jsavgraph");
    jg.addClass("edit");
    $("#mode").html('Editing nodes and edges');
    addEdgeSelect();
    jsav.umsg("Click a node or edge to edit.");
    $('#editButton').addClass("active");
  };
  var deleteMode = function() {
    highlight_select_button();
    removeModeClasses();
    removeND();
    cancel();
    var jg = $(".jsavgraph");
    jg.addClass("delete");
    $("#mode").html('Deleting');
    jsav.umsg("Click a node or edge to delete. Enter to confirm.");
    $('#deleteButton').addClass("active");
  };
  var cancel = function() {
    removeEdgeSelect();
    removeLabelMenu();
    var jg = $(".jsavgraph");
    jg.removeClass("working");
    jg.removeClass("addNodes");
    jg.removeClass("addEdges");
    jg.removeClass("moveNodes");
    jg.removeClass("edit");
    jg.removeClass("delete");
    jg.removeClass("convert");
    var nodes = g.nodes();
    for (var node = nodes.next(); node; node = nodes.next()) {
      node.unhighlight();
    }
    $('#edge').hide();
    $('#editEdge').hide();
    $("#mode").html('\n');
    jsav.umsg("Enjoy");
  }

  // make edges easier to click
  var addEdgeSelect = function () {
    var edges = g.edges();
    for (var next = edges.next(); next; next= edges.next()) {
      next.addClass('edgeSelect');
      next.layout();
    }
  };
  var removeEdgeSelect = function () {
    var edges = g.edges();
    for (var next = edges.next(); next; next = edges.next()) {
      if (next.hasClass('edgeSelect')) {
        next.removeClass('edgeSelect');
        next.layout();
      }
    }
  };
  var removeLabelMenu = function() {
    if ($('#editedgelabel')) {
      $('#editedgelabel').remove();
    }
  };

  var onClickTraverseClosure = function() {
    stepBy = 'closure'
    onClickTraverse()
  }

  var onClickTraverseState = function() {
    stepBy = 'state'
    onClickTraverse()
  }

  var onClickTraverse = function() {
    if (!g.initial) {
      alert('Please define an initial state');
      return;
    }
    var inputString = prompt("Input string?", "abb");
    if (inputString === null) {
      return;
    }
    var inputs = [inputString]
    var nodes = g.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      // Remove "current", or else it will mess with the traversal algorithms.
      // (Traversal algorithms use "current" to mark states as visited.)
      next.removeClass('current');
    }
    var travArray = [];
    readyTraversal();
    for (var i = 0; i < inputs.length; i++) {
      // Create an array of the input strings.
      if (inputs[i]) {
        if(willRejectFunction(g,inputs[i])){
          travArray.push(inputs[i]+"(" + String.fromCharCode(10005) + ")");
        }else{
          travArray.push(inputs[i]+"(" + String.fromCharCode(10003) + ")");
        }
      }
      else {
        travArray.push(emptystring);
      }
    }
    // Use this array to populate the JSAV array.
    jsavArray = jsav.ds.array(travArray, {top: 0, left: 0});//element: $('.arrayPlace')});
    for (var j = 0; j < inputs.length; j++) {
      if (willRejectFunction(g, inputs[j])) {
        // If rejected, color red.
        jsavArray.css(j, {"background-color": "red"});
      }
      else {
        // If accepted, color green.
        jsavArray.css(j, {"background-color": "green"});
      }
    }
    jsavArray.click(arrayClickHandler);
    jsavArray.show();
  };

  // Exit out of all editing modes and prepare the view for the input string JSAV array.
  var readyTraversal = function() {
    removeModeClasses();
    jsav.umsg('Click on an input to trace its traversal.');
  };

  // Click handler for the JSAV array.
  function arrayClickHandler(index) {
    play(this.value(index));
  };

  // Function to open the graph in another window and run the input string on it.
  // Triggered by clicking on an input string in the JSAV array.
  var play = function (inputString) {
    localStorage['graph'] = serialize(g);
    localStorage['traversal'] = inputString.slice(0, -3);
    localStorage['stepBy'] = stepBy;
    window.open("./PDATraversal.html", "popupWindow", "width=830, height=800, scrollbars=yes");
  };

  var willAccept = function(graph, input) {
    return graph.traverseOneInput(input)
  }

  // Disable all editing modes so that click handlers do not fire.
  // Called when the user switches editing modes, or otherwise presses a button that changes the view.
  var removeModeClasses = function() {
    // Clear all superfluous or otherwise outdated information on the page.
    //$('.arrayPlace').empty();
    //$('#download').html('');
    jsav.umsg('');
    // Unselect and unhighlight any selected nodes or edges.
    if (g.first) {
      g.first.unhighlight();
      g.first = null;
    }
    if (g.selected) {
      g.selected.unhighlight();
      g.selected = null;
    }
    if ($(".jsavgraph").hasClass("deleteNodes")) {
      $(".jsavgraph").removeClass("deleteNodes");
      // Return edges to normal size.
      collapseEdges();
    }
    else {
      $(".jsavgraph").removeClass("addNodes");
      $(".jsavgraph").removeClass("addEdges");
      $(".jsavgraph").removeClass("editNodes");
      $(".jsavgraph").removeClass("moveNodes");
      $(".jsavgraph").removeClass("working");
    }
  };

  /**
   * Function to download the diagram as an xml file with a dialog box for entering file the file name.
   * Calls FileSaverPDA in CustomPrompt.js
   * 
   * Michael Richter
   */
  var save = function() {
    removeModeClasses(); 
    var saver = new FileSaverPDA(g);
    saver.render();
  }

  var load = function() {
    var loaded = document.getElementById('loadFile');
    var file = loaded.files[0],
    reader = new FileReader();
    waitForReading(reader);
    reader.readAsText(file);
  }

  var waitForReading = function (reader) {
    reader.onloadend = function(event) {
      var text = event.target.result;
      g.initFromXML(text);
      $('.jsavedgelabel').click(labelClickHandler);
    }
  };

  var startX, startY, endX, endY; // start position of dragging edge line
  function mouseDown(e) {
    if (!$('.jsavgraph').hasClass('addEdges')) return;
    var targetClass = $(e.target).attr('class');
    if (targetClass !== "jsavvaluelabel") return;
    var node = $(e.target);
    g.first = g.getNodeWithValue(node.text());
    g.first.highlight();
    offset = $('.jsavgraph').offset(),
    offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
    startX = e.pageX - 15; 
    startY = e.pageY - offset.top + offset2 - 5;
  }

  function mouseUp(e) {
    if (!g.first) return;
    var targetClass = $(e.target).attr('class');
    if (targetClass !== "jsavvaluelabel") {
      $('path[opacity="1.5"]').remove();
      g.first.unhighlight();
      g.first = null;
      return;
    }
    var node = $(e.target);
    g.selected = g.getNodeWithValue(node.text());
    g.selected.highlight();
    
    initEdgeInput();
  }

  function initEdgeInput() {
    // draw the edge input box at correct position
    var path = $('path[opacity="1.5"]');
    var box = path[0].getBBox();
    var edgeInput = $('#edge');
    var rows = $('#edge > table > tr');
    for (var i = 1; i < rows.length; i++) {
      rows[i].remove();
    }
    $('#input').val(lambda);
    $('#pop').val(lambda);
    $('#push').val(lambda);
    edgeInput.show();
    var leftOffset = 15 + box.x + box.width / 2;
    var topOffset = box.y + box.height / 2 + $('.jsavgraph').offset().top - 5;
    edgeInput.css({left: leftOffset, top: topOffset});
    path.remove();
    first = g.first;
    g.first = null;
    $('#input').focus();
    $(document).keyup(function(e) {
      if (e.keyCode == 13) {
        addEdgeWithInputBox();
      }
    });
  }

  function addEdgeWithInputBox() {
    if (!first) return;
    var edgeInput = $('#edge');
    var input = $('#input').val();
    var pop = $('#pop').val();
    var push = $('#push').val();
    var edgeWeight = input + "," + pop + ";" + push;
    g.saveFAState();
    g.addEdge(first, g.selected, {weight: edgeWeight});
    $('.jsavedgelabel').off('click').click(labelClickHandler);

    edgeInput.hide();
    first.unhighlight();
    g.selected.unhighlight();
    g.updateEdgePositions();
    first = null;
    g.selected= null;
  }

  function mouseMove(e) {
    if (!g.first) return;
    endX = e.pageX - 15;
    endY = e.pageY - offset.top + offset2 - 5;
    $('path[opacity="1.5"]').remove();
    jsav.g.line(startX, startY, endX, endY, {"opacity": 1.5});
  }

  // Function to reset the size of the undo stack and the redo stack.
  // Since both of them are empty, both buttons are also disabled.
  // Called whenever the user loads a new graph.
  function resetUndoButtons () {
    document.getElementById("undoButton").disabled = true;
    document.getElementById("redoButton").disabled = true;
  };

  // Undoes the effects of testND and testLambda, unhighlighting all nodes and edges.
  var removeND = function() {
    var nodes = g.nodes();
    for(var next = nodes.next(); next; next = nodes.next()) {
      next.removeClass("testingND");
    }
    var edges = g.edges();
    for (var next = edges.next(); next; next = edges.next()) {
      next.g.element.removeClass("testingLambda");
    }
  };

  // Disable all editing modes so that click handlers do not fire.
  // Called when the user switches editing modes, or otherwise presses a button that changes the view.
  var removeModeClasses = function() {
    // Clear all superfluous or otherwise outdated information on the page.
    $('.arrayPlace').empty();
    $('#download').html('');
    jsav.umsg('');
    // Unselect and unhighlight any selected nodes or edges.
    if (g.first) {
      g.first.unhighlight();
      g.first = null;
    }
    if (g.selected) {
      g.selected.unhighlight();
      g.selected = null;
    }
    if ($(".jsavgraph").hasClass("deleteNodes")) {
      $(".jsavgraph").removeClass("deleteNodes");
      // Return edges to normal size.
      collapseEdges();
    }
    else {
      $(".jsavgraph").removeClass("addNodes");
      $(".jsavgraph").removeClass("addEdges");
      $(".jsavgraph").removeClass("editNodes");
      $(".jsavgraph").removeClass("moveNodes");
      $(".jsavgraph").removeClass("working");
    }
  };

  function closeAv() {
    $('.jsavcontrols').hide();
    $('#alphabets').hide();
    $('#configurations').hide();
    $('.configuration').hide();
    $('#closeAv').hide();
    g.cancelTraverse();
  }

  function highlight_select_button(){
    // Add active class to the current button (highlight it)
    /*var header = document.getElementById("menu_options");
    var btns = header.getElementsByClassName("icon_btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }*/
    $('#undoButton').removeClass("active");
    $('#redoButton').removeClass("active");
    $('#deleteButton').removeClass("active");
    $('#editButton').removeClass("active");
    $('#nodeButton').removeClass("active");
    $('#edgeButton').removeClass("active");
        $('#collapseButton').removeClass("active");
  }


  $('#layoutbutton').click(function() {g.layout()});
  $('#testNDbutton').click(toggleND);
  $('#testlambdabutton').click(toggleLambda);
  $('#cancelButton').click(cancel);
  $('#nodeButton').click(addNodesMode);
  $('#edgeButton').click(addEdgesMode);
  $('#moveButton').click(moveNodesMode);
  $('#editButton').click(editMode);
  $('#deleteButton').click(deleteMode);
  $(document).on("click", '#runMultipleInputsButton', function() {
    g.runMultipleInputs()
  });
  // $('#convertToGrammarButton').click(convertToGrammar);
  // $('#completeConvertButton').hide();
  $('#saveButton').click(save);
  $('#stepByClosureButton').click(onClickTraverseClosure);
  $('#stepByStateButton').click(onClickTraverseState);

  $('#undoButton').click(function() {
    g.undo();
    $(".jsavgraph").click(graphClickHandler);
    $('.jsavedgelabel').click(labelClickHandler);
  });
  $('#redoButton').click(function() {
    g.redo();
    $(".jsavgraph").click(graphClickHandler);
    $('.jsavedgelabel').click(labelClickHandler);
  });
  $('#closeAv').click(closeAv)
  $('#loadFile').on('change', load);
  $('#configurations').hide();
  $('.configuration').hide();
  $('#edge').hide()
  $('#editEdge').hide()
  $('#alphabets').hide();
  $('#closeAv').hide();
  onLoadHandler();

  //g = initGraph({layout: "manual"});
  //g.layout();
  //resetUndoButtons();
  //jsav.displayInit();
  //***********************************************************/
  //This code is added to provide PDA automated exercises
  //***********************************************************/
  //This line create action listener to the Finish button
  $("#finish").click(finishExercise);
  //Function to close the editor and store the pda inside the local storage to pass it to the paren window (Create Exercises HTML page)
  function finishExercise() {
		localStorage['problem' + exerciseIndex] = serialize(g);
		localStorage['createExercise'] = false;
		window.close();
  }
  
}(jQuery));
