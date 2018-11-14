$(document).ready(function () {
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var arrow = String.fromCharCode(8594),
      lastRow,            // index of the last visible row (the empty row)
      arr,                // the grammar
      backup = null,      // a copy of the original grammar (as a string) before it is transformed
      m,                  // the grammar table
      derivationTable,    // the derivation table shown during brute-force parsing
      parseTableDisplay,  // the parse table
      parseTree,          // parse tree shown during parsing slideshows
      parseTable,         // parse table used for pasing
      ffTable,            // table for FIRST and FOLLOW sets
      type,               // type of parsing, can be bf, ll, slr
      grammars,           // stores grammar exercises, xml
      derivationTree;

  var lambda = String.fromCharCode(955);
  var productions = JSON.parse(localStorage.getItem('grammars'));
  m = jsav.ds.matrix(productions, {style: "table"});
  derivationTree = {};

  $('#helpbutton').click(displayHelp);
  $('#addinputbutton').click(addInput);
  $('#deleterowbutton').click(deleteRow);
  $('#runinputsbutton').click(runMultiInputs);
  $('#clearbutton').click(clearAll);
  $('#backbutton').click(function () {
    if (parseGraph) {
      parseGraph.clear();
      jsav.clear();
      jsav = new JSAV("av");
    }
    if (derivationTable) { derivationTable.clear();}
    if (ffTable) { ffTable.clear();}
    parseTable = [];
    $('.conflictMenu').remove();
    if (parseTableDisplay) { parseTableDisplay.clear();}
    if (backup) {
      arr = _.map(backup.split(','), function(x) {
        var d = x.split(arrow);
        d.splice(1, 0, arrow);
        return d;
      });
      lastRow = arr.length;
      arr.push(["", arrow, ""]);
      backup = null;
    }
    $('.jsavcanvas').height("auto");
    $('#movebutton').off();
    $('#finalbutton').off();
    $('#gotobutton').off();
    $('#dfabuttons').hide();
    $('#convertmovebutton').off();
    $('#convertmovebutton').hide();
    m = init();
    $('#firstinput').remove();
    $('#temp').remove();
    jsav.umsg('');
    $('button').show();
    $('#transformbutton').show();
    $('.jsavcontrols').hide();
    $('#backbutton').hide();
    $('.parsingbutton').off();
    $('.parsingbutton').hide();
    $('#files').show();
    $(m.element).css("margin-left", "auto");
    $('.jsavmatrix').addClass("editMode");
  });

  function displayHelp(){
    alert(document.getElementById('helpInfo').innerHTML);
  }

  function addInput(){
  //a button for the user to add a row to input in the table for multiple brute force parsing
    var myTable = document.getElementById("table");
    var numRow = myTable.rows.length;
    $("#table").last().append("<tr><<td><div contenteditable id='input" + (numRow-1) + "'></div></td><td><output id='output" + (numRow-1) + "'></output></td></tr>");
  }

  function deleteRow(){
  //a button for the user to delete a row to input in the table for multiple brute force parsing
    var myTable = document.getElementById("table");
    var numRow = myTable.rows.length;
    if(numRow>2){
      document.getElementById("table").deleteRow(numRow-1);
    }
  }

  function clearAll(){
    window.location.href = "";
  }

  function runMultiInputs(){
  //allow user to run multiple inputs for multiple brute force parsing


    var myTable = document.getElementById('table');
    var numRow = myTable.rows.length;
    for (i = 0; i < numRow - 1; i++){
      var input = document.getElementById("input"+i).innerHTML;
      if(!(input == "")){
        if(input === "!"){
          document.getElementById("input"+i).innerHTML = lambda;
        }

        if(stringAccepted(input)[0]){
          document.getElementById("output"+i).value = "Accept";
          document.getElementById("output"+i).onclick = function(){
            var inputString = document.getElementById("input" + this.id.slice(-1)).innerHTML;
            displayTree(inputString);
          };
        }else{
          document.getElementById("output"+i).value = "Reject";
        }
      }
    }
  }

  var replaceCharAt = function (str, index, ch) {
    if (index < 0 || index > str.length - 1) {
      return str;
    } else {
      return str.substring(0, index) + ch + str.substring(index + 1);
    }
  };

  //display parse tree in multiple brute force parse page if clicked on the accepted input
  function displayTree(inputString){
    var productions = JSON.parse(localStorage.getItem("grammars"));
    startParse(m, parseTree);

    $('#bfpbutton').show();
    /*
    Set the height of the canvas manually:
    Auto height does not factor in the heights of JSAV elements created with "relativeTo" turned on
    */
    $('.jsavcanvas').height(450);
    var table = {};   // maps each sentential form to the rule that produces it
    var next;
    for (var i = 0; i < productions.length; i++) {
      m._arrays[i].unhighlight();
    }

    if (stringAccepted(inputString)[0]) {
      table = derivationTree;
      jsav.umsg('"' + inputString + '" accepted');
      var temp = stringAccepted(inputString)[1];
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
      parseGraph = new jsav.ds.graph({height: (results.length+1) * 50});
      derivationTable = new jsav.ds.matrix(results, {style: "table"});

      $("#bfpbutton").hide();

      var displayOrder = [];  // order in which to display the nodes of the parse tree
      // create the parse tree using the derivation table
      var root = parseGraph.addNode(results[0][0].split(arrow)[0]);
      var sentential = [root]; //order of sentential form nodes
      var displayOrderParents = [];  //order of parent nodes
      var level = new Map(); //a map from node to level(left and top position)
      level.set(root, [0,0]); // add root node
      displayOrder.push(root);

      for (var i = 0; i < results.length; i++) {
        var lhsProd = results[i][0].split(arrow)[0];
        var rhsProd = results[i][0].split(arrow)[1];
        //find correct lhs in sentential
        var sententialString = "";
        for(var j = 0; j < sentential.length; j++){
          //join all nodes to make a sentential string
          sententialString += sentential[j].value();
        }
        //make the production compatible to replaceLHS function
        var pro = results[i][0].split(arrow);
        pro.push(pro[1]);
        pro[1] = "" ;
        var lhsOccur;
        //compare replaceLHS to results[i][1]
        for(var j = 0; j < replaceLHS([pro],sententialString).length; j++){
          if(replaceLHS([pro], sententialString)[j] === results[i][1]){
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
          var newNode = parseGraph.addNode(rhsProd[l], {left: level.get(sentential[realIndex])[0]+l*50, top: 50 + 50*i});
          children.push(newNode);
          for(var r = 0; r < lhsProd.length; r++){
            parseGraph.addEdge(sentential[realIndex + r], newNode);
          }
          //construct a map from node to position([left, top])
          level.set(newNode, [50*(l+realIndex) ,50 + 50*i]);
        }
        displayOrderParents.push(sentential.slice(realIndex, realIndex + lhsProd.length));
        //removelhsProdfromSentential and addrhsProdtoSentential
        var temp1 = sentential.slice(0, realIndex);
        var temp2 = sentential.slice(realIndex + lhsProd.length);
        sentential = temp1.concat(children);
        sentential = sentential.concat(temp2);
        displayOrder.push(children);
      }

      updateWidth(parseGraph, root);
      highlightTerminal(sentential);
      layoutTable(derivationTable);
      parseGraph.layout();
      // hide the whole tree except for the start node and hide the derivation table
      for(var i = 0; i < parseGraph.nodes().length; i++){
        parseGraph.nodes()[i].hide();
      }
      for (var i = 0; i < results.length; i++) {
        derivationTable._arrays[i].hide();
      }
      root.show();
      //hide all edges
      for(var i = 0; i < parseGraph.edges().length; i++){
        parseGraph.edges()[i].hide();
      }

      // create slideshow stepping through derivation table and parse tree
      jsav.displayInit();
      var parents = displayOrder.shift();
      for (var i = 0; i < results.length; i++) {
        jsav.step();
        for (var j = 0; j < m._arrays.length; j++) {
          m._arrays[j].unhighlight();
        }
        var val = derivationTable.value(i, 1);
        // highlight productions in the grammar while tracing
        //m._arrays[table[val][0]].highlight();
        derivationTable._arrays[i].show();
        var parents = displayOrderParents.shift();
        var nodes = displayOrder.shift();
        for (var j = 0; j < nodes.length; j++) {
          nodes[j].show({recursive: false});

          //find the deepest level of the parents
          var deepestLevel = -1;
          for(var l = 0; l < parents.length; l++){
            if(level.get(parents[l])[1] > deepestLevel){
              deepestLevel = level.get(parents[l])[1];
            }
          }
          for(var l = 0; l < parents.length; l++){
            if(level.get(parents[l])[1] != deepestLevel){
              var newParent = parseGraph.addNode(parents[l].value(), {left: level.get(parents[l])[0],top: deepestLevel});
              parseGraph.addEdge(parents[l], newParent);
              parseGraph.addEdge(newParent, nodes[j]);
              parents[l].css({'background': "black"});
            }else{
              parents[l].edgeTo(nodes[j]).show();
            }
          }
          parseGraph.layout();
          //add a rectangle background to show combining nodes
          if(parents.length > 1){
            //show combining nodes with a rectangle
            var rect = jsav.g.rect(183+leftMostPosition(parents,level),  46 + (productions.length-1)*29.5+deepestLevel, results[i][0].split(arrow)[0].length * 50, 50, {stroke: "orange", "stroke-width": 4});
          }
        }
        parents = nodes;
      }
      jsav.recorded();
    }
  }

  function updateWidth(graph, root){
    root.width = graph.nodeCount() - 1;
    root.discovered = true;
    for(var i = 0; i < graph.nodeCount(); i++){
      console.log("i"+i + graph.nodes()[i].value());
      if(graph.nodes()[i] !== root){
        graph.nodes()[i].width = calculateWidth(graph.nodes()[i]);
      }
      console.log(graph.nodes()[i].width);
    }

  }

  function calculateWidth(node){
    node.discovered = true;
    var width = 0;
    if(isLeaf(node)){
      return 1;
    }else{
      for(var i = 0; i < node.neighbors().length; i++){
        if(node.neighbors()[i].discovered === undefined){
          console.log("child "+node.neighbors()[i].value());
          width += calculateWidth(node.neighbors()[i]);
        }
      }
    }
    return width;
  }

  function isLeaf(node){
    if(node.neighbors().length === 1){
      return true;
    }else{
      for(var i = 0; i < node.neighbors().length; i++){
        if(node.neighbors()[i].discovered === undefined){
          return false;
        }
      }
      return true;
    }
  }

  function leftMostPosition(parents, level){
    var most = 10000000;
    for(var i = 0; i < parents.length; i++){
      if(level.get(parents[i])[0] < most){
        most = level.get(parents[i])[0];
      }
    }
    return most;
  }

  function highlightTerminal(sentential){
    for(var i = 0; i < sentential.length; i++){
      sentential[i].highlight();
    }
  }


  function stringAccepted(inputString){
    if(inputString === "!"){
      inputString = "";
    }
    var productions = JSON.parse(localStorage.getItem('grammars'));
    var table = {};   // maps each sentential form to the rule that produces it
    var sententials = [];
    var next;
    // assume the first production is the start variable
    for (var i = 0; i < productions.length; i++) {
      if (productions[i][0] === productions[0][0]) {
        if (productions[i][2] === emptystring) {
          sententials.push('');
          table[''] = [i, ''];
        } else {
          sententials.push(productions[i][2]);
          table[productions[i][2]] = [i, ''];
        }
      }
    }
    var derivers = {};  // variables that derive lambda
    var counter = 0;
    // find lambda deriving variables
    while (removeLambdaHelper(derivers, productions)) {
      counter++;
      if (counter > 5000) {
        console.warn(counter);
        var confirmed = confirm('This is taking a while. Continue?');
        if (confirmed) {
          counter = 0;
        } else {
          break;
        }
      }
    };
    if(hasLambda(productions)){
    derivers = Object.keys(derivers);
    // parse
    counter = 0;
    var queue = new Set();
    queue.add(productions[0][0]);
    var asd = queue.values();
    while(asd.length !== 0){
      if(counter > 5000){
        break;
      }
      var next = queue.values().next().value;
      queue.delete(next);
      if(removeLambda(next) === inputString){
        return [true, next, table];
      }
      for(var i = 0; i < replaceLHS(productions, next).length; i++){
        queue.add(replaceLHS(productions, next)[i]);
        table[replaceLHS(productions, next)[i]] = next;
      }
      counter++;
      asd = queue.values();
    }
    return [false, next, table];
  }
  else{
    derivers = Object.keys(derivers);
    // parse
    counter = 0;
    var queue = new Set();
    queue.add(productions[0][0]);
    var asd = queue.values();
    while(asd.length !== 0){
      var next = queue.values().next().value;
      queue.delete(next);
      if(next.length > inputString.length)
      {
        counter--;
        continue;
      }
      
      if(removeLambda(next) === inputString){
        return [true, next, table];
      }
      for(var i = 0; i < replaceLHS(productions, next).length; i++){
        var newValue = replaceLHS(productions, next)[i];
        if(newValue.length <= inputString.length)
          {
            queue.add(newValue);
            table[replaceLHS(productions, next)[i]] = next;
          }
      }
      counter++;
      asd = queue.values();
    }
    return [false, next, table];
  }
  }

  //returns all the possibilities to replace LHS in a sentential
  function replaceLHS(productions, sentential){
    result = [];
    for (var i = productions.length - 1; i>=0; i--) {
			for (var j = 0; j < sentential.length; j++) {
				for (var k = 1; k < sentential.length + 1 - j; k++) {
					var subString = sentential.substring(j, j + k);
					if (subString === (productions[i][0])) {
            var newString = sentential.substring(0, j) + productions[i][2]
  								+ sentential.substring(j + k, sentential.length);

						result.push(newString);
            derivationTree[newString] = [productions[i], sentential];
					}
				}
			}
		}
		return result;
  }

  function removeLambda(string){
    for(var i = 0; i < string.length; i++){
      if(string[i] === lambda){
        string = string.replace(lambda, "");
      }
    }
    return string;
  }

  // sets up window for proofs
  var startParse = function () {
    if (parseTree) {
      parseTree.clear();
      jsav.clear();
      jsav = new JSAV("av");
      m = init();
    }
    if (derivationTable) { derivationTable.clear();}
    if (ffTable) { ffTable.clear();}
    if (parseTableDisplay) { parseTableDisplay.clear();}

    $('#deleterowbutton').hide();
    $('#addinputbutton').hide();
    $('#runinputsbutton').hide();
    $('#clearbutton').hide();
    $('.jsavcontrols').show();
    if (type !== "ll" && type !== "slr") $('#backbutton').show();
    $('#bfpbutton').hide();
    $('#mbfpbutton').hide();

    $('#files').hide();

  }

  function removeLambdaHelper (set, productions) {
    for (var i = 0; i < productions.length; i++) {
      if (productions[i][2] === emptystring || _.every(productions[i][2], function(x) { return x in set;})) {
        if (!(productions[i][0] in set)) {
          set[productions[i][0]] = true;
          return true;
        }
      }
    }
    return false;
  };

  // Function to fix all table column widths
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
      var cell = mat._arrays[i]._indices[index].element;
      if ($(cell).width() > maxWidth) {
        maxWidth = $(cell).width();
      }
    }
    if (maxWidth > 100) {
      for (var i = 0; i < mat._arrays.length; i++) {
        var cell = mat._arrays[i]._indices[index].element;
        $(cell).find('.jsavvalue').width(maxWidth);
      }
    }
  };

  // Function to initialize/reinitialize the grammar display
  var init = function () {
    if (m) {
      m.clear();
    }
    var m2 = jsav.ds.matrix(productions, {style: "table"});
    // hide all of the empty rows
    for (var i = lastRow + 1; i < productions.length; i++) {
      m2._arrays[i].hide();
    }
    layoutTable(m2, 2);
    return m2;
  };

});
var hasLambda = function(productions){
  for (var i = 0; i < productions.length; i++) 
    if (productions[i][2] === emptystring)
      return true;
  return false; 
}