var lambda = String.fromCharCode(955), // Instance variable to store the JavaScript representation of lambda.
    //jsav = new JSAV("av"),
    epsilon = String.fromCharCode(949), // Instance variable to store the JavaScript representation of epsilon.
    none = String.fromCharCode(248), // empty set symbol used for converting to RE
    emptystring = lambda,
    collapseStateTable, // table that shows relevant transitions of a collapsed node
    //g, //reference graph
    transitions;

var FAtoREController2 = function(jsav, fa, options) {
  this.init(jsav, fa, options);
};

var controllerProto = FAtoREController2.prototype;

controllerProto.init = function(jsav, fa, options) {
  this.jsav = jsav;
  this.fa = fa;
  this.visualize = false;
};

controllerProto.checkForTransitions = function() {
  var edgesNum = this.fa.edges().length;
  var nodesNum = this.fa.nodes().length;
  if (edgesNum == nodesNum * nodesNum) {
    if(this.visualize == false){
    $("#collapseButton").show();
    $("#finalize").show();
    $("#cheat").hide();
    $("#edgeButton").hide();
    $(".jsavgraph").removeClass("addEdges");
    //this.jsav.umsg("Use collapse state tool to remove nonfinal, noninitial states.");
    $("p").text("Use collapse state tool to remove nonfinal, noninitial states.");
    }
    if (this.fa.nodes().length == 2) this.generateExpression();
  }
};

// change ...<br>... to (...+...)
// add parentheses to the ones with + sign
function normalizeTransitionToRE(transition, last) {
//  var arr = transition.split("<br>");
//  if (arr.length == 1) {
//    return transition;
//  }
//  if (arr.length == 0 && last) return re;
//  var re = "(" + arr[0];
//  for (var i = 1; i < arr.length; i++) {
//    re += "+" + arr[i];
//  }
//  re += ")";
//  return re;
//}
  if (needParentheses(transition)) {
    return addParentheses(transition);
  }
  return transition;
}

function transitionsTableHandler(row, col, e) {
  var fa = this.element.data("fa");
  for (var i = 0; i < transitions._arrays.length; i++) {
    transitions.unhighlight(i);
  }
  transitions.highlight(row);
  var edges = fa.edges();
  for (var edge = edges.next(); edge; edge = edges.next()) {
    edge.element.removeClass("testingLambda");
    edge._label.element.removeClass("testingLambda");
  }
  var table = collapseStateTable;
  var from = fa.getNodeWithValue(table[row][0]);
  var to = fa.getNodeWithValue(table[row][1]);
  var direct = fa.getEdge(from, to);
  var step1 = fa.getEdge(from, fa.selected);
  var step2 = fa.getEdge(fa.selected, fa.selected);
  var step3 = fa.getEdge(fa.selected, to);
  direct.element.addClass("testingLambda");
  step1.element.addClass("testingLambda");
  step2.element.addClass("testingLambda");
  step3.element.addClass("testingLambda");
  direct._label.element.addClass("testingLambda");
  step1._label.element.addClass("testingLambda");
  step2._label.element.addClass("testingLambda");
  step3._label.element.addClass("testingLambda");
}

controllerProto.collapseState = function(node, transitionOptions) {
  if (!node) {
    $(".jsavgraph").addClass("collapse2");
    $(".jsavgraph").removeClass("editNodes");
    return;
  }
  if (localStorage.trans === "true") {
    return;
  }
  var table = [];
  var nodes1 = this.fa.nodes();
  var nodes2 = this.fa.nodes();
  for (var from = nodes1.next(); from; from = nodes1.next()) {
    nodes2.reset();
    for (var to = nodes2.next(); to; to = nodes2.next()) {
      if (from == this.fa.selected || to == this.fa.selected) continue;
      var straight = this.fa.getEdge(from, to).weight();
      var begin = this.fa.getEdge(from, node).weight();
      var pause = this.fa.getEdge(node, node).weight();
      var end = this.fa.getEdge(node, to).weight();
      var indirect = "";

      //var direct = normalizeTransitionToRE(straight);
      var direct = straight;
      if (begin == none || end == none) {
        table.push([from.value(), to.value(), direct]);
      }			else {
//        var step1 = normalizeTransitionToRE(begin);
//        var step2 = normalizeTransitionToRE(pause);
//        var step3 = normalizeTransitionToRE(end);
        var step1 = begin;
        var step2 = pause;
        var step3 = end;
        if (step2 == none || step2 == lambda) {
          if (step1 == lambda) {
            indirect = step3;
          }					else if (step3 == lambda) {
            indirect = step1;
          }					else {
            indirect = step1 + step3;
          }
        }				else if (step1 == lambda && step3 == lambda) {
          indirect = addStar(step2);
        }					else if (step1 == lambda) {
          indirect = addStar(step2) + step3;
        }					else if (step3 == lambda) {
          indirect = step1 + addStar(step2);
        }					else {
          indirect = step1 + addStar(step2) + step3;
        }
        if (direct == none) {
          table.push([from.value(), to.value(), indirect]);
        }				else {
          table.push([from.value(), to.value(), direct + "+" + indirect]);
        }
      }
    }
  }
  collapseStateTable = table;

//  $dialog = $("#dialog");
 // var tav = new JSAV("dialog2");
//  if (transitions) transitions.clear();
  if (transitions) delete transitions;
  localStorage.setItem("trans", "true");
  if(this.visualize)
  transitions = this.jsav.ds.matrix(table, {left: transitionOptions.left, style: "table"});
  else
    transitions = this.jsav.ds.matrix(table, {style: "table", element: $("#TransitionTable")});
  transitions.element.data({fa: this.fa});
  transitions.click(transitionsTableHandler);
  if(this.visualize == false)
    $("p").text("Click Finalize to complete state removal.");
//  $dialog.dialog({
//    dialogClass: "no-close",
//    width: 10,
//    maxHeight: 800
//  });
//  $dialog.dialog("open");
this.transitions = transitions;
};

// add empty transitions to states without transitions to each other
controllerProto.completeTransitions = function() {
  var nodes1 = this.fa.nodes();
  var nodes2 = this.fa.nodes();
  for (var from = nodes1.next(); from; from = nodes1.next()) {
    for (var to = nodes2.next(); to; to = nodes2.next()) {
      if (!this.fa.hasEdge(from, to)) {
        this.fa.addEdge(from, to, {weight: none});
      }
    }
    nodes2.reset();
  }
  this.checkForTransitions();
};

// closes the transitions box and update FA
controllerProto.finalizeRE = function() {
  if (localStorage.trans !== "true") {
    alert("You need to select the state collapser button and click on a noninitial, nonfinal node before you can click finalize.");
    return;
  }
  //$("#dialog").dialog("close");
  $("#TransitionTable").empty();
  if(this.visualize == false)
  $("p").text("Use collapse state tool to remove nonfinal, noninitial states.");
  localStorage.removeItem("trans");

  var table = collapseStateTable;
  for (var i = 0; i < table.length; i++) {
    var row = table[i];
    var from = this.fa.getNodeWithValue(row[0]);
    var to = this.fa.getNodeWithValue(row[1]);
    var newTransition = row[2];
    this.fa.removeEdge(from, to);
    this.fa.addEdge(from, to, {weight: newTransition});
  }
  this.fa.removeNode(this.fa.selected);
  if (this.fa.nodes().length == 2) {
    this.generateExpression();
  }
};

// get the RE from last two states;
controllerProto.generateExpression = function() {
  var from = this.fa.initial;
  var to = this.fa.getFinals()[0];
  var fromm = normalizeTransitionToRE(this.fa.getEdge(from, from).weight());
  var fromTo = normalizeTransitionToRE(this.fa.getEdge(from, to).weight(), true);
  var toFrom = normalizeTransitionToRE(this.fa.getEdge(to, from).weight());
  var too = normalizeTransitionToRE(this.fa.getEdge(to, to).weight());
  var cycle = "",
      target = "",
      expression = "";
  if (fromTo == none) {
    expression = none;
  } else if (toFrom == none) {
    //cycle = "";
    if ((fromm == none || fromm == lambda) && (too == none || too == lambda)) {
      expression = fromTo;
    } else if (fromm == none || fromm == lambda) {
      if (too.length > 1) {
        expression = fromTo + addStar(too);
      } else {
        expression = fromTo + too + "*";
      }
    } else if (too == none || too == lambda) {
      if (fromm.length > 1) {
        expression = addStar(fromm) + fromTo;
      } else {
        expression = fromm + "*" + fromTo;
      }
    } else if (fromm.length > 1 && too.length > 1) {
      expression = addStar(fromm) + fromTo + addStar(too);
    } else if (fromm.length > 1) {
      expression = addStar(fromm) + fromTo + too + "*";
    } else if (too.length > 1) {
      expression = fromm + "*" + fromTo + addStar(too);
    } else {
      expression = fromm + "*" + fromTo + too + "*";
    }
  } else {
    //cycle = something;
    if ((fromm == none || fromm == lambda) && (too == none || too == lambda)) {
      cycle = addStar(fromTo + toFrom);
      target = fromTo;
    } else if (fromm == none || fromm == lambda) {
      cycle = addStar(fromTo + addStar(too) + toFrom);
      target = fromTo + addStar(too);
    } else if (too == none || too == lambda) {
      cycle = addStar(addStar(fromm) + fromTo + toFrom);
      target = addStar(fromm) + fromTo;
    } else {
      cycle = addStar(addStar(fromm) + fromTo + addStar(too) + toFrom);
      target = addStar(fromm) + fromTo + addStar(too);
    }
    expression = cycle + target;
  }
  if(this.visualize == false){
  $("p").text("Generalized transition graph finished! Expression: " + expression + ". Click Export to open the regular expression in a new window.");
  $("#finalize").hide();
  $("#exportButton").show();
  $("#exportButton").click(function() {
    exportToRE(expression);
  });
}
return expression;
};

function exportToRE(expression) {
  localStorage.expression = expression;
  window.open("./REtoFA.html");
}

// add star if needed for transitions
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

//returns true if word needs parentheses (if it is an "+" (OR) expression)
function needParentheses(word) {
  for (var i = 0; i < word.length; i++) {
    if (word.charAt(i) === "+") {
      return true;
    }
  }
  return false;
}

function addParentheses(word) {
  return "(" + word + ")";
}

controllerProto.visualizeConversion = function(transitionOptions = {}, finaGraphOptions = {}){
  this.visualize = true;
  this.jsav.step();
  this.jsav.umsg("We need to complete all the missing tansitions for this Machine");
  this.completeTransitions();
  var nodes = getAllNonStartNorFinalStates(this.fa);
  for (var i = 0; i< nodes.length; i++){
    this.jsav.step();
    this.jsav.umsg("We should collapse the node " + nodes[i].value());
    localStorage.trans = 'false';
    nodes[i].highlight();
    this.fa.selected = nodes[i];
    this.collapseState(nodes[i], transitionOptions);
    this.jsav.step();
    this.jsav.umsg("You can click on each table row to heighlight the affected transitions.");
    nodes[i].unhighlight();
    this.jsav.step();
    this.jsav.umsg("Removing the node " + nodes[i].value() + " will create an new but equivalent graph");
    this.finalizeRE();
  }
  this.jsav.step();
  this.jsav.umsg("After removing all nodes that are not fianl and not start, the resulting Regular Exepression is");
  this.transitions.hide();
  drawTheFinalGraph(this.jsav, finaGraphOptions, this.generateExpression());
}
function getAllNonStartNorFinalStates(graph){
  var listOfNodes = graph.nodes();
  var results = [];
  listOfNodes.map(function(node){
    if(!node.hasClass("final") && !node.hasClass("start"))
      results.push(node);
  });
  return results;
}

function drawTheFinalGraph(jsav, options, expression)
{
  var fa = jsav.ds.FA($.extend(options));
	var start = fa.addNode({left: '15px'});
	var height = options.height || 440;
	var width = options.width || 750;
	var end = fa.addNode({left: width - 10, top: height - 40});
	fa.makeInitial(start);
	fa.makeFinal(end);
  var t = fa.addEdge(start, end, {weight: expression});
  return fa;
}