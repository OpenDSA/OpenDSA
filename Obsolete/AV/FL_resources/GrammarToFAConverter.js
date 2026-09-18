var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var arrow = String.fromCharCode(8594)
    parenthesis = "(";

var lambda = String.fromCharCode(955),
    epsilon = String.fromCharCode(949),
    square = String.fromCharCode(9633),
    dot = String.fromCharCode(183),
    emptystring = lambda;

var lastRow,            // index of the last visible row (the empty row)
    //arr,                // the grammar
    backup = null,      // a copy of the original grammar (as a string) before it is transformed
    //m,                  // the grammar table
    tGrammar,           // transformed grammar
    derivationTable,    // the derivation table shown during brute-force parsing
    parseTableDisplay,  // the parse table
    parseTree,          // parse tree shown during parsing slideshows
    parseTable,         // parse table used for pasing
    conflictTable,      // used for SLR parsing conflicts
    ffTable,            // table for FIRST and FOLLOW sets
    arrayStep,          // the position of FIRST or FOLLOW cells
    selectedNode,       // used for FA/graph editing
    modelDFA,           // DFA used to build SLR parse table
    //builtDFA,           // DFA created by the user
    type,               // type of parsing, can be bf, ll, slr
    grammars,           // stores grammar exercises, xml
    currentExercise = 0,// current exercise index
    multiple = false,   // if multiple grammar editing is enabled
    fi,                 // input box for matrix
    row,              // row number for input box
    col;              // column number for input box

var GrammarToFAConverter = function(jsav, grammar, matrixOptions) {
    this.init(jsav, grammar, matrixOptions);
  };
  
  var controllerProto = GrammarToFAConverter.prototype;
  
  controllerProto.init = function(jsav, grammar, matrixOptions) {
    this.jsav = jsav;
    this.grammerArray = JSON.parse(grammar);
    lastRow = this.grammerArray.length;
    this.grammerArray.push(["", arrow, ""]);
    if(grammar == null){
        this.grammerArray = new Array(20);    // arbitrary array size
        for (var i = 0; i < this.grammerArray.length; i++) {
            this.grammerArray[i] = ["", arrow, ""];
        }
        lastRow = 0;
    }
    this.initMatrix(matrixOptions);
};
function layoutTable (mat, index) {
    // if column index is given, does layout for that column, otherwise lays out all columns
    if (typeof index === 'undefined') {
      for (var i = 0; i < mat._arrays[0]._indices.length; i++) {
        layoutColumn(mat, i);
      }
    } else {
      layoutColumn(mat, index);
    }
    mat.layout();
  };
  // Function to lay out a single column width
  function layoutColumn (mat, index) {
    var maxWidth = 100;     // default cell size
    for (var i = 0; i < mat._arrays.length; i++) {
        if (typeof mat._arrays[i]._indices[index] !== undefined){
          var cell = mat._arrays[i]._indices[index].element;
          if ($(cell).width() > maxWidth) {
          maxWidth = $(cell).width();
        }
      }
    }
    if (maxWidth > 100) {
      for (var i = 0; i < mat._arrays.length; i++) {
        var cell = mat._arrays[i]._indices[index].element;
        $(cell).find('.jsavvalue').width(maxWidth);
      }
    }
  };
  controllerProto.initMatrix = function(matrixOptions){
      if(this.grammerMatrix)
        this.grammerMatrix.clear();
    this.grammerMatrix = this.jsav.ds.matrix(this.grammerArray, {style: "table", left: matrixOptions.left, top: matrixOptions.top});
    // hide all of the empty rows
    for (var i = lastRow + 1; i < this.grammerArray.length; i++) {
        this.grammerMatrix._arrays[i].hide();
    }
    layoutTable(this.grammerMatrix, 2);
    this.grammerMatrix.on('click', this.matrixClickHandler);
  }
  controllerProto.matrixClickHandler = function(index, index2) {
    if (fi) {
      var input = fi.val();
      var regex = new RegExp(emptystring, g);
      input = input.replace(regex, "");
      input = input.replace(regex, "!");
      if (input === "" && col == 2) {
        input = emptystring;
      }
      if (input === "" && col === 0) {
        alert('Invalid left-hand side.');
      }
      if (col == 2 && _.find(this.grammerArray, function(x) { return x[0] == this.grammerArray[row][0] && x[2] == input && this.grammerArray.indexOf(x) !== row;})) {
        alert('This production already exists.');
      }
      fi.remove();
      this.grammerMatrix.value(row, col, input);
      this.grammerArray[row][col] = input;
      layoutTable(m, 2);
    }
  };
  // interactive converting right-linear grammar to FA
  controllerProto.convertToFA = function (NFAoptions) {
    if(checkLHSVariables(this.grammerArray)){
      alert('Your production is unrestricted on the left hand side');
      return;
    }
    if (!checkRightLinear(this.grammerArray)) {
      alert('The grammar is not right-linear!');
      return;
    }
    var productions = _.filter(this.grammerArray, function(x) { return x[0];});
    //startParse();
    //this.jsav.umsg('Complete the FA.');
    // keep a map of variables to FA states
    this.nodeMap = {};
    this.builtDFA = this.jsav.ds.FA({width: NFAoptions.width, height: NFAoptions.height, left: NFAoptions.left, top: NFAoptions.top, layout: "automatic"});
    this.builtDFA.enableDragging();
    var newStates = [];     // variables
    for (var i = 0; i < productions.length; i++) {
      newStates.push(productions[i][0]);
      newStates = newStates.concat(_.filter(productions[i][2], function(x) {return variables.indexOf(x) !== -1;}));
    }
    newStates = _.uniq(newStates);
    // create FA states
    for (var i = 0; i < newStates.length; i++) {
      var n = this.builtDFA.addNode();
      this.nodeMap[newStates[i]] = n;
      if (i === 0) {
        this.builtDFA.makeInitial(n);
      }
      n.stateLabel(newStates[i]);
    }
    // add final state
    this.finalNode = this.builtDFA.addNode();
    // nodeMap[emptystring] = f;
    this.finalNode.addClass("final");
    this.builtDFA.layout();
    selectedNode = null;

    //$('#completeallbutton').click(this.completeConvertToFA);

    

    // handler for the grammar table: clicking a production will create the appropriate transition
    

    //this.builtDFA.click(this.convertDfaHandler);
    //this.grammerMatrix.click(this.convertGrammarHandler);
    //$('#av').append($('#convertmovebutton'));
    this.loopOverEachRow();
    this.jsav.step();
    this.jsav.umsg("This is the equivalent NFA for this Regular Grammer.");
  };
  function checkLHSVariables(grammerArray){
    //check if there is more than one variable on the LHS
    var productions = _.filter(grammerArray, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      var lhs = productions[i][0];
      if (lhs.length !== 1) {
        return true;
      } else if (variables.indexOf(lhs) === -1){
        return true;
      }
    }
    return false;
  }
  var checkRightLinear = function (grammerArray) {
    var productions = _.filter(grammerArray, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      var r = productions[i][2];
      for (var j = 0; j < r.length; j++) {
        if (variables.indexOf(r[j]) !== -1 && j !== r.length - 1) {
          return false;
        }
      }
    }
    return true;
  };
  // check if FA is finished; if it is, ask if the user wants to export the FA
  controllerProto.checkDone = function () {
    var edges = this.builtDFA.edges();
    var tCount = 0;
    for (var next = edges.next(); next; next = edges.next()) {
      var w = next.weight().split('<br>');
      tCount = tCount + w.length;
    }
  };
  controllerProto.completeConvertToFA = function() {
    var productions = _.filter(this.grammerArray, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      // if the current production is not finished yet
      if (!m.isHighlight(i)){
        var start = this.nodeMap[productions[i][0]];
        var rhs = productions[i][2];
        //if there is no capital letter, then go to final state
        if(variables.indexOf(rhs[rhs.length-1]) === -1){
          var end = f;
          var w = rhs;
        } else {
          var end = this.nodeMap[rhs[rhs.length-1]];
          var w = rhs.substring(0, rhs.length-1);
        }
        this.grammerMatrix.highlight(i);
        var newEdge = this.builtDFA.addEdge(start, end, {weight: w});
        if (newEdge) {
          newEdge.layout();
          this.checkDone();
        }
      }
    }
  };
  // handler for the nodes of the FA
  controllerProto.convertDfaHandler = function (e) {
    // adding transitions
    this.highlight();
    if (selectedNode) {
      var t = prompt('Terminal to transition on?');
      if (t === null) {
        selectedNode.unhighlight();
        selectedNode = null;
        this.unhighlight();
        return;
      }
      var lv = selectedNode.stateLabel();
      var rv = this.stateLabel();
      // check if valid transition
      for (var i = 0; i < productions.length; i++) {
        var r = productions[i][2];
        var add = false;
        if (rv && productions[i][0] === lv && r[r.length - 1] === rv && r.substring(0, r.length - 1) === t) {
          add = true;
        }
        if (productions[i][0] === lv && this.hasClass('final') && (r === t || (r === emptystring && t === ""))) {
          add = true;
        }
        if (add) {
          m.highlight(i);
          var newEdge = this.builtDFA.addEdge(selectedNode, this, {weight: t});
          selectedNode.unhighlight();
          selectedNode = null;
          this.unhighlight();
          if (newEdge) {
            newEdge.layout();
            this.checkDone();
          }
          return;
        }
      }
      alert('That transition is not correct.');
      selectedNode.unhighlight();
      selectedNode = null;
      this.unhighlight();
    } else {
      selectedNode = this;
    }
    e.stopPropagation();
  };
  controllerProto.convertGrammarHandler = function (index) {
    this.grammerMatrix.highlight(index);
    var l = this.grammerMatrix.value(index, 0);
    var r = this.grammerMatrix.value(index, 2);
    var nodes = this.builtDFA.nodes();
    if (variables.indexOf(r[r.length - 1]) === -1) {
      var newEdge = this.builtDFA.addEdge(this.nodeMap[l], this.finalNode, {weight: r});
    } else {
      var newEdge = this.builtDFA.addEdge(this.nodeMap[l], this.nodeMap[r[r.length - 1]], {weight: r.substring(0, r.length - 1)});
    }
    if (newEdge) {
      newEdge.layout();
     this.checkDone();
    }
  };
  controllerProto.loopOverEachRow = function(){
    for(var i = 0; i< this.grammerArray.length - 1; i++){
      this.jsav.step();
      this.jsav.umsg("For each production, we need to draw the appropriate transition.")
      this.convertGrammarHandler(i);
    }
  };